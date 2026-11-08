import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
// import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import DynamicBackground from "@/components/DynamicBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground">
      {/* Dynamic Animated Particles & Aurora Background */}
      <DynamicBackground />
      <ScrollProgress />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        {/* <Experience /> */}
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Index;
