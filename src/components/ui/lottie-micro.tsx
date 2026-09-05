import { Lottie } from "lottie-react";
import { useReducedMotion } from "framer-motion";

/**
 * Dezente Lottie-Micro-Interactions.
 * Bei `prefers-reduced-motion: reduce` wird gar nichts gerendert.
 */

const pulseRing = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 60,
  w: 64,
  h: 64,
  nm: "pulse",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "ring",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [65], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
            { t: 60, s: [0] },
          ],
        },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [32, 32, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            { t: 0, s: [35, 35], i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] } },
            { t: 60, s: [105, 105] },
          ],
        },
      },
      ao: 0,
      shapes: [
        { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [48, 48] }, d: 1, nm: "el" },
        {
          ty: "st",
          c: { a: 0, k: [0.55, 0.55, 0.55, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 4 },
          lc: 2,
          lj: 1,
          nm: "stroke",
        },
        {
          ty: "tr",
          p: { a: 0, k: [0, 0] },
          a: { a: 0, k: [0, 0] },
          s: { a: 0, k: [100, 100] },
          r: { a: 0, k: 0 },
          o: { a: 0, k: 100 },
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
      bm: 0,
    },
  ],
} as const;

const scanLine = {
  v: "5.7.4",
  fr: 60,
  ip: 0,
  op: 90,
  w: 120,
  h: 24,
  nm: "scan",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "dot",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [0], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
            { t: 20, s: [80], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
            { t: 70, s: [80], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
            { t: 90, s: [0] },
          ],
        },
        r: { a: 0, k: 0 },
        p: {
          a: 1,
          k: [
            { t: 0, s: [4, 12, 0], i: { x: 0.3, y: 1 }, o: { x: 0.7, y: 0 }, to: [0, 0, 0], ti: [0, 0, 0] },
            { t: 90, s: [116, 12, 0] },
          ],
        },
        a: { a: 0, k: [0, 0, 0] },
        s: { a: 0, k: [100, 100] },
      },
      ao: 0,
      shapes: [
        { ty: "el", p: { a: 0, k: [0, 0] }, s: { a: 0, k: [6, 6] }, d: 1, nm: "el" },
        { ty: "fl", c: { a: 0, k: [0.55, 0.55, 0.55, 1] }, o: { a: 0, k: 100 }, nm: "fill" },
        {
          ty: "tr",
          p: { a: 0, k: [0, 0] },
          a: { a: 0, k: [0, 0] },
          s: { a: 0, k: [100, 100] },
          r: { a: 0, k: 0 },
          o: { a: 0, k: 100 },
        },
      ],
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
  ],
} as const;

interface LottieMicroProps {
  variant?: "pulse" | "scan";
  className?: string;
  loop?: boolean;
}

const LottieMicro = ({ variant = "pulse", className, loop = true }: LottieMicroProps) => {
  const reduced = useReducedMotion();
  if (reduced) return null;

  const data = variant === "pulse" ? pulseRing : scanLine;

  return (
    <span className={className} aria-hidden="true">
      <Lottie animationData={data as unknown as object} loop={loop} autoplay className="w-full h-full" />
    </span>
  );
};

export default LottieMicro;
