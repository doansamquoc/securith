import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import Logo from "@/components/logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Pricing", href: "/" },
        { label: "Documentation", href: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/" },
        { label: "Blog", href: "/" },
        { label: "Careers", href: "/" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/" },
        { label: "Terms", href: "/" },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <Logo />
              <span className="text-lg font-semibold tracking-tight">Securith</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Nền tảng bầu chọn phi tập trung, minh bạch và an toàn tuyệt đối nhờ sức mạnh của Blockchain.
            </p>
            <div className="flex items-center gap-2 -ml-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <IconBrandX className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <IconBrandGithub className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <IconBrandLinkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-4">
                <h4 className="text-sm font-medium">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href as any}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Securith Labs Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Powered by Base Sepolia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
