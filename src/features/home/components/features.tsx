import { Shield, Zap, BarChart3, Lock, Eye, Globe } from "lucide-react";

export const Features = () => {
  const features = [
    {
      title: "Hồ sơ không thể thay đổi",
      desc: "Mọi phiếu bầu được lưu trữ vĩnh viễn trên blockchain, ngăn chặn mọi nỗ lực thay đổi hoặc xóa bỏ kết quả.",
      icon: Shield,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Bầu chọn không mất phí",
      desc: "Tham gia bỏ phiếu hoàn toàn miễn phí. Chúng tôi tài trợ toàn bộ phí gas cho mọi giao dịch của bạn.",
      icon: Zap,
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Phân tích thời gian thực",
      desc: "Theo dõi kết quả bầu chọn ngay lập tức với biểu đồ trực quan và dữ liệu được cập nhật từ smart contract.",
      icon: BarChart3,
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Quyền riêng tư tối đa",
      desc: "Sử dụng công nghệ ví in-app giúp bảo vệ danh tính cử tri trong khi vẫn đảm bảo tính xác thực của phiếu bầu.",
      icon: Lock,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "Xác thực công khai",
      desc: "Bất kỳ ai cũng có thể kiểm tra tính hợp lệ của cuộc bầu chọn thông qua địa chỉ smart contract công khai.",
      icon: Eye,
      color: "bg-rose-500/10 text-rose-500",
    },
    {
      title: "Đa nền tảng",
      desc: "Tham gia bầu chọn mọi lúc, mọi nơi trên cả máy tính và thiết bị di động với trải nghiệm mượt mà.",
      icon: Globe,
      color: "bg-sky-500/10 text-sky-500",
    },
  ];

  return (
    <section className="py-32 bg-background relative" id="features">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase">
            Sức mạnh của <span className="text-primary">Sự minh bạch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Chúng tôi xây dựng Securith dựa trên những tiêu chuẩn cao nhất về bảo mật và độ tin cậy.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-[2rem] border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 flex flex-col items-start space-y-4"
            >
              <div className={`p-4 rounded-2xl ${feature.color} group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
