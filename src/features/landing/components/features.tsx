import { IconBolt, IconChartArcs3, IconEye, IconGlobe, IconLock, IconShield } from "@tabler/icons-react";

export const Features = () => {
  const features = [
    {
      title: "Bản ghi bất biến",
      desc: "Mỗi lượt bình chọn được lưu trữ vĩnh viễn trên blockchain, ngăn chặn việc giả mạo.",
      icon: IconShield,
    },
    {
      title: "Bình chọn miễn phí",
      desc: "Tham gia miễn phí. Chúng tôi tài trợ toàn bộ phí gas cho các giao dịch của bạn.",
      icon: IconBolt,
    },
    {
      title: "Phân tích thời gian thực",
      desc: "Theo dõi kết quả bầu cử ngay lập tức bằng các biểu đồ trực quan, trực tiếp.",
      icon: IconChartArcs3,
    },
    {
      title: "Tập trung vào quyền riêng tư",
      desc: "Công nghệ ví trong ứng dụng đảm bảo ẩn danh người bầu trong khi vẫn duy trì tính xác thực.",
      icon: IconLock,
    },
    {
      title: "Xác minh công khai",
      desc: "Bất kỳ ai cũng có thể xác minh tính toàn vẹn của cuộc bầu cử thông qua các địa chỉ hợp đồng thông minh công khai.",
      icon: IconEye,
    },
    {
      title: "Đa nền tảng",
      desc: "Bình chọn liền mạch trên mọi thiết bị, từ máy tính để bàn đến di động, mọi lúc mọi nơi.",
      icon: IconGlobe,
    },
  ];

  return (
    <section className="py-32 bg-background relative" id="features">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Tính năng cốt lõi.</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">Được thiết kế cho sự tin cậy, tính đơn giản và kết quả có thể xác minh.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group p-8 rounded-xl border bg-background hover:bg-muted/30 transition-all duration-300 flex flex-col items-start space-y-4"
            >
              <div className="p-2 rounded-lg bg-muted text-foreground">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
