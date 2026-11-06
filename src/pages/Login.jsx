import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Home, Lock, Mail, ShieldCheck, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [voir, setVoir] = useState(false);
  const [seSouvenir, setSeSouvenir] = useState(true);
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErreur("");
    setChargement(true);
    try {
      await login(email, motDePasse);
      navigate(from, { replace: true });
    } catch (err) {
      setErreur(err.message || "Une erreur est survenue.");
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-sand">
      {/* Panneau de marque */}
      <div className="hidden lg:flex lg:w-[44%] bg-ink text-sand relative overflow-hidden flex-col justify-between p-12">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #c1502e 0%, transparent 40%), radial-gradient(circle at 80% 70%, #d69a3a 0%, transparent 45%)",
          }}
        />
        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-terracotta flex items-center justify-center">
            <Home size={19} strokeWidth={2.5} className="text-sand" />
          </div>
          <div>
            <p className="font-display text-xl leading-none">Deukway</p>
            <p className="text-[11px] uppercase tracking-[0.14em] text-sand/40 mt-1">
              Espace Admin
            </p>
          </div>
        </div>

        <div className="relative">
          <p className="font-display text-4xl leading-[1.15] max-w-md">
            Le logement, en toute confiance.
          </p>
          <p className="text-sand/55 mt-4 max-w-sm leading-relaxed">
            Gérez les utilisateurs, annonces, paiements et litiges de la
            plateforme depuis un seul tableau de bord.
          </p>
        </div>

        <div className="relative flex items-center gap-2.5 text-sand/45 text-sm">
          <ShieldCheck size={16} />
          <span>Connexion sécurisée · Authentification JWT</span>
        </div>
      </div>

      {/* Panneau formulaire */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="h-9 w-9 rounded-lg bg-terracotta flex items-center justify-center">
              <Home size={17} strokeWidth={2.5} className="text-sand" />
            </div>
            <p className="font-display text-lg text-ink">Deukway Admin</p>
          </div>

          <h1 className="font-display text-3xl text-ink tracking-tight">
            Connexion
          </h1>
          <p className="text-sm text-ink/50 mt-1.5">
            Entrez vos identifiants pour accéder au tableau de bord.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-semibold text-ink/60 uppercase tracking-wide">
                Email
              </label>
              <div className="relative mt-1.5">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@deukway.sn"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-parchment text-sm focus:outline-none focus:border-terracotta/50 focus:ring-4 focus:ring-terracotta-glow transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-ink/60 uppercase tracking-wide">
                  Mot de passe
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-terracotta hover:text-terracotta-dim"
                >
                  Oublié ?
                </button>
              </div>
              <div className="relative mt-1.5">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
                <input
                  type={voir ? "text" : "password"}
                  required
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-parchment text-sm focus:outline-none focus:border-terracotta/50 focus:ring-4 focus:ring-terracotta-glow transition-all"
                />
                <button
                  type="button"
                  onClick={() => setVoir((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/35 hover:text-ink/60"
                >
                  {voir ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {erreur && (
              <div className="px-3.5 py-2.5 rounded-xl bg-crimson-glow text-crimson text-sm font-medium">
                {erreur}
              </div>
            )}

            <label className="flex items-center gap-2 text-sm text-ink/60 pt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={seSouvenir}
                onChange={(e) => setSeSouvenir(e.target.checked)}
                className="h-4 w-4 rounded border-parchment accent-terracotta"
              />
              Se souvenir de moi
            </label>

            <button
              type="submit"
              disabled={chargement}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-terracotta text-sand text-sm font-semibold hover:bg-terracotta-dim transition-colors disabled:opacity-70"
            >
              {chargement && <Loader2 size={16} className="animate-spin" />}
              {chargement ? "Connexion en cours…" : "Se connecter"}
            </button>
          </form>

          <div className="mt-6 px-4 py-3 rounded-xl bg-sand-dim text-xs text-ink/50 leading-relaxed">
            <span className="font-semibold text-ink/70">Démo :</span>{" "}
            admin@deukway.sn · admin1234
          </div>
        </div>
      </div>
    </div>
  );
}
