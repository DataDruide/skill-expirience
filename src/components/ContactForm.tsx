import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name ist erforderlich").max(100),
  email: z.string().trim().email("Ungültige E-Mail-Adresse").max(255),
  company: z.string().trim().max(100).optional(),
  project_id: z.string().uuid().nullable().optional(),
  message: z.string().trim().min(10, "Mindestens 10 Zeichen").max(2000),
});

type ProjectOption = { id: string; title: string };

const ContactForm = () => {
  const [projects, setProjects] = useState<ProjectOption[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    project_id: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("id, title")
        .eq("is_visible", true)
        .order("sort_order", { ascending: true });
      if (data) setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = contactSchema.safeParse({
      ...form,
      project_id: form.project_id || null,
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("contact_requests").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      project_id: parsed.data.project_id || null,
      message: parsed.data.message,
    });

    setLoading(false);
    if (!error) {
      setSuccess(true);
      setForm({ name: "", email: "", company: "", project_id: "", message: "" });
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-accent-impact/30 bg-accent-impact/5 p-8 text-center space-y-4"
      >
        <CheckCircle className="h-8 w-8 text-accent-impact mx-auto" />
        <h3 className="font-display font-bold text-lg uppercase tracking-wider">
          Anfrage gesendet!
        </h3>
        <p className="text-sm text-muted-foreground">
          Ich melde mich innerhalb von 24 Stunden bei dir.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
        >
          Weitere Anfrage senden
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Name *
          </label>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Max Mustermann"
            className="bg-secondary/40 border-foreground/10 rounded-none h-11 placeholder:text-muted-foreground/40"
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            E-Mail *
          </label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="max@firma.de"
            className="bg-secondary/40 border-foreground/10 rounded-none h-11 placeholder:text-muted-foreground/40"
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Unternehmen
          </label>
          <Input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Firma GmbH"
            className="bg-secondary/40 border-foreground/10 rounded-none h-11 placeholder:text-muted-foreground/40"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Projekt-Interesse
          </label>
          <select
            value={form.project_id}
            onChange={(e) => setForm({ ...form, project_id: e.target.value })}
            className="w-full h-11 bg-secondary/40 border border-foreground/10 text-foreground px-3 text-sm rounded-none focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Allgemeine Anfrage</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Nachricht *
        </label>
        <Textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Erzähl mir von deinem Projekt..."
          className="bg-secondary/40 border-foreground/10 rounded-none min-h-[120px] placeholder:text-muted-foreground/40 resize-none"
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
      </div>

      <Button
        type="submit"
        variant="hero"
        size="lg"
        disabled={loading}
        className="w-full sm:w-auto"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Send className="h-4 w-4 mr-2" />
        )}
        {loading ? "Wird gesendet..." : "Anfrage senden"}
      </Button>
    </form>
  );
};

export default ContactForm;
