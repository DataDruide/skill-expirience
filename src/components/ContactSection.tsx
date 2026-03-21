import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("mzmann252@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="kontakt" className="section-spacing relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />

      <div className="container-strict relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-16"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
                05 / Kontakt
              </p>
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight">
                Projekt starten
              </h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Du hast eine Idee oder ein konkretes Projekt? Schreib mir direkt — ich melde mich innerhalb von 24 Stunden.
            </p>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl">
            <ContactForm />
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-foreground/5">
            {[
              { icon: Mail, label: "Email", value: "mzmann252@gmail.com", href: "mailto:mzmann252@gmail.com", onClick: handleCopy },
              { icon: Github, label: "GitHub", value: "DataDruide", href: "https://github.com/DataDruide" },
              { icon: Linkedin, label: "LinkedIn", value: "Marcel Zimmermann", href: "https://www.linkedin.com/in/marcel-zimmermann-bb8802211/" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background p-6 hover:bg-secondary/40 transition-all duration-300 group relative"
              >
                <div className="flex items-start justify-between">
                  <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary mb-3 transition-colors duration-300" />
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-all duration-300" />
                </div>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-foreground group-hover:text-primary transition-colors duration-300">{item.value}</p>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="container-strict mt-24 pt-8 border-t border-subtle">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} Marcel Zimmermann
          </p>
          <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">
            Built with React & TypeScript
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
