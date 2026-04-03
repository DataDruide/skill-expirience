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
    <section id="kontakt" className="section-spacing relative" aria-labelledby="kontakt-heading">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="container-strict relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-12 md:space-y-16"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
                05 / Kontakt
              </p>
              <h2 id="kontakt-heading" className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight">
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
          <nav className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-foreground/5" aria-label="Kontaktdaten">
            {[
              { icon: Mail, label: "Email", value: copied ? "Kopiert!" : "mzmann252@gmail.com", href: "mailto:mzmann252@gmail.com", onClick: handleCopy },
              { icon: Github, label: "GitHub", value: "DataDruide", href: "https://github.com/DataDruide" },
              { icon: Linkedin, label: "LinkedIn", value: "Marcel Zimmermann", href: "https://www.linkedin.com/in/marcel-zimmermann-bb8802211/" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick?.(); } : undefined}
                className="bg-background p-5 sm:p-6 hover:bg-secondary/40 transition-all duration-500 group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary mb-3 transition-colors duration-300" />
                  <ArrowUpRight className="h-3 w-3 text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-all duration-300" aria-hidden="true" />
                </div>
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-foreground group-hover:text-primary transition-colors duration-300 truncate">{item.value}</p>
              </a>
            ))}
          </nav>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="container-strict mt-16 md:mt-24 pt-6 md:pt-8 border-t border-subtle">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} Marcel Zimmermann
          </p>
          <p className="text-xs font-mono text-muted-foreground/50 uppercase tracking-widest">
            Built with React & TypeScript
          </p>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
