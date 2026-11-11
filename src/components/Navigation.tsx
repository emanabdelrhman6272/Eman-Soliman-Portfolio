import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Download,
  Lock,
  LogOut,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useTheme } from "next-themes";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

const Navigation = () => {
  const { theme, setTheme } = useTheme();
  const { isAdmin, logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Login Modal State
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setIsLoginOpen(false);
      setEmail("");
      setPassword("");
    } catch (err: any) {
      console.error(err);
      setErrorMsg("Incorrect email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-card/95 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
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
            <div className="hidden md:flex items-center space-x-5 lg:space-x-7">
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

              {/* Login / Admin Status Button */}
              {isAdmin ? (
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> Eman Admin
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="text-xs border-destructive/40 text-destructive hover:bg-destructive/10 h-8 px-2.5"
                    title="Logout"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-1" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLoginOpen(true)}
                  className="text-xs text-muted-foreground hover:text-primary gap-1.5 h-8 px-2.5"
                  title="Admin Login"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Login Eman
                </Button>
              )}

              {/* Theme Toggle */}
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

            {/* Mobile Actions */}
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

          {/* Mobile Navigation Drawer */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4 animate-fade-in space-y-2">
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

              <div className="pt-2 border-t border-border flex flex-col gap-2">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Eman-Soliman-CV.pdf"
                  className="flex items-center gap-2 py-1.5 text-primary font-semibold text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download CV (Resume)
                </a>

                {isAdmin ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="w-full text-xs text-destructive border-destructive/30"
                  >
                    <LogOut className="w-3.5 h-3.5 mr-1" /> Logout (Eman)
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLoginOpen(true);
                    }}
                    className="w-full justify-start text-xs text-muted-foreground hover:text-primary px-0"
                  >
                    <Lock className="w-3.5 h-3.5 mr-1.5" /> Login Eman
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogContent className="sm:max-w-md bg-card border-border shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-xl gradient-text">
              Eman Soliman - Admin Login
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-muted-foreground">
              Enter your admin credentials to manage projects and skills.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleLogin} className="space-y-4 pt-3">
            {errorMsg && (
              <div className="text-xs text-destructive bg-destructive/10 p-2.5 rounded-lg border border-destructive/20 text-center font-medium">
                {errorMsg}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="eman@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-background"
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-2 font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login as Admin"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navigation;
