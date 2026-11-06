import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  PauseCircle,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import Topbar from "../components/Topbar";
import Badge from "../components/Badge";
import { annoncesApi, quartiersApi } from "../services/api";

const types = ["Toutes", "Chambre", "Studio", "Colocation", "Appartement"];


const TYPE_VALUES = {
  Chambre: "Chambre",
  Studio: "Studio",
  Colocation: "Colocation",
  Appartement: "Appartement",
};
const STATUTS = { valider: "Active", suspendre: "Suspendue" };

const EMPTY_FORM = {
  titre: "",
  description: "",
  adresse: "",
  prix: "",
  type: "Chambre",
  surface: "",
  quartierId: "",
};

function formatFCFA(n) {
  return new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
}

// Rend les données API compatibles avec l'affichage existant
function normalize(a) {
  return {
    raw: a,
    id: a.id,
    titre: a.titre ?? a.title ?? "Sans titre",
    type: a.type ?? "-",
    prix: Number(a.prix ?? a.price ?? 0),
    statut: a.statut ?? a.status ?? "En attente",
    verifiee: a.verifiee ?? a.isVerified ?? false,
    quartier: a.quartier?.nom ?? a.quartier?.name ?? a.quartier ?? "",
    ville:
      a.quartier?.ville?.nom ?? a.ville?.nom ?? (typeof a.ville === "string" ? a.ville : ""),
    proprietaire:
      a.proprietaire?.nom ?? a.proprietaire?.name ?? a.owner?.nom ?? a.user?.nom ?? "—",
  };
}

export default function Annonces() {
  const [liste, setListe] = useState([]);
  const [quartiers, setQuartiers] = useState([]);
  const [type, setType] = useState("Toutes");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null); // { mode: 'create' | 'edit', annonce? }
  const [toDelete, setToDelete] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await annoncesApi.list();
      const arr = Array.isArray(data) ? data : data?.data ?? data?.items ?? [];
      setListe(arr.map(normalize));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    quartiersApi
      .list()
      .then((d) => setQuartiers(Array.isArray(d) ? d : d?.data ?? []))
      .catch(() => {});
  }, [load]);

  const filtres = useMemo(
    () =>
      liste.filter(
        (a) => type === "Toutes" || String(a.type).toLowerCase() === type.toLowerCase()
      ),
    [liste, type]
  );

  const changerStatut = async (a, statut) => {
    try {
      await annoncesApi.update(a.id, { statut });
      setListe((prev) => prev.map((x) => (x.id === a.id ? { ...x, statut } : x)));
    } catch (e) {
      setError(e.message);
    }
  };

  const supprimer = async () => {
    try {
      await annoncesApi.remove(toDelete.id);
      setListe((prev) => prev.filter((x) => x.id !== toDelete.id));
    } catch (e) {
      setError(e.message);
    } finally {
      setToDelete(null);
    }
  };

  return (
    <>
      <Topbar title="Annonces" subtitle={`${liste.length} annonces au total`} />

      <div className="p-8 space-y-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
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

          <button
            onClick={() => setModal({ mode: "create" })}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-dark text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={16} />
            Ajouter une annonce
          </button>
        </div>

        {error && (
          <div className="rounded-xl bg-crimson-glow text-crimson text-sm px-4 py-3">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-sm text-ink/40 py-10">Chargement…</p>
        ) : (
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
                      {[a.quartier, a.ville].filter(Boolean).join(", ")} · {a.id}
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
                      title="Modifier"
                      onClick={() => setModal({ mode: "edit", annonce: a })}
                      className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-sand-dim text-ink/40 hover:text-ink transition-colors"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      title="Valider"
                      onClick={() => changerStatut(a, STATUTS.valider)}
                      className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-teal-glow text-ink/40 hover:text-teal transition-colors"
                    >
                      <CheckCircle2 size={16} />
                    </button>
                    <button
                      title="Suspendre"
                      onClick={() => changerStatut(a, STATUTS.suspendre)}
                      className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-[#d69a3a1f] text-ink/40 hover:text-gold transition-colors"
                    >
                      <PauseCircle size={16} />
                    </button>
                    <button
                      title="Supprimer"
                      onClick={() => setToDelete(a)}
                      className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-crimson-glow text-ink/40 hover:text-crimson transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filtres.length === 0 && (
          <p className="text-center text-sm text-ink/40 py-10">
            Aucune annonce dans cette catégorie.
          </p>
        )}
      </div>

      {modal && (
        <AnnonceModal
          mode={modal.mode}
          annonce={modal.annonce}
          quartiers={quartiers}
          onClose={() => setModal(null)}
          onSaved={() => {
            setModal(null);
            load();
          }}
        />
      )}

      {toDelete && (
        <Overlay onClose={() => setToDelete(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="font-display text-xl text-ink">Supprimer cette annonce ?</h2>
            <p className="text-sm text-ink/60 mt-2">
              « {toDelete.titre} » sera définitivement supprimée.
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setToDelete(null)}
                className="px-4 py-2 rounded-full border border-parchment text-sm text-ink/70 hover:border-ink/20"
              >
                Annuler
              </button>
              <button
                onClick={supprimer}
                className="px-4 py-2 rounded-full bg-crimson text-white text-sm font-medium hover:opacity-90"
              >
                Supprimer
              </button>
            </div>
          </div>
        </Overlay>
      )}
    </>
  );
}

function Overlay({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-ink/50 flex items-center justify-center p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-parchment bg-white px-3 py-2 text-sm text-ink outline-none focus:border-ink/30";
const labelCls = "block text-xs font-medium text-ink/60 mb-1";

function AnnonceModal({ mode, annonce, quartiers, onClose, onSaved }) {
  const isEdit = mode === "edit";
  const raw = annonce?.raw ?? {};
  const [form, setForm] = useState(
    isEdit
      ? {
          titre: raw.titre ?? annonce.titre ?? "",
          description: raw.description ?? "",
          adresse: raw.adresse ?? "",
          prix: raw.prix ?? annonce.prix ?? "",
          type: TYPE_VALUES[annonce.type] ?? annonce.type ?? "Chambre",
          surface: raw.surface ?? "",
          quartierId: raw.quartierId ?? raw.quartier?.id ?? "",
        }
      : EMPTY_FORM
  );
  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr("");
    try {
      if (isEdit) {
        await annoncesApi.update(annonce.id, {
          titre: form.titre,
          description: form.description,
          adresse: form.adresse,
          prix: Number(form.prix),
          type: form.type,
          surface: form.surface ? Number(form.surface) : undefined,
          quartierId: form.quartierId || undefined,
        });
      } else {
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => {
          if (v !== "" && v !== null) fd.append(k, v);
        });
        files.forEach((f) => fd.append("images", f));
        await annoncesApi.create(fd);
      }
      onSaved();
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Overlay onClose={onClose}>
     <form
  onSubmit={submit}
  className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col"
>
  <div className="p-6 space-y-4 overflow-y-auto">
        // <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-ink">
            {isEdit ? "Modifier l'annonce" : "Nouvelle annonce"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-ink/40 hover:bg-sand-dim"
          >
            <X size={16} />
          </button>
        </div>

        {err && (
          <div className="rounded-xl bg-crimson-glow text-crimson text-sm px-4 py-3">{err}</div>
        )}

        <div>
          <label className={labelCls}>Titre</label>
          <input className={inputCls} name="titre" value={form.titre} onChange={onChange} required />
        </div>

        <div>
          <label className={labelCls}>Description</label>
          <textarea
            className={`${inputCls} min-h-[90px]`}
            name="description"
            value={form.description}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <label className={labelCls}>Adresse</label>
          <input className={inputCls} name="adresse" value={form.adresse} onChange={onChange} required />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls}>Prix (FCFA / mois)</label>
            <input className={inputCls} type="number" min="0" name="prix" value={form.prix} onChange={onChange} required />
          </div>
          <div>
            <label className={labelCls}>Surface (m²)</label>
            <input className={inputCls} type="number" min="0" name="surface" value={form.surface} onChange={onChange} />
          </div>
          <div>
            <label className={labelCls}>Type</label>
            <select className={inputCls} name="type" value={form.type} onChange={onChange}>
              {Object.entries(TYPE_VALUES).map(([label, value]) => (
                <option key={label} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Quartier</label>
            <select className={inputCls} name="quartierId" value={form.quartierId} onChange={onChange}>
              <option value="">Choisir un quartier</option>
              {quartiers.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.nom ?? q.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!isEdit && (
          <div>
            <label className={labelCls}>Photos</label>
            <input
              className={inputCls}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files))}
            />
          </div>
        )}

          </div>

  <div className="flex justify-end gap-2 px-6 py-4 border-t border-parchment">
    <button
      type="button"
      onClick={onClose}
      className="px-4 py-2 rounded-full border border-parchment text-sm text-ink/70 hover:border-ink/20"
    >
      Annuler
    </button>
    <button
      type="submit"
      disabled={saving}
      className="px-4 py-2 rounded-full bg-ink text-sand text-sm font-medium hover:opacity-90 disabled:opacity-60"
    >
      {saving ? "Enregistrement…" : isEdit ? "Enregistrer" : "Publier l'annonce"}
    </button>
  </div>
</form>
    
    </Overlay>
  );
}