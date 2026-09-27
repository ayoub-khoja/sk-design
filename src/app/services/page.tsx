import type { Metadata } from "next";
import {
  MachinePark,
  Methodology,
  ServicesBanner,
} from "@/components/services/ServicesExtras";
import { ServicesCatalog } from "@/components/services/ServicesCatalog";

export const metadata: Metadata = {
  title: "Services & Réalisations | SK Design",
  description:
    "Catalogue atelier SK Design : enseignes LED, habillage vitrine, plaques, édition scolaire et parc machine en Tunisie.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesCatalog />
      <MachinePark />
      <Methodology />
      <ServicesBanner />
    </>
  );
}
