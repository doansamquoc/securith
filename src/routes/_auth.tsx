import { Spinner } from "@/components/ui/spinner";
import { client } from "@/lib/thirdweb";
import { createFileRoute, redirect, Outlet, Navigate } from "@tanstack/react-router";
import { useActiveAccount, useAutoConnect } from "thirdweb/react";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
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

  // Fallback redirection if beforeLoad didn't catch it
  if (account) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
}
