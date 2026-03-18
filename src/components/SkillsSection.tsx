import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend & Mobile",
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
    <section id="skills" className="section-spacing">
      <div className="container-strict">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
            04 / Skills
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight">
            Tech Stack
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-foreground/5">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-background p-6 md:p-8 space-y-6"
            >
              <h3 className="font-display font-black text-lg uppercase tracking-wider text-foreground">
                {cat.title}
              </h3>
              <div className="space-y-3">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group flex items-baseline justify-between border-b border-subtle pb-2 hover:border-primary/50 transition-colors cursor-default"
                  >
                    <span className="text-sm text-foreground font-medium">{skill.name}</span>
                    <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill.detail}
                    </span>
                  </div>
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
