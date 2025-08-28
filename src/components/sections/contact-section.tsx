import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="section-container">
      <div className="glass-card p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold glow-text mb-4">Ready to Grow Your Brand?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have a project in mind or just want to learn more? We'd love to hear from you. Reach out and let's create something amazing together.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>contact@euroit.com</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>123 Marketing Lane, Digital City, CA</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-primary/10 p-8 rounded-lg border border-primary/20">
             <h3 className="text-2xl font-bold text-center text-white mb-4">Get a Free Consultation</h3>
              <p className="text-center text-muted-foreground mb-6">Let's discuss your marketing goals.</p>
              <a href="mailto:contact@euroit.com">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105">
                  Contact Us Now
                </Button>
              </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
