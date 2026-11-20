import { ContactCTA } from "@/components/sections/ContactCTA";
import { Hero } from "@/components/sections/Hero";
import { Atelier } from "@/components/sections/Atelier";
import { Location } from "@/components/sections/Location";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyUs } from "@/components/sections/WhyUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceCards />
      <Atelier />
      <WhyUs />
      <Testimonials />
      <ContactCTA />
      <Location />
    </>
  );
}
