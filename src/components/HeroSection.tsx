import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";
import Magnetic from "@/components/ui/magnetic";
import RevealText from "@/components/ui/reveal-text";

const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame: number;
    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <>{count}{suffix}</>;
};

const HeroSection = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="min-h-screen flex flex-col justify-center pt-14 pb-10 md:pt-16 md:pb-12 relative overflow-hidden"
      aria-label="Hero"
    >
      {/* Architectural grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Ambient orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] bg-primary/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] bg-accent/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-strict w-full relative z-10">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-center">
          {/* Vertical divider */}
          <div
            className="hidden lg:block absolute top-0 bottom-0 left-[58.333%] w-px bg-subtle/60"
            aria-hidden="true"
          />

          {/* Left: Copy (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1 lg:col-span-7 lg:pr-12"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[11px] font-mono uppercase tracking-[0.4em] text-muted-foreground mb-8"
            >
              Marcel Zimmermann / Portfolio 2024—2026
            </motion.p>

            <h1 className="font-display font-black uppercase tracking-tighter leading-[0.85] mb-10"
                style={{ fontSize: "clamp(3.25rem, 9vw, 8rem)" }}>
              <RevealText as="span" className="block" delay={0.05}>
                FULLSTACK
              </RevealText>
              <RevealText as="span" className="block text-accent-commercial" delay={0.25}>
                DEVELOPER
              </RevealText>
            </h1>

            <div className="space-y-5 mb-9 max-w-xl">
              <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">
                <RevealText delay={0.4}>Mobile · Web · Von der Idee bis Production</RevealText>
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground max-w-lg">
                Fullstack Developer mit Erfahrung in React, Flutter, Swift & Node.js.
                Ich entwickle plattformübergreifende Apps und Web-Lösungen – von
                BLE-Integration und CarPlay bis hin zu kompletten SaaS-Plattformen.
                Ehemaliger Flutter-Dozent mit Leidenschaft für sauberen Code und echten Impact.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Magnetic strength={0.3}>
                <Button variant="hero" size="lg" onClick={() => scrollTo("projekte")}>
                  Projekte erkunden
                </Button>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Button variant="heroOutline" size="lg" onClick={() => scrollTo("kontakt")}>
                  Anfrage senden
                </Button>
              </Magnetic>
            </motion.div>

            <div className="space-y-5 mb-9 max-w-xl">
              <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">
                Mobile · Web · Von der Idee bis Production
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground max-w-lg">
                Fullstack Developer mit Erfahrung in React, Flutter, Swift & Node.js.
                Ich entwickle plattformübergreifende Apps und Web-Lösungen – von
                BLE-Integration und CarPlay bis hin zu kompletten SaaS-Plattformen.
                Ehemaliger Flutter-Dozent mit Leidenschaft für sauberen Code und echten Impact.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Button variant="hero" size="lg" onClick={() => scrollTo("projekte")}>
                Projekte erkunden
              </Button>
              <Button variant="heroOutline" size="lg" onClick={() => scrollTo("kontakt")}>
                Anfrage senden
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Portrait (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-center"
          >
            <div className="relative group w-4/5 max-w-sm">
              {/* Ambient glow */}
              <div
                className="absolute -inset-8 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-700"
                aria-hidden="true"
              />

              {/* Portrait frame */}
              <div className="relative aspect-[4/5] w-full border border-subtle bg-secondary overflow-hidden group-hover:border-primary/30 transition-colors duration-500">
                <img
                  src={profilePhoto}
                  alt="Marcel Zimmermann – Fullstack Developer"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                  width={600}
                  height={750}
                />
                <div
                  className="absolute inset-0 bg-accent-commercial/5 mix-blend-overlay pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Decorative L-shape */}
              <div
                className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 border-b-2 border-r-2 border-accent-commercial/30 pointer-events-none"
                aria-hidden="true"
              />

              {/* Floating stat: Projekte */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -right-3 sm:-right-6 top-8 bg-background border-2 border-subtle px-4 py-3 sm:px-5 sm:py-4 min-w-[120px] sm:min-w-[140px] shadow-[10px_10px_0_0_hsl(var(--foreground)/0.08)] group-hover:shadow-[14px_14px_0_0_hsl(var(--foreground)/0.12)] group-hover:-translate-y-1 transition-all duration-500"
              >
                <p className="text-3xl sm:text-4xl font-display font-black text-accent-commercial leading-none">
                  <CountUp target={12} suffix="+" />
                </p>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mt-1">
                  Projekte
                </p>
              </motion.div>

              {/* Floating stat: Jahre */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -left-3 sm:-left-8 bottom-16 sm:bottom-20 bg-background border-2 border-subtle px-4 py-3 sm:px-5 sm:py-4 min-w-[120px] sm:min-w-[140px] shadow-[10px_10px_0_0_hsl(var(--foreground)/0.08)] group-hover:shadow-[14px_14px_0_0_hsl(var(--foreground)/0.12)] group-hover:translate-y-1 transition-all duration-500"
              >
                <p className="text-3xl sm:text-4xl font-display font-black text-accent-impact leading-none">
                  <CountUp target={3} suffix="+" />
                </p>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground mt-1">
                  Jahre Dev
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Status footer row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-12 md:mt-16 pt-6 border-t border-subtle flex flex-wrap items-center justify-between gap-6"
        >
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <span className="text-foreground">{time.toLocaleTimeString("de-DE")}</span>
            <span className="opacity-30">/</span>
            <span>
              Status: <span className="text-accent-impact">Verfügbar</span>
            </span>
            <div className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent-impact shadow-[0_0_8px_hsl(var(--accent-impact)/0.6)] animate-pulse"
                aria-hidden="true"
              />
              <span className="text-accent-impact">Live</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-5">
            <span
              className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-muted-foreground/40"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              Scroll
            </span>
            <button
              onClick={() => scrollTo("about")}
              aria-label="Nach unten scrollen"
              className="w-11 h-11 rounded-full border border-subtle flex items-center justify-center group/scroll hover:border-accent-commercial transition-colors"
            >
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover/scroll:text-accent-commercial group-hover/scroll:translate-y-0.5 transition-all" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
