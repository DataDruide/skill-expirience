import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useRef, ReactNode, MouseEvent } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}

/**
 * 3D tilt effect that reacts to cursor position. Includes a soft glare
 * highlight that tracks the pointer. Respects reduced-motion & touch.
 */
const TiltCard = ({ children, className, max = 8, scale = 1.02 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const spx = useSpring(px, { stiffness: 150, damping: 20 });
  const spy = useSpring(py, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(spy, [0, 1], [max, -max]);
  const rotateY = useTransform(spx, [0, 1], [-max, max]);
  const glareX = useTransform(spx, (v) => `${v * 100}%`);
  const glareY = useTransform(spy, (v) => `${v * 100}%`);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      whileHover={reduce ? undefined : { scale }}
      transition={{ scale: { type: "spring", stiffness: 200, damping: 20 } }}
      className={className}
    >
      <div style={{ transform: "translateZ(0)" }} className="relative w-full h-full">
        {children}
        {!reduce && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, hsl(var(--foreground) / 0.15), transparent 55%)`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default TiltCard;
