import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  label,
  value,
  evolution,
  evolutionLabel, // ex: "124 ce mois", "18% vs mois-1", "5 cette semaine"
  delay = 0,
}) {
  const positive = evolution >= 0;
  return (
    <div
      className="animate-rise bg-white rounded-xl p-5 border border-parchment/70"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-xs uppercase tracking-wide text-ink/40 font-semibold">
        {label}
      </p>
      <p className="font-display text-2xl mt-2 tracking-tight text-ink">{value}</p>
      <div
        className={`flex items-center gap-1 mt-2 text-xs font-medium ${
          positive ? "text-teal" : "text-crimson"
        }`}
      >
        {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
        <span>{positive ? "+" : "-"}{evolutionLabel}</span>
      </div>
    </div>
  );
}