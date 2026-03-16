import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

const useCounter = (end: number, duration: number = 2000, startOnView: boolean = true) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!startOnView || !isInView) return;
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
  }, [isInView, end, duration, startOnView]);

  return { count, ref };
};

const techTagYellow = "inline-block bg-accent-commercial text-primary-foreground px-2 py-0.5 text-xs font-bold font-mono uppercase";
const techTagGreen = "inline-block bg-accent-impact text-primary-foreground px-2 py-0.5 text-xs font-bold font-mono uppercase";

const ProjectsSection = () => {
  const { count: familyCount, ref: familyRef } = useCounter(1240, 2500);
  const { count: euroCount, ref: euroRef } = useCounter(450000, 2500);

  return (
    <section id="projekte" className="section-spacing">
      <div className="container-strict space-y-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">
            02 / Projekte
          </p>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight">
            Was ich gebaut habe
          </h2>
        </motion.div>

        {/* Project 1: Spätimobil */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-l-4 border-accent-commercial"
        >
          <div className="p-6 md:p-8 bg-secondary/20 hover:bg-secondary/40 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight">
                    Spätimobil
                  </h3>
                  <p className="text-accent-commercial text-sm font-mono mt-1">
                    Der mobile Späti – 24/7 Lieferservice
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm">
                  Einen 24/7-Lieferservice für Nachtschwärmer und Schichtarbeiter gebaut, 
                  der in 15-30 Minuten liefert. Vollständige E-Commerce-Funktionalität mit 
                  Echtzeit-Bestellungen, automatischem Öffnungszeiten-System und 
                  Stempelkarten-Treueprogramm.
                </p>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-commercial mt-0.5">▸</span>
                    Vollständige E-Commerce-Funktionalität mit Echtzeit-Bestellungen
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-commercial mt-0.5">▸</span>
                    Automatisches Öffnungszeiten-System (Fr–So + Feiertage 22–5 Uhr)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-commercial mt-0.5">▸</span>
                    Integriertes Stempelkarten-Treueprogramm
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-commercial mt-0.5">▸</span>
                    Standortbasierte Lieferkreis-Berechnung (25km Umkreis)
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["React", "Node.js", "Express", "MongoDB", "Google Maps API"].map(t => (
                    <span key={t} className={techTagYellow}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Live Status Panel */}
              <div className="space-y-4">
                <div className="border border-subtle p-4 bg-background/50 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent-impact animate-pulse-dot" />
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Live Status</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">Nächste Lieferzeiten</p>
                      <p className="font-mono text-sm text-foreground">Fr–So 22:00 – 05:00</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">Aktuelle Aktion</p>
                      <p className="font-mono text-sm text-accent-commercial">🏭 Nachtschicht-Lieferung</p>
                    </div>
                  </div>
                </div>
                <a
                  href="https://spaetimobil.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent-commercial hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  spaetimobil.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project 2: Pflegefond */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-l-4 border-accent-impact"
        >
          <div className="p-6 md:p-8 bg-secondary/20 hover:bg-secondary/40 transition-colors">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight">
                    Pflegefond Deutschland
                  </h3>
                  <p className="text-accent-impact text-sm font-mono mt-1">
                    Social Impact Plattform
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm">
                  Eine transparente, schnelle Hilfsplattform für pflegende Angehörige – 
                  ohne Banken-Bürokratie. Komplettes Antrags-System mit Live-Tracking, 
                  ASME-Algorithmus und Echtzeit-Statistiken.
                </p>

                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-impact mt-0.5">▸</span>
                    Komplettes Antrags-System mit Live-Tracking
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-impact mt-0.5">▸</span>
                    ASME-Algorithmus (Automatisiertes Social Matching & Evaluation)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-impact mt-0.5">▸</span>
                    Echtzeit-Statistiken-Dashboard
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-impact mt-0.5">▸</span>
                    Blockchain-Transparenz-Modul für Spenden
                  </li>
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {["Next.js", "TypeScript", "PostgreSQL", "Blockchain API", "Chart.js"].map(t => (
                    <span key={t} className={techTagGreen}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Live Stats Panel */}
              <div className="space-y-4">
                <div className="border border-subtle p-4 bg-background/50 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent-impact animate-pulse-dot" />
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Impact Stats</span>
                  </div>
                  <div className="space-y-3">
                    <div ref={familyRef}>
                      <p className="text-xs text-muted-foreground font-mono">Familien geholfen</p>
                      <p className="font-mono font-bold text-2xl text-accent-impact">{familyCount.toLocaleString("de-DE")}</p>
                    </div>
                    <div ref={euroRef}>
                      <p className="text-xs text-muted-foreground font-mono">Ausgezahlt</p>
                      <p className="font-mono font-bold text-2xl text-accent-impact">€{euroCount.toLocaleString("de-DE")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">ø Bearbeitungszeit</p>
                      <p className="font-mono text-sm text-foreground">7 Tage</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-mono">Team</p>
                      <p className="font-mono text-xs text-muted-foreground">Atrin · Thomas · Marcel · Robin</p>
                    </div>
                  </div>
                </div>
                <a
                  href="https://pflegefond-deutschland.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent-impact hover:underline"
                >
                  <ExternalLink className="h-3 w-3" />
                  pflegefond-deutschland.org
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
