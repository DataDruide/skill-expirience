import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import spaetimobilAppImg from "@/assets/spaetimobil-app.png";
import spaetimobilHomeImg from "@/assets/spaetimobil-app-home.png";
import spaetimobilRegisterImg from "@/assets/spaetimobil-app-register.png";
import spaetimobilLoginImg from "@/assets/spaetimobil-app-login.png";

const screens = [
  { src: spaetimobilHomeImg, label: "Home" },
  { src: spaetimobilAppImg, label: "Webshop" },
  { src: spaetimobilRegisterImg, label: "Registrierung" },
  { src: spaetimobilLoginImg, label: "Login" },
];

const PhoneCarousel = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % screens.length), 3000);
    return () => clearInterval(t);
  }, []);

  const go = (dir: number) => setActive(p => (p + dir + screens.length) % screens.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex items-start gap-3 p-3 border border-accent-commercial/20 bg-accent-commercial/5"
    >
      {/* Phone mockup with carousel */}
      <div className="relative shrink-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-[56px] h-[110px] bg-[hsl(0,0%,8%)] rounded-[0.7rem] p-[2px] shadow-lg">
              <div className="w-full h-full rounded-[0.6rem] overflow-hidden bg-[hsl(0,0%,5%)] relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[24px] h-[5px] bg-[hsl(0,0%,8%)] rounded-b-md z-10" />
                <img
                  src={screens[active].src}
                  alt={`SpätiMobil App – ${screens[active].label}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Nav dots */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <button onClick={() => go(-1)} className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Previous">
            <ChevronLeft className="w-3 h-3" />
          </button>
          {screens.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === active ? "bg-accent-commercial" : "bg-muted-foreground/30"}`}
              aria-label={`Screen ${i + 1}`}
            />
          ))}
          <button onClick={() => go(1)} className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground" aria-label="Next">
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Text */}
      <div className="min-w-0">
        <span className="inline-block bg-accent-commercial text-primary-foreground px-1.5 py-0.5 text-[9px] font-bold font-mono uppercase tracking-wider mb-1">
          Coming Soon
        </span>
        <p className="text-xs font-medium text-foreground leading-tight">SpätiMobil App</p>
        <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
          Bald als iOS & Android App
        </p>
        <p className="text-[10px] text-muted-foreground/60 mt-1 font-mono">
          {screens[active].label}
        </p>
      </div>
    </motion.div>
  );
};

export default PhoneCarousel;
