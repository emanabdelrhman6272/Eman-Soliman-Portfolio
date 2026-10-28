// import { useState } from "react";
// import { Mail, MapPin, Phone, Send } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent } from "@/components/ui/card";
// import { useToast } from "@/hooks/use-toast";
// import emailjs from "emailjs-com";

// const Contact = () => {
//   const { toast } = useToast();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Simple validation
//     if (!formData.name || !formData.email || !formData.message) {
//       toast({
//         title: "Error",
//         description: "Please fill in all fields",
//         variant: "destructive",
//       });
//       return;
//     }

//     const serviceID="service_60slu5v";
//     const templateID="template_7o1yej6";
//     const publicKey ="JYC_YALgYX9zyD8Nc";

//     // Here you would typically send the form data to a backend
//     toast({
//       title: "Message Sent!",
//       description: "Thank you for reaching out. I'll get back to you soon!",
//     });

//     // Reset form
//     setFormData({ name: "", email: "", message: "" });
//   };

//   const contactInfo = [
//     {
//       icon: Mail,
//       label: "Email",
//       value: "emanabdelrhman6272@gmail.com",
//       href: "emanabdelrhman6272@gmail.com",
//     },
//     {
//       icon: Phone,
//       label: "Phone",
//       value: "+2 01008427132",
//       href: "tel:+201008427132",
//     },
//     {
//       icon: MapPin,
//       label: "Location",
//       value: "Egypt, Cairo",
//       href: null,
//     },
//   ];

//   return (
//     <section id="contact" className="py-20 md:py-32 relative">
//       <div className="container mx-auto px-4">
//         <div className="max-w-5xl mx-auto">
//           <div className="text-center mb-16 animate-fade-in">
//             <h2 className="mb-4">
//               Get In <span className="gradient-text">Touch</span>
//             </h2>
//             <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
//             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//               Have a project in mind or want to collaborate? Feel free to reach out!
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Contact Form */}
//             <Card className="bg-card border-border animate-fade-in">
//               <CardContent className="p-6 md:p-8">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium mb-2">
//                       Name
//                     </label>
//                     <Input
//                       id="name"
//                       placeholder="Your name"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       className="bg-background border-border"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium mb-2">
//                       Email
//                     </label>
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="your.email@example.com"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       className="bg-background border-border"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="message" className="block text-sm font-medium mb-2">
//                       Message
//                     </label>
//                     <Textarea
//                       id="message"
//                       placeholder="Tell me about your project..."
//                       rows={5}
//                       value={formData.message}
//                       onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                       className="bg-background border-border resize-none"
//                     />
//                   </div>
//                   <Button type="submit" variant="hero" size="lg" className="w-full">
//                     <Send className="w-4 h-4 mr-2" />
//                     Send Message
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>

//             {/* Contact Info */}
//             <div className="space-y-6">
//               {contactInfo.map((info, index) => (
//                 <Card
//                   key={index}
//                   className="bg-card border-border hover:border-primary/50 transition-all duration-300 animate-fade-in"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <CardContent className="p-6">
//                     {info.href ? (
//                       <a
//                         href={info.href}
//                         className="flex items-start gap-4 group"
//                         target={info.href.startsWith("http") ? "_blank" : undefined}
//                         rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
//                       >
//                         <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
//                           <info.icon className="w-6 h-6 text-primary" />
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
//                           <p className="font-medium group-hover:text-primary transition-colors">
//                             {info.value}
//                           </p>
//                         </div>
//                       </a>
//                     ) : (
//                       <div className="flex items-start gap-4">
//                         <div className="p-3 bg-primary/10 rounded-lg">
//                           <info.icon className="w-6 h-6 text-primary" />
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
//                           <p className="font-medium">{info.value}</p>
//                         </div>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               ))}

//               <Card className="bg-card border-border animate-fade-in" style={{ animationDelay: "0.3s" }}>
//                 <CardContent className="p-6">
//                   <h3 className="font-semibold mb-4">Let's Connect</h3>
//                   <p className="text-sm text-muted-foreground mb-4">
//                     I'm always interested in hearing about new projects and opportunities. Whether
//                     you have a question or just want to say hi, I'll try my best to get back to you!
//                   </p>
//                   <div className="flex gap-3">
//                     <Button variant="outline" size="sm" asChild>
//                       <a
//                         href="https://github.com/emanabdelrhman6272"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         GitHub
//                       </a>
//                     </Button>
//                     <Button variant="outline" size="sm" asChild>
//                       <a
//                         href="https://www.linkedin.com/in/eman-soliman-a97966341/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B%2FjVF7Yf%2FR468IF7cfiypZA%3D%3D"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         LinkedIn
//                       </a>
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Contact;




import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import emailjs from "emailjs-com";

const Contact = () => {
  const { toast } = useToast();
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

    const serviceID = "service_60slu5v";
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
        publicKey
      )
      .then(
        (response) => {
          toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. I'll get back to you soon!",
          });
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          toast({
            title: "Error",
            description: "Failed to send message. Please try again later.",
            variant: "destructive",
          });
          console.error("EmailJS Error:", error);
        }
      );
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "emanabdelrhman6272@gmail.com", href: "mailto:emanabdelrhman6272@gmail.com" },
    { icon: Phone, label: "Phone", value: "+2 01008427132", href: "tel:+201008427132" },
    { icon: MapPin, label: "Location", value: "Egypt, Cairo", href: null },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="mb-4">Get In <span className="gradient-text">Touch</span></h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-8" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="bg-card border-border animate-fade-in">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-background border-border resize-none"
                    />
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    {info.href ? (
                      <a href={info.href} className="flex items-start gap-4 group" target={info.href.startsWith("http") ? "_blank" : undefined} rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}>
                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                          <p className="font-medium group-hover:text-primary transition-colors">{info.value}</p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                          <p className="font-medium">{info.value}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-card border-border animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Let's Connect</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    I'm always interested in hearing about new projects and opportunities. Whether
                    you have a question or just want to say hi, I'll try my best to get back to you!
                  </p>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://github.com/emanabdelrhman6272" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href="https://www.linkedin.com/in/eman-soliman-a97966341/overlay/about-this-profile/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B%2FjVF7Yf%2FR468IF7cfiypZA%3D%3D" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

