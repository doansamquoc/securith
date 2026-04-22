import Logo from "@/components/logo";
import UserNav from "@/components/user-nav";
import { Link, useLocation } from "@tanstack/react-router";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetFooter, SheetClose, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { IconMenu2 } from "@tabler/icons-react";

const Header = () => {
  const account = useActiveAccount();
  const location = useLocation();

  const navLinks = account
    ? [
        { label: "Bảng Điều Khiển", href: "/dashboard" },
        { label: "Tạo Mới", href: "/create" },
      ]
    : [
        { label: "Tính Năng", href: "/#features" },
        { label: "Minh Bạch", href: "/#transparency" },
      ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-4 md:gap-8">
          <Logo />
          <nav className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  location.pathname === link.href ? "text-foreground" : "text-foreground/60",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile navigation */}
        <Sheet>
          <SheetTrigger className="md:hidden" asChild>
            <Button variant="ghost" size="default">
              <IconMenu2 />
              <span className="uppercase">Menu</span>
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" showCloseButton={false}>
            <SheetHeader>
              <SheetTitle>MENU</SheetTitle>
              <SheetDescription>{/* Warning avoid */}</SheetDescription>
            </SheetHeader>

            <div className="flex flex-col px-4 gap-4">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.label}>
                  <Link
                    key={link.label}
                    to={link.href}
                    className={cn(
                      "text-base font-medium transition-colors hover:text-foreground/80 py-2",
                      location.pathname === link.href ? "text-foreground" : "text-foreground/60",
                    )}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </div>

            <SheetFooter>
              {!account && (
                <div className="flex flex-col gap-2">
                  <Button className="w-full justify-start" asChild>
                    <Link to="/login">Đăng nhập</Link>
                  </Button>
                </div>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* User navigation */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {account ? (
              <UserNav />
            ) : (
              <>
                <Button size="sm" asChild>
                  <Link to="/login">Đăng nhập</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
