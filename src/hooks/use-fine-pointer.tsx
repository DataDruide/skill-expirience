import { useEffect, useState } from "react";

/**
 * True only on devices with a precise pointer (mouse/trackpad) and hover
 * capability. Used to disable cursor-driven effects on touch devices.
 */
export function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return fine;
}
