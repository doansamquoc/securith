import { client, wallets } from "@/lib/thirdweb";
import { createFileRoute } from "@tanstack/react-router";
import { ConnectButton } from "thirdweb/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-10 text-white">
        <div className="flex items-center gap-2 text-lg font-medium">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span>Securith</span>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            The future of decentralized voting is here.
          </h1>
          <p className="text-lg text-zinc-400">
            Secure, transparent, and tamper-proof polling powered by blockchain technology.
          </p>
        </div>
        <div className="text-sm text-zinc-500">
          © 2026 Securith Labs. All rights reserved.
        </div>
      </div>
      <div className="flex items-center justify-center p-8 bg-zinc-50 dark:bg-zinc-950">
        <Card className="w-full max-w-md border-none bg-transparent shadow-none lg:bg-card lg:border lg:shadow-sm">
          <CardHeader className="space-y-1 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start mb-4 lg:hidden">
               <ShieldCheck className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight">Login</CardTitle>
            <CardDescription>
              Choose your preferred method to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
               <ConnectButton
                client={client}
                wallets={wallets}
                theme="dark"
                connectButton={{
                  label: "Sign In / Connect Wallet",
                  className: "!w-full !h-12 !text-base !font-semibold !rounded-lg !bg-primary !text-primary-foreground hover:!bg-primary/90",
                }}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Secure Connection
                </span>
              </div>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <a href="#" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
