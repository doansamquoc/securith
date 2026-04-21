import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-32 overflow-hidden bg-background flex flex-col items-center justify-center min-h-[50vh]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1 text-xs uppercase tracking-widest text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-1000">
            <span>Blockchain-powered voting</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Secure, transparent
            <br />
            <span className="text-muted-foreground">voting for everyone.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            Leverage blockchain technology to ensure absolute transparency, immutability, and trust in every poll.
          </p>

          <div className="flex items-center justify-center gap-4 w-full sm:w-auto pt-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link to="/login">
                Get started
                <IconArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
