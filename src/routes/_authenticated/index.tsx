import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useActiveAccount, useActiveWallet } from "thirdweb/react";

export const Route = createFileRoute("/_authenticated/")({
  component: RouteComponent,
});

function RouteComponent() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();

  return (
    <>
      <hr />
      <h1>Account: {account?.address}</h1>
      <h1>Wallet: {wallet?.id}</h1>
      <Button onClick={wallet?.disconnect}>Logout</Button>
      <ModeToggle />
    </>
  );
}
