import { useMemo, useState } from "react";
import { BadgeCheck, Ban, CheckCircle2, MoreVertical } from "lucide-react";
import Topbar from "../components/Topbar";
import Badge from "../components/Badge";
import { utilisateurs } from "../data/Mockdata.js";

const roles = ["Tous", "Locataire", "Propriétaire", "Agence"];

export default function Users() {
  const [role, setRole] = useState("Tous");
  const [query, setQuery] = useState("");

  const filtres = useMemo(() => {
    return utilisateurs.filter((u) => {
      const matchRole = role === "Tous" || u.role === role;
      const matchQuery =
        u.nom.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase());
      return matchRole && matchQuery;
    });
  }, [role, query]);

  return (
    <>
      <Topbar
        title="Utilisateurs"
        subtitle={`${utilisateurs.length} comptes enregistrés`}
      />

      <div className="p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  role === r
                    ? "bg-ink text-sand"
                    : "bg-white border border-parchment text-ink/60 hover:border-ink/20"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Rechercher un utilisateur…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 rounded-full bg-white border border-parchment text-sm w-64 focus:outline-none focus:border-terracotta/40"
          />
        </div>

        <div className="bg-white rounded-2xl border border-parchment/70 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-ink/40 border-b border-parchment/70">
                <th className="px-6 py-3.5 font-semibold">Utilisateur</th>
                <th className="px-6 py-3.5 font-semibold">Rôle</th>
                <th className="px-6 py-3.5 font-semibold">Ville</th>
                <th className="px-6 py-3.5 font-semibold">Inscrit le</th>
                <th className="px-6 py-3.5 font-semibold">Statut</th>
                <th className="px-6 py-3.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtres.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-parchment/50 last:border-0 hover:bg-sand-dim/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-parchment flex items-center justify-center font-display text-sm text-clay shrink-0">
                        {u.nom.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-ink">{u.nom}</p>
                          {u.verifie && (
                            <BadgeCheck size={14} className="text-teal" />
                          )}
                        </div>
                        <p className="text-xs text-ink/45">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-ink/70">{u.role}</td>
                  <td className="px-6 py-4 text-ink/70">{u.ville}</td>
                  <td className="px-6 py-4 text-ink/50">
                    {new Date(u.inscrit).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-6 py-4">
                    <Badge>{u.statut}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        title="Vérifier"
                        className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-teal-glow text-ink/40 hover:text-teal transition-colors"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                      <button
                        title="Suspendre"
                        className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-crimson-glow text-ink/40 hover:text-crimson transition-colors"
                      >
                        <Ban size={16} />
                      </button>
                      <button className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-sand-dim text-ink/40 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtres.length === 0 && (
            <p className="text-center text-sm text-ink/40 py-10">
              Aucun utilisateur ne correspond à ces critères.
            </p>
          )}
        </div>
      </div>
    </>
  );
}