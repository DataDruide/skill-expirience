import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface RevealTextProps {
  children: string;
  as?: "span" | "div" | "p";
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * Splits text into words and reveals them with a staggered mask-up motion
 * once the container scrolls into view. Preserves whitespace & wrapping.
 */
const RevealText = ({
  children,
  as = "span",
  className,
  delay = 0,
  stagger = 0.06,
  once = true,
}: RevealTextProps) => {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.span;
  const words = children.split(" ");

  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ lineHeight: "inherit" }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%" },
              visible: { y: 0 },
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default RevealText;
