import { motion } from "framer-motion";
import { Briefcase, Quote, ArrowUpRight } from "lucide-react";

const milestones = [
  {
    period: "2025",
    role: "Freelance Frontend Developer",
    company: "User-Aid UG",
    detail: "Komplette Frontend-Entwicklung der Unternehmenswebsite – termingerecht, budgetkonform, uneingeschränkt empfohlen.",
    accent: "commercial" as const,
  },
  {
    period: "2025",
    role: "Flutter Dozent",
    company: "Lehrauftrag",
    detail: "Didaktische Vermittlung von plattformübergreifender App-Entwicklung mit Flutter & Dart.",
    accent: "impact" as const,
  },
  {
    period: "2024",
    role: "Junior Fullstack Developer",
    company: "BlueBranch GmbH",
    detail: "Mobile Apps mit SwiftUI & Flutter, BLE-Integration, CarPlay-Funktionen. Arbeitszeugnis: ‚stets vorbildlich, hervorragende Problemlösungsfähigkeit'.",
    accent: "commercial" as const,
  },
  {
    period: "2022–2023",
    role: "Mobile Developer Ausbildung",
    company: "Syntax Institut / IHK",
    detail: "App-Entwicklung iOS & Android, UX/UI mit Figma, Kotlin, Swift, MVVM-Architekturen.",
    accent: "impact" as const,
  },
];

const testimonials = [
  {
    quote: "Herr Zimmermann arbeitet außerordentlich strukturiert, schnell und gezielt. Wir können ihn uneingeschränkt empfehlen.",
    author: "Robin Yildirim",
    role: "Geschäftsführer, User-Aid UG",
  },
  {
    quote: "Tiefes Verständnis für moderne Frontend-Technologien, hohe Lernbereitschaft und schnelle Auffassungsgabe. Sein Engagement war stets außerordentlich.",
    author: "Florian Kelm",
    role: "Gesellschafter, BlueBranch GmbH",
  },
];

const AboutSection = () => {
  return (
    <section id="ueber" className="section-spacing">
      <div className="container-strict">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
              01 / Über mich
            </p>
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight">
              Werdegang
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Von der Ausbildung zum Fullstack Developer – mit Stationen bei Startups, als Dozent und Freelancer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5 mb-16">
          {milestones.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`bg-background p-6 md:p-8 space-y-3 group hover:bg-secondary/30 transition-all duration-300 border-l-2 ${
                m.accent === "commercial" ? "border-l-transparent hover:border-accent-commercial" : "border-l-transparent hover:border-accent-impact"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 flex items-center justify-center ${
                    m.accent === "commercial" ? "bg-accent-commercial/10" : "bg-accent-impact/10"
                  }`}>
                    <Briefcase className={`h-3.5 w-3.5 ${
                      m.accent === "commercial" ? "text-accent-commercial" : "text-accent-impact"
                    }`} />
                  </div>
                  <span className={`text-xs font-mono uppercase tracking-widest ${
                    m.accent === "commercial" ? "text-accent-commercial" : "text-accent-impact"
                  }`}>
                    {m.period}
                  </span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">
                {m.role}
              </h3>
              <p className="text-sm font-mono text-muted-foreground">{m.company}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Referenzen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative border-l-4 border-accent-commercial p-6 bg-secondary/20 hover:bg-secondary/30 transition-colors duration-300 group"
            >
              <Quote className="h-8 w-8 text-accent-commercial/10 absolute top-4 right-4" />
              <p className="text-sm italic text-foreground/90 leading-relaxed mb-4 relative z-10">
                „{t.quote}"
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-8 h-px bg-accent-commercial/50" />
                <div>
                  <p className="text-sm font-display font-bold text-foreground">{t.author}</p>
                  <p className="text-xs font-mono text-muted-foreground">{t.role}</p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
