import { useMemo, useState } from "react";
import { BadgeCheck, CheckCircle2, PauseCircle, Trash2 } from "lucide-react";
import Topbar from "../components/Topbar";
import Badge from "../components/Badge";
import { annonces } from "../data/mockData";

const types = ["Toutes", "Chambre", "Studio", "Colocation", "Appartement"];

function formatFCFA(n) {
  return new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
}

export default function Annonces() {
  const [type, setType] = useState("Toutes");

  const filtres = useMemo(
    () => annonces.filter((a) => type === "Toutes" || a.type === type),
    [type]
  );

  return (
    <>
      <Topbar
        title="Annonces"
        subtitle={`${annonces.length} annonces au total`}
      />

      <div className="p-8 space-y-5">
        <div className="flex gap-2 flex-wrap">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                type === t
                  ? "bg-ink text-sand"
                  : "bg-white border border-parchment text-ink/60 hover:border-ink/20"
              }`} 
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtres.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-2xl border border-parchment/70 p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-display text-lg text-ink">{a.titre}</p>
                    {a.verifiee && <BadgeCheck size={15} className="text-teal shrink-0" />}
                  </div>
                  <p className="text-xs text-ink/45 mt-0.5">
                    {a.quartier}, {a.ville} · {a.id}
                  </p>
                </div>
                <Badge>{a.statut}</Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="px-2.5 py-1 rounded-full bg-sand-dim text-ink/60 text-xs font-medium">
                  {a.type}
                </span>
                <span className="font-display text-lg text-terracotta">
                  {formatFCFA(a.prix)}
                  <span className="text-xs text-ink/40 font-sans"> /mois</span>
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-parchment/70">
                <p className="text-xs text-ink/45">
                  Par <span className="text-ink/70 font-medium">{a.proprietaire}</span>
                </p>
                <div className="flex items-center gap-1">
                  <button
                    title="Valider"
                    className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-teal-glow text-ink/40 hover:text-teal transition-colors"
                  >
                    <CheckCircle2 size={16} />
                  </button>
                  <button
                    title="Suspendre"
                    className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-[#d69a3a1f] text-ink/40 hover:text-gold transition-colors"
                  >
                    <PauseCircle size={16} />
                  </button>
                  <button
                    title="Supprimer"
                    className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-crimson-glow text-ink/40 hover:text-crimson transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtres.length === 0 && (
          <p className="text-center text-sm text-ink/40 py-10">
            Aucune annonce dans cette catégorie.
          </p>
        )}
      </div>
    </>
  );
}