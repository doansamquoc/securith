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
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/" },
        { label: "Blog", href: "/" },
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
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Logo />
              <span className="text-lg font-bold tracking-tighter">Securith</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Decentralized, transparent, and secure voting powered by blockchain.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-sm font-semibold">{section.title}</h4>
              <ul className="space-y-2">
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

        <div className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Securith Labs. All rights reserved.</p>
          <span>Powered by Base</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
