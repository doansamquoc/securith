import { createFileRoute } from "@tanstack/react-router";
import Header from "@/features/home/components/header";
import Footer from "@/features/home/components/footer";
import { Hero } from "@/features/home/components/hero";
import { Features } from "@/features/home/components/features";
import { CTASection } from "@/features/home/components/cta-section";

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
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
