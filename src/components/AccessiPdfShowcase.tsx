import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import homeImg from "@/assets/accessipdf-home.png";
import settingsImg from "@/assets/accessipdf-settings.png";
import uploadImg from "@/assets/accessipdf-upload.png";
import reportImg from "@/assets/accessipdf-report.png";
import usersImg from "@/assets/accessipdf-users.png";

const screens = [
  { src: homeImg, label: "Dashboard" },
  { src: reportImg, label: "Report" },
  { src: uploadImg, label: "Upload" },
  { src: settingsImg, label: "Settings" },
  { src: usersImg, label: "Users" },
];

const PhoneMockup = ({ src, alt }: { src: string; alt: string }) => (
  <div className="w-[68px] h-[138px] bg-[hsl(0,0%,8%)] rounded-[0.9rem] p-[2px] shadow-lg shrink-0">
    <div className="w-full h-full rounded-[0.8rem] overflow-hidden bg-[hsl(0,0%,5%)] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[28px] h-[6px] bg-[hsl(0,0%,8%)] rounded-b-md z-10" />
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  </div>
);

const AccessiPdfShowcase = () => {
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
      className="border border-accent-impact/20 bg-accent-impact/5 p-4"
    >
      <div className="flex items-start gap-4">
        {/* Phone carousel */}
        <div className="relative shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <PhoneMockup src={screens[active].src} alt={screens[active].label} />
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <button
              onClick={() => go(-1)}
              className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <div className="flex gap-1">
              {screens.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === active ? "bg-accent-impact" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Screen ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="w-5 h-5 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Text */}
        <div className="min-w-0 pt-1">
          <span className="inline-block bg-accent-impact text-primary-foreground px-1.5 py-0.5 text-[9px] font-bold font-mono uppercase tracking-wider mb-1">
            iOS App
          </span>
          <p className="text-xs font-medium text-foreground leading-tight">AccessiPDF Scanner</p>
          <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
            PDF-Barrierefreiheit prüfen – direkt vom iPhone
          </p>
          <p className="text-[10px] text-muted-foreground/60 mt-1 font-mono">
            {screens[active].label}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default AccessiPdfShowcase;
