import { Briefcase, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Experience = () => {
  const experiences = [
    {
      role: "Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "2022 - Present",
      description:
        "Leading frontend development for web applications using React.js, implementing responsive designs, and optimizing performance. Collaborated with cross-functional teams to deliver high-quality products.",
      achievements: [
        "Improved app performance by 40% through code optimization",
        "Led migration from JavaScript to TypeScript",
        "Mentored junior developers in React best practices",
      ],
    },
    {
      role: "Junior Frontend Developer",
      company: "Digital Agency Pro",
      period: "2021 - 2022",
      description:
        "Developed responsive websites and web applications using HTML, CSS, JavaScript, and React. Worked closely with designers to implement pixel-perfect interfaces.",
      achievements: [
        "Built 15+ responsive websites for various clients",
        "Implemented reusable component library",
        "Reduced development time by 30% with improved workflows",
      ],
    },
    {
      role: "Frontend Development Intern",
      company: "StartUp Hub",
      period: "2020 - 2021",
      description:
        "Assisted in developing user interfaces for web applications. Learned React fundamentals and modern development practices.",
      achievements: [
        "Contributed to 5+ major project releases",
        "Learned React, Git, and agile methodologies",
        "Received outstanding intern performance award",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 md:py-32 bg-card/30 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="mb-4">
              Work <span className="gradient-text">Experience</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              My professional journey and key achievements
            </p>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1 gradient-text">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground mb-2">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mt-2 md:mt-0">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-primary">Key Achievements:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex}>{achievement}</li>
                      ))}
                    </ul>
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

export default Experience;
