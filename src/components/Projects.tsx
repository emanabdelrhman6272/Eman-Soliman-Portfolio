import { ExternalLink, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Description } from "@radix-ui/react-toast";

const Projects = () => {
  const projects = [
    // {
    //   title: "E-Commerce Platform",
    //   description:
    //     "A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard. Built with React and modern best practices.",
    //   technologies: ["React", "Redux", "Tailwind CSS", "REST API"],
    //   github: "https://github.com",
    //   demo: "https://example.com",
    // },
    // {
    //   title: "Task Management App",
    //   description:
    //     "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    //   technologies: ["React", "TypeScript", "CSS3", "Firebase"],
    //   github: "https://github.com",
    //   demo: "https://example.com",
    // },
    // {
    //   title: "Weather Dashboard",
    //   description:
    //     "Beautiful weather application showing real-time weather data, forecasts, and interactive maps using external APIs.",
    //   technologies: ["React", "JavaScript", "HTML5", "OpenWeather API"],
    //   github: "https://github.com",
    //   demo: "https://example.com",
    // },
    // {
    //   title: "Portfolio Website",
    //   description:
    //     "Modern portfolio website with smooth animations, responsive design, and optimized performance for showcasing projects.",
    //   technologies: ["React", "CSS3", "JavaScript", "Vite"],
    //   github: "https://github.com",
    //   demo: "https://example.com",
    // },
    // {
    //   title: "Social Media Dashboard",
    //   description:
    //     "Analytics dashboard for tracking social media metrics with interactive charts and data visualization components.",
    //   technologies: ["React", "Chart.js", "Tailwind CSS", "REST API"],
    //   github: "https://github.com",
    //   demo: "https://example.com",
    // },
    // {
    //   title: "Recipe Finder App",
    //   description:
    //     "Search and discover recipes from around the world with filtering, favorites, and detailed cooking instructions.",
    //   technologies: ["React", "JavaScript", "HTML5", "Recipe API"],
    //   github: "https://github.com",
    //   demo: "https://example.com",
    // },
    {
      title: "Topamine(E-LearningPlatform)",
      image: "/images/topamine1.PNG",
      description:
        "Developed a full-featured learning platform with CRUD operations and role-based authentication using React, Firebase, and json-server-auth.Implemented secure dashboards for students, teachers, and admins, with teacher approval workflow, Paymob payment integration, real-time notifications, messaging, and comprehensive admin tools for user and course management",
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
        " Social Media Platformfor Children Developed a Facebook-like web application tailored for childrenusing React,Material-UI(MUI),and JSON ServerAuth.",
      technologies: ["react", "MUI", "Javascript"],
      github: "https://github.com/emanabdelrhman6272/reactFinallProject",
    },
    {
      title: "Weather App",
      image: "/images/weatherapp1.PNG",
      description:
        "Weather App I developed a responsive Weather App . The application fetches real-time weather data through a public API provided by https://openweathermap.org/api.",
      technologies: ["HTML", "CSS", " JavaScript"],
      github: "https://github.com/emanabdelrhman6272/Weather-App",
    },
  ];

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
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  {/* <Card>{project.image}</Card> */}
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
                <CardFooter className="flex gap-3">
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
                  <Button
                    variant="default"
                    size="sm"
                    asChild
                    className="flex-1"
                  >
                    {/* <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a> */}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
