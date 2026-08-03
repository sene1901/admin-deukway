import Topbar from "../components/Topbar";
import { paiements } from "../data/Mockdata.js";

function formatFCFA(n) {
  return new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
}

// Style des pastilles pour la méthode de paiement ("Via")
const methodeBadge = {
  Wave: "bg-teal/10 text-teal",
  "Orange Money": "bg-gold/10 text-gold",
  "Free Money": "bg-terracotta/10 text-terracotta",
  "Carte bancaire": "bg-clay/10 text-clay",
};

// Libellé court pour "Via" (comme dans la maquette : "Orange" au lieu de "Orange Money")
const methodeLabel = {
  Wave: "Wave",
  "Orange Money": "Orange",
  "Free Money": "Free Money",
  "Carte bancaire": "Carte",
};

// Statut affiché + couleur (statut brut "Réussi" -> affiché "Confirmé")
const statutStyle = {
  Réussi: { label: "Confirmé", classe: "bg-teal/10 text-teal" },
  "En attente": { label: "En attente", classe: "bg-gold/10 text-gold" },
  Échoué: { label: "Échoué", classe: "bg-crimson/10 text-crimson" },
};

export default function Payments() {
  const paiementsReussis = paiements.filter((p) => p.statut === "Réussi");

  const revenusMois = paiementsReussis.reduce((acc, p) => acc + p.montant, 0);

  const commissions = paiements
    .filter((p) => p.type === "Commission agence" && p.statut === "Réussi")
    .reduce((acc, p) => acc + p.montant, 0);

  const totalTransactions = paiements.length;

  return (
    <>
      <Topbar
        title="Paiements & transactions"
        subtitle={`${formatFCFA(revenusMois)} traités avec succès`}
      />

      <div className="p-8 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-parchment/70">
            <p className="text-xs uppercase tracking-wide text-ink/40 font-semibold">
              Revenus mois
            </p>
            <p className="font-display text-2xl mt-2 text-ink">
              {formatFCFA(revenusMois)}
            </p>
            <p className="text-xs text-teal font-medium mt-1">↑ +18%</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-parchment/70">
            <p className="text-xs uppercase tracking-wide text-ink/40 font-semibold">
              Commissions
            </p>
            <p className="font-display text-2xl mt-2 text-ink">
              {formatFCFA(commissions)}
            </p>
            <p className="text-xs text-teal font-medium mt-1">↑ +12%</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-parchment/70">
            <p className="text-xs uppercase tracking-wide text-ink/40 font-semibold">
              Transactions
            </p>
            <p className="font-display text-2xl mt-2 text-ink">
              {totalTransactions}
            </p>
            <p className="text-xs text-teal font-medium mt-1">↑ +31</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-parchment/70 overflow-hidden">
          <div className="px-6 py-4 border-b border-parchment/70">
            <h3 className="font-display text-lg text-ink">Historique des transactions</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-ink/40 border-b border-parchment/70">
                <th className="px-6 py-3.5 font-semibold">ID</th>
                <th className="px-6 py-3.5 font-semibold">Utilisateur</th>
                <th className="px-6 py-3.5 font-semibold">Type</th>
                <th className="px-6 py-3.5 font-semibold">Montant</th>
                <th className="px-6 py-3.5 font-semibold">Via</th>
                <th className="px-6 py-3.5 font-semibold">Statut</th>
                <th className="px-6 py-3.5 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {paiements.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-parchment/50 last:border-0 hover:bg-sand-dim/50 transition-colors"
                >
                  <td className="px-6 py-4 text-ink/50 font-mono text-xs">{p.id}</td>
                  <td className="px-6 py-4 font-medium text-ink">{p.utilisateur}</td>
                  <td className="px-6 py-4 text-ink/70">{p.type}</td>
                  <td className="px-6 py-4 font-semibold text-ink">
                    {formatFCFA(p.montant)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${methodeBadge[p.methode]}`}
                    >
                      {methodeLabel[p.methode] ?? p.methode}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statutStyle[p.statut]?.classe}`}
                    >
                      {statutStyle[p.statut]?.label ?? p.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-ink/50">
                    {new Date(p.date).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}