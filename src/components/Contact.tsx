import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const serviceID = "service_8epg7oa";
    const templateID = "template_7o1yej6";
    const publicKey = "JYC_YALgYX9zyD8Nc";

    emailjs
      .send(
        serviceID,
        templateID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        publicKey,
      )
      .then(
        () => {
          setIsSubmitting(false);
          toast({
            title: "Message Sent!",
            description:
              "Thank you for reaching out. I'll get back to you soon!",
          });
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          setIsSubmitting(false);
          toast({
            title: "Error",
            description: "Failed to send message. Please try again later.",
            variant: "destructive",
          });
          console.error("EmailJS Error:", error);
        },
      );
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "emanabdelrhman6272@gmail.com",
      href: "mailto:emanabdelrhman6272@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+2 01008427132",
      href: "tel:+201008427132",
    },
    { icon: MapPin, label: "Location", value: "Egypt, Cairo", href: null },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8 rounded-full" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach
              out!
            </p>
          </motion.div>

          {/* Stretched Grid to equalize bottom lines */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Left side: Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="h-full flex flex-col"
            >
              <Card className="bg-blue-50/75 dark:bg-card/90 backdrop-blur-sm border-blue-200/60 dark:border-border shadow-sm hover:border-primary/50 transition-all h-full flex flex-col justify-between">
                <CardContent className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between gap-5">
                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-1.5"
                        >
                          Name
                        </label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="bg-white/80 dark:bg-background border-blue-200/70 dark:border-border focus-visible:ring-primary"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium mb-1.5"
                        >
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="bg-white/80 dark:bg-background border-blue-200/70 dark:border-border focus-visible:ring-primary"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium mb-1.5"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          placeholder="Tell me about your project or message..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="bg-white/80 dark:bg-background border-blue-200/70 dark:border-border focus-visible:ring-primary resize-none min-h-[110px]"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full mt-2"
                      disabled={isSubmitting}
                    >
                      <Send
                        className={`w-4 h-4 mr-2 ${isSubmitting ? "animate-spin" : ""}`}
                      />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right side: Contact Info + Let's Connect */}
            <div className="flex flex-col justify-between h-full gap-4">
              <div className="space-y-3.5">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: index * 0.12 }}
                    whileHover={{ y: -3 }}
                  >
                    <Card className="bg-blue-50/75 dark:bg-card/90 backdrop-blur-sm border-blue-200/60 dark:border-border hover:border-primary/50 transition-all duration-300">
                      <CardContent className="p-4 md:p-5">
                        {info.href ? (
                          <a
                            href={info.href}
                            className="flex items-start gap-4 group"
                            target={
                              info.href.startsWith("http") ? "_blank" : undefined
                            }
                            rel={
                              info.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            <div className="p-2.5 bg-primary/10 rounded-lg group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                              <info.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-0.5">
                                {info.label}
                              </p>
                              <p className="text-sm md:text-base font-medium group-hover:text-primary transition-colors">
                                {info.value}
                              </p>
                            </div>
                          </a>
                        ) : (
                          <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-primary/10 rounded-lg">
                              <info.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-0.5">
                                {info.label}
                              </p>
                              <p className="text-sm md:text-base font-medium">{info.value}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Bottom card aligned perfectly with the form bottom */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="mt-auto"
              >
                <Card className="bg-blue-50/75 dark:bg-card/90 backdrop-blur-sm border-blue-200/60 dark:border-border hover:border-primary/40 transition-colors">
                  <CardContent className="p-5 md:p-6">
                    <h3 className="font-semibold mb-2">Let's Connect</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      I'm always open to discussing new projects, creative
                      ideas, or opportunities to be part of your vision.
                    </p>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="hover:border-primary"
                      >
                        <a
                          href="https://github.com/emanabdelrhman6272"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="hover:border-primary"
                      >
                        <a
                          href="https://www.linkedin.com/in/eman-soliman-a97966341/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B%2FjVF7Yf%2FR468IF7cfiypZA%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
