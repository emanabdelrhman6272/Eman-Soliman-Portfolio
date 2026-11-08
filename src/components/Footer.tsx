import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-card/50 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-xl font-bold gradient-text mb-3">
                Eman Soliman
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm">
                Frontend Engineer passionate about creating beautiful,
                functional, and accessible web experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm flex flex-col items-center md:items-start">
                {[
                  "Home",
                  "About",
                  "Skills",
                  "Projects",
                  "Contact",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold mb-3">Connect</h4>
              <div className="flex justify-center md:justify-start gap-3">
                <a
                  href="https://github.com/emanabdelrhman6272"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 bg-background hover:bg-primary/20 rounded-lg transition-colors border border-border hover:border-primary"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/eman-soliman-a97966341/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B%2FjVF7Yf%2FR468IF7cfiypZA%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 bg-background hover:bg-primary/20 rounded-lg transition-colors border border-border hover:border-primary"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:emanabdelrhman6272@gmail.com"
                  aria-label="Email Me"
                  className="p-2.5 bg-background hover:bg-primary/20 rounded-lg transition-colors border border-border hover:border-primary"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Eman Soliman. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
