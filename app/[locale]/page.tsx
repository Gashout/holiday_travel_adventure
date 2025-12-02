import { useTranslations } from "next-intl";
import Hero from "@/app/components/Hero";
import DestinationsSection from "@/app/components/DestinationsSection";
import AboutSection from "@/app/components/AboutSection";
import PackagesSection from "@/app/components/PackagesSection";
import GallerySection from "@/app/components/GallerySection";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import TeamSection from "@/app/components/TeamSection";
import ContactSection from "@/app/components/ContactSection";
import Footer from "@/app/components/Footer";
import Navigation from "@/app/components/Navigation";

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />

      {/* Destinations Section */}
      <DestinationsSection />

      {/* About Us Section */}
      <AboutSection />

      {/* Packages Section */}
      <PackagesSection />

      {/* Gallery Section */}
      <GallerySection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Team Section */}
      <TeamSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
