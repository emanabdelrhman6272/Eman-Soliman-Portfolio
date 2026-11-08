import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const initialCategories: SkillCategory[] = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React.js", level: 95 },
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "TypeScript", level: 85 },
      { name: "HTML5 & CSS3", level: 95 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Material-UI (MUI)", level: 85 },
      { name: "Next.js", level: 80 },
    ],
  },
  {
    category: "Tools & Backend Technologies",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Firebase (Firestore & Auth)", level: 85 },
      { name: "REST APIs & JSON Server", level: 88 },
      { name: "Figma (UI/UX Design)", level: 78 },
      { name: "Responsive & Clean Code", level: 95 },
    ],
  },
];

const Skills = () => {
  const [categories, setCategories] = useState<SkillCategory[]>(() => {
    try {
      const saved = localStorage.getItem("eman_portfolio_skills_v2");
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState<number>(85);

  useEffect(() => {
    try {
      localStorage.setItem("eman_portfolio_skills_v2", JSON.stringify(categories));
    } catch (e) {
      console.error("Could not save to localStorage", e);
    }
  }, [categories]);

  const handleAddSkill = (categoryName: string) => {
    if (!newSkillName.trim()) return;

    const validatedLevel = Math.min(
      100,
      Math.max(1, Number(newSkillLevel) || 80),
    );

    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.category === categoryName) {
          return {
            ...cat,
            skills: [
              ...cat.skills,
              { name: newSkillName.trim(), level: validatedLevel },
            ],
          };
        }
        return cat;
      }),
    );

    setNewSkillName("");
    setNewSkillLevel(85);
    setActiveCategory(null);
  };

  const handleDeleteSkill = (categoryName: string, skillIndex: number) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.category === categoryName) {
          return {
            ...cat,
            skills: cat.skills.filter((_, idx) => idx !== skillIndex),
          };
        }
        return cat;
      }),
    );
  };

  return (
    <section id="skills" className="py-20 md:py-32 bg-card/30 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Animated Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">
              Technical <span className="gradient-text">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category, catIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: catIndex * 0.2 }}
              >
                <Card className="bg-card border-border hover:border-primary/40 transition-all duration-300 flex flex-col justify-between h-full shadow-sm hover:shadow-md">
                  <CardContent className="p-6 md:p-8 flex-1">
                    <h3 className="text-2xl font-bold mb-6 gradient-text">
                      {category.category}
                    </h3>
                    <div className="space-y-6">
                      {category.skills.map((skill, index) => (
                        <div key={index} className="space-y-2 group">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm md:text-base">
                              {skill.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs md:text-sm font-semibold text-primary">
                                {skill.level}%
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteSkill(category.category, index)
                                }
                                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all p-1"
                                title="Delete skill"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Animated Progress Bar */}
                          <div className="h-2.5 bg-muted/70 rounded-full overflow-hidden p-0.5">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-sm"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true, margin: "-40px" }}
                              transition={{
                                duration: 1.1,
                                ease: "easeOut",
                                delay: index * 0.08,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Skill Button or Form */}
                    <div className="mt-8 pt-4 border-t border-border/50">
                      {activeCategory === category.category ? (
                        <div className="space-y-3 p-4 bg-background/60 rounded-lg border border-border animate-fade-in">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Skill name (e.g. Next.js)"
                              value={newSkillName}
                              onChange={(e) => setNewSkillName(e.target.value)}
                              className="text-sm"
                            />
                            <Input
                              type="number"
                              min="1"
                              max="100"
                              placeholder="Level %"
                              value={newSkillLevel}
                              onChange={(e) =>
                                setNewSkillLevel(Number(e.target.value))
                              }
                              className="w-24 text-sm"
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleAddSkill(category.category)}
                            >
                              Save Skill
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setActiveCategory(null);
                                setNewSkillName("");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveCategory(category.category)}
                          className="w-full text-muted-foreground hover:text-primary border border-dashed border-border hover:border-primary"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Skill to {category.category}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
