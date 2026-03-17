import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Eye, EyeOff, LogOut, ArrowLeft, GripVertical, Save, MessageSquare, LayoutList } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import AdminRequests from "@/components/AdminRequests";

type Project = Tables<"projects">;

const AdminPage = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "requests">("projects");

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user!.id)
      .order("sort_order", { ascending: true });
    if (data) setProjects(data);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const path = `${user!.id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("project-images").upload(path, file);
    if (error) throw error;
    const { data: { publicUrl } } = supabase.storage.from("project-images").getPublicUrl(path);
    return publicUrl;
  };

  const handleSave = async () => {
    if (!editing || !user) return;
    setLoading(true);

    try {
      let imageUrl = editing.image_url;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const projectData = {
        ...editing,
        image_url: imageUrl,
        user_id: user.id,
        features: editing.features || [],
        tech_stack: editing.tech_stack || [],
        live_stats: editing.live_stats || {},
      };

      if (editing.id) {
        await supabase.from("projects").update(projectData).eq("id", editing.id);
      } else {
        await supabase.from("projects").insert(projectData as any);
      }

      setEditing(null);
      setImageFile(null);
      fetchProjects();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Projekt wirklich löschen?")) return;
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  };

  const toggleVisibility = async (project: Project) => {
    await supabase.from("projects").update({ is_visible: !project.is_visible }).eq("id", project.id);
    fetchProjects();
  };

  const handleFeaturesChange = (val: string) => {
    try {
      const parsed = JSON.parse(val);
      setEditing({ ...editing, features: parsed });
    } catch {
      // Keep raw string while user types
    }
  };

  if (authLoading) return <div className="min-h-screen bg-background" />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-subtle">
        <div className="container-strict py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h1 className="font-display font-black text-lg uppercase tracking-wider">
              Projektverwaltung
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted-foreground">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container-strict py-8">
        {/* Tabs */}
        {!editing && (
          <div className="flex gap-1 mb-8 border-b border-subtle">
            <button
              onClick={() => setActiveTab("projects")}
              className={`px-4 py-2.5 text-xs font-mono uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 -mb-px ${
                activeTab === "projects"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutList className="h-3.5 w-3.5" />
              Projekte
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`px-4 py-2.5 text-xs font-mono uppercase tracking-widest transition-colors flex items-center gap-2 border-b-2 -mb-px ${
                activeTab === "requests"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Anfragen
            </button>
          </div>
        )}

        {/* Requests Tab */}
        {!editing && activeTab === "requests" && <AdminRequests />}

        {/* Project List */}
        {!editing && activeTab === "projects" && (
          <div className="space-y-4">
            <Button variant="hero" size="lg" onClick={() => setEditing({ accent_color: "yellow", sort_order: projects.length })}>
              <Plus className="h-4 w-4 mr-2" />
              Neues Projekt
            </Button>

            <div className="space-y-2 mt-6">
              {projects.map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-4 border border-subtle bg-secondary/20 hover:bg-secondary/40 transition-colors">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  {p.image_url && (
                    <img src={p.image_url} alt={p.title} className="h-12 w-20 object-cover" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm uppercase tracking-wider truncate">{p.title}</p>
                    <p className="text-xs text-muted-foreground font-mono truncate">{p.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => toggleVisibility(p)} className="text-muted-foreground hover:text-foreground transition-colors">
                      {p.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    <button onClick={() => setEditing(p)} className="text-muted-foreground hover:text-foreground transition-colors">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              {projects.length === 0 && (
                <p className="text-sm text-muted-foreground font-mono py-8 text-center">
                  Noch keine Projekte. Erstelle dein erstes!
                </p>
              )}
            </div>
          </div>
        )}

        {/* Edit Form */}
        {editing && (
          <div className="space-y-6 max-w-2xl">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-black text-xl uppercase tracking-wider">
                {editing.id ? "Projekt bearbeiten" : "Neues Projekt"}
              </h2>
              <button onClick={() => { setEditing(null); setImageFile(null); }} className="text-muted-foreground hover:text-foreground text-xs font-mono uppercase tracking-widest">
                Abbrechen
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Titel *</label>
                <Input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="bg-background border-foreground/10 rounded-none" />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Untertitel</label>
                <Input value={editing.subtitle || ""} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} className="bg-background border-foreground/10 rounded-none" />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Challenge</label>
                <Textarea value={editing.challenge || ""} onChange={(e) => setEditing({ ...editing, challenge: e.target.value })} className="bg-background border-foreground/10 rounded-none min-h-[80px]" />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Beschreibung</label>
                <Textarea value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="bg-background border-foreground/10 rounded-none min-h-[100px]" />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Features (JSON Array)</label>
                <Textarea
                  value={typeof editing.features === "string" ? editing.features : JSON.stringify(editing.features || [], null, 2)}
                  onChange={(e) => handleFeaturesChange(e.target.value)}
                  placeholder='["Feature 1", "Feature 2"]'
                  className="bg-background border-foreground/10 rounded-none min-h-[80px] font-mono text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Tech-Stack (kommagetrennt)</label>
                <Input
                  value={(editing.tech_stack || []).join(", ")}
                  onChange={(e) => setEditing({ ...editing, tech_stack: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                  placeholder="React, Node.js, TypeScript"
                  className="bg-background border-foreground/10 rounded-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Live URL</label>
                <Input value={editing.live_url || ""} onChange={(e) => setEditing({ ...editing, live_url: e.target.value })} placeholder="https://..." className="bg-background border-foreground/10 rounded-none" />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Projekt-Bild</label>
                <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="text-xs text-muted-foreground font-mono" />
                {editing.image_url && !imageFile && (
                  <img src={editing.image_url} alt="Preview" className="mt-2 h-24 object-cover" />
                )}
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Akzentfarbe</label>
                <select
                  value={editing.accent_color || "yellow"}
                  onChange={(e) => setEditing({ ...editing, accent_color: e.target.value })}
                  className="bg-background border border-foreground/10 text-foreground px-3 py-2 text-sm rounded-none w-full"
                >
                  <option value="yellow">Gelb (Commercial)</option>
                  <option value="green">Grün (Impact)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Testimonial Zitat</label>
                <Textarea value={editing.testimonial_quote || ""} onChange={(e) => setEditing({ ...editing, testimonial_quote: e.target.value })} className="bg-background border-foreground/10 rounded-none min-h-[60px]" />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Testimonial Autor</label>
                <Input value={editing.testimonial_author || ""} onChange={(e) => setEditing({ ...editing, testimonial_author: e.target.value })} className="bg-background border-foreground/10 rounded-none" />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1 block">Sortierung</label>
                <Input type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: parseInt(e.target.value) })} className="bg-background border-foreground/10 rounded-none w-24" />
              </div>

              <Button variant="hero" size="lg" onClick={handleSave} disabled={loading || !editing.title}>
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Speichert..." : "Speichern"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
