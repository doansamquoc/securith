import Logo from "@/components/logo";
import UserNav from "@/components/user-nav";
import { Link } from "@tanstack/react-router";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Menu, ShieldCheck } from "lucide-react";

const Header = () => {
  const account = useActiveAccount();

  const navLinks = account
    ? [
        { label: "Dashboard", href: "/dashboard", active: true },
        { label: "My Polls", href: "/dashboard", active: false },
      ]
    : [
        { label: "Features", href: "/", active: false },
        { label: "Transparency", href: "/", active: false },
      ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-4 h-16">
      <div className="container mx-auto h-full flex items-center justify-between">
        {/* Left Side: User Dropdown or Login */}
        <div className="flex items-center gap-4">
          {account ? (
            <UserNav />
          ) : (
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>

        {/* Right Side: Desktop Nav & Logo */}
        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href as any}
                className={`transition-colors hover:text-foreground/80 ${
                  link.active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Logo */}
          <div className="hidden md:block">
            <Logo />
          </div>

          {/* Mobile Navigation (Sheet) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 px-3 gap-2 flex items-center">
                  <Menu className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center gap-2">
                    <Logo />
                    <span className="font-bold text-xl tracking-tight">Securith</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <Button
                      key={link.label}
                      variant="ghost"
                      className="justify-start font-medium text-lg h-12 px-2"
                      asChild
                    >
                      <Link to={link.href as any}>{link.label}</Link>
                    </Button>
                  ))}
                </div>
                <div className="absolute bottom-8 left-6 right-6 p-6 bg-muted/50 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span className="font-bold">Secure Voting</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Powered by blockchain technology for absolute transparency and trust.
                  </p>
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
