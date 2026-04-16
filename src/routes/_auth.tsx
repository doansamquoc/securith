import { Spinner } from "@/components/ui/spinner";
import { client } from "@/lib/thirdweb";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useActiveAccount, useAutoConnect } from "thirdweb/react";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const account = useActiveAccount();
  const { isLoading: isAutoConnecting } = useAutoConnect({ client });

  if (isAutoConnecting) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (account) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-md mx-auto flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
}
