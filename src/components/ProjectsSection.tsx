import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import PhoneCarousel from "@/components/PhoneCarousel";
import AccessiPdfShowcase from "@/components/AccessiPdfShowcase";
import AppAnalyzerShowcase from "@/components/AppAnalyzerShowcase";
import TiltCard from "@/components/ui/tilt-card";
import RevealText from "@/components/ui/reveal-text";

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
import zentralverbandAsset from "@/assets/zentralverband-screenshot.png.asset.json";
import helveticaIntelligenceAsset from "@/assets/helvetica-intelligence-screenshot.png.asset.json";
import helveticaCopilotAsset from "@/assets/helvetica-intelligence-copilot.png.asset.json";
import helveticaLagezentrumAsset from "@/assets/helvetica-intelligence-lagezentrum.png.asset.json";
import helveticaCockpitAsset from "@/assets/helvetica-intelligence-cockpit.png.asset.json";

const LOVABLE_ASSET_ORIGIN = "https://code-craft-impact.lovable.app";

const resolveLovableAssetUrl = (url: string) =>
  url.startsWith("/__l5e/assets-v1/") ? `${LOVABLE_ASSET_ORIGIN}${url}` : url;

const zentralverbandImg = resolveLovableAssetUrl(zentralverbandAsset.url);
const helveticaIntelligenceImg = resolveLovableAssetUrl(helveticaIntelligenceAsset.url);
const helveticaGallery = [
  { url: resolveLovableAssetUrl(helveticaCockpitAsset.url), caption: "Operator-Cockpit mit Live-Kennzahlen" },
  { url: resolveLovableAssetUrl(helveticaLagezentrumAsset.url), caption: "Lagezentrum – Netzwerkgraph & Ereignisfeed" },
  { url: resolveLovableAssetUrl(helveticaCopilotAsset.url), caption: "Orakel KI-Copilot mit Quellenbelegen" },
];

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
  {
    id: "zentralverband",
    title: "Zentralverband Gold- & Silberschmiede",
    subtitle: "Verbandsplattform mit Punzenregister & Mitgliederbereich",
    description: "Eine moderne Web-Plattform für den traditionsreichen Zentralverband der Goldschmiede & Silberschmiede e.V. (seit 1900): Verbandsinfos, Fortbildung, Wettbewerbe, Mitgliederverzeichnis und ein digitales Punzenregister – verbunden mit einem Login-Bereich für Mitgliedsbetriebe.",
    features: ["Mitgliederverzeichnis & Login-Bereich", "Aktuelles, Fortbildungen, Wettbewerbe & Ausbildung", "Editorial-Design mit Serif-Typografie & Imagefilm", "Integriertes Punzenregister für Edelmetall-Stempel"],
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "CMS"],
    live_url: "https://zentralverband-gold-silberschmiede.com",
    accent_color: "yellow",
  },
  {
    id: "helvetica-intelligence",
    title: "Helvetica Intelligence",
    subtitle: "Enterprise Intelligence-Plattform mit KI-Copilot",
    description: "Eine Enterprise-Intelligence-Plattform, die Dokumente, Messenger-Daten, Standorte, Unternehmenssysteme und offene Quellen (OSINT) in einem zentralen Lagezentrum bündelt. Echtzeit-Analyse mit KI, Netzwerk-Graphen und Geo-Intelligence – inklusive Orakel-Copilot, der Fragen mit vollständigen Quellenbelegen beantwortet.",
    features: [
      "Zentrales Lagezentrum mit Live-Netzwerkgraph & Ereignisfeed",
      "Orakel-KI-Copilot mit Quellenbelegen (#chat, #geo, #graph)",
      "Workflow von Import → Kortex → Suche → Visier → Fusion",
      "Editorial UI mit Serif-Display-Type & Enterprise-Cockpit",
    ],
    tech_stack: ["React", "TypeScript", "Supabase", "KI/LLM", "Graph DB", "Tailwind CSS"],
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
  zentralverband: zentralverbandImg,
  "helvetica-intelligence": helveticaIntelligenceImg,
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
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`border-l-4 ${accentBorder} group relative overflow-hidden`}
      aria-label={`Projekt: ${project.title}`}
    >
      {/* Hover glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${isYellow ? "bg-gradient-to-r from-[hsl(var(--accent-commercial)/0.03)] to-transparent" : "bg-gradient-to-r from-[hsl(var(--accent-impact)/0.03)] to-transparent"}`} aria-hidden="true" />
      <div className="relative p-6 md:p-10 bg-secondary/20 hover:bg-secondary/35 transition-all duration-500">
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 ${isEven ? "" : "lg:direction-rtl"}`}>
          {/* Text content - 3 cols */}
          <div className={`lg:col-span-3 space-y-5 ${isEven ? "" : "lg:order-2"}`}>
            <div>
              <span className={`text-[10px] font-mono uppercase tracking-[0.3em] ${accentText}`}>
                {isYellow ? "Commercial" : "Social Impact"} / B2B
              </span>
              <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight mt-1">
                <RevealText>{project.title || ""}</RevealText>
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
              <TiltCard className="relative">
                <div className="relative border border-subtle overflow-hidden bg-background/70 group-hover:border-primary/20 transition-all duration-500 group-hover:shadow-2xl">
                  <img
                    src={imgSrc}
                    alt={`Screenshot von ${project.title}`}
                    className="w-full aspect-[16/10] object-contain bg-secondary/30 transition-all duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isYellow ? "bg-gradient-to-tr from-accent-commercial/10 via-transparent to-transparent" : "bg-gradient-to-tr from-accent-impact/10 via-transparent to-transparent"}`} />
                </div>
              </TiltCard>
            )}
            {project.id === "spaetimobil" && <PhoneCarousel />}
            {project.id === "accessiwidget" && <AccessiPdfShowcase />}
            {project.id === "appanalyzer" && <AppAnalyzerShowcase />}
            {project.id === "helvetica-intelligence" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3" aria-label="Helvetica Intelligence Screenshots">
                {helveticaGallery.map((g, i) => (
                  <motion.figure
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative border border-subtle overflow-hidden bg-background/80 group/thumb hover:border-accent-commercial/40 transition-all duration-500 hover:shadow-xl ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""} ${i === 1 ? "lg:ml-4" : ""} ${i === 2 ? "lg:mr-4" : ""}`}
                  >
                    <div className="absolute top-2 left-2 z-10 text-[9px] font-mono uppercase tracking-[0.25em] text-accent-commercial bg-background/80 backdrop-blur px-1.5 py-0.5 border border-accent-commercial/30">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <img
                      src={g.url}
                      alt={g.caption}
                      className="w-full aspect-[16/10] object-contain bg-secondary/30 transition-transform duration-700 group-hover/thumb:scale-[1.02]"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                    <figcaption className="px-3 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground border-t border-subtle">
                      {g.caption}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            )}
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
