import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Logo from "@/components/logo";
import { IconArrowLeft, IconBrandApple, IconBrandFacebook, IconBrandGoogleFilled } from "@tabler/icons-react";
import LoginForm from "@/features/auth/components/login-form";
import { FieldGroup, FieldSeparator } from "@/components/ui/field";
import SocialLoginButton from "@/features/auth/components/social-login-button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-100">
        <Logo size={56} className="mb-6 mx-auto" />
        <Card>
          <CardHeader>
            <CardTitle>Đăng nhập</CardTitle>
            <CardDescription>Kết nối ví để tham gia bầu chọn</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="flex flex-row gap-2 justify-between">
                <SocialLoginButton strategy="google" icon={IconBrandGoogleFilled} className="flex-1" />
                <SocialLoginButton strategy="apple" icon={IconBrandApple} className="flex-1" />
                <SocialLoginButton strategy="facebook" icon={IconBrandFacebook} className="flex-1" />
              </div>
              <FieldSeparator>Hoặc</FieldSeparator>
              <LoginForm />
            </FieldGroup>
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
            <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground w-full mt-2">
              <Link to="/">
                <IconArrowLeft className="mr-2 h-4 w-4" /> Quay lại trang chủ
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
