import { Shield, Zap, BarChart3, Lock } from "lucide-react";

export const Features = () => {
  const features = [
    {
      title: "Immutable Records",
      desc: "Every vote is stored on the blockchain, making it impossible to alter or delete results.",
      icon: Shield,
    },
    {
      title: "Gasless Voting",
      desc: "Enjoy seamless participation without worrying about transaction fees. We sponsor the gas for you.",
      icon: Zap,
    },
    {
      title: "Real-time Analytics",
      desc: "Watch results unfold in real-time with beautiful, data-driven charts and insights.",
      icon: BarChart3,
    },
    {
      title: "Privacy First",
      desc: "Built-in encryption and smart contract logic protect voter identity while ensuring authenticity.",
      icon: Lock,
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Choose Securith?</h2>
          <p className="text-muted-foreground">Built for reliability, speed, and absolute transparency.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
