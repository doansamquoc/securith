import Logo from "@/components/logo";
import UserNav from "@/components/user-nav";
import { Link } from "@tanstack/react-router";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Header = () => {
  const account = useActiveAccount();

  const navLinks = account
    ? [
        { label: "Dashboard", href: "/dashboard" },
        { label: "Create poll", href: "/create" },
      ]
    : [
        { label: "Features", href: "/#features" },
        { label: "Transparency", href: "/#transparency" },
      ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="hidden md:flex items-center gap-2">
            <Logo />
            <span className="font-bold tracking-tighter text-lg">Securith</span>
          </Link>
          
          {/* Mobile hamburger on the left */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="border-r">
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href as any}
                      className="text-lg font-semibold"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {!account && (
                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                      <Button variant="ghost" className="justify-start px-0" asChild>
                        <Link to="/login">Sign in</Link>
                      </Button>
                      <Button className="justify-start rounded-full" asChild>
                        <Link to="/login">Get started</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href as any}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {account ? (
            <UserNav />
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild className="font-medium text-muted-foreground hover:text-foreground">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button size="sm" className="rounded-full px-4" asChild>
                <Link to="/login">Get started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
