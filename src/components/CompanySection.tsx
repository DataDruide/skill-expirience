import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, ArrowRight, Building2, Rocket, Cpu, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Rocket,
    text: "Fullstack-Entwicklung mit React, Flutter, Swift & Node.js",
  },
  {
    icon: Cpu,
    text: "KI-gestützte Enterprise-Intelligence & Automatisierung",
  },
  {
    icon: Building2,
    text: "Mobile Apps, Cloud-Infrastruktur & IoT-Integration",
  },
  {
    icon: Users,
    text: "Von der Idee bis zum Live-Betrieb – inkl. Team & Delivery",
  },
];

const CompanySection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("zimmermann_digital_solutions@proton.me");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="firma"
      className="section-spacing relative overflow-hidden"
      aria-labelledby="firma-heading"
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-accent-commercial/5 via-transparent to-accent-impact/5 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-1/2 -right-1/4 w-[60vw] h-[60vw] rounded-full bg-accent-commercial/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-strict relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
              05 / Firma
            </p>
            <h2
              id="firma-heading"
              className="font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight"
            >
              Zimmermann Digital Solutions
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Meine eigene Software-Entwicklungsfirma – gegründet 07/2026. Fokus auf
            B2B-SaaS, Mobile Apps und KI-gestützte Enterprise-Lösungen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left: About the company */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 md:space-y-8"
          >
            <p className="text-lg md:text-xl font-display font-bold text-foreground uppercase tracking-wide leading-tight">
              B2B-SaaS, Mobile Apps & KI-Enterprise-Lösungen
            </p>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Seit dem 1. Juli 2026 führe ich als CEO & Gründer die Zimmermann
              Digital Solutions. Wir entwickeln skalierbare Software für
              Unternehmen – von schnellen MVPs bis zu production-ready
              Enterprise-Systemen. Ohne Overhead, ohne Umwege: Strategie,
              Architektur, Entwicklung und Delivery aus einer Hand.
            </p>

            <ul className="space-y-3" role="list">
              {services.map((s, i) => (
                <motion.li
                  key={s.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-3 text-sm md:text-base text-muted-foreground group"
                >
                  <span
                    className="mt-0.5 shrink-0 w-7 h-7 flex items-center justify-center bg-accent-commercial/10 text-accent-commercial"
                    aria-hidden="true"
                  >
                    <s.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="group-hover:text-foreground transition-colors duration-300">
                    {s.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Contact card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative border-l-4 border-accent-commercial bg-secondary/20 hover:bg-secondary/30 transition-all duration-500 group overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-gradient-to-br from-accent-commercial/10 via-transparent to-accent-impact/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-commercial flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      Geschäftliche Anfragen
                    </p>
                    <p className="font-display font-bold text-foreground uppercase tracking-wide">
                      Direkt an die Firma
                    </p>
                  </div>
                </div>

                <a
                  href="mailto:zimmermann_digital_solutions@proton.me"
                  className="block font-mono text-lg md:text-2xl lg:text-3xl text-foreground break-all hover:text-accent-commercial transition-colors duration-300"
                >
                  zimmermann_digital_solutions@proton.me
                </a>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ob neues SaaS-Produkt, App-Relaunch oder KI-Integration –
                  schreib mir direkt. Ich melde mich innerhalb von 24 Stunden.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleCopy}
                  className="w-full group/btn"
                >
                  {copied ? "Kopiert!" : "E-Mail kopieren"}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
                <p className="text-xs font-mono text-center text-muted-foreground/70 uppercase tracking-widest">
                  Oder einfach auf die E-Mail klicken
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
