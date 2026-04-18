import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Linkedin from "@thesvg/react/linkedin";
import Github from "@thesvg/react/github";
import Twitter from "@thesvg/react/twitter";
import { Mail, ShieldCheck } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Live Polls", href: "/" },
        { label: "Documentation", href: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/" },
        { label: "Careers", href: "/" },
        { label: "Privacy Policy", href: "/" },
        { label: "Terms of Service", href: "/" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/" },
        { label: "Contact Us", href: "/" },
        { label: "Status", href: "/" },
        { label: "API Reference", href: "/" },
      ],
    },
  ];

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-border">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight">Securith</span>
            </div>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Empowering global decision-making through secure, transparent, and decentralized blockchain voting
              technology.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:text-primary">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href as any}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p className="text-sm text-muted-foreground text-center">
              © {currentYear} Securith Labs Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">
                Cookies
              </Link>
              <Link to="/" className="hover:text-foreground">
                Security
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-background border border-border p-1 rounded-lg w-full max-w-sm">
            <Mail className="h-4 w-4 ml-2 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Subscribe to newsletter"
              className="border-none focus-visible:ring-0 shadow-none h-8 text-sm bg-transparent"
            />
            <Button size="sm" className="h-8 rounded-md px-3">
              Join
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
