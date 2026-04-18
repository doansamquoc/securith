import { client } from "@/lib/thirdweb";
import { useConnect } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";
import { Button } from "@/components/ui/button";

const LoginViaFacebook = () => {
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
              strategy: "facebook",
            });
            return wallet;
          })
        }
      >
        <img src="https://thesvg.org/icons/facebook/default.svg" alt="Facebook" className="w-4" /> Connect with Facebook
      </Button>
    </div>
  );
};

export default LoginViaFacebook;
