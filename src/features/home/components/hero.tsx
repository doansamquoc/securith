import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-20 pb-24 overflow-hidden bg-background flex flex-col items-center justify-center min-h-[60vh]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-md border border-border/50 px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span>Nền tảng bầu chọn Blockchain</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Minh bạch tuyệt đối
            <br />
            <span className="text-muted-foreground font-light">Cho mọi cuộc bầu cử.</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Securith ứng dụng Blockchain đảm bảo sự minh bạch, xác thực và chống giả mạo cho mọi cuộc bầu chọn.
          </p>

          <div className="flex items-center justify-center gap-3 w-full sm:w-auto pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <Button size="sm" className="font-light" asChild>
              <Link to="/login">
                Bắt đầu ngay
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
            <Button size="sm" variant="ghost" className="font-light" asChild>
              <a href="#explore">Khám phá</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
