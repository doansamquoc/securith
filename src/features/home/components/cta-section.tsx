import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export const CTASection = () => {
  return (
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
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
        </div>
      </div>
    </section>
  );
};
