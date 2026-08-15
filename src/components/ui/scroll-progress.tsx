import { motion, useScroll, useSpring } from "framer-motion";

/** Dünner Fortschrittsbalken am oberen Rand der Seite. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent-commercial via-primary to-accent-impact"
    />
  );
};

export default ScrollProgress;
