// Données fictives — à remplacer par les appels API NestJS / PostgreSQL

export const kpis = {
  utilisateurs: { valeur: 4821, evolution: 8.4 },
  annonces: { valeur: 1236, evolution: 12.1 },
  revenus: { valeur: 18450000, evolution: 5.7 },  
  visites: { valeur: 962, evolution: -3.2 },
};

export const revenusParMois = [
  { mois: "Fév", revenus: 9200000, commissions: 1150000 },
  { mois: "Mar", revenus: 11800000, commissions: 1420000 },
  { mois: "Avr", revenus: 10650000, commissions: 1300000 },
  { mois: "Mai", revenus: 13200000, commissions: 1610000 },
  { mois: "Juin", revenus: 15100000, commissions: 1890000 },
  { mois: "Juil", revenus: 18450000, commissions: 2260000 },
];

export const repartitionLogements = [
  { type: "Chambres", valeur: 412 },
  { type: "Studios", valeur: 356 },
  { type: "Colocations", valeur: 210 },
  { type: "Appartements", valeur: 258 },
];

export const activiteRecente = [
  { id: 1, texte: "Nouvelle annonce publiée à Sacré-Cœur 3", type: "annonce", temps: "Il y a 6 min" },
  { id: 2, texte: "Paiement de caution confirmé — Aïda Fall", type: "paiement", temps: "Il y a 22 min" },
  { id: 3, texte: "Signalement reçu sur l'annonce #A-1042", type: "litige", temps: "Il y a 1 h" },
  { id: 4, texte: "Compte vérifié — Agence Teranga Immo", type: "utilisateur", temps: "Il y a 2 h" },
  { id: 5, texte: "Visite confirmée — Studio Mermoz", type: "visite", temps: "Il y a 3 h" },
];

export const utilisateurs = [
  { id: "U-2201", nom: "Aïda Fall", email: "aida.fall@mail.com", telephone: "+221 77 123 45 67", ville: "Dakar", role: "Locataire", statut: "Actif", inscrit: "2026-01-14", verifie: true },
  { id: "U-2202", nom: "Moussa Diop", email: "moussa.diop@mail.com", telephone: "+221 76 234 56 78", ville: "Thiès", role: "Propriétaire", statut: "Actif", inscrit: "2026-02-02", verifie: true },
  { id: "U-2203", nom: "Teranga Immo", email: "contact@terangaimmo.sn", telephone: "+221 33 820 11 22", ville: "Dakar", role: "Agence", statut: "En attente", inscrit: "2026-03-19", verifie: false },
  { id: "U-2204", nom: "Fatou Ndiaye", email: "fatou.ndiaye@mail.com", telephone: "+221 70 345 67 89", ville: "Saint-Louis", role: "Locataire", statut: "Suspendu", inscrit: "2026-03-28", verifie: true },
  { id: "U-2205", nom: "Ibrahima Sarr", email: "ibrahima.sarr@mail.com", telephone: "+221 78 456 78 90", ville: "Dakar", role: "Propriétaire", statut: "Actif", inscrit: "2026-04-05", verifie: true },
  { id: "U-2206", nom: "Khadija Ba", email: "khadija.ba@mail.com", telephone: "+221 77 567 89 01", ville: "Mbour", role: "Locataire", statut: "Actif", inscrit: "2026-05-11", verifie: false },
  { id: "U-2207", nom: "Baobab Résidences", email: "hello@baobabres.sn", telephone: "+221 33 900 44 55", ville: "Dakar", role: "Agence", statut: "Actif", inscrit: "2026-05-30", verifie: true },
  { id: "U-2208", nom: "Cheikh Gueye", email: "cheikh.gueye@mail.com", telephone: "+221 76 678 90 12", ville: "Dakar", role: "Locataire", statut: "Actif", inscrit: "2026-06-21", verifie: true },
];

export const annonces = [
  { id: "A-1038", titre: "Studio meublé — Mermoz", type: "Studio", ville: "Dakar", quartier: "Mermoz", prix: 150000, statut: "Publiée", verifiee: true, proprietaire: "Ibrahima Sarr", publie: "2026-06-02" },
  { id: "A-1039", titre: "Chambre en colocation — Sacré-Cœur", type: "Colocation", ville: "Dakar", quartier: "Sacré-Cœur 3", prix: 65000, statut: "Publiée", verifiee: true, proprietaire: "Moussa Diop", publie: "2026-06-10" },
  { id: "A-1040", titre: "Appartement 3 pièces — Plateau", type: "Appartement", ville: "Dakar", quartier: "Plateau", prix: 320000, statut: "En attente", verifiee: false, proprietaire: "Teranga Immo", publie: "2026-06-14" },
  { id: "A-1041", titre: "Chambre simple — Grand Yoff", type: "Chambre", ville: "Dakar", quartier: "Grand Yoff", prix: 45000, statut: "Publiée", verifiee: true, proprietaire: "Baobab Résidences", publie: "2026-06-18" },
  { id: "A-1042", titre: "Studio — Mbour Plage", type: "Studio", ville: "Mbour", quartier: "Mbour Plage", prix: 120000, statut: "Signalée", verifiee: true, proprietaire: "Ibrahima Sarr", publie: "2026-06-22" },
  { id: "A-1043", titre: "Colocation étudiante — Point E", type: "Colocation", ville: "Dakar", quartier: "Point E", prix: 55000, statut: "Publiée", verifiee: false, proprietaire: "Moussa Diop", publie: "2026-07-01" },
  { id: "A-1044", titre: "Appartement 2 pièces — Thiès Nord", type: "Appartement", ville: "Thiès", quartier: "Thiès Nord", prix: 175000, statut: "Suspendue", verifiee: true, proprietaire: "Teranga Immo", publie: "2026-07-08" },
];

export const paiements = [
  { id: "P-5510", utilisateur: "Aïda Fall", type: "Caution", montant: 300000, methode: "Wave", statut: "Réussi", date: "2026-07-24" },
  { id: "P-5511", utilisateur: "Cheikh Gueye", type: "Premier loyer", montant: 150000, methode: "Orange Money", statut: "Réussi", date: "2026-07-25" },
  { id: "P-5512", utilisateur: "Khadija Ba", type: "Réservation", montant: 15000, methode: "Free Money", statut: "En attente", date: "2026-07-27" },
  { id: "P-5513", utilisateur: "Fatou Ndiaye", type: "Caution", montant: 220000, methode: "Carte bancaire", statut: "Échoué", date: "2026-07-28" },
  { id: "P-5514", utilisateur: "Ibrahima Sarr", type: "Commission agence", montant: 45000, methode: "Wave", statut: "Réussi", date: "2026-07-30" },
  { id: "P-5515", utilisateur: "Moussa Diop", type: "Abonnement Premium", montant: 25000, methode: "Orange Money", statut: "Réussi", date: "2026-08-01" },
];

export const litiges = [
  { id: "L-0087", sujet: "Annonce suspectée de fausse photo", concernant: "A-1042", type: "Annonce", priorite: "Haute", statut: "Ouvert", signale: "2026-07-29" },
  { id: "L-0088", sujet: "Propriétaire injoignable après paiement", concernant: "U-2205", type: "Utilisateur", priorite: "Haute", statut: "En cours", signale: "2026-07-30" },
  { id: "L-0089", sujet: "Désaccord sur le remboursement de caution", concernant: "P-5513", type: "Paiement", priorite: "Moyenne", statut: "Ouvert", signale: "2026-07-31" },
  { id: "L-0090", sujet: "Doublon d'annonce détecté", concernant: "A-1038", type: "Annonce", priorite: "Basse", statut: "Résolu", signale: "2026-07-18" },
  { id: "L-0091", sujet: "Comportement inapproprié dans le chat", concernant: "U-2206", type: "Utilisateur", priorite: "Moyenne", statut: "Résolu", signale: "2026-07-12" },
];