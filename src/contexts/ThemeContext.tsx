import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system";
type Resolved = "light" | "dark";

interface ThemeContextValue {
  mode: ThemeMode;
  resolved: Resolved;
  setMode: (mode: ThemeMode) => void;
  cycleMode: () => void;
}

const STORAGE_KEY = "theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

const systemPrefersDark = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

const readStored = (): ThemeMode => {
  if (typeof window === "undefined") return "system";
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "light" || saved === "dark" || saved === "system" ? saved : "system";
};

const applyTheme = (resolved: Resolved) => {
  const root = document.documentElement;
  root.classList.toggle("dark", resolved === "dark");
  root.classList.toggle("light", resolved === "light");
  root.style.colorScheme = resolved;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<ThemeMode>(readStored);
  const [systemDark, setSystemDark] = useState<boolean>(systemPrefersDark);

  // System-Änderungen live übernehmen
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolved: Resolved = mode === "system" ? (systemDark ? "dark" : "light") : mode;

  useEffect(() => {
    applyTheme(resolved);
  }, [resolved]);

  const setMode = useCallback((next: ThemeMode) => {
    localStorage.setItem(STORAGE_KEY, next);
    setModeState(next);
  }, []);

  const cycleMode = useCallback(() => {
    setModeState((prev) => {
      const order: ThemeMode[] = ["light", "dark", "system"];
      const next = order[(order.indexOf(prev) + 1) % order.length];
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ mode, resolved, setMode, cycleMode }), [mode, resolved, setMode, cycleMode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme muss innerhalb des ThemeProvider verwendet werden");
  return ctx;
};
