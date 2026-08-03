import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";
import { useRef, ReactNode, PointerEvent } from "react";
import { useFinePointer } from "@/hooks/use-fine-pointer";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}

/**
 * 3D tilt effect that reacts to cursor position. Includes a soft glare
 * highlight that tracks the pointer. Disabled on touch devices and with
 * reduced-motion, so scroll/tap gestures never trigger it.
 */
const TiltCard = ({ children, className, max = 8, scale = 1.02 }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduce;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const glareOpacity = useMotionValue(0);

  const spx = useSpring(px, { stiffness: 150, damping: 20 });
  const spy = useSpring(py, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(spy, [0, 1], [max, -max]);
  const rotateY = useTransform(spx, [0, 1], [-max, max]);
  const glareX = useTransform(spx, (v) => `${v * 100}%`);
  const glareY = useTransform(spy, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, hsl(var(--foreground) / 0.18), transparent 55%)`;

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    glareOpacity.set(1);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    glareOpacity.set(0);
  };

  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onPointerDown={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000, touchAction: "pan-y" }}
      whileHover={{ scale }}
      transition={{ scale: { type: "spring", stiffness: 200, damping: 20 } }}
      className={className}
    >
      <div style={{ transform: "translateZ(0)" }} className="relative w-full h-full">
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
          style={{ background: glare, opacity: glareOpacity }}
        />
      </div>
    </motion.div>
  );
};

export default TiltCard;
