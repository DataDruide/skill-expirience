import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend & Mobile",
    accent: "commercial" as const,
    skills: [
      { name: "React", detail: "Mehrere Production Apps" },
      { name: "Flutter", detail: "Cross-Platform & Dozent" },
      { name: "SwiftUI / iOS", detail: "CarPlay, BLE-Integration" },
      { name: "TypeScript", detail: "Durchgängig eingesetzt" },
      { name: "Tailwind CSS", detail: "UI-Systeme & Design Tokens" },
      { name: "Next.js", detail: "SSR & Static Sites" },
    ],
  },
  {
    title: "Backend & Daten",
    accent: "impact" as const,
    skills: [
      { name: "Node.js", detail: "REST & Realtime APIs" },
      { name: "NestJS", detail: "Enterprise-Architektur" },
      { name: "PostgreSQL", detail: "Production Datenbanken" },
      { name: "MariaDB / MongoDB", detail: "Flexibles Daten-Modeling" },
      { name: "Supabase", detail: "Auth, Storage, Realtime" },
      { name: "REST & GraphQL", detail: "API-Design & Dokumentation" },
    ],
  },
  {
    title: "Tools & Methodik",
    accent: "commercial" as const,
    skills: [
      { name: "Figma", detail: "UX/UI Design & Prototyping" },
      { name: "Git & CI/CD", detail: "Deployment Pipelines" },
      { name: "MVVM / Clean Arch", detail: "Skalierbare Strukturen" },
      { name: "Bluetooth (BLE)", detail: "Hardware-Integration" },
      { name: "DSGVO-Compliance", detail: "Datenschutz-konform" },
      { name: "Didaktik", detail: "Dozent & Wissensvermittlung" },
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-spacing" aria-labelledby="skills-heading">
      <div className="container-strict">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
              04 / Skills
            </p>
            <h2 id="skills-heading" className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight">
              Tech Stack
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Technologien, die ich täglich einsetze – von Frontend bis Embedded.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/5">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-background p-6 md:p-8 space-y-6 group hover:bg-secondary/20 transition-all duration-500"
            >
              <div className="flex items-center gap-3">
                <div className={`w-1 h-6 shrink-0 ${cat.accent === "commercial" ? "bg-accent-commercial" : "bg-accent-impact"}`} aria-hidden="true" />
                <h3 className="font-display font-black text-lg uppercase tracking-wider text-foreground">
                  {cat.title}
                </h3>
              </div>
              <div className="space-y-0">
                {cat.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.1 + si * 0.05 }}
                    className="group/skill flex items-baseline justify-between py-3 border-b border-subtle hover:border-foreground/20 transition-all duration-300 cursor-default gap-4"
                  >
                    <span className="text-sm text-foreground font-medium group-hover/skill:translate-x-1 transition-transform duration-300">
                      {skill.name}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground group-hover/skill:text-foreground transition-colors duration-300 text-right shrink-0">
                      {skill.detail}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
