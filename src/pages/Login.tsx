import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Helmet>
        <title>Admin Login – Marcel Zimmermann</title>
        <meta name="description" content="Login zum Admin-Bereich des Portfolios von Marcel Zimmermann." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://code-craft-impact.lovable.app/login" />
        <meta property="og:title" content="Admin Login – Marcel Zimmermann" />
        <meta property="og:description" content="Login zum Admin-Bereich." />
        <meta property="og:url" content="https://code-craft-impact.lovable.app/login" />
      </Helmet>
      <div className="w-full max-w-sm p-8 border border-subtle bg-secondary/20">
        <h1 className="font-display font-black text-2xl uppercase tracking-tight mb-6 text-foreground">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="login-email" className="sr-only">E-Mail</label>
          <Input
            id="login-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background border-foreground/10 text-foreground rounded-none"
          />
          <label htmlFor="login-password" className="sr-only">Passwort</label>
          <Input
            id="login-password"
            type="password"
            placeholder="Passwort"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-background border-foreground/10 text-foreground rounded-none"
          />

          {error && (
            <p className="text-xs text-destructive font-mono">{error}</p>
          )}

          <Button variant="hero" size="lg" type="submit" disabled={loading} className="w-full">
            {loading ? "..." : "Einloggen"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
