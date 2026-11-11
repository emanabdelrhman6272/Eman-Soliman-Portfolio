import { useState, useEffect } from "react";
import {
  ExternalLink,
  Github,
  Plus,
  Trash2,
  Pencil,
  Upload,
  X,
  Loader2,
} from "lucide-react";
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
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

interface Project {
  id?: string;
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

const emptyFormData = {
  title: "",
  description: "",
  technologies: "",
  github: "",
  demo: "",
  image: "",
};

const Projects = () => {
  const { isAdmin } = useAuth(); // admin or not

  const [projectList, setProjectList] = useState<Project[]>(initialProjects);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyFormData);

  // image
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // project from firestore
  useEffect(() => {
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const list = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            })) as Project[];
            setProjectList(list);
          } else {
            setProjectList(initialProjects);
          }
        },
        (error) => {
          console.error("Firestore read error:", error);
          setProjectList(initialProjects);
        },
      );

      return () => unsubscribe();
    } catch (e) {
      console.error(e);
      setProjectList(initialProjects);
    }
  }, []);

  // 2. image from my labtop to preview in the form before uploading to Cloudinary
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Please upload an image smaller than 5MB.");
      return;
    }

    setSelectedFile(file);
    setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  // 3. upload image to Cloudinary and return the secure URL
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dv9pyarju";
    const preset =
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ||
      "Eman-Soliman-Portfolio-preset";

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      },
    );

    if (!res.ok) {
      throw new Error("Failed to upload image to Cloudinary");
    }

    const fileData = await res.json();
    return fileData.secure_url;
  };

  // 4. Editing
  const handleStartEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      github: project.github || "",
      demo: project.demo || "",
      image: project.image || "",
    });
    setEditingDocId(project.id || null);
    setSelectedFile(null);
    setIsFormOpen(true);
  };

  // 5. Adding new project
  const handleStartAdd = () => {
    setFormData(emptyFormData);
    setEditingDocId(null);
    setSelectedFile(null);
    setIsFormOpen(true);
  };

  const handleCancel = () => {
    setFormData(emptyFormData);
    setEditingDocId(null);
    setSelectedFile(null);
    setIsFormOpen(false);
  };

  // 6. saving in Firestore
  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      alert("Unauthorized! Only Eman can perform this action.");
      return;
    }

    if (!formData.title.trim() || !formData.description.trim()) return;

    setIsSubmitting(true);

    try {
      let finalImageUrl = formData.image;

      if (selectedFile) {
        finalImageUrl = await uploadToCloudinary(selectedFile);
      }

      const techArray = formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const projectData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        technologies: techArray.length > 0 ? techArray : ["React"],
        github: formData.github.trim() || "https://github.com",
        demo: formData.demo.trim() || "",
        image: finalImageUrl || "/images/weatherapp1.PNG",
        updatedAt: serverTimestamp(),
      };

      if (editingDocId) {
        await updateDoc(doc(db, "projects", editingDocId), projectData);
      } else {
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: serverTimestamp(),
        });
      }

      handleCancel();
    } catch (err) {
      console.error("Error saving project:", err);
      alert(
        "An error occurred while saving the project. Please check the console.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // 7. Delete project from Firestore
  const handleDeleteProject = async (project: Project) => {
    if (!isAdmin) return;

    if (
      window.confirm(
        `Are you sure you want to permanently delete "${project.title}"?`,
      )
    ) {
      try {
        if (project.id) {
          await deleteDoc(doc(db, "projects", project.id));
        } else {
          // Fallback for initial projects
          setProjectList((prev) =>
            prev.filter((p) => p.title !== project.title),
          );
        }
      } catch (err) {
        console.error("Error deleting project:", err);
        alert("Could not delete project from database.");
      }
    }
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
              A selection of my recent work, university graduation project, and
              ITI applications
            </p>
          </motion.div>

          {/* Add New Project: visible to Admin only */}
          {isAdmin && !isFormOpen && (
            <div className="flex justify-center mb-12">
              <Button
                onClick={handleStartAdd}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-all hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Add New Project (Admin)
              </Button>
            </div>
          )}

          {/* Add or Edit Project Form */}
          {isAdmin && isFormOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-12"
            >
              <Card className="bg-card/95 backdrop-blur-md border border-primary/50 p-6 md:p-8 shadow-2xl max-w-2xl mx-auto rounded-2xl">
                <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                  <div>
                    <h3 className="font-bold text-xl gradient-text">
                      {editingDocId ? "Edit Project" : "Add New Project"}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Fill in the details. Images will be automatically uploaded
                      to Cloudinary.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCancel}
                    className="rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <form onSubmit={handleSubmitProject} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
                      Project Title
                    </label>
                    <Input
                      placeholder="e.g. Meta Child or Weather App"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
                      Description
                    </label>
                    <Textarea
                      placeholder="Describe the application features and stack..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
                      Technologies (comma separated)
                    </label>
                    <Input
                      placeholder="React, TypeScript, Firebase, Tailwind CSS"
                      value={formData.technologies}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          technologies: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
                        GitHub Link
                      </label>
                      <Input
                        placeholder="https://github.com/..."
                        value={formData.github}
                        onChange={(e) =>
                          setFormData({ ...formData, github: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
                        Live Demo Link (Optional)
                      </label>
                      <Input
                        placeholder="https://my-app.vercel.app"
                        value={formData.demo}
                        onChange={(e) =>
                          setFormData({ ...formData, demo: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  {/* Cloudinary Image Upload */}
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
                      Project Image (Upload to Cloud)
                    </label>

                    {formData.image ? (
                      <div className="relative group rounded-xl overflow-hidden border border-border">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-44 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <label
                            htmlFor="cloud-img-file"
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium cursor-pointer hover:bg-primary/90 transition-all shadow-md"
                          >
                            <Upload className="w-4 h-4" />
                            Change Image
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, image: "" });
                              setSelectedFile(null);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-destructive text-destructive-foreground rounded-lg text-xs font-medium hover:bg-destructive/90 transition-all shadow-md"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label
                        htmlFor="cloud-img-file"
                        className="flex flex-col items-center justify-center gap-2.5 p-6 rounded-xl border-2 border-dashed border-border hover:border-primary bg-muted/20 hover:bg-muted/40 cursor-pointer transition-all text-center"
                      >
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-foreground">
                            Upload from Computer to Cloudinary
                          </span>
                          <p className="text-xs text-muted-foreground mt-1">
                            PNG, JPG or WebP (Cloud Hosted)
                          </p>
                        </div>
                      </label>
                    )}

                    <input
                      type="file"
                      id="cloud-img-file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-border">
                    <Button
                      type="submit"
                      className="flex-1 font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Uploading & Saving...
                        </>
                      ) : editingDocId ? (
                        "Save Project Changes"
                      ) : (
                        "Add Project to Portfolio"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleCancel}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectList.map((project, index) => (
              <motion.div
                key={project.id || index}
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
                        <h3
                          className="text-base md:text-lg font-bold group-hover:text-primary transition-colors line-clamp-1"
                          title={project.title}
                        >
                          {project.title}
                        </h3>

                        {/* Edit and Delete Actions: Admin only */}
                        {isAdmin && (
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => handleStartEdit(project)}
                              className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/10"
                              title="Edit Project"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteProject(project)}
                              className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10"
                              title="Delete Project"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
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
                        {project.technologies
                          .slice(0, 4)
                          .map((tech, techIndex) => (
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
