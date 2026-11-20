import Image from "next/image";
import { CLIENT_LOGOS } from "@/constants/content";
import { cn } from "@/lib/utils";

/** Bandeau « Ils nous font confiance » : vrais logos des clients, en défilement. */
export function ClientLogos() {
  // Liste répétée pour remplir les grands écrans sans trou dans la boucle.
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <section aria-labelledby="clients-logos" className="relative bg-white py-10">
      <h2
        id="clients-logos"
        className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-600"
      >
        Ils nous font confiance
      </h2>
      <div className="group relative mt-5 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {/* Deux copies côte à côte pour une boucle sans saut */}
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className="flex shrink-0 animate-[marquee_50s_linear_infinite] items-center gap-12 pr-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          >
            {logos.map((logo, i) => (
              <li
                key={`${logo.name}-${i}`}
                style={"bg" in logo ? { backgroundColor: logo.bg } : undefined}
                className="relative flex h-24 w-40 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-3 shadow-[0_12px_30px_-18px_rgba(9,9,11,0.35)] ring-1 ring-zinc-900/5 transition duration-300 hover:-translate-y-1"
              >
                <Image
                  src={logo.src}
                  // Texte alternatif seulement sur la 1re occurrence de chaque logo.
                  alt={copy === 0 && i < CLIENT_LOGOS.length ? `Logo ${logo.name}, client de SK Design` : ""}
                  width={logo.width}
                  height={logo.height}
                  sizes="160px"
                  className={cn(
                    "max-h-full w-auto object-contain",
                    "fill" in logo && "absolute inset-0 h-full w-full object-cover",
                  )}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
