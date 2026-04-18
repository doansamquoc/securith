import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Shield, Zap, BarChart3, Lock } from "lucide-react";
import Header from "@/features/home/components/header";
import Footer from "@/features/home/components/footer";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-background">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-muted/50">
                <span className="text-primary mr-2">New</span> Secure Voting on Base Sepolia
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-none">
                Decentralized Polling <br />
                <span className="text-primary">Made Simple & Secure</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Securith leverages blockchain technology to ensure every vote is transparent, 
                immutable, and verified. No middlemen, no tampering.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="h-12 px-8 text-base font-semibold" asChild>
                  <Link to="/login">Get Started Free</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold">
                  View Live Polls
                </Button>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Securith?</h2>
              <p className="text-muted-foreground">Built for reliability, speed, and absolute transparency.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Immutable Records",
                  desc: "Every vote is stored on the blockchain, making it impossible to alter or delete results.",
                  icon: Shield,
                },
                {
                  title: "Gasless Voting",
                  desc: "Enjoy seamless participation without worrying about transaction fees. We sponsor the gas for you.",
                  icon: Zap,
                },
                {
                  title: "Real-time Analytics",
                  desc: "Watch results unfold in real-time with beautiful, data-driven charts and insights.",
                  icon: BarChart3,
                },
                {
                  title: "Privacy First",
                  desc: "Built-in encryption and smart contract logic protect voter identity while ensuring authenticity.",
                  icon: Lock,
                },
              ].map((feature, i) => (
                <div key={i} className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-zinc-900 rounded-[2rem] p-12 lg:p-20 text-center text-white overflow-hidden relative">
              <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                <h2 className="text-4xl lg:text-5xl font-bold">Ready to host your first secure poll?</h2>
                <p className="text-zinc-400 text-lg">
                  Join thousands of users who trust Securith for transparent decision making.
                </p>
                <Button size="lg" className="bg-white text-black hover:bg-zinc-200 h-12 px-10 rounded-full font-bold" asChild>
                  <Link to="/login">Create a Poll Now</Link>
                </Button>
              </div>
              {/* Decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
