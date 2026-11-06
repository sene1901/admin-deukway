import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/deukway-icon.png";

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [code, setCode] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [voir, setVoir] = useState(false);
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);
  const [reussi, setReussi] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErreur("");

    if (motDePasse.length < 6) {
      setErreur("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (motDePasse !== confirmation) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    setChargement(true);
    try {
      await resetPassword(email, code, motDePasse);
      setReussi(true);
      setTimeout(() => navigate("/connexion", { replace: true }), 1800);
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
              "radial-gradient(circle at 20% 20%, #22a06b 0%, transparent 40%), radial-gradient(circle at 80% 70%, #1b8558 0%, transparent 45%)",
          }}
        />
        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg overflow-hidden">
            <img src={logo} alt="Deukway" className="h-full w-full object-cover" />
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
            Un nouveau départ, un nouveau mot de passe.
          </p>
          <p className="text-sand/55 mt-4 max-w-sm leading-relaxed">
            Entrez le code reçu et choisissez un nouveau mot de passe
            sécurisé.
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
          <Link
            to="/mot-de-passe-oublie"
            className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink mb-8"
          >
            <ArrowLeft size={15} />
            Retour
          </Link>

          {!reussi ? (
            <>
              <h1 className="font-display text-3xl text-ink tracking-tight">
                Réinitialiser le mot de passe
              </h1>
              <p className="text-sm text-ink/50 mt-1.5">
                Entrez le code reçu ainsi que votre nouveau mot de passe.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-4">
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
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-parchment text-sm focus:outline-none focus:border-vert/50 focus:ring-4 focus:ring-vert-glow transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink/60 uppercase tracking-wide">
                    Code de vérification
                  </label>
                  <div className="relative mt-1.5">
                    <KeyRound size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="123456"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-parchment text-sm tracking-[0.3em] focus:outline-none focus:border-vert/50 focus:ring-4 focus:ring-vert-glow transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-ink/60 uppercase tracking-wide">
                    Nouveau mot de passe
                  </label>
                  <div className="relative mt-1.5">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
                    <input
                      type={voir ? "text" : "password"}
                      required
                      value={motDePasse}
                      onChange={(e) => setMotDePasse(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-parchment text-sm focus:outline-none focus:border-vert/50 focus:ring-4 focus:ring-vert-glow transition-all"
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

                <div>
                  <label className="text-xs font-semibold text-ink/60 uppercase tracking-wide">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative mt-1.5">
                    <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
                    <input
                      type={voir ? "text" : "password"}
                      required
                      value={confirmation}
                      onChange={(e) => setConfirmation(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-parchment text-sm focus:outline-none focus:border-vert/50 focus:ring-4 focus:ring-vert-glow transition-all"
                    />
                  </div>
                </div>

                {erreur && (
                  <div className="px-3.5 py-2.5 rounded-xl bg-crimson-glow text-crimson text-sm font-medium">
                    {erreur}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={chargement}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-vert text-sand text-sm font-semibold hover:bg-vert-dim transition-colors disabled:opacity-70"
                >
                  {chargement && <Loader2 size={16} className="animate-spin" />}
                  {chargement ? "Réinitialisation…" : "Réinitialiser le mot de passe"}
                </button>
              </form>
            </>
          ) : (
            <div className="animate-rise">
              <div className="h-12 w-12 rounded-2xl bg-teal-glow flex items-center justify-center mb-5">
                <CheckCircle2 size={22} className="text-teal" />
              </div>
              <h1 className="font-display text-3xl text-ink tracking-tight">
                Mot de passe mis à jour
              </h1>
              <p className="text-sm text-ink/50 mt-1.5">
                Redirection vers la page de connexion…
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
