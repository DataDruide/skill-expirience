import { useEffect, useState } from "react";
import LottieMicro from "@/components/ui/lottie-micro";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

interface SectionProgressProps {
  sections: Section[];
}

/**
 * Sticky edge rail: a scroll progress bar plus section markers with the
 * current section highlighted. Hidden on small screens & for screen readers.
 */
const SectionProgress = ({ sections }: SectionProgressProps) => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [active, setActive] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div
      className="hidden 2xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-5"
      aria-hidden="true"
    >
      <div className="absolute right-[3px] top-0 bottom-0 w-px bg-foreground/10" />
      <motion.div
        className="absolute right-[3px] top-0 w-px origin-top bg-accent-commercial"
        style={{ height: "100%", scaleY: progress }}
      />

      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            tabIndex={-1}
            className="group relative flex items-center gap-3 pr-1 pointer-events-auto"
          >
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.25em] transition-all duration-300 ${
                isActive
                  ? "opacity-100 text-foreground"
                  : "opacity-0 -translate-x-1 text-muted-foreground group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {s.label}
            </span>
            {isActive && (
              <LottieMicro variant="pulse" className="absolute -right-2 h-5 w-5 block pointer-events-none" />
            )}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "w-[7px] h-[7px] bg-accent-commercial shadow-[0_0_10px_hsl(var(--accent-commercial)/0.7)]"
                  : "w-[5px] h-[5px] bg-foreground/25 group-hover:bg-foreground/60"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default SectionProgress;
