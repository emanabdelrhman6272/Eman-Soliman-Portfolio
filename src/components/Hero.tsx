import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
// import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          // src={heroImage}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
              Frontend Engineer
            </span>
          </div>

          <h1 className="mb-6">
            Hi, I'm <span className="gradient-text">Eman Soliman</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crafting beautiful, responsive web experiences with React, JavaScript, and modern web
            technologies
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">
                View My Work
                <ArrowRight className="ml-2" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/emanabdelrhman6272"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card hover:bg-primary/20 rounded-lg transition-colors border border-border hover:border-primary"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/eman-soliman-a97966341/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B%2FjVF7Yf%2FR468IF7cfiypZA%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-card hover:bg-primary/20 rounded-lg transition-colors border border-border hover:border-primary"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:emanabdelrhman6272@gmail.com"
              className="p-3 bg-card hover:bg-primary/20 rounded-lg transition-colors border border-border hover:border-primary"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
    </section>
  );
};

export default Hero;
