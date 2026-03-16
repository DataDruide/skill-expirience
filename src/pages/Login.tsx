import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        setError("Registrierung erfolgreich! Bitte bestätige deine E-Mail.");
      } else {
        await signIn(email, password);
        navigate("/admin");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-sm p-8 border border-subtle bg-secondary/20">
        <h1 className="font-display font-black text-2xl uppercase tracking-tight mb-6 text-foreground">
          {isSignUp ? "Registrieren" : "Admin Login"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-background border-foreground/10 text-foreground rounded-none"
          />
          <Input
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
            {loading ? "..." : isSignUp ? "Registrieren" : "Einloggen"}
          </Button>
        </form>

        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="mt-4 text-xs text-muted-foreground font-mono hover:text-foreground transition-colors"
        >
          {isSignUp ? "Bereits registriert? Login" : "Noch kein Konto? Registrieren"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
