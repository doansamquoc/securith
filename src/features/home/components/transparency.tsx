import { Database, Search, FileText } from "lucide-react";

export const Transparency = () => {
  return (
    <section className="py-32 bg-background relative" id="transparency">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                Absolute trust via<br/>
                on-chain data.
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Securith operates entirely on smart contracts, ensuring all voting data is decentralized and tamper-proof.
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  icon: Database,
                  title: "Distributed data",
                  desc: "Votes are not stored in a single server but are distributed across the network nodes.",
                },
                {
                  icon: Search,
                  title: "Publicly verifiable",
                  desc: "Anyone can query raw data directly from the contract to audit results.",
                },
                {
                  icon: FileText,
                  title: "Open source",
                  desc: "Our smart contracts are public and audited to ensure transparent, fair logic.",
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

          <div className="rounded-xl border bg-muted/20 p-8">
            <div className="font-mono text-xs text-muted-foreground space-y-4">
                <div className="flex justify-between border-b pb-4">
                    <span>STATUS:</span>
                    <span className="text-foreground">OPERATIONAL</span>
                </div>
                <div className="flex justify-between border-b pb-4">
                    <span>NETWORK:</span>
                    <span className="text-foreground">BASE SEPOLIA</span>
                </div>
                <div className="flex justify-between border-b pb-4">
                    <span>CONTRACT:</span>
                    <span className="text-primary">0x5f...9a12</span>
                </div>
                <div className="flex justify-between pb-4">
                    <span>LAST AUDIT:</span>
                    <span className="text-foreground">2026-04-18</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
