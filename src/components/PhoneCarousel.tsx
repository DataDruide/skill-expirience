import { motion } from "framer-motion";
import spaetimobilAppImg from "@/assets/spaetimobil-app.png";

const PhoneCarousel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex items-center gap-3 p-3 border border-accent-commercial/20 bg-accent-commercial/5"
    >
      {/* Small phone mockup */}
      <div className="relative shrink-0">
        <div className="w-[56px] h-[110px] bg-[hsl(0,0%,8%)] rounded-[0.7rem] p-[2px] shadow-lg">
          <div className="w-full h-full rounded-[0.6rem] overflow-hidden bg-[hsl(0,0%,5%)] relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[24px] h-[5px] bg-[hsl(0,0%,8%)] rounded-b-md z-10" />
            <img
              src={spaetimobilAppImg}
              alt="SpätiMobil App"
              className="w-full h-full object-cover"
            />
          </div>
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
      </div>
    </motion.div>
  );
};

export default PhoneCarousel;
