import { Configurator } from "@/components/sections/Configurator";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Prestations } from "@/components/sections/Prestations";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyUs } from "@/components/sections/WhyUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Configurator />
      <Portfolio />
      <ServiceCards />
      <Prestations />
      <WhyUs />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
