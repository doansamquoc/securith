import { Link } from "@tanstack/react-router";
import Logo from "@/components/logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/#features" },
        { label: "Docs", href: "/" },
        { label: "Pricing", href: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/" },
        { label: "Blog", href: "/" },
        { label: "Contact", href: "/" },
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
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 w-fit">
              <Logo />
              <span className="font-bold">Securith</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Decentralized, transparent, and secure voting powered by blockchain technology.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-sm font-semibold">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href as any}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t pt-8 md:flex-row md:gap-0">
          <p className="text-sm text-muted-foreground">© {currentYear} Securith Labs. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground font-medium">
            <span>Powered by Base</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
