import { createContext, useContext, useEffect, useState } from "react";
import { authApi, SESSION_KEY } from "../services/api";

const AuthContext = createContext(null);

// Champs du LoginDto : { login, password }  (login = email ou téléphone)
const LOGIN_FIELDS = { identifier: "login", password: "password" };

// ⚠️ Champs du RegisterDto : à vérifier dans Swagger (Schemas > RegisterDto)
const REGISTER_FIELDS = {
  email: "email",
  password: "password",
  name: "nom",
  phone: "telephone",
};

// Anciennes clés du mode démo (nettoyage)
const RESET_KEY = "deukway_admin_reset";
const CODE_DUREE_MS = 10 * 60 * 1000;

function initialesDe(nom = "") {
  return (
    nom
      .trim()
      .split(/\s+/)
      .map((n) => n[0]?.toUpperCase())
      .slice(0, 2)
      .join("") || "AD"
  );
}

// Le ResponseInterceptor peut envelopper la réponse : { data: {...} }
function unwrap(res) {
  return res?.data ?? res;
}

function extraireSession(res) {
  const payload = unwrap(res) ?? {};
  const token = payload.access_token ?? payload.accessToken ?? payload.token ?? null;
  const u = payload.user ?? payload.utilisateur ?? null;
  return { token, user: u };
}

function normaliserUser(u) {
  const nom = u?.nom ?? u?.name ?? u?.email ?? "Admin";
  return {
    ...u,
    nom,
    email: u?.email ?? "",
    role: u?.role ?? "Admin",
    initiales: initialesDe(nom),
  };
}

function verifierAdmin(user) {
  // Si le backend renvoie un rôle, on exige un rôle admin
  const role = String(user?.role ?? "");
  if (role && !/admin/i.test(role)) {
    throw new Error("Accès réservé aux administrateurs.");
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const session = JSON.parse(raw);
        if (session?.token) setUser(session.user);
        else localStorage.removeItem(SESSION_KEY);
      }
    } catch {
      localStorage.removeItem(SESSION_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  function ouvrirSession(token, userBrut) {
    const u = normaliserUser(userBrut);
    verifierAdmin(u);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ token, user: u }));
    setUser(u);
    return u;
  }

  async function login(email, motDePasse) {
    const res = await authApi.login({
      [LOGIN_FIELDS.identifier]: email.trim().toLowerCase(),
      [LOGIN_FIELDS.password]: motDePasse,
    });

    const { token, user: userBrut } = extraireSession(res);
    if (!token) throw new Error("Réponse inattendue du serveur (token manquant).");

    // Si la réponse du login ne contient pas l'utilisateur, on récupère le profil
    let u = userBrut;
    if (!u) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ token, user: null }));
      u = unwrap(await authApi.profile());
    }
    try {
      return ouvrirSession(token, u);
    } catch (e) {
      localStorage.removeItem(SESSION_KEY);
      throw e;
    }
  }

  async function register({ nom, email, telephone, motDePasse }) {
    const res = await authApi.register({
      [REGISTER_FIELDS.name]: nom.trim(),
      [REGISTER_FIELDS.email]: email.trim().toLowerCase(),
      [REGISTER_FIELDS.phone]: telephone.trim(),
      [REGISTER_FIELDS.password]: motDePasse,
    });

    const { token, user: userBrut } = extraireSession(res);

    // Si l'API ne renvoie pas de token à l'inscription, on se connecte juste après
    if (!token) return login(email, motDePasse);

    return ouvrirSession(token, userBrut ?? { nom, email, telephone });
  }

  // ---- Mot de passe oublié : pas d'endpoint dans l'API pour l'instant (reste en démo) ----
  async function requestPasswordReset(email) {
    await new Promise((r) => setTimeout(r, 600));
    const code = String(Math.floor(100000 + Math.random() * 900000));
    localStorage.setItem(
      RESET_KEY,
      JSON.stringify({
        email: email.trim().toLowerCase(),
        code,
        expire: Date.now() + CODE_DUREE_MS,
      })
    );
    return { code };
  }

  async function resetPassword() {
    throw new Error(
      "La réinitialisation du mot de passe n'est pas encore disponible côté serveur."
    );
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        requestPasswordReset,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans un <AuthProvider>");
  return ctx;
}