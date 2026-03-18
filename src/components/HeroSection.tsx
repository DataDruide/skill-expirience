import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import profilePhoto from "@/assets/profile-photo.png";

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
    <section className="min-h-screen flex items-center section-spacing relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      <div className="container-strict w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Marcel Zimmermann / Portfolio 2024–2026
            </p>

            <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.85] mb-6">
              FULLSTACK
              <br />
              <span className="text-accent-commercial">DEVELOPER</span>
            </h1>

            <div className="space-y-4 mb-8">
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

            <div className="flex flex-wrap gap-3 mb-8">
              <Button variant="hero" size="lg" onClick={() => scrollTo("projekte")}>
                Projekte erkunden
              </Button>
              <Button variant="heroOutline" size="lg" onClick={() => scrollTo("kontakt")}>
                Anfrage senden
              </Button>
            </div>

            <div className="border-t border-subtle pt-4 flex items-center gap-6">
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                {time.toLocaleTimeString("de-DE")} · Status: <span className="text-accent-impact">Verfügbar</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-impact animate-pulse" />
                <span className="text-xs font-mono text-accent-impact uppercase">Live</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Large Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow effect behind photo */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-3xl opacity-60" />
              
              {/* Photo container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 border-2 border-primary/30 translate-x-3 translate-y-3" />
                <div className="relative w-full h-full overflow-hidden border-2 border-subtle bg-secondary">
                  <img 
                    src={profilePhoto} 
                    alt="Marcel Zimmermann – Fullstack Developer" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
                
                {/* Floating stats */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -right-4 md:-right-8 top-8 bg-card border border-subtle px-4 py-3"
                >
                  <p className="text-2xl font-display font-black text-accent-commercial">9+</p>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Projekte</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -left-4 md:-left-8 bottom-12 bg-card border border-subtle px-4 py-3"
                >
                  <p className="text-2xl font-display font-black text-accent-impact">3+</p>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Jahre Dev</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
