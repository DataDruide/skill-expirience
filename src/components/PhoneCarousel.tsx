import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import spaetimobilAppImg from "@/assets/spaetimobil-app.png";
import spaetimobilImg from "@/assets/spaetimobil-screenshot.png";

const screens = [
  { src: spaetimobilAppImg, label: "App Home" },
  { src: spaetimobilImg, label: "Webshop" },
];

const PhoneCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % screens.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const go = (dir: number) => {
    setDirection(dir);
    setCurrent((p) => (p + dir + screens.length) % screens.length);
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 120 : -120, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? -120 : 120, opacity: 0, scale: 0.92 }),
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Phone frame */}
      <div className="relative">
        {/* Glow behind phone */}
        <div className="absolute -inset-6 bg-accent-commercial/8 rounded-[3rem] blur-2xl" />

        {/* Phone body */}
        <div className="relative w-[220px] h-[440px] bg-[hsl(0,0%,8%)] rounded-[2.2rem] p-[6px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
          {/* Inner bezel */}
          <div className="w-full h-full rounded-[1.9rem] overflow-hidden bg-[hsl(0,0%,5%)] relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[22px] bg-[hsl(0,0%,8%)] rounded-b-2xl z-20" />

            {/* Screen content */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.img
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                src={screens[current].src}
                alt={screens[current].label}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Bottom bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[100px] h-[4px] bg-white/30 rounded-full z-20" />
          </div>
        </div>

        {/* Nav arrows */}
        <button
          onClick={() => go(-1)}
          className="absolute left-[-2.5rem] top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Vorheriges Bild"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => go(1)}
          className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Nächstes Bild"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-accent-commercial"
                : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Bild ${i + 1}`}
          />
        ))}
      </div>

      {/* Label */}
      <div className="text-center">
        <span className="inline-block bg-accent-commercial text-primary-foreground px-2.5 py-0.5 text-[10px] font-bold font-mono uppercase tracking-widest">
          Coming Soon
        </span>
        <p className="text-xs text-muted-foreground mt-1.5">
          Bald als iOS & Android App
        </p>
      </div>
    </div>
  );
};

export default PhoneCarousel;
