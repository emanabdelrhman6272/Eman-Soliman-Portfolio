import { useState, useEffect } from "react";
import { ArrowRight, Github, Linkedin, Mail, ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";


const roles = [
  "Frontend Engineer",
  "React & TypeScript Specialist",
  "UI/UX Enthusiast",
  "Creative Problem Solver",
];

const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText.length + 1 === fullText.length) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting backward
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-28 pb-16"
    >


      {/* Subtle Ambient Light Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float-reverse pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Animated Badge with Typewriter Effect */}
          <div className="mb-6 inline-flex items-center">
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-primary/5 border border-primary/20 rounded-full text-sm md:text-base font-medium text-primary shadow-sm backdrop-blur-md hover:bg-primary/10 transition-all">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>{currentText}</span>
              <span className="w-0.5 h-4 bg-primary animate-pulse" />
            </span>
          </div>

          <h1 className="mb-6 font-extrabold tracking-tight">
            Hi, I'm <span className="gradient-text drop-shadow-sm">Eman Soliman</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Crafting beautiful, responsive, and accessible web experiences with React, JavaScript,
            and modern frontend technologies.
          </p>

          {/* Action Buttons with Download CV */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              variant="hero"
              size="lg"
              className="group shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
              asChild
            >
              <a href="#projects" onClick={(e) => scrollToSection(e, "#projects")}>
                View My Work
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="group hover:-translate-y-0.5 backdrop-blur-sm transition-all duration-300 border-primary/40 hover:border-primary hover:bg-primary/5 w-full sm:w-auto font-medium"
              asChild
            >
              <a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Eman-Soliman-CV.pdf"
              >
                <Download className="mr-2 w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                Download CV
              </a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="hover:-translate-y-0.5 backdrop-blur-sm transition-all duration-300 w-full sm:w-auto text-muted-foreground hover:text-foreground"
              asChild
            >
              <a href="#contact" onClick={(e) => scrollToSection(e, "#contact")}>
                Contact Me
              </a>
            </Button>
          </div>

          {/* Social Links with Floating Lift */}
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/emanabdelrhman6272"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-3 bg-card/80 backdrop-blur-sm hover:bg-primary/10 rounded-xl transition-all duration-300 border border-border hover:border-primary hover:-translate-y-1 hover:shadow-md text-foreground"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/eman-soliman-a97966341/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B%2FjVF7Yf%2FR468IF7cfiypZA%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-3 bg-card/80 backdrop-blur-sm hover:bg-primary/10 rounded-xl transition-all duration-300 border border-border hover:border-primary hover:-translate-y-1 hover:shadow-md text-foreground"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:emanabdelrhman6272@gmail.com"
              aria-label="Send Email"
              className="p-3 bg-card/80 backdrop-blur-sm hover:bg-primary/10 rounded-xl transition-all duration-300 border border-border hover:border-primary hover:-translate-y-1 hover:shadow-md text-foreground"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <a
        href="#about"
        onClick={(e) => scrollToSection(e, "#about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors duration-300 z-10"
        aria-label="Scroll to about section"
      >
        <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground/80">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
};

export default Hero;
