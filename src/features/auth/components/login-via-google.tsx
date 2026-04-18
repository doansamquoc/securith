import { client } from "@/lib/thirdweb";
import { useConnect } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";
import { Button } from "@/components/ui/button";
import { Google } from "@thesvg/react";

const LoginViaGoogle = () => {
  const { connect, isConnecting } = useConnect();

  return (
    <div className="flex flex-col">
      <Button
        disabled={isConnecting}
        onClick={async () =>
          connect(async () => {
            const wallet = inAppWallet();
            await wallet.connect({
              client,
              chain: baseSepolia,
              strategy: "google",
            });
            return wallet;
          })
        }
      >
        <Google /> Connect with Google
      </Button>
    </div>
  );
};

export default LoginViaGoogle;
