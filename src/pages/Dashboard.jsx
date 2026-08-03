import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import {
  kpis,
  revenusParMois,
  repartitionLogements,
  activiteRecente,
} from "../data/Mockdata.js";

const COULEURS_CAMEMBERT = ["#2563eb", "#f59e0b", "#16a34a", "#1e3a8a"];

function formatFCFA(n) {
  return new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
}

export default function Dashboard() {
  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle="Vue d'ensemble de l'activité Deukway"
      />

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <StatCard
            label="Utilisateurs"
            value={kpis.utilisateurs.valeur.toLocaleString("fr-FR")}
            evolution={kpis.utilisateurs.evolution}
            evolutionLabel="124 ce mois"
            delay={0}
          />
          <StatCard
            label="Annonces actives"
            value={kpis.annonces.valeur.toLocaleString("fr-FR")}
            evolution={kpis.annonces.evolution}
            evolutionLabel="32 ce mois"
            delay={60}
          />
          <StatCard
            label="Revenus (mois)"
            value={formatFCFA(kpis.revenus.valeur)}
            evolution={kpis.revenus.evolution}
            evolutionLabel="18% vs mois-1"
            delay={120}
          />
          <StatCard
            label="Visites programmées"
            value={kpis.visites.valeur.toLocaleString("fr-FR")}
            evolution={kpis.visites.evolution}
            evolutionLabel="5 cette semaine"
            delay={180}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-parchment/70">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display text-lg text-ink">Revenus & commissions</h3>
                <p className="text-xs text-ink/45 mt-0.5">Six derniers mois</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenusParMois} margin={{ left: -20, right: 10 }}>
                <defs>
                  <linearGradient id="revenus" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="commissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#16a34a" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#16a34a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 6" stroke="#eee5d6" vertical={false} />
                <XAxis
                  dataKey="mois"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#1c1a1780", fontSize: 12 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#1c1a1780", fontSize: 11 }}
                  tickFormatter={(v) => `${v / 1000000}M`}
                  width={38}
                />
                <Tooltip
                  formatter={(v) => formatFCFA(v)}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #eee5d6",
                    fontSize: 13,
                    fontFamily: "Plus Jakarta Sans",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenus"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fill="url(#revenus)"
                  name="Revenus"
                />
                <Area
                  type="monotone"
                  dataKey="commissions"
                  stroke="#16a34a"
                  strokeWidth={2.5}
                  fill="url(#commissions)"
                  name="Commissions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-parchment/70">
            <h3 className="font-display text-lg text-ink mb-1">Typologie des logements</h3>
            <p className="text-xs text-ink/45 mb-4">Répartition des annonces</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={repartitionLogements}
                  dataKey="valeur"
                  nameKey="type"
                  innerRadius={50}
                  outerRadius={78}
                  paddingAngle={3}
                >
                  {repartitionLogements.map((_, i) => (
                    <Cell key={i} fill={COULEURS_CAMEMBERT[i % COULEURS_CAMEMBERT.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #eee5d6",
                    fontSize: 13,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {repartitionLogements.map((item, i) => (
                <div key={item.type} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: COULEURS_CAMEMBERT[i % COULEURS_CAMEMBERT.length] }}
                    />
                    <span className="text-ink/70">{item.type}</span>
                  </div>
                  <span className="font-semibold text-ink">{item.valeur}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-parchment/70">
          <h3 className="font-display text-lg text-ink mb-4">Activité récente</h3>
          <div className="divide-y divide-parchment/70">
            {activiteRecente.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2 w-2 rounded-full shrink-0 ${
                      item.type === "litige"
                        ? "bg-crimson"
                        : item.type === "paiement"
                        ? "bg-gold"
                        : "bg-teal"
                    }`}
                  />
                  <p className="text-sm text-ink/80">{item.texte}</p>
                </div>
                <span className="text-xs text-ink/40 shrink-0">{item.temps}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}