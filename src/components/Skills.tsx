import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    skills: [{ name: "Git & GitHub", level: 90 }],
  },
];

const Skills = () => {
  const [categories, setCategories] = useState<SkillCategory[]>(() => {
    try {
      const saved = localStorage.getItem("eman_portfolio_skills");
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
      localStorage.setItem("eman_portfolio_skills", JSON.stringify(categories));
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
            {categories.map((category, catIndex) => (
              <Card
                key={category.category}
                className="bg-card border-border animate-fade-in flex flex-col justify-between"
                style={{ animationDelay: `${catIndex * 0.1}s` }}
              >
                <CardContent className="p-8 flex-1">
                  <h3 className="text-2xl font-bold mb-6 gradient-text">
                    {category.category}
                  </h3>
                  <div className="space-y-6">
                    {category.skills.map((skill, index) => (
                      <div key={index} className="space-y-2 group">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {skill.level}%
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteSkill(category.category, index)
                              }
                              className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                              title="Delete skill"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000 ease-out"
                            style={{
                              width: `${skill.level}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Skill Button or Inline Form */}
                  <div className="mt-8 pt-4 border-t border-border/50">
                    {activeCategory === category.category ? (
                      <div className="space-y-3 p-4 bg-background/60 rounded-lg border border-border animate-fade-in">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Skill name (e.g. Tailwind CSS)"
                            value={newSkillName}
                            onChange={(e) => setNewSkillName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter")
                                handleAddSkill(category.category);
                            }}
                            className="flex-1 bg-background text-sm"
                            autoFocus
                          />
                          <Input
                            type="number"
                            min="1"
                            max="100"
                            placeholder="%"
                            value={newSkillLevel}
                            onChange={(e) =>
                              setNewSkillLevel(Number(e.target.value))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter")
                                handleAddSkill(category.category);
                            }}
                            className="w-20 bg-background text-sm text-center"
                          />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setActiveCategory(null)}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAddSkill(category.category)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-dashed border-border hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2 py-5"
                        onClick={() => {
                          setActiveCategory(category.category);
                          setNewSkillName("");
                          setNewSkillLevel(85);
                        }}
                      >
                        <Plus className="w-4 h-4" />
                        Add Skill
                      </Button>
                    )}
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
