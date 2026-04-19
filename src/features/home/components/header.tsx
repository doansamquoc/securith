import Logo from "@/components/logo";
import UserNav from "@/components/user-nav";
import { Link, useLocation } from "@tanstack/react-router";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const account = useActiveAccount();
  const location = useLocation();

  const navLinks = account
    ? [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Create Poll", href: "/create" },
      ]
    : [
        { label: "Features", href: "/#features" },
        { label: "Transparency", href: "/#transparency" },
      ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Logo className="h-6 w-6" />
            <span className="font-bold inline-block">Securith</span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href as any}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  location.pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            {account ? (
              <UserNav />
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/login">Get started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-3">
            {account && <UserNav />}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                <SheetHeader className="text-left pb-6">
                  <SheetTitle className="flex items-center gap-2">
                    <Logo className="h-6 w-6" />
                    <span className="font-bold">Securith</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href as any}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-foreground/80 py-2",
                        location.pathname === link.href ? "text-foreground" : "text-foreground/60"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {!account && (
                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link to="/login">Sign in</Link>
                      </Button>
                      <Button className="w-full justify-start" asChild>
                        <Link to="/login">Get started</Link>
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
