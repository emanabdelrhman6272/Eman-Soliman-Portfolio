import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 md:container md:mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="group flex flex-col justify-center select-none"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-lg md:text-xl font-black gradient-text tracking-tight group-hover:opacity-90 transition-opacity">
                Eman Soliman
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </div>
            <span className="text-[10px] md:text-[11px] font-medium text-muted-foreground tracking-wider uppercase group-hover:text-primary transition-colors">
              Bringing Ideas to Life
            </span>
          </a>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-foreground/80 hover:text-primary transition-colors relative group text-sm lg:text-base font-medium"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="items-center gap-1.5 border-primary/40 hover:border-primary text-xs font-semibold hover:-translate-y-0.5 transition-all"
              asChild
            >
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Eman-Soliman-CV.pdf"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground hover:text-primary"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>

          {/* Mobile Actions (Theme toggle + Menu button) */}
          <div className="flex items-center gap-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground hover:text-primary"
              aria-label="Toggle theme"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="block py-2 text-foreground/80 hover:text-primary transition-colors text-base font-medium"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Resume Link */}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Eman-Soliman-CV.pdf"
              className="flex items-center gap-2 py-2 text-primary font-semibold text-sm border-t border-border mt-2 pt-3"
            >
              <Download className="w-4 h-4" />
              Download CV (Resume)
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
