import { useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
  separator?: ReactNode;
}

/**
 * Infinite horizontal ticker. With prefers-reduced-motion the track stops
 * animating and degrades to a static, horizontally scrollable list.
 */
const Marquee = ({ items, speed = 40, reverse = false, className, separator }: MarqueeProps) => {
  const reduce = useReducedMotion();

  const renderItems = (ariaHidden: boolean) =>
    items.map((item, i) => (
      <span key={`${item}-${i}`} className="flex items-center gap-6 shrink-0" aria-hidden={ariaHidden || undefined}>
        <span className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
          {item}
        </span>
        <span className="text-accent-commercial" aria-hidden="true">
          {separator ?? "/"}
        </span>
      </span>
    ));

  if (reduce) {
    return (
      <div className={`overflow-x-auto ${className ?? ""}`}>
        <div className="flex items-center gap-6 py-4 px-1">{renderItems(false)}</div>
      </div>
    );
  }

  return (
    <div
      className={`group relative overflow-hidden ${className ?? ""}`}
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex w-max items-center gap-6 py-4 will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-scroll ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {renderItems(false)}
        {renderItems(true)}
      </div>
    </div>
  );
};

export default Marquee;
