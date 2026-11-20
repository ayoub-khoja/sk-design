import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  // L'ancienne page Services a été fusionnée dans Réalisations.
  async redirects() {
    return [{ source: "/services", destination: "/realisations", permanent: true }];
  },
  experimental: {
    // Envoi de plusieurs photos (15 Mo max chacune, compressées ensuite) depuis /admin
    serverActions: {
      bodySizeLimit: "60mb",
    },
    proxyClientMaxBodySize: "60mb",
  },
};

export default nextConfig;
