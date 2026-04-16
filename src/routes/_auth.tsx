import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-sm mx-auto min-h-screen flex flex-col">
      <Outlet />
    </div>
  );
}
