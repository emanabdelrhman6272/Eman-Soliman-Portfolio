import { Code2, Lightbulb, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "Writing maintainable, scalable code following best practices",
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Turning complex challenges into elegant solutions",
    },
    {
      icon: Rocket,
      title: "Fast Learner",
      description: "Quickly adapting to new technologies and frameworks",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Animated Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
            {/* Bio text sliding from left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate Frontend Engineer with a love for creating beautiful, intuitive
                user interfaces. With expertise in React.js and modern JavaScript, I bring ideas to
                life through code.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My journey in web development started with a curiosity about how websites work, and
                it has evolved into a career where I get to build impactful digital experiences
                every day.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring new web technologies, contributing to
                open-source projects, or sharing knowledge with the developer community.
              </p>
            </motion.div>

            {/* Highlights cards sliding from right with stagger */}
            <div className="grid gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-card border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-colors duration-300 group">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
