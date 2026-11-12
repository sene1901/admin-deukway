// src/services/api.js
// Client HTTP centralisé pour l'admin. Ajoute automatiquement le token JWT.

export const API_URL =
  import.meta.env.VITE_API_URL || "https://backend-deukway.onrender.com";

// Même clé que dans AuthContext.jsx
export const SESSION_KEY = "deukway_admin_session";

const getToken = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))?.token ?? null;
  } catch {
    return null;
  }
};

async function request(path, { method = "GET", body, isFormData = false, redirectOn401 = true } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body && !isFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  if (res.status === 401 && redirectOn401) {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = "/connexion";
    throw new Error("Session expirée, veuillez vous reconnecter.");
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = Array.isArray(data?.message) ? data.message.join(", ") : data?.message;
    throw new Error(msg || `Erreur ${res.status}`);
  }
  return data;
}

// ---------- Auth ----------
export const authApi = {
  login: (payload) =>
    request("/auth/login", { method: "POST", body: payload, redirectOn401: false }),
  register: (payload) =>
    request("/auth/register", { method: "POST", body: payload, redirectOn401: false }),
  profile: () => request("/auth/profile"),
};

// ---------- Annonces ----------
export const annoncesApi = {
  list: (query = "") => request(`/annonces${query}`),
  get: (id) => request(`/annonces/${id}`),
  // formData : champs texte + fichiers "images"
  create: (formData) =>
    request("/annonces", { method: "POST", body: formData, isFormData: true }),
  update: (id, payload) =>
    request(`/annonces/${id}`, { method: "PATCH", body: payload }),
  remove: (id) => request(`/annonces/${id}`, { method: "DELETE" }),
};

// ---------- Users (admin) ----------
export const usersApi = {
  list: () => request("/users"),
  suspend: (id) => request(`/users/${id}/suspend`, { method: "PATCH" }),
  activate: (id) => request(`/users/${id}/activate`, { method: "PATCH" }),
  verify: (id) => request(`/users/${id}/verify`, { method: "PATCH" }),
  remove: (id) => request(`/users/${id}`, { method: "DELETE" }),
};

// ---------- Paiements (admin) ----------
export const paymentsApi = {
  all: () => request("/payments/all"),
};

// ---------- Villes / Quartiers ----------
export const villesApi = { list: () => request("/villes") };
export const quartiersApi = {
  list: (villeId) => request(`/quartiers${villeId ? `?villeId=${villeId}` : ""}`),
};