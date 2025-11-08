import { Card, CardContent } from "@/components/ui/card";

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "React.js", level: 95 },
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 95 },
        { name: "TypeScript", level: 70 },
      ],
    },
    {
      category: "Tools & Technologies",
      skills: [
        { name: "Git & GitHub", level: 90 },
        // { name: "Responsive Design", level: 95 },
        // { name: "Tailwind CSS", level: 85 },
        // { name: "Redux", level: 80 },
        // { name: "REST APIs", level: 85 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 md:py-32 bg-card/30 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, catIndex) => (
              <Card
                key={category.category}
                className="bg-card border-border animate-fade-in"
                style={{ animationDelay: `${catIndex * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 gradient-text">{category.category}</h3>
                  <div className="space-y-6">
                    {category.skills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                            style={{
                              width: `${skill.level}%`,
                              animation: `slide-in 1s ease-out ${index * 0.1}s backwards`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
