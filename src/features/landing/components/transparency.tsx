import { Card, CardContent } from "@/components/ui/card";
import { contract } from "@/lib/thirdweb";
import { IconDatabase, IconFileText, IconSearch } from "@tabler/icons-react";

export const Transparency = () => {
  return (
    <section className="py-32 bg-background relative" id="transparency">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                Tin tưởng tuyệt đối qua
                <br />
                dữ liệu trên chuỗi.
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Securith hoạt động hoàn toàn trên các hợp đồng thông minh, đảm bảo tất cả dữ liệu bình chọn được phi tập trung và chống giả mạo.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  icon: IconDatabase,
                  title: "Dữ liệu phân tán",
                  desc: "Các lượt bình chọn không được lưu trữ trong một máy chủ duy nhất mà được phân tán trên các nút mạng.",
                },
                {
                  icon: IconSearch,
                  title: "Có thể xác minh công khai",
                  desc: "Bất kỳ ai cũng có thể truy vấn dữ liệu gốc trực tiếp từ hợp đồng để kiểm toán kết quả.",
                },
                {
                  icon: IconFileText,
                  title: "Mã nguồn mở",
                  desc: "Các hợp đồng thông minh của chúng tôi là công khai và được kiểm toán để đảm bảo logic minh bạch, công bằng.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{item.title}</h4>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="space-y-6">
              <div className="flex justify-between pb-4">
                <span>TRẠNG THÁI:</span>
                <span className="text-foreground">HOẠT ĐỘNG</span>
              </div>
              <div className="flex justify-between pb-4">
                <span>MẠNG LƯỚI:</span>
                <span className="text-foreground">{contract.chain.name}</span>
              </div>
              <div className="flex justify-between pb-4">
                <span>HỢP ĐỒNG:</span>
                <span className="text-primary">{contract.chain.id}</span>
              </div>
              <div className="flex justify-between pb-4">
                <span>Base Scan:</span>
                <span className="text-primary">{contract.chain.blockExplorers?.[0].url}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
