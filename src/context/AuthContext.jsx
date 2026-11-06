import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// Compte de démonstration — à remplacer par l'appel POST /auth/login (NestJS + JWT)
const COMPTE_DEMO = {
  email: "sene32304@gmail.com",
  motDePasse: "admin1234",
  user: {
    nom: "Sadio Sene",
    email: "sene32304@gmail.com",
    role: "Super Admin",
    initiales: "SS",
  },
};

const STORAGE_KEY = "deukway_admin_session";
const COMPTES_KEY = "deukway_admin_comptes"; // comptes créés via /inscription (mock)
const DEMO_OVERRIDE_KEY = "deukway_admin_demo_pwd"; // mot de passe démo modifié (mock)
const RESET_KEY = "deukway_admin_reset"; // demande de réinitialisation en cours (mock)
const CODE_DUREE_MS = 10 * 60 * 1000; // 10 minutes

function initialesDe(nom) {
  return nom
    .trim()
    .split(/\s+/)
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join("") || "AD";
}

function lireComptesCrees() {
  try {
    return JSON.parse(localStorage.getItem(COMPTES_KEY)) || [];
  } catch {
    return [];
  }
}

function motDePasseDemoActuel() {
  return localStorage.getItem(DEMO_OVERRIDE_KEY) || COMPTE_DEMO.motDePasse;
}

function genererCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const session = JSON.parse(raw);
        setUser(session.user);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  function ouvrirSession(user) {
    const fauxToken = btoa(`${user.email}:${Date.now()}`);
    const session = { token: fauxToken, user };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setUser(user);
    return user;
  }

  async function login(email, motDePasse) {
    // Simule la latence + la vérification d'un vrai backend JWT
    await new Promise((r) => setTimeout(r, 600));

    const emailNorm = email.trim().toLowerCase();

    if (emailNorm === COMPTE_DEMO.email && motDePasse === motDePasseDemoActuel()) {
      return ouvrirSession(COMPTE_DEMO.user);
    }

    const comptes = lireComptesCrees();
    const trouve = comptes.find(
      (c) => c.email === emailNorm && c.motDePasse === motDePasse
    );
    if (!trouve) {
      throw new Error("Email ou mot de passe incorrect.");
    }

    return ouvrirSession(trouve.user);
  }

  async function register({ nom, email, telephone, motDePasse }) {
    // Simule la latence + la création d'un vrai backend (POST /auth/register)
    await new Promise((r) => setTimeout(r, 600));

    const emailNorm = email.trim().toLowerCase();
    const comptes = lireComptesCrees();

    if (emailNorm === COMPTE_DEMO.email || comptes.some((c) => c.email === emailNorm)) {
      throw new Error("Un compte existe déjà avec cet email.");
    }

    const nouvelUser = {
      nom: nom.trim(),
      email: emailNorm,
      telephone: telephone.trim(),
      role: "Admin",
      initiales: initialesDe(nom),
    };

    comptes.push({ email: emailNorm, motDePasse, user: nouvelUser });
    localStorage.setItem(COMPTES_KEY, JSON.stringify(comptes));

    return ouvrirSession(nouvelUser);
  }

  async function requestPasswordReset(email) {
    // Simule l'appel POST /auth/forgot-password qui enverrait un email/SMS avec un code
    await new Promise((r) => setTimeout(r, 600));

    const emailNorm = email.trim().toLowerCase();
    const comptes = lireComptesCrees();
    const existe =
      emailNorm === COMPTE_DEMO.email || comptes.some((c) => c.email === emailNorm);

    if (!existe) {
      throw new Error("Aucun compte associé à cet email.");
    }

    const code = genererCode();
    localStorage.setItem(
      RESET_KEY,
      JSON.stringify({ email: emailNorm, code, expire: Date.now() + CODE_DUREE_MS })
    );

    // En production ce code partirait par email/SMS — ici il est simplement renvoyé
    // pour permettre la démonstration du flux sans backend.
    return { code };
  }

  async function resetPassword(email, code, nouveauMotDePasse) {
    // Simule l'appel POST /auth/reset-password
    await new Promise((r) => setTimeout(r, 600));

    const emailNorm = email.trim().toLowerCase();
    let demande;
    try {
      demande = JSON.parse(localStorage.getItem(RESET_KEY));
    } catch {
      demande = null;
    }

    if (!demande || demande.email !== emailNorm) {
      throw new Error("Aucune demande de réinitialisation trouvée pour cet email.");
    }
    if (Date.now() > demande.expire) {
      throw new Error("Ce code a expiré. Merci de refaire une demande.");
    }
    if (demande.code !== code.trim()) {
      throw new Error("Code de vérification incorrect.");
    }

    if (emailNorm === COMPTE_DEMO.email) {
      localStorage.setItem(DEMO_OVERRIDE_KEY, nouveauMotDePasse);
    } else {
      const comptes = lireComptesCrees();
      const index = comptes.findIndex((c) => c.email === emailNorm);
      if (index === -1) {
        throw new Error("Compte introuvable.");
      }
      comptes[index].motDePasse = nouveauMotDePasse;
      localStorage.setItem(COMPTES_KEY, JSON.stringify(comptes));
    }

    localStorage.removeItem(RESET_KEY);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
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
