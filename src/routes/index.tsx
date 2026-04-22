import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Hero } from "@/features/landing/components/hero";
import { Features } from "@/features/landing/components/features";
import { Transparency } from "@/features/landing/components/transparency";
import { CTASection } from "@/features/landing/components/cta-section";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Transparency />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
