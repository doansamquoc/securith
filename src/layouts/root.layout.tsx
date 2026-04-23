import * as React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { client, wallet } from "@/lib/thirdweb";
import { useAutoConnect } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";
import Logo from "@/components/logo";

function DelayedSpinner() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    // Chỉ hiện Spinner nếu thời gian load quá 150ms
    const timer = setTimeout(() => setShow(true), 150);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="flex h-screen items-center justify-center animate-in fade-in duration-500">
      <Logo className="animate-bounce" size={56} />
    </div>
  );
}

export default function RootLayout() {
  const { isLoading: isAutoConnecting } = useAutoConnect({
    client,
    chain: baseSepolia,
    wallets: [wallet],
    appMetadata: {
      name: "Securith",
      description: "A secure and user-friendly authentication system built with React and thirdweb.",
      url: "https://securith.vercel.app",
      logoUrl: "https://securith.vercel.app/logo.svg",
    },
    onConnect: () => {
      console.log("Auto-connected successfully");
    },
    onTimeout: () => {
      console.log("Auto-connect timed out");
    },
    accountAbstraction: {
      chain: baseSepolia,
      sponsorGas: true,
    },
  });

  if (isAutoConnecting) {
    return <DelayedSpinner />;
  }

  return (
    <React.Fragment>
      <Outlet />
      <Toaster position="top-center" theme="system" />
    </React.Fragment>
  );
}
