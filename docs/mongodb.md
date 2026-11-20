# Espace admin — base de données MongoDB

L'espace admin (`/admin`) enregistre les réalisations, les catégories, le
compte admin **et les photos** dans **MongoDB** (photos stockées avec GridFS,
servies par le site à l'adresse `/media/<id>`).

Tant que MongoDB n'est pas configuré, le site public fonctionne normalement
avec le catalogue de `src/constants/services.ts`.

## Qui accède à quoi ?

| Qui | Comment | Pour quoi faire |
|---|---|---|
| Le client (admin) | `https://www.skdesign.tn/admin` + email / mot de passe | Ajouter, modifier, supprimer réalisations, catégories et photos |
| Les développeurs | Site **MongoDB Atlas** → *Browse Collections* | Voir ou corriger les données, sauvegardes |
| Les développeurs | Logiciel **MongoDB Compass** (gratuit) | Pareil, depuis le PC |
| Le site | Variable `MONGODB_URI` | Lire le catalogue et enregistrer les modifications |

Le client n'a **jamais** besoin d'ouvrir MongoDB : tout se fait depuis `/admin`.

## 1. Créer la base (une seule fois)

1. Créez un compte sur <https://www.mongodb.com/cloud/atlas/register>.
2. Créez un **cluster gratuit (M0)**, région proche (ex. Paris / Frankfurt).
3. **Database Access** → *Add New Database User* : un nom (ex. `skdesign`) et un
   mot de passe généré. Rôle : *Read and write to any database*.
4. **Network Access** → *Add IP Address* :
   - pour travailler en local : *Add Current IP Address* ;
   - pour l'hébergement (adresse IP inconnue ou variable) : `0.0.0.0/0`
     (l'accès reste protégé par l'utilisateur et le mot de passe).
5. **Connect** → *Drivers* → copiez la chaîne de connexion, du type :
   `mongodb+srv://skdesign:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   et remplacez `<password>` par le mot de passe de l'étape 3.

## 2. Renseigner `.env.local`

Copiez `.env.example` en `.env.local` (ou complétez le fichier existant) :

```env
MONGODB_URI=mongodb+srv://skdesign:MOT_DE_PASSE@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=skdesign
SESSION_SECRET=une-longue-chaine-aleatoire
ADMIN_EMAIL=admin@skdesign.tn
ADMIN_PASSWORD=un-mot-de-passe-solide
```

Pour générer `SESSION_SECRET` :

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

### Erreur `querySrv ECONNREFUSED` ?

Certains routeurs Wi-Fi refusent les requêtes DNS « SRV » utilisées par les
liens `mongodb+srv://`. Dans ce cas, utilisez la forme standard du lien (liste
des 3 serveurs du cluster) :

```env
MONGODB_URI=mongodb://UTILISATEUR:MOT_DE_PASSE@ac-xxxx-shard-00-00.xxxxx.mongodb.net:27017,ac-xxxx-shard-00-01.xxxxx.mongodb.net:27017,ac-xxxx-shard-00-02.xxxxx.mongodb.net:27017/?tls=true&replicaSet=atlas-xxxx-shard-0&authSource=admin&retryWrites=true&w=majority
```

Les noms des serveurs et du `replicaSet` s'obtiennent avec
`Resolve-DnsName -Type SRV _mongodb._tcp.<cluster>.mongodb.net` et
`Resolve-DnsName -Type TXT <cluster>.mongodb.net` (PowerShell). En
production, l'hébergeur accepte normalement la forme courte `mongodb+srv://`.

## 3. Importer le catalogue + créer le compte admin

```bash
node --env-file=.env.local scripts/seed.mjs
```

Le script crée les index, le compte admin, les 9 catégories et les 15
réalisations actuelles avec leurs 24 photos. Il peut être relancé sans créer
de doublons. Ensuite, vous pouvez retirer `ADMIN_PASSWORD` de `.env.local`.

## 4. Lancer

```bash
npm run dev
```

Ouvrez <http://localhost:3000/admin> et connectez-vous.

## Mot de passe

- **Changer** : dans `/admin` → *Mon compte*.
- **Oublié** : mettez le nouveau mot de passe dans `ADMIN_PASSWORD` puis
  lancez `node --env-file=.env.local scripts/seed.mjs --reset-password`.

## En production

Le fichier `.env.local` n'est **jamais** envoyé sur GitHub (il contient le mot
de passe de la base). Le serveur en ligne ne le connaît donc pas : sans les
étapes ci-dessous, `/admin` affiche « Espace admin momentanément
indisponible » et la page Réalisations montre l'ancien catalogue intégré au
code au lieu de celui de la base.

1. **Variables d'environnement** — dans le tableau de bord de l'hébergeur
   (ex. Vercel : *Project → Settings → Environment Variables*, environnement
   *Production*), ajoutez :

   | Nom | Valeur |
   | --- | --- |
   | `MONGODB_URI` | la chaîne de connexion Atlas. En ligne, la forme courte `mongodb+srv://…` fonctionne. |
   | `MONGODB_DB` | `skdesign` |
   | `SESSION_SECRET` | une longue chaîne aléatoire, **différente** de celle de `.env.local` (ex. `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`) |

   `ADMIN_EMAIL` / `ADMIN_PASSWORD` ne sont **pas** nécessaires en ligne : le
   compte admin est déjà dans la base.
2. **Accès réseau Atlas** — *Security → Network Access → Add IP Address →*
   `0.0.0.0/0` (*Allow access from anywhere*) : les serveurs de l'hébergeur
   changent d'adresse IP. Le mot de passe de la base devient alors la seule
   protection : changez-le s'il a déjà été montré (captures d'écran…), puis
   mettez à jour `MONGODB_URI` partout.
3. **Redéployer** le site (ex. Vercel : *Deployments → … → Redeploy*) : les
   variables ne sont lues qu'au démarrage.
4. Vérifier : `/admin/login` affiche le formulaire de connexion, et la page
   Réalisations montre les mêmes projets que l'admin.

Le site se met ensuite à jour dès qu'une réalisation est modifiée dans `/admin`.

## Sauvegardes

Le cluster gratuit M0 n'a pas de sauvegarde automatique. Pour une copie :
MongoDB Compass → la base `skdesign` → chaque collection → *Export Collection*,
ou en ligne de commande `mongodump --uri="<MONGODB_URI>"`.

## Contenu de la base

- `admins` : le compte admin (mot de passe chiffré avec bcrypt).
- `categories` : les catégories (filtres de la page Réalisations et menu).
- `realisations` : les réalisations, avec la liste de leurs photos.
- `quotes` : les demandes de devis envoyées depuis la page `/devis`
  (visibles dans `/admin/devis`).
- `photos.files` / `photos.chunks` : les fichiers photo (GridFS).
  Ne pas les modifier à la main.
