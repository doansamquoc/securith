import { client, wallets } from "@/lib/thirdweb";
import { useNavigate } from "@tanstack/react-router";
import { ConnectButton, ConnectEmbed, darkTheme, lightTheme } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";
import { useTheme } from "@/components/theme-provider";

const ThridwebAuthForm = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      theme={theme === "dark" ? darkTheme() : lightTheme()}
      onConnect={() => {
        navigate({ to: "/" });
      }}
      accountAbstraction={{
        chain: baseSepolia,
        sponsorGas: true,
      }}
    />
  );
};

export default ThridwebAuthForm;
