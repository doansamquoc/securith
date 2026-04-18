import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const Hero = () => {
  return (
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
              Explore Polls
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};
