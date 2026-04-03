import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import profilePhoto from "@/assets/profile-photo.png";

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
    <section className="min-h-screen flex items-center pt-14 pb-16 md:pt-14 md:pb-24 relative overflow-hidden" aria-label="Hero">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} aria-hidden="true" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="container-strict w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-5"
            >
              Marcel Zimmermann / Portfolio 2024–2026
            </motion.p>

            <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.85] mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="block"
              >
                FULLSTACK
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="block text-accent-commercial"
              >
                DEVELOPER
              </motion.span>
            </h1>

            <div className="space-y-3 mb-8">
              <p className="font-display font-bold text-xl text-foreground">
                Mobile · Web · Von der Idee bis Production
              </p>
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
              className="flex flex-wrap gap-3 mb-8"
            >
              <Button variant="hero" size="lg" onClick={() => scrollTo("projekte")}>
                Projekte erkunden
              </Button>
              <Button variant="heroOutline" size="lg" onClick={() => scrollTo("kontakt")}>
                Anfrage senden
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="border-t border-subtle pt-4 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                {time.toLocaleTimeString("de-DE")} · Status: <span className="text-accent-impact">Verfügbar</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-impact animate-pulse" aria-hidden="true" />
                <span className="text-xs font-mono text-accent-impact uppercase">Live</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Large Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Glow effect behind photo */}
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-700" aria-hidden="true" />
              
              {/* Photo container */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 border-2 border-primary/20 translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500" aria-hidden="true" />
                <div className="relative w-full h-full overflow-hidden border-2 border-subtle bg-secondary group-hover:border-primary/30 transition-all duration-500 group-hover:shadow-[0_0_40px_-10px_hsl(var(--primary)/0.3)]">
                  <img 
                    src={profilePhoto} 
                    alt="Marcel Zimmermann – Fullstack Developer" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-[1.03]"
                    width={384}
                    height={384}
                  />
                </div>
                
                {/* Floating stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -right-2 sm:-right-4 md:-right-8 top-6 sm:top-8 bg-card/90 backdrop-blur-sm border border-subtle px-3 py-2 sm:px-4 sm:py-3 shadow-lg"
                >
                  <p className="text-xl sm:text-2xl font-display font-black text-accent-commercial">
                    <CountUp target={12} suffix="+" />
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Projekte</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -left-2 sm:-left-4 md:-left-8 bottom-10 sm:bottom-12 bg-card/90 backdrop-blur-sm border border-subtle px-3 py-2 sm:px-4 sm:py-3 shadow-lg"
                >
                  <p className="text-xl sm:text-2xl font-display font-black text-accent-impact">
                    <CountUp target={3} suffix="+" />
                  </p>
                  <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Jahre Dev</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-muted-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
