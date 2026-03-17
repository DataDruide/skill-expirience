import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Building2, FolderOpen, Check, Clock } from "lucide-react";

type ContactRequest = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  project_id: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
  project_title?: string;
};

const AdminRequests = () => {
  const [requests, setRequests] = useState<ContactRequest[]>([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const { data } = await supabase
      .from("contact_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      // Fetch project titles for requests with project_id
      const projectIds = [...new Set(data.filter(r => r.project_id).map(r => r.project_id))];
      let projectMap: Record<string, string> = {};

      if (projectIds.length > 0) {
        const { data: projects } = await supabase
          .from("projects")
          .select("id, title")
          .in("id", projectIds as string[]);
        if (projects) {
          projectMap = Object.fromEntries(projects.map(p => [p.id, p.title]));
        }
      }

      setRequests(data.map(r => ({
        ...r,
        project_title: r.project_id ? projectMap[r.project_id] : undefined,
      })));
    }
  };

  const markAsRead = async (id: string) => {
    await supabase.from("contact_requests").update({ is_read: true }).eq("id", id);
    setRequests(prev => prev.map(r => r.id === id ? { ...r, is_read: true } : r));
  };

  const unreadCount = requests.filter(r => !r.is_read).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="font-display font-black text-lg uppercase tracking-wider">
          Anfragen
        </h2>
        {unreadCount > 0 && (
          <span className="bg-accent-commercial text-background text-xs font-mono font-bold px-2 py-0.5">
            {unreadCount} neu
          </span>
        )}
      </div>

      {requests.length === 0 ? (
        <p className="text-sm text-muted-foreground font-mono py-8 text-center">
          Noch keine Anfragen eingegangen.
        </p>
      ) : (
        <div className="space-y-2">
          {requests.map((r) => (
            <div
              key={r.id}
              className={`border p-4 transition-colors ${
                r.is_read
                  ? "border-subtle bg-secondary/10"
                  : "border-accent-commercial/30 bg-accent-commercial/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-display font-bold text-sm uppercase tracking-wider">
                      {r.name}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {r.email}
                    </span>
                    {r.company && (
                      <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {r.company}
                      </span>
                    )}
                  </div>

                  {r.project_title && (
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-accent-commercial bg-accent-commercial/10 px-2 py-0.5">
                      <FolderOpen className="h-3 w-3" />
                      {r.project_title}
                    </span>
                  )}

                  <p className="text-sm text-foreground/80 leading-relaxed">{r.message}</p>

                  <p className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(r.created_at).toLocaleString("de-DE")}
                  </p>
                </div>

                {!r.is_read && (
                  <button
                    onClick={() => markAsRead(r.id)}
                    className="text-muted-foreground hover:text-accent-impact transition-colors shrink-0"
                    title="Als gelesen markieren"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
