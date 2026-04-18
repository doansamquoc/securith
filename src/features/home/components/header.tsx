import Logo from "@/components/logo";
import UserNav from "@/components/user-nav";
import { Link } from "@tanstack/react-router";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const account = useActiveAccount();

  const navLinks = account
    ? [
        { label: "Bảng điều khiển", href: "/dashboard" },
        { label: "Tạo chiến dịch", href: "/create" },
      ]
    : [
        { label: "Tính năng", href: "/#features" },
        { label: "Minh bạch", href: "/#transparency" },
      ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/80 backdrop-blur-md h-16">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-medium tracking-tight text-lg">Securith</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href as any}
                className="text-sm font-light text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {account ? (
            <UserNav />
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground font-light hover:text-foreground">
                <Link to="/login">Đăng nhập</Link>
              </Button>
              <Button size="sm" variant="outline" className="border-border/50 font-light" asChild>
                <Link to="/login">Bắt đầu</Link>
              </Button>
            </div>
          )}

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] border-l border-border/30">
                <SheetHeader className="text-left pb-6">
                  <SheetTitle className="flex items-center gap-2 text-lg">
                    <Logo />
                    <span className="font-medium tracking-tight">Securith</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-2">
                  {navLinks.map((link) => (
                    <Button
                      key={link.label}
                      variant="ghost"
                      className="justify-start text-sm font-light h-10"
                      asChild
                    >
                      <Link to={link.href as any}>{link.label}</Link>
                    </Button>
                  ))}
                  {!account && (
                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/30">
                      <Button variant="ghost" className="justify-start text-sm font-light h-10" asChild>
                        <Link to="/login">Đăng nhập</Link>
                      </Button>
                      <Button variant="outline" className="justify-start text-sm font-light h-10 border-border/50" asChild>
                        <Link to="/login">Bắt đầu</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
