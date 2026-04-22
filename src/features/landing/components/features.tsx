import { IconBolt, IconChartArcs3, IconEye, IconGlobe, IconLock, IconShield } from "@tabler/icons-react";

export const Features = () => {
  const features = [
    {
      title: "Immutable records",
      desc: "Every vote is stored permanently on the blockchain, preventing tampering.",
      icon: IconShield,
    },
    {
      title: "Zero-cost voting",
      desc: "Participate for free. We subsidize all gas fees for your transactions.",
      icon: IconBolt,
    },
    {
      title: "Real-time analytics",
      desc: "Track election results instantly with intuitive, live data visualizations.",
      icon: IconChartArcs3,
    },
    {
      title: "Privacy focused",
      desc: "In-app wallet technology ensures voter anonymity while maintaining authenticity.",
      icon: IconLock,
    },
    {
      title: "Public verification",
      desc: "Anyone can verify election integrity via public smart contract addresses.",
      icon: IconEye,
    },
    {
      title: "Cross-platform",
      desc: "Vote seamlessly on any device, from desktop to mobile, anytime.",
      icon: IconGlobe,
    },
  ];

  return (
    <section className="py-32 bg-background relative" id="features">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-4 mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Core features.</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">Designed for trust, simplicity, and verifiable results.</p>
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
