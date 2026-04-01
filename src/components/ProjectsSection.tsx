import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import PhoneCarousel from "@/components/PhoneCarousel";
import AccessiPdfShowcase from "@/components/AccessiPdfShowcase";

import spaetimobilImg from "@/assets/spaetimobil-screenshot.png";
import pflegefondImg from "@/assets/pflegefond-screenshot.png";
import fairrideImg from "@/assets/fairride-screenshot.png";
import accessiwidgetImg from "@/assets/accessiwidget-screenshot.png";
import openforgeImg from "@/assets/openforge-screenshot.png";
import zeitwohnenImg from "@/assets/zeitwohnen-screenshot.png";
import mittelerdeImg from "@/assets/mittelerde-screenshot.png";
import egitarreImg from "@/assets/egitarre-screenshot.png";
import punzenverzeichnisImg from "@/assets/punzenverzeichnis-screenshot.png";
import safefloorImg from "@/assets/safefloor-screenshot.png";
import appauditImg from "@/assets/appaudit-checklist.png";
import appanalyzerImg from "@/assets/appanalyzer-home.png";

type Project = Tables<"projects">;

const fallbackProjects: Partial<Project>[] = [
  {
    id: "fairride",
    title: "FairRide",
    subtitle: "Open-Source Ride-Hailing & Logistik-Plattform",
    description: "Eine EU-konforme Mobilitätsplattform als Alternative zu Uber – 100% Open Source, DSGVO-konform, mit fairen 10-15% Provisionen statt 25-30%. Ride-Hailing, Essenslieferung & Logistik in einer App.",
    features: ["Ride-Hailing, Essenslieferung & Logistik in einer App", "EU-rechtskonform (DSGVO, ePrivacy, PSD2)", "16 deutsche Städte geplant als Pilotprojekt", "100% Open Source – Made in Germany"],
    tech_stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Google Maps API"],
    live_url: "https://fairride.de",
    accent_color: "green",
  },
  {
    id: "spaetimobil",
    title: "Spätimobil",
    subtitle: "Der mobile Späti – 24/7 Lieferservice",
    description: "Einen 24/7-Lieferservice für Nachtschwärmer und Schichtarbeiter gebaut, der in 15-30 Minuten liefert. Vollständige E-Commerce-Funktionalität mit Echtzeit-Bestellungen.",
    features: ["Vollständige E-Commerce mit Echtzeit-Bestellungen", "Automatisches Öffnungszeiten-System (Fr–So 22–5 Uhr)", "Stempelkarten-Treueprogramm", "Standortbasierte Lieferkreis-Berechnung (25km)"],
    tech_stack: ["React", "Node.js", "Express", "MongoDB", "Google Maps API"],
    live_url: "https://spaetimobil.com",
    accent_color: "yellow",
    testimonial_quote: "Er hat unseren Späti-Lieferservice von 0 auf 100 gebracht – heute liefern wir jede Nacht an Fabriken und Haushalte.",
    testimonial_author: "Gründer, Spätimobil",
  },
  {
    id: "appaudit",
    title: "App Audit Buddy Pro",
    subtitle: "Automatisierte App-Store-Compliance-Prüfung",
    description: "Eine kostengünstige Alternative zu teuren App-Audit-Tools: Automatische Checklisten für DSGVO, iOS/Android Guidelines, Barrierefreiheit und Code-Qualität. Smart Scan erkennt Probleme in Sekunden – mit konkreten Empfehlungen und PDF-Export.",
    features: ["89-Punkte-Checkliste (DSGVO, iOS, Android, A11y)", "Smart Scan mit automatischer Code-Analyse", "PDF & Markdown Report-Export", "Free-Tier mit 4 vollständigen App-Scans"],
    tech_stack: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Node.js"],
    accent_color: "green",
  },
  {
    id: "appanalyzer",
    title: "AppAnalyzer Pro",
    subtitle: "Echtzeit App-Store-Analyse für iOS & Android",
    description: "Eine kostengünstige Alternative zu Sensor Tower & App Annie: Echtzeit-Daten aus dem App Store & Google Play – Bewertungen, Screenshots, KI-Analyse und ASO-Keywords. Kostenlose App-Suche mit Live-Daten statt teurer Enterprise-Lizenzen.",
    features: ["Echtzeit App-Store-Daten (iOS & Android)", "KI-gestützte Marktbewertung & ASO-Analyse", "Bewertungsverteilung & Screenshot-Galerie", "Kostenloser Zugang – keine Enterprise-Lizenz nötig"],
    tech_stack: ["React", "TypeScript", "Node.js", "App Store API", "KI/LLM"],
    accent_color: "yellow",
  },
  {
    id: "openforge",
    title: "OpenForge",
    subtitle: "Open-Source KI-App-Builder",
    description: "Die Open-Source-Alternative zu Lovable, Bolt & v0. Vollständige Full-Stack-Apps aus natürlicher Sprache – lokal, bezahlbar und mit echtem Code-Export. Apache 2.0 Lizenz.",
    features: ["Full-Stack-Apps aus natürlicher Sprache generieren", "Eigene API-Keys & lokale Modelle", "React + TypeScript Frontend, FastAPI + PostgreSQL Backend", "Stripe-Integration & automatische Tests"],
    tech_stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "OpenAI API"],
    live_url: "https://openforge.dev",
    accent_color: "green",
  },
  {
    id: "zeitwohnen",
    title: "Zeitwohnen München",
    subtitle: "Möbliertes Wohnen auf Zeit",
    description: "Plattform für möbliertes Wohnen in München – für Studenten, Expats und Berufspendler. Flexibel ab 3 Wochen mietbar mit Echtzeit-Verfügbarkeitsprüfung und mehrsprachigem Support.",
    features: ["Echtzeit-Verfügbarkeitsprüfung mit Kalender", "Flexibel ab 3 Wochen mietbar", "Alle Nebenkosten inklusive", "Dark/Light Mode mit elegantem Design"],
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe"],
    live_url: "https://zeitwohnen-muenchen.de",
    accent_color: "yellow",
  },
  {
    id: "mittelerde",
    title: "Kampf um Mittelerde",
    subtitle: "Browser-Strategiespiel – MMORTS",
    description: "Ein vollständiges Browser-basiertes MMORTS-Spiel: 8 einzigartige Völker, PvP-Kämpfe, Allianzen, Stadtbau und Diplomatie. Mit täglichen Belohnungen, Streak-System und Echtzeit-Ressourcenmanagement.",
    features: ["8 einzigartige Völker mit eigenen Einheiten", "PvP-Kämpfe & Allianzsystem", "Tägliches Belohnungs- & Streak-System", "Echtzeit-Ressourcenmanagement"],
    tech_stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "WebSockets"],
    accent_color: "yellow",
  },
  {
    id: "accessiwidget",
    title: "AccessiWidget",
    subtitle: "Barrierefreiheits-Widget für Websites",
    description: "Ein einbettbares Widget das jede Website barrierefrei macht – mit automatischer Seiten-Analyse, Barrierefreiheitsprofilen und konkreten Empfehlungen. WCAG-konform.",
    features: ["Automatische Seiten-Analyse (Score 0-100)", "Barrierefreiheitsprofile (Sehbehinderung, Motorik, etc.)", "Einbettbar als Widget auf jeder Website", "WCAG & DSGVO konform"],
    tech_stack: ["TypeScript", "React", "Node.js", "REST API"],
    accent_color: "green",
  },
  {
    id: "egitarre",
    title: "E-Gitarre Lernen",
    subtitle: "Online-Lernplattform für E-Gitarre",
    description: "Eine moderne Lernplattform für E-Gitarre – für Anfänger bis Fortgeschrittene. Einfache Lektionen, echte Erfolge und interaktive Tutorials mit Fortschrittssystem.",
    features: ["Strukturierte Lektionen für alle Level", "Interaktive Tutorials mit Fortschritt", "Anfänger-Tutorial & kostenloser Start", "Modernes Dark-Mode UI"],
    tech_stack: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    accent_color: "green",
  },
  {
    id: "pflegefond",
    title: "Pflegefond Deutschland",
    subtitle: "Social Impact Plattform",
    description: "Eine transparente, schnelle Hilfsplattform für pflegende Angehörige – ohne Banken-Bürokratie. Komplettes Antrags-System mit Live-Tracking und ASME-Algorithmus.",
    features: ["Komplettes Antrags-System mit Live-Tracking", "ASME-Algorithmus (Automatisiertes Social Matching)", "Echtzeit-Statistiken-Dashboard", "Blockchain-Transparenz-Modul"],
    tech_stack: ["Next.js", "TypeScript", "PostgreSQL", "Blockchain API", "Chart.js"],
    live_url: "https://pflegefond-deutschland.org",
    accent_color: "green",
    testimonial_quote: "Die Plattform für pflegende Angehörige ist nicht nur technisch brilliant, sie hilft wirklich Menschen.",
    testimonial_author: "Team Pflegefond",
  },
  {
    id: "safefloor",
    title: "SafeFloor®",
    subtitle: "IoT Sturzfrühwarnsystem – Hardware & Software",
    description: "Ein DSGVO-konformes Sturzerkennungssystem für Pflegeeinrichtungen – ohne Kamera, ohne Armband. Erkennt Stürze in Echtzeit mit <1 Sek. Reaktionszeit. Aktuell in der Prototypen-Entwicklung: Platinen-Design, Sensor-Kalibrierung und Firmware.",
    features: ["Sturzerkennung ohne Kamera – 100% Datenschutz", "< 1 Sekunde Reaktionszeit", "24/7 Überwachung, vollständig anonym", "Aktuell: Platinen-Entwicklung & Prototypenbau"],
    tech_stack: ["React", "TypeScript", "Node.js", "IoT", "BLE", "Embedded C"],
    live_url: "https://safefloor.de",
    accent_color: "green",
  },
  {
    id: "punzenverzeichnis",
    title: "Zentrales Punzenverzeichnis",
    subtitle: "SaaS für Goldschmiede & Silberschmiede",
    description: "Ein B2B-SaaS-Tool für die Verwaltung von Punzen (Edelmetall-Stempel) – mit Benutzerverwaltung, Admin-Dashboard, Recherche-Funktion und Datenexport. Multi-Rollen-System.",
    features: ["Admin-Dashboard mit Statistiken", "Benutzerverwaltung mit Rollen (Admin, User)", "Punzen-Erfassung mit Bild-Upload", "Recherche & Datenexport-Funktionen"],
    tech_stack: ["React", "TypeScript", "Supabase", "Tailwind CSS", "PostgreSQL"],
    accent_color: "yellow",
  },
];

const fallbackImages: Record<string, string> = {
  spaetimobil: spaetimobilImg,
  pflegefond: pflegefondImg,
  fairride: fairrideImg,
  accessiwidget: accessiwidgetImg,
  openforge: openforgeImg,
  zeitwohnen: zeitwohnenImg,
  mittelerde: mittelerdeImg,
  egitarre: egitarreImg,
  punzenverzeichnis: punzenverzeichnisImg,
  safefloor: safefloorImg,
  appaudit: appauditImg,
  appanalyzer: appanalyzerImg,
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
  const isEven = index % 2 === 0;

  const scrollToContact = () => {
    const el = document.getElementById("kontakt");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className={`border-l-4 ${accentBorder} group`}
      aria-label={`Projekt: ${project.title}`}
    >
      <div className="p-6 md:p-10 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300">
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 ${isEven ? "" : "lg:direction-rtl"}`}>
          {/* Text content - 3 cols */}
          <div className={`lg:col-span-3 space-y-5 ${isEven ? "" : "lg:order-2"}`}>
            <div>
              <span className={`text-[10px] font-mono uppercase tracking-[0.3em] ${accentText}`}>
                {isYellow ? "Commercial" : "Social Impact"} / B2B
              </span>
              <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight mt-1">
                {project.title}
              </h3>
              <p className={`${accentText} text-sm font-mono mt-1`}>{project.subtitle}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed text-sm">{project.description}</p>

            <ul className="space-y-2 text-sm text-muted-foreground" role="list">
              {features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className={`${accentText} mt-0.5 shrink-0`} aria-hidden="true">▸</span>
                  {String(f)}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-2" aria-label="Tech Stack">
              {(project.tech_stack || []).map(t => (
                <span key={t} className={techTag}>{t}</span>
              ))}
            </div>

            {/* Testimonial inline */}
            {project.testimonial_quote && (
              <blockquote className={`border-l-2 ${accentBorder} pl-4 mt-4`}>
                <p className="text-sm italic text-foreground/80">"{project.testimonial_quote}"</p>
                <footer className="mt-1 text-xs font-mono text-muted-foreground">– {project.testimonial_author}</footer>
              </blockquote>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="heroOutline"
                size="sm"
                onClick={scrollToContact}
                className="group/btn"
              >
                Anfrage senden
                <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
              </Button>
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest ${accentText} hover:underline`}
                >
                  <ExternalLink className="h-3 w-3" />
                  Live ansehen
                </a>
              )}
            </div>
          </div>

          {/* Image - 2 cols */}
          <div className={`lg:col-span-2 ${isEven ? "" : "lg:order-1"} space-y-4`}>
            {imgSrc && (
              <div className="border border-subtle overflow-hidden group-hover:border-primary/20 transition-colors">
                <img
                  src={imgSrc}
                  alt={`Screenshot von ${project.title}`}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            )}
            {project.id === "spaetimobil" && <PhoneCarousel />}
            {project.id === "accessiwidget" && <AccessiPdfShowcase />}
          </div>
        </div>
      </div>
    </motion.article>
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

  return (
    <section id="projekte" className="section-spacing" aria-labelledby="projekte-heading">
      <div className="container-strict space-y-12 md:space-y-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-4">03 / Projekte</p>
            <h2 id="projekte-heading" className="font-display font-black text-4xl md:text-5xl uppercase tracking-tight">
              Fertige B2B & SaaS Lösungen
            </h2>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            {projects.length} Projekte – von Mobility über Gaming bis SaaS. 
            Jedes Projekt ist eine production-ready Lösung.
          </p>
        </motion.div>

        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
