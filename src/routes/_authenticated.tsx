import { Spinner } from "@/components/ui/spinner";
import Footer from "@/features/home/components/footer";
import Header from "@/features/home/components/header";
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
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="max-w-4xl mx-auto flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
