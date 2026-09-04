import { Skeleton } from "@/components/ui/skeleton";

/** Lade-Skeleton für eine Projektkarte */
export const ProjectCardSkeleton = () => (
  <div className="border-l-4 border-border p-6 md:p-10 bg-secondary/20" aria-hidden="true">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
      <div className="lg:col-span-3 space-y-4">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-20 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
        </div>
      </div>
      <div className="lg:col-span-2">
        <Skeleton className="w-full aspect-[16/10]" />
      </div>
    </div>
  </div>
);

/** Generisches Listen-Skeleton (Skills, Kontakt) */
export const ListSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <div className="space-y-3" aria-hidden="true">
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} className="h-6 w-full" style={{ opacity: 1 - i * 0.08 }} />
    ))}
  </div>
);

/** Screenreader-Hinweis für Ladezustände */
export const LoadingAnnounce = ({ label }: { label: string }) => (
  <p className="sr-only" role="status" aria-live="polite">
    {label}
  </p>
);
