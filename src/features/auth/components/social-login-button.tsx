import { client, wallet } from "@/lib/thirdweb";
import { useConnect } from "thirdweb/react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface SocialLoginButtonProps {
  strategy: "google" | "apple" | any;
  icon: React.ComponentType;
  className?: string;
}

const SocialLoginButton = ({ strategy, icon: Icon, className }: SocialLoginButtonProps) => {
  const { connect, isConnecting } = useConnect();

  async function handleLogin() {
    try {
      await connect(async () => {
        await wallet.connect({
          client,
          strategy: strategy,
        });
        toast.success("Đăng nhập thành công!");
        return wallet;
      });
    } catch (e) {
      toast.error("Đăng nhập thất bại, vui lòng thử lại.");
      console.error("Error login via " + strategy + ":", e);
    }
  }

  return (
    <Button disabled={isConnecting} onClick={handleLogin} variant={"outline"} size={"icon-lg"} className={className}>
      {isConnecting ? <Spinner /> : <Icon />}
    </Button>
  );
};

export default SocialLoginButton;
