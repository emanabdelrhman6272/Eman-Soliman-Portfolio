import { useState, useEffect } from "react";
import { ExternalLink, Github, Plus, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

interface Project {
  title: string;
  image?: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

const initialProjects: Project[] = [
  {
    title: "Topamine (E-Learning Platform)",
    image: "/images/topamine1.PNG",
    description:
      "Graduation project at ITI. Developed a full-featured learning platform with CRUD operations and role-based authentication using React, Firebase, and json-server-auth. Implemented secure dashboards for students, teachers, and admins, Paymob payment integration, real-time notifications, and messaging.",
    technologies: [
      "TypeScript",
      "React",
      "Firebase Firestore",
      "Material-UI",
      "Paymob",
    ],
    github: "https://github.com/JohnIhab/Topamine-E_Learning-Platform",
  },
  {
    title: "Meta Child",
    image: "/images/metachild1.PNG",
    description:
      "Social Media Platform tailored for children. Developed a Facebook-like web application with child-safe features, posts, and interactive UI using React, Material-UI (MUI), and JSON Server Auth.",
    technologies: ["React", "Material-UI", "JavaScript", "JSON Server"],
    github: "https://github.com/emanabdelrhman6272/reactFinallProject",
  },
  {
    title: "Weather App",
    image: "/images/weatherapp1.PNG",
    description:
      "A responsive Weather forecast web application. Fetches live real-time weather data and 5-day forecasts through OpenWeatherMap public REST API with dynamic UI weather themes.",
    technologies: ["HTML5", "CSS3", "JavaScript", "REST API"],
    github: "https://github.com/emanabdelrhman6272/Weather-App",
  },
  {
    title: "Self-Driving Car for Egyptian Streets (V2X)",
    image: "/images/topamine1.PNG",
    description:
      "University Graduation Project (Faculty of Computers & AI, Grade: Excellent). Advanced self-driving vehicle using V2X (V2V, V2I, V2P) communication to detect obstacles, interact with traffic lights, and provide real-time user mobile app control.",
    technologies: ["Python", "Computer Vision", "Deep Learning", "C++", "V2X"],
    github: "https://github.com/emanabdelrhman6272",
  },
];

const Projects = () => {
  const [projectList, setProjectList] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem("eman_portfolio_projects_v2");
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newProj, setNewProj] = useState({
    title: "",
    description: "",
    technologies: "",
    github: "",
    image: "",
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "eman_portfolio_projects_v2",
        JSON.stringify(projectList),
      );
    } catch (e) {
      console.error(e);
    }
  }, [projectList]);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProj.title.trim() || !newProj.description.trim()) return;

    const techArray = newProj.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const projectToAdd: Project = {
      title: newProj.title.trim(),
      description: newProj.description.trim(),
      technologies: techArray.length > 0 ? techArray : ["React"],
      github: newProj.github.trim() || "https://github.com",
      image: newProj.image.trim() || "/images/weatherapp1.PNG",
    };

    setProjectList([projectToAdd, ...projectList]);
    setNewProj({
      title: "",
      description: "",
      technologies: "",
      github: "",
      image: "",
    });
    setIsAdding(false);
  };

  const handleDeleteProject = (indexToDelete: number) => {
    setProjectList(projectList.filter((_, idx) => idx !== indexToDelete));
  };

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Animated Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A selection of my recent work, university graduation project, and ITI applications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectList.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <Card className="bg-card/90 backdrop-blur-sm border-border hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group flex flex-col justify-between overflow-hidden h-full rounded-xl">
                  <div>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-base md:text-lg font-bold group-hover:text-primary transition-colors line-clamp-1" title={project.title}>
                          {project.title}
                        </h3>
                        <button
                          type="button"
                          onClick={() => handleDeleteProject(index)}
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all p-1"
                          title="Delete project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {project.image && (
                        <div className="overflow-hidden rounded-lg mt-2.5 bg-muted/30 h-36 md:h-40 w-full border border-border/40">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="p-4 pt-2 space-y-3">
                      <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="text-[11px] px-2 py-0.5 bg-primary/10 text-primary border-primary/20"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge
                            variant="outline"
                            className="text-[10px] px-1.5 py-0.5 text-muted-foreground"
                          >
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </div>

                  <CardFooter className="p-4 pt-3 flex gap-2 border-t border-border/40">
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1 h-8 text-xs hover:border-primary"
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5"
                        >
                          <Github className="w-3.5 h-3.5" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        variant="default"
                        size="sm"
                        asChild
                        className="flex-1 h-8 text-xs"
                      >
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}

            {isAdding ? (
              <Card className="bg-card border-primary p-6 animate-fade-in flex flex-col justify-between">
                <form onSubmit={handleAddProject} className="space-y-3">
                  <h3 className="font-bold text-lg gradient-text">
                    Add New Project
                  </h3>
                  <Input
                    placeholder="Project Title"
                    value={newProj.title}
                    onChange={(e) =>
                      setNewProj({ ...newProj, title: e.target.value })
                    }
                    required
                  />
                  <Textarea
                    placeholder="Project Description"
                    value={newProj.description}
                    onChange={(e) =>
                      setNewProj({ ...newProj, description: e.target.value })
                    }
                    required
                  />
                  <Input
                    placeholder="Technologies (comma separated e.g. React, TypeScript)"
                    value={newProj.technologies}
                    onChange={(e) =>
                      setNewProj({ ...newProj, technologies: e.target.value })
                    }
                  />
                  <Input
                    placeholder="GitHub URL"
                    value={newProj.github}
                    onChange={(e) =>
                      setNewProj({ ...newProj, github: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Image URL (e.g. /images/topamine1.PNG)"
                    value={newProj.image}
                    onChange={(e) =>
                      setNewProj({ ...newProj, image: e.target.value })
                    }
                  />
                  <div className="flex gap-2 pt-2">
                    <Button type="submit" size="sm">
                      Save Project
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAdding(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            ) : (
              <div className="col-span-full flex justify-center pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAdding(true)}
                  className="text-muted-foreground hover:text-primary border-dashed hover:border-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Custom Project
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
