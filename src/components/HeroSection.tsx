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
    <section className="min-h-screen flex items-center section-spacing">
      <div className="container-strict w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Vertical Type + Photo */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Portfolio / 2024
            </p>

            <div className="flex items-end gap-6 mb-8">
              <h1 className="font-display font-black text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter leading-[0.85]">
                FULL
                <br />
                <span className="text-accent-commercial">STACK</span>
              </h1>
              <div className="border border-subtle overflow-hidden w-20 h-20 md:w-24 md:h-24 shrink-0 mb-1">
                <img src={profilePhoto} alt="Profilbild" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="border-t border-subtle pt-6">
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                {time.toLocaleTimeString("de-DE")} · Status: Verfügbar
              </p>
            </div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <p className="font-display font-bold text-xl text-foreground">
                Fullstack-Entwickler
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Von der ersten Code-Zeile bis zur Live-Domain
              </p>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              Ich baue end-to-end Projekte, die Menschen bewegen – vom nächtlichen 
              Snack-Lieferservice bis zur Social-Impact-Plattform für pflegende 
              Angehörige. Kein Buzzword-Bingo, nur echter Code mit Wirkung.
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button variant="hero" size="lg" onClick={() => scrollTo("projekte")}>
                Projekte erkunden
              </Button>
              <Button variant="heroOutline" size="lg" onClick={() => scrollTo("kontakt")}>
                Kontakt
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
