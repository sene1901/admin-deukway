import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, ShieldCheck, Loader2, MailCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/deukway-icon.png";

export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);
  const [envoye, setEnvoye] = useState(false);
  const [codeDemo, setCodeDemo] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErreur("");
    setChargement(true);
    try {
      const { code } = await requestPasswordReset(email);
      setCodeDemo(code);
      setEnvoye(true);
    } catch (err) {
      setErreur(err.message || "Une erreur est survenue.");
    } finally {
      setChargement(false);
    }
  }

  function continuer() {
    navigate("/reinitialiser-mot-de-passe", {
      state: { email: email.trim().toLowerCase() },
    });
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
            Ça arrive à tout le monde.
          </p>
          <p className="text-sand/55 mt-4 max-w-sm leading-relaxed">
            Indiquez votre email et nous vous enverrons un code pour
            réinitialiser votre mot de passe.
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
            to="/connexion"
            className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-ink mb-8"
          >
            <ArrowLeft size={15} />
            Retour à la connexion
          </Link>

          {!envoye ? (
            <>
              <h1 className="font-display text-3xl text-ink tracking-tight">
                Mot de passe oublié
              </h1>
              <p className="text-sm text-ink/50 mt-1.5">
                Entrez l'email associé à votre compte admin.
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
                  {chargement ? "Envoi en cours…" : "Envoyer le code"}
                </button>
              </form>
            </>
          ) : (
            <div className="animate-rise">
              <div className="h-12 w-12 rounded-2xl bg-teal-glow flex items-center justify-center mb-5">
                <MailCheck size={22} className="text-teal" />
              </div>
              <h1 className="font-display text-3xl text-ink tracking-tight">
                Code envoyé
              </h1>
              <p className="text-sm text-ink/50 mt-1.5">
                Un code de vérification a été envoyé à{" "}
                <span className="font-medium text-ink/80">{email}</span>.
              </p>

              <div className="mt-5 px-4 py-3 rounded-xl bg-sand-dim text-sm text-ink/60 leading-relaxed">
                <span className="font-semibold text-ink/70">Mode démo</span> — aucun
                email réel n'est envoyé. Votre code est :{" "}
                <span className="font-display text-lg text-vert tracking-widest">
                  {codeDemo}
                </span>
              </div>

              <button
                onClick={continuer}
                className="w-full mt-6 py-2.5 rounded-xl bg-vert text-sand text-sm font-semibold hover:bg-vert-dim transition-colors"
              >
                Continuer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
