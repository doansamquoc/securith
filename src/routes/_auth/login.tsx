import { client, wallets } from "@/lib/thirdweb";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ConnectButton } from "thirdweb/react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import Logo from "@/components/logo";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-100">
        <div className="mb-8 flex justify-center">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Logo />
            <span className="font-semibold tracking-tight text-xl">Securith</span>
          </Link>
        </div>

        <Card className="border-border/50 shadow-sm rounded-xl">
          <CardHeader className="space-y-2 pb-6 text-center">
            <CardTitle className="text-2xl font-semibold tracking-tight">Đăng nhập</CardTitle>
            <CardDescription className="text-sm">Kết nối ví để tham gia bầu chọn</CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="flex flex-col gap-4">
              <ConnectButton
                client={client}
                wallets={wallets}
                theme="dark"
                onConnect={() => {
                  navigate({ to: "/dashboard" });
                }}
                connectButton={{
                  label: "Kết nối ví",
                  className:
                    "!w-full !h-11 !text-sm !font-medium !rounded-md !bg-primary !text-primary-foreground hover:!bg-primary/90 !transition-all !shadow-none",
                }}
              />
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Bảo mật On-chain</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <p className="text-center text-xs text-muted-foreground leading-relaxed px-2">
              Bằng cách tiếp tục, bạn đồng ý với{" "}
              <a href="#" className="underline underline-offset-4 hover:text-foreground transition-colors">
                Điều khoản dịch vụ
              </a>{" "}
              và{" "}
              <a href="#" className="underline underline-offset-4 hover:text-foreground transition-colors">
                Chính sách bảo mật
              </a>
              .
            </p>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="text-muted-foreground hover:text-foreground w-full mt-2"
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang chủ
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
