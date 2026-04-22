import { Spinner } from "@/components/ui/spinner";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { client } from "@/lib/thirdweb";
import { createFileRoute, redirect, Outlet, Navigate } from "@tanstack/react-router";
import { useActiveAccount, useAutoConnect } from "thirdweb/react";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    // Only redirect if we are NOT loading and NOT authenticated
    if (!context.isAutoConnecting && !context.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const account = useActiveAccount();
  const { isLoading: isAutoConnecting } = useAutoConnect({ client });

  if (isAutoConnecting) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  // Fallback redirection if beforeLoad didn't catch it
  if (!account) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="mx-auto min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
