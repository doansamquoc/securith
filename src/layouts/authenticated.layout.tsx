import Footer from "@/components/footer";
import Header from "@/components/header";
import { Navigate, Outlet } from "react-router-dom";
import { useActiveAccount } from "thirdweb/react";

export default function AuthenticatedLayout() {
  const account = useActiveAccount();

  // Redirect to login if not authenticated
  if (!account) return <Navigate to="/login" replace />;

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
