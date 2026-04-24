import CopyButton from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { contract } from "@/lib/thirdweb";
import { shortenAddress } from "@/utils/utils";

const PollInfoCard = () => {
  return (
    <Card className="py-4 md:py-6">
      <CardHeader className="px-4 md:px-6">
        <CardTitle>Thông tin cuộc bầu chọn</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4 md:px-6">
        <div className="space-y-1">
          <CardDescription>Mạng lưới</CardDescription>
          <span className="text-sm font-medium flex items-center gap-1.5">{`${contract.chain.name} (${contract.chain.testnet ? "Testnet" : "Mainnet"})`}</span>
        </div>
        <div className="space-y-1">
          <CardDescription>Smart Contract</CardDescription>
          <span className="text-sm font-medium flex items-center gap-1.5">
            {shortenAddress(contract.address)} <CopyButton textToCopy={contract.address} size={"icon-xs"} variant={"ghost"} />
            <Button size={"xs"} variant={"link"} asChild>
              <a
                href={`${contract.chain.blockExplorers?.[0].url}/address/${contract.address}#events`}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Xem trên Explorer
              </a>
            </Button>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PollInfoCard;
