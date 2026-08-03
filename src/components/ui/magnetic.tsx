import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useRef, ReactNode, PointerEvent } from "react";
import { useFinePointer } from "@/hooks/use-fine-pointer";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Wraps children in a subtle magnetic hover effect – the element eases
 * toward the cursor while inside its bounds. Disabled on touch devices
 * and with reduced-motion.
 */
const Magnetic = ({ children, strength = 0.35, className }: MagneticProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const enabled = fine && !reduce;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 });

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
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
      style={{ x: sx, y: sy, touchAction: "manipulation" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
