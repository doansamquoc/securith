import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-[3rem] p-12 lg:p-24 text-center text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/40">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <h2 className="text-4xl lg:text-7xl font-black tracking-tighter leading-none uppercase">
              Sẵn sàng để <br /> tạo cuộc bầu chọn đầu tiên?
            </h2>
            <p className="text-primary-foreground/80 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              Tham gia cùng hàng ngàn người dùng tin tưởng Securith cho những quyết định quan trọng nhất của họ.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 h-16 px-12 rounded-2xl font-bold text-xl group shadow-xl" asChild>
                <Link to="/login">
                  Bắt đầu miễn phí
                  <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
