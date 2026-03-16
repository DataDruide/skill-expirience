import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", detail: "2 Production Apps" },
      { name: "Next.js", detail: "1 Production App" },
      { name: "TypeScript", detail: "Durchgängig eingesetzt" },
      { name: "Tailwind CSS", detail: "2 Production Apps" },
      { name: "Responsive Design", detail: "Mobile-First" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", detail: "2 Production Apps" },
      { name: "Express", detail: "REST API Architektur" },
      { name: "REST APIs", detail: "Vollständige CRUD" },
      { name: "GraphQL", detail: "Schema Design" },
      { name: "MongoDB", detail: "Production Datenbank" },
      { name: "PostgreSQL", detail: "Production Datenbank" },
    ],
  },
  {
    title: "DevOps & Specials",
    skills: [
      { name: "Deployment", detail: "CI/CD Pipelines" },
      { name: "SSL & Domains", detail: "Konfiguration" },
      { name: "Echtzeit-Features", detail: "WebSockets" },
      { name: "Payment-Integration", detail: "Stripe/PayPal" },
      { name: "KI-Matching", detail: "ASME-Algorithmus" },
      { name: "DSGVO-Compliance", detail: "Rechtssicher" },
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
            03 / Skills
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight">
            Kompetenz-Grid
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
