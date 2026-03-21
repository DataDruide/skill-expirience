import { motion } from "framer-motion";

const LiveDashboard = () => {
  return (
    <div className="border-y border-subtle bg-secondary/20">
      <div className="container-strict py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 border border-subtle bg-background/50">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-impact animate-pulse-dot" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Spätimobil
              </span>
            </div>
            <span className="text-[10px] font-mono text-accent-commercial">
              Nächste Lieferung: Fr–So 22:00
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 border border-subtle bg-background/50">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-impact animate-pulse-dot" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Pflegefond
              </span>
            </div>
            <span className="text-[10px] font-mono text-accent-impact">
              Impact: Familien werden unterstützt
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;
