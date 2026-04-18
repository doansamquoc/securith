import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThirdwebProvider, useActiveAccount } from "thirdweb/react";
import { ThemeProvider } from "./components/theme-provider";
import { AppProvider } from "./providers/app-provider";

const router = createRouter({
  routeTree,
  context: {
    isAuthenticated: false,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const account = useActiveAccount();

  // Sync auth state with router and trigger re-validation of guards
  useEffect(() => {
    router.invalidate();
  }, [account]);

  return <RouterProvider router={router} context={{ isAuthenticated: !!account }} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AppProvider>
        <ThirdwebProvider>
          <InnerApp />
        </ThirdwebProvider>
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
);
