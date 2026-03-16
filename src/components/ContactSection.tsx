import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Mail, Github, Linkedin, Zap } from "lucide-react";

const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("deine@email.de");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="kontakt" className="section-spacing">
      <div className="container-strict">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
              05 / Kontakt
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight">
              Boss-Call
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/5">
            {[
              { icon: Mail, label: "Email", value: "deine@email.de", href: "mailto:deine@email.de" },
              { icon: Github, label: "GitHub", value: "dein-github", href: "https://github.com" },
              { icon: Linkedin, label: "LinkedIn", value: "dein-linkedin", href: "https://linkedin.com" },
              { icon: Zap, label: "Schnellkontakt", value: "WhatsApp", href: "#" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-background p-6 hover:bg-secondary/40 transition-colors group"
              >
                <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary mb-3 transition-colors" />
                <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-foreground">{item.value}</p>
              </a>
            ))}
          </div>

          <Button
            variant="bossCall"
            size="xl"
            onClick={handleCopy}
            className={copied ? "bg-accent-impact" : ""}
          >
            {copied ? "Kopiert! ✓" : "Email kopieren"}
          </Button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="container-strict mt-24 pt-8 border-t border-subtle">
        <p className="text-xs font-mono text-muted-foreground text-center uppercase tracking-widest">
          Built with React & Heavyweight Logic
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
