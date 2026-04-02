import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

import homeImg from "@/assets/appanalyzer-home.png";
import detailImg from "@/assets/appanalyzer-detail.png";
import analysisImg from "@/assets/appanalyzer-analysis.png";

const screens = [
  { src: homeImg, label: "App-Suche & Dashboard" },
  { src: detailImg, label: "App-Detail & Bewertungen" },
  { src: analysisImg, label: "KI-Analyse & ASO" },
];

const AppAnalyzerShowcase = () => {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (expanded) return;
    const t = setInterval(() => setActive(p => (p + 1) % screens.length), 4000);
    return () => clearInterval(t);
  }, [expanded]);

  const go = (dir: number) => setActive(p => (p + dir + screens.length) % screens.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="border border-accent-commercial/20 bg-accent-commercial/5 p-3"
    >
      {/* Cinema header */}
      <div className="flex items-center justify-between mb-2">
        <span className="inline-block bg-accent-commercial text-primary-foreground px-1.5 py-0.5 text-[9px] font-bold font-mono uppercase tracking-wider">
          Live Preview
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground font-mono">
            {active + 1}/{screens.length}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label={expanded ? "Verkleinern" : "Vergrößern"}
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Cinema screen */}
      <div className={`relative overflow-hidden bg-[hsl(0,0%,5%)] rounded-sm ${expanded ? "" : "aspect-video"}`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={screens[active].src}
            alt={screens[active].label}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className={`w-full object-cover ${expanded ? "object-contain max-h-[500px]" : "h-full object-top"}`}
          />
        </AnimatePresence>

        {/* Overlay gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Nav overlay */}
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-between px-3">
          <button
            onClick={() => go(-1)}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-black/50 text-white/80 hover:text-white transition-colors"
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="flex gap-1.5">
            {screens.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === active ? "w-5 bg-accent-commercial" : "w-1.5 bg-white/40"
                }`}
                aria-label={`Bild ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-black/50 text-white/80 hover:text-white transition-colors"
            aria-label="Nächstes Bild"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Label */}
      <p className="text-[10px] text-muted-foreground/60 mt-2 font-mono text-center">
        {screens[active].label}
      </p>
    </motion.div>
  );
};

export default AppAnalyzerShowcase;
