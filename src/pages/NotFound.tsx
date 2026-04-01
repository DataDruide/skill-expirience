import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
          Fehler 404
        </p>
        <h1 className="font-display font-black text-7xl md:text-9xl uppercase tracking-tighter text-foreground">
          404
        </h1>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Die Seite <code className="text-xs bg-secondary px-2 py-0.5">{location.pathname}</code> existiert nicht.
        </p>
        <a href="/">
          <Button variant="heroOutline" size="lg">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Startseite
          </Button>
        </a>
      </div>
    </div>
  );
};

export default NotFound;
