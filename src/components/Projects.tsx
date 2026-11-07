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
    title: "Topamine(E-LearningPlatform)",
    image: "/images/topamine1.PNG",
    description:
      "Developed a full-featured learning platform with CRUD operations and role-based authentication using React, Firebase, and json-server-auth. Implemented secure dashboards for students, teachers, and admins, with teacher approval workflow, Paymob payment integration, real-time notifications, messaging, and comprehensive admin tools for user and course management",
    technologies: [
      "typescript",
      "Figma",
      "Firebase cloud Firestore",
      "React",
      "MUI",
    ],
    github: "https://github.com/JohnIhab/Topamine-E_Learning-Platform",
  },
  {
    title: "Meta Child",
    image: "/images/metachild1.PNG",
    description:
      "Social Media Platform for Children Developed a Facebook-like web application tailored for children using React, Material-UI(MUI), and JSON ServerAuth.",
    technologies: ["react", "MUI", "Javascript"],
    github: "https://github.com/emanabdelrhman6272/reactFinallProject",
  },
  {
    title: "Weather App",
    image: "/images/weatherapp1.PNG",
    description:
      "Weather App I developed a responsive Weather App. The application fetches real-time weather data through a public API provided by https://openweathermap.org/api.",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/emanabdelrhman6272/Weather-App",
  },
];

const Projects = () => {
  const [projectList, setProjectList] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem("eman_portfolio_projects");
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
        "eman_portfolio_projects",
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
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A selection of my recent work and personal projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectList.map((project, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 group animate-fade-in flex flex-col justify-between"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div>
                  <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(index)}
                        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-lg mt-3"
                      />
                    )}
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="flex gap-3 pt-4">
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button
                      variant="default"
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
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
                    rows={3}
                    value={newProj.description}
                    onChange={(e) =>
                      setNewProj({ ...newProj, description: e.target.value })
                    }
                    required
                  />
                  <Input
                    placeholder="Technologies (e.g. React, Tailwind)"
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
                    placeholder="Image path (/images/...)"
                    value={newProj.image}
                    onChange={(e) =>
                      setNewProj({ ...newProj, image: e.target.value })
                    }
                  />
                  <div className="flex gap-2 justify-end pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAdding(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" size="sm">
                      Save
                    </Button>
                  </div>
                </form>
              </Card>
            ) : (
              <Card
                onClick={() => setIsAdding(true)}
                className="bg-card/40 border-dashed border-2 border-border hover:border-primary transition-all duration-300 min-h-[350px] flex flex-col items-center justify-center cursor-pointer group"
              >
                <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all mb-4">
                  <Plus className="w-8 h-8 text-primary" />
                </div>
                <p className="font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                  Add New Project
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
