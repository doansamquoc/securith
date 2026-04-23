import { createRoot } from "react-dom/client";
import "./index.css";
import { ThirdwebProvider } from "thirdweb/react";
import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="ui-theme">
    <ThirdwebProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </TooltipProvider>
    </ThirdwebProvider>
  </ThemeProvider>,
);
