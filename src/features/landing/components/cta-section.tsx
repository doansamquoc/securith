import { Button } from "@/components/ui/button";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section className="py-32 bg-background border-t">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Sẵn sàng để bắt đầu?</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Tham gia cùng hàng ngàn người dùng tin tưởng Securith cho những quyết định quan trọng nhất của họ.
          </p>
          <div className="pt-4">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link to="/login">
                Tạo cuộc bình chọn đầu tiên
                <IconArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
