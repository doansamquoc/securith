import { Spinner } from "@/components/ui/spinner";
import { client } from "@/lib/thirdweb";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useActiveAccount, useAutoConnect } from "thirdweb/react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const account = useActiveAccount();
  const { isLoading: isAutoConnecting } = useAutoConnect({ client });

  if (isAutoConnecting) {
    return <Spinner />;
  }
  if (!account) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
