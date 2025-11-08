import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-card/50 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold gradient-text mb-4">Eman Soliman</h3>
              <p className="text-muted-foreground text-sm">
                Frontend Engineer passionate about creating beautiful, functional web experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((link) => (
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
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-3">
                <a
                  href="https://github.com/emanabdelrhman6272"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background hover:bg-primary/20 rounded-lg transition-colors border border-border hover:border-primary"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/eman-soliman-a97966341/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B%2FjVF7Yf%2FR468IF7cfiypZA%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background hover:bg-primary/20 rounded-lg transition-colors border border-border hover:border-primary"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:emanabdelrhman6272@gmail.com"
                  className="p-2 bg-background hover:bg-primary/20 rounded-lg transition-colors border border-border hover:border-primary"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          {/* <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              © {currentYear} Eman Soliman. Made with  and React
            </p>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
