import { Outlet, Navigate } from "react-router-dom";
import { useActiveAccount } from "thirdweb/react";

export default function AuthLayout() {
  const account = useActiveAccount();

  // Redirect if already logged in
  if (account) return <Navigate to="/dashboard" replace />;

  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
}
