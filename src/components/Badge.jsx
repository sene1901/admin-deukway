const palettes = {
  // vert/teal — états positifs
  Actif: "bg-teal-glow text-teal",
  Publiée: "bg-teal-glow text-teal",
  Réussi: "bg-teal-glow text-teal",
  Résolu: "bg-teal-glow text-teal",
  Vérifié: "bg-teal-glow text-teal",

  // ambre — en attente
  "En attente": "bg-gold/10 text-gold",
  "En cours": "bg-gold/10 text-gold",

  // rouge — négatif / alerte
  Suspendu: "bg-crimson-glow text-crimson",
  Suspendue: "bg-crimson-glow text-crimson",
  Signalée: "bg-crimson-glow text-crimson",
  Échoué: "bg-crimson-glow text-crimson",
  Ouvert: "bg-crimson-glow text-crimson",
  Haute: "bg-crimson-glow text-crimson",

  Moyenne: "bg-gold/10 text-gold",
  Basse: "bg-teal-glow text-teal",
};

export default function Badge({ children }) {
  const style = palettes[children] || "bg-sand-dim text-ink/60";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}
    >
      {children}
    </span>
  );
}