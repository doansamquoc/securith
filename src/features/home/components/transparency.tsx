import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Database, Search, FileText } from "lucide-react";

export const Transparency = () => {
  return (
    <section className="py-32 bg-muted/20 relative" id="transparency">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-[0.9]">
                Tin tưởng tuyệt đối qua <br />
                <span className="text-primary">Dữ liệu on-chain</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Khác với các hệ thống bầu chọn truyền thống dựa trên cơ sở dữ liệu tập trung, Securith vận hành hoàn
                toàn trên Smart Contract.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Database,
                  title: "Dữ liệu phân tán",
                  desc: "Phiếu bầu không nằm trong một máy chủ duy nhất, mà được phân tán trên hàng ngàn node của mạng lưới Base.",
                },
                {
                  icon: Search,
                  title: "Kiểm chứng công khai",
                  desc: "Bất kỳ ai cũng có thể truy vấn dữ liệu thô từ contract để đối soát với kết quả hiển thị trên giao diện.",
                },
                {
                  icon: FileText,
                  title: "Mã nguồn mở",
                  desc: "Smart contract của chúng tôi được công khai và kiểm duyệt, đảm bảo không có 'cửa sau' hay logic gian lận.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-background flex items-center justify-center border shrink-0">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-[80px] -z-10 animate-pulse" />
            <Card className="rounded-[3rem] border-2 bg-background/80 backdrop-blur-xl overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="bg-muted p-4 border-b flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/20" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/20" />
                    <div className="h-3 w-3 rounded-full bg-green-500/20" />
                  </div>
                  <div className="bg-background px-3 py-1 rounded text-[10px] font-mono text-muted-foreground border">
                    base-sepolia.etherscan.io
                  </div>
                </div>
                <div className="p-8 space-y-6 font-mono text-xs">
                  <div className="space-y-2">
                    <div className="text-primary opacity-50 font-bold uppercase tracking-wider text-[10px]">
                      Contract Interaction
                    </div>
                    <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg border border-primary/20">
                      <span className="text-primary font-bold">function vote(uint256 pollId, uint256 option)</span>
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="text-muted-foreground opacity-50 font-bold uppercase tracking-wider text-[10px]">
                      Recent Transactions (On-chain)
                    </div>
                    {[
                      { hash: "0x7a2...f1e", from: "0x123...456", option: "Option 1" },
                      { hash: "0x9b1...c4d", from: "0x888...999", option: "Option 2" },
                      { hash: "0x4e8...a2b", from: "0x555...666", option: "Option 1" },
                    ].map((tx, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2 border-b border-dashed last:border-0"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="text-primary">{tx.hash}</span>
                          <span className="text-[10px] text-muted-foreground">From: {tx.from}</span>
                        </div>
                        <span className="bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
                          {tx.option}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-center pt-4">
                    <div className="animate-bounce flex flex-col items-center gap-2 text-primary font-bold">
                      <ShieldCheck className="h-8 w-8" />
                      <span>SECURED BY BASE</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
