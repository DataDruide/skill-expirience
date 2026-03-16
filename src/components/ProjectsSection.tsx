import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import profilePhoto from "@/assets/profile-photo.png";
import spaetimobilImg from "@/assets/spaetimobil-screenshot.png";
import pflegefondImg from "@/assets/pflegefond-screenshot.png";

type Project = Tables<"projects">;

// Fallback projects (shown when DB is empty)
const fallbackProjects: Partial<Project>[] = [
  {
    id: "spaetimobil",
    title: "Spätimobil",
    subtitle: "Der mobile Späti – 24/7 Lieferservice",
    description: "Einen 24/7-Lieferservice für Nachtschwärmer und Schichtarbeiter gebaut, der in 15-30 Minuten liefert. Vollständige E-Commerce-Funktionalität mit Echtzeit-Bestellungen, automatischem Öffnungszeiten-System und Stempelkarten-Treueprogramm.",
    features: ["Vollständige E-Commerce-Funktionalität mit Echtzeit-Bestellungen", "Automatisches Öffnungszeiten-System (Fr–So + Feiertage 22–5 Uhr)", "Integriertes Stempelkarten-Treueprogramm", "Standortbasierte Lieferkreis-Berechnung (25km Umkreis)"],
    tech_stack: ["React", "Node.js", "Express", "MongoDB", "Google Maps API"],
    live_url: "https://spaetimobil.com",
    accent_color: "yellow",
    testimonial_quote: "Er hat unseren Späti-Lieferservice von 0 auf 100 gebracht – heute liefern wir jede Nacht an Fabriken und Haushalte.",
    testimonial_author: "Gründer, Spätimobil",
  },
  {
    id: "pflegefond",
    title: "Pflegefond Deutschland",
    subtitle: "Social Impact Plattform",
    description: "Eine transparente, schnelle Hilfsplattform für pflegende Angehörige – ohne Banken-Bürokratie. Komplettes Antrags-System mit Live-Tracking, ASME-Algorithmus und Echtzeit-Statistiken.",
    features: ["Komplettes Antrags-System mit Live-Tracking", "ASME-Algorithmus (Automatisiertes Social Matching & Evaluation)", "Echtzeit-Statistiken-Dashboard", "Blockchain-Transparenz-Modul für Spenden"],
    tech_stack: ["Next.js", "TypeScript", "PostgreSQL", "Blockchain API", "Chart.js"],
    live_url: "https://pflegefond-deutschland.org",
    accent_color: "green",
    testimonial_quote: "Die Plattform für pflegende Angehörige ist nicht nur technisch brilliant, sie hilft wirklich Menschen. In Rekordzeit gebaut.",
    testimonial_author: "Team Pflegefond",
  },
];

const fallbackImages: Record<string, string> = {
  spaetimobil: spaetimobilImg,
  pflegefond: pflegefondImg,
};

const useCounter = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return { count, ref };
};

const ProjectCard = ({ project, index }: { project: Partial<Project>; index: number }) => {
  const isYellow = project.accent_color === "yellow";
  const accentBorder = isYellow ? "border-accent-commercial" : "border-accent-impact";
  const accentText = isYellow ? "text-accent-commercial" : "text-accent-impact";
  const techTag = isYellow
    ? "inline-block bg-accent-commercial text-primary-foreground px-2 py-0.5 text-xs font-bold font-mono uppercase"
    : "inline-block bg-accent-impact text-primary-foreground px-2 py-0.5 text-xs font-bold font-mono uppercase";

  const features = Array.isArray(project.features) ? project.features : [];
  const imgSrc = project.image_url || fallbackImages[project.id || ""];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`border-l-4 ${accentBorder}`}
    >
      <div className="p-6 md:p-8 bg-secondary/20 hover:bg-secondary/40 transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight">
                {project.title}
              </h3>
              <p className={`${accentText} text-sm font-mono mt-1`}>{project.subtitle}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm">{project.description}</p>

            <ul className="space-y-2 text-sm text-muted-foreground">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className={`${accentText} mt-0.5`}>▸</span>
                  {String(f)}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-2">
              {(project.tech_stack || []).map(t => (
                <span key={t} className={techTag}>{t}</span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {imgSrc && (
              <div className="border border-subtle overflow-hidden">
                <img src={imgSrc} alt={project.title || ""} className="w-full h-auto object-cover" />
              </div>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${accentText} hover:underline`}
              >
                <ExternalLink className="h-3 w-3" />
                {project.live_url.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Partial<Project>[]>(fallbackProjects);

  useEffect(() => {
    const loadProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("is_visible", true)
        .order("sort_order", { ascending: true });
      if (data && data.length > 0) {
        setProjects(data);
      }
    };
    loadProjects();
  }, []);

  // Collect testimonials from projects
  const testimonials = projects
    .filter(p => p.testimonial_quote)
    .map(p => ({
      quote: p.testimonial_quote!,
      author: p.testimonial_author || "",
      accent: p.accent_color === "yellow" ? "border-accent-commercial" : "border-accent-impact",
    }));

  return (
    <>
      <section id="projekte" className="section-spacing">
        <div className="container-strict space-y-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">02 / Projekte</p>
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight">Was ich gebaut habe</h2>
          </motion.div>

          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-spacing">
          <div className="container-strict">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-16">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">04 / Community</p>
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight">Social Proof</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground/5">
              {testimonials.map((t, i) => (
                <motion.blockquote key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className={`bg-background p-6 md:p-8 border-l-4 ${t.accent}`}>
                  <p className="text-foreground leading-relaxed text-base italic">"{t.quote}"</p>
                  <footer className="mt-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">– {t.author}</footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export { ProjectsSection, useCounter, profilePhoto };
export default ProjectsSection;
