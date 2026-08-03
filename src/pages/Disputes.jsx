import { CheckCircle2, MessageSquareWarning } from "lucide-react";
import Topbar from "../components/Topbar";
import Badge from "../components/Badge";
import { litiges } from "../data/mockData";

export default function Disputes() {
  const ouverts = litiges.filter((l) => l.statut !== "Résolu").length;

  return (
    <>
      <Topbar
        title="Litiges & signalements"
        subtitle={`${ouverts} dossier(s) nécessitant une action`}
      />

      <div className="p-8 space-y-4">
        {litiges.map((l) => (
          <div
            key={l.id}
            className="bg-white rounded-2xl border border-parchment/70 p-5 flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div
                className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                  l.priorite === "Haute"
                    ? "bg-crimson-glow text-crimson"
                    : l.priorite === "Moyenne"
                    ? "bg-[#d69a3a1f] text-gold"
                    : "bg-teal-glow text-teal"
                }`}
              >
                <MessageSquareWarning size={18} />
              </div>
              <div>
                <p className="font-semibold text-ink">{l.sujet}</p>
                <p className="text-xs text-ink/45 mt-1">
                  {l.type} · concerne {l.concernant} · signalé le{" "}
                  {new Date(l.signale).toLocaleDateString("fr-FR")}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge>{l.priorite}</Badge>
                  <Badge>{l.statut}</Badge>
                </div>
              </div>
            </div>

            {l.statut !== "Résolu" && (
              <button className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-ink text-sand text-xs font-semibold hover:bg-ink-soft transition-colors">
                <CheckCircle2 size={14} />
                Marquer résolu
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}