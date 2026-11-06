// src/services/api.js
export const API_URL =
  import.meta.env.VITE_API_URL || "https://django-gestion-hotel-1.onrender.com";

// Adapte la clé si ton AuthContext stocke le token sous un autre nom
const getToken = () => localStorage.getItem("token");

async function request(path, { method = "GET", body, isFormData = false } = {}) {
  const headers = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  if (body && !isFormData) headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Session expirée");
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = Array.isArray(data?.message) ? data.message.join(", ") : data?.message;
    throw new Error(msg || `Erreur ${res.status}`);
  }
  return data;
}

export const authApi = {
  login: (payload) => request("/auth/login", { method: "POST", body: payload }),
  profile: () => request("/auth/profile"),
};

export const annoncesApi = {
  list: (query = "") => request(`/annonces${query}`),
  get: (id) => request(`/annonces/${id}`),
  create: (formData) =>
    request("/annonces", { method: "POST", body: formData, isFormData: true }),
  update: (id, payload) =>
    request(`/annonces/${id}`, { method: "PATCH", body: payload }),
  remove: (id) => request(`/annonces/${id}`, { method: "DELETE" }),
};

export const usersApi = {
  list: () => request("/users"),
  suspend: (id) => request(`/users/${id}/suspend`, { method: "PATCH" }),
  activate: (id) => request(`/users/${id}/activate`, { method: "PATCH" }),
  verify: (id) => request(`/users/${id}/verify`, { method: "PATCH" }),
  remove: (id) => request(`/users/${id}`, { method: "DELETE" }),
};

export const paymentsApi = {
  all: () => request("/payments/all"),
};

export const villesApi = { list: () => request("/villes") };
export const quartiersApi = {
  list: (villeId) => request(`/quartiers${villeId ? `?villeId=${villeId}` : ""}`),
};