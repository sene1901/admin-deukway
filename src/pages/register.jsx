import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  
  Lock,
  Mail,
  Phone,
  User,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/deukway-icon.png";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [voir, setVoir] = useState(false);
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

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
      await register({ nom, email, telephone, motDePasse });
      navigate("/", { replace: true });
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
            Rejoignez l équipe qui fait tourner Deukway.
          </p>
          <p className="text-sand/55 mt-4 max-w-sm leading-relaxed">
            Créez votre accès administrateur pour gérer utilisateurs,
            annonces, paiements et litiges.
          </p>
        </div>

        <div className="relative flex items-center gap-2.5 text-sand/45 text-sm">
          <ShieldCheck size={16} />
          <span>Connexion sécurisée · Authentification JWT</span>
        </div>
      </div>

      {/* Panneau formulaire */}
      <div className="flex-1 flex items-center justify-center p-8 py-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="h-9 w-9 rounded-lg overflow-hidden">
              <img src={logo} alt="Deukway" className="h-full w-full object-cover" />
            </div>
            <p className="font-display text-lg text-ink">Deukway Admin</p>
          </div>

          <h1 className="font-display text-3xl text-ink tracking-tight">
            Créer un compte
          </h1>
          <p className="text-sm text-ink/50 mt-1.5">
            Renseignez vos informations pour obtenir un accès admin.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label className="text-xs font-semibold text-ink/60 uppercase tracking-wide">
                Nom complet
              </label>
              <div className="relative mt-1.5">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
                <input
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  placeholder="Aminata Sow"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-parchment text-sm focus:outline-none focus:border-vert/50 focus:ring-4 focus:ring-vert-glow transition-all"
                />
              </div>
            </div>

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
                  placeholder="vous@deukway.sn"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-parchment text-sm focus:outline-none focus:border-vert/50 focus:ring-4 focus:ring-vert-glow transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-ink/60 uppercase tracking-wide">
                Téléphone
              </label>
              <div className="relative mt-1.5">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" />
                <input
                  type="tel"
                  required
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder="+221 77 000 00 00"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-parchment text-sm focus:outline-none focus:border-vert/50 focus:ring-4 focus:ring-vert-glow transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-ink/60 uppercase tracking-wide">
                  Mot de passe
                </label>
                <div className="relative mt-1.5">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35" />
                  <input
                    type={voir ? "text" : "password"}
                    required
                    value={motDePasse}
                    onChange={(e) => setMotDePasse(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-white border border-parchment text-sm focus:outline-none focus:border-vert/50 focus:ring-4 focus:ring-vert-glow transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setVoir((v) => !v)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink/35 hover:text-ink/60"
                  >
                    {voir ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink/60 uppercase tracking-wide">
                  Confirmer
                </label>
                <div className="relative mt-1.5">
                  <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35" />
                  <input
                    type={voir ? "text" : "password"}
                    required
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white border border-parchment text-sm focus:outline-none focus:border-vert/50 focus:ring-4 focus:ring-vert-glow transition-all"
                  />
                </div>
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
              {chargement ? "Création en cours…" : "Créer mon compte"}
            </button>
          </form>

          <p className="text-center text-sm text-ink/50 mt-6">
            Déjà un compte ?{" "}
            <Link to="/connexion" className="text-vert font-semibold hover:text-vert-dim">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
