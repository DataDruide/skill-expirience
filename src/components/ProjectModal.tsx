import { ArrowRight, ExternalLink, Radio } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LottieMicro from "@/components/ui/lottie-micro";

export interface ProjectModalData {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  features?: unknown[];
  tech_stack?: string[] | null;
  live_url?: string | null;
  accent_color?: string | null;
  images: { url: string; caption: string }[];
}

interface ProjectModalProps {
  project: ProjectModalData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectModal = ({ project, open, onOpenChange }: ProjectModalProps) => {
  if (!project) return null;

  const isYellow = project.accent_color === "yellow";
  const accentText = isYellow ? "text-accent-commercial" : "text-accent-impact";
  const accentBorder = isYellow ? "border-accent-commercial" : "border-accent-impact";
  const isLive = Boolean(project.live_url);

  const goToContact = () => {
    onOpenChange(false);
    setTimeout(() => document.getElementById("kontakt")?.scrollIntoView({ behavior: "smooth" }), 120);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[88dvh] overflow-y-auto">
        <DialogHeader>
          <p className={`text-[10px] font-mono uppercase tracking-[0.3em] ${accentText}`}>
            {isYellow ? "Commercial" : "Social Impact"} / Projekt-Details
          </p>
          <DialogTitle className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight">
            {project.title}
          </DialogTitle>
          <DialogDescription className="font-mono text-sm">{project.subtitle}</DialogDescription>
        </DialogHeader>

        {/* Live-Status */}
        <div className={`flex items-center gap-3 border-l-2 ${accentBorder} bg-secondary/30 px-4 py-3`}>
          <span className="relative flex h-6 w-6 items-center justify-center shrink-0">
            <LottieMicro variant="pulse" className="absolute inset-0 block" />
            <Radio className={`h-3.5 w-3.5 ${accentText}`} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-foreground">
              {isLive ? "Live & produktiv im Einsatz" : "In Entwicklung / Demo auf Anfrage"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {isLive
                ? "Aktive Instanz, laufende Wartung und Weiterentwicklung."
                : "Prototyp verfügbar – Zugang gerne nach kurzer Abstimmung."}
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>

        {Array.isArray(project.features) && project.features.length > 0 && (
          <ul className="space-y-2 text-sm text-muted-foreground" role="list">
            {project.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className={`${accentText} mt-0.5 shrink-0`} aria-hidden="true">▸</span>
                {String(f)}
              </li>
            ))}
          </ul>
        )}

        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-2" aria-label="Tech Stack">
            {project.tech_stack.map((t) => (
              <span
                key={t}
                className={`inline-block px-2 py-0.5 text-xs font-bold font-mono uppercase text-primary-foreground ${
                  isYellow ? "bg-accent-commercial" : "bg-accent-impact"
                }`}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {project.images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-label="Screenshot-Galerie">
            {project.images.map((img, i) => (
              <figure key={i} className="border border-subtle overflow-hidden bg-background/80 animate-fade-in">
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full aspect-[16/10] object-contain bg-secondary/30"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                <figcaption className="px-3 py-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground border-t border-subtle">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.live_url && (
            <Button asChild size="sm">
              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-3.5 w-3.5" aria-hidden="true" />
                Live-Demo öffnen
              </a>
            </Button>
          )}
          <Button variant="heroOutline" size="sm" onClick={goToContact} className="group/btn">
            Kontakt aufnehmen
            <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectModal;
