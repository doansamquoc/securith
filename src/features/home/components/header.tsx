import Logo from "@/components/logo";
import UserNav from "@/components/user-nav";
import { Link } from "@tanstack/react-router";
import { useActiveAccount } from "thirdweb/react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const account = useActiveAccount();

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

        {/* Right Side: Navigation & Logo */}
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {account ? (
              <>
                <Link to="/dashboard" className="transition-colors hover:text-foreground/80 text-foreground">
                  Dashboard
                </Link>
                <Link to="/dashboard" className="transition-colors hover:text-foreground/80 text-muted-foreground">
                  My Polls
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="transition-colors hover:text-foreground/80 text-muted-foreground">
                  Features
                </Link>
                <Link to="/" className="transition-colors hover:text-foreground/80 text-muted-foreground">
                  Transparency
                </Link>
              </>
            )}
          </nav>
          <Logo />
        </div>
      </div>
    </header>
  );
};

export default Header;
