import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Smartphone } from "lucide-react";

import spaetimobilAppImg from "@/assets/spaetimobil-app.png";
import spaetimobilHomeImg from "@/assets/spaetimobil-app-home.png";
import spaetimobilRegisterImg from "@/assets/spaetimobil-app-register.png";
import spaetimobilLoginImg from "@/assets/spaetimobil-app-login.png";

const screens = [
  { src: spaetimobilHomeImg, label: "Home" },
  { src: spaetimobilAppImg, label: "Speisekarte" },
  { src: spaetimobilRegisterImg, label: "Registrierung" },
  { src: spaetimobilLoginImg, label: "Login" },
];

const PhoneCarousel = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % screens.length), 3500);
    return () => clearInterval(t);
  }, []);

  const go = (dir: number) => setActive(p => (p + dir + screens.length) % screens.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative p-4 border border-accent-commercial/20 bg-accent-commercial/5"
    >
      <div className="flex items-center gap-4">
        {/* Phone mockup – larger */}
        <div className="relative shrink-0">
          {/* Glow behind phone */}
          <div className="absolute -inset-3 bg-accent-commercial/10 rounded-3xl blur-xl" />
          
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-[80px] h-[164px] bg-[hsl(0,0%,8%)] rounded-[1rem] p-[2.5px] shadow-xl shadow-black/30">
                  <div className="w-full h-full rounded-[0.85rem] overflow-hidden bg-[hsl(0,0%,5%)] relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[28px] h-[6px] bg-[hsl(0,0%,8%)] rounded-b-md z-10" />
                    <img
                      src={screens[active].src}
                      alt={`SpätiMobil App – ${screens[active].label}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav controls */}
            <div className="flex items-center justify-center gap-1.5 mt-2.5">
              <button onClick={() => go(-1)} className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-accent-commercial transition-colors" aria-label="Previous">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? "bg-accent-commercial w-4" : "bg-muted-foreground/30 w-1.5"
                  }`}
                  aria-label={`Screen ${i + 1}`}
                />
              ))}
              <button onClick={() => go(1)} className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-accent-commercial transition-colors" aria-label="Next">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="min-w-0 space-y-2">
          <div className="flex items-center gap-2">
            <Smartphone className="w-3.5 h-3.5 text-accent-commercial" />
            <span className="inline-block bg-accent-commercial text-primary-foreground px-2 py-0.5 text-[9px] font-bold font-mono uppercase tracking-wider">
              Coming Soon
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground leading-tight">SpätiMobil App</p>
            <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
              Bald als iOS & Android App verfügbar
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-commercial animate-pulse" />
            <p className="text-[10px] text-muted-foreground/70 font-mono">
              {screens[active].label}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PhoneCarousel;
