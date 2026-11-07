// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext(null);

// // Compte de démonstration — à remplacer par l'appel POST /auth/login (NestJS + JWT)
// const COMPTE_DEMO = {
//   email: "sene32304@gmail.com",
//   motDePasse: "admin1234",
//   user: {
//     nom: "Sadio Sene",
//     email: "sene32304@gmail.com",
//     role: "Super Admin",
//     initiales: "SS",
//   },
// };

// const STORAGE_KEY = "deukway_admin_session";
// const COMPTES_KEY = "deukway_admin_comptes"; // comptes créés via /inscription (mock)
// const DEMO_OVERRIDE_KEY = "deukway_admin_demo_pwd"; // mot de passe démo modifié (mock)
// const RESET_KEY = "deukway_admin_reset"; // demande de réinitialisation en cours (mock)
// const CODE_DUREE_MS = 10 * 60 * 1000; // 10 minutes

// function initialesDe(nom) {
//   return nom
//     .trim()
//     .split(/\s+/)
//     .map((n) => n[0]?.toUpperCase())
//     .slice(0, 2)
//     .join("") || "AD";
// }

// function lireComptesCrees() {
//   try {
//     return JSON.parse(localStorage.getItem(COMPTES_KEY)) || [];
//   } catch {
//     return [];
//   }
// }

// function motDePasseDemoActuel() {
//   return localStorage.getItem(DEMO_OVERRIDE_KEY) || COMPTE_DEMO.motDePasse;
// }

// function genererCode() {
//   return String(Math.floor(100000 + Math.random() * 900000));
// }

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       if (raw) {
//         const session = JSON.parse(raw);
//         setUser(session.user);
//       }
//     } catch {
//       localStorage.removeItem(STORAGE_KEY);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   function ouvrirSession(user) {
//     const fauxToken = btoa(`${user.email}:${Date.now()}`);
//     const session = { token: fauxToken, user };
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
//     setUser(user);
//     return user;
//   }

//   async function login(email, motDePasse) {
//     // Simule la latence + la vérification d'un vrai backend JWT
//     await new Promise((r) => setTimeout(r, 600));

//     const emailNorm = email.trim().toLowerCase();

//     if (emailNorm === COMPTE_DEMO.email && motDePasse === motDePasseDemoActuel()) {
//       return ouvrirSession(COMPTE_DEMO.user);
//     }

//     const comptes = lireComptesCrees();
//     const trouve = comptes.find(
//       (c) => c.email === emailNorm && c.motDePasse === motDePasse
//     );
//     if (!trouve) {
//       throw new Error("Email ou mot de passe incorrect.");
//     }

//     return ouvrirSession(trouve.user);
//   }

//   async function register({ nom, email, telephone, motDePasse }) {
//     // Simule la latence + la création d'un vrai backend (POST /auth/register)
//     await new Promise((r) => setTimeout(r, 600));

//     const emailNorm = email.trim().toLowerCase();
//     const comptes = lireComptesCrees();

//     if (emailNorm === COMPTE_DEMO.email || comptes.some((c) => c.email === emailNorm)) {
//       throw new Error("Un compte existe déjà avec cet email.");
//     }

//     const nouvelUser = {
//       nom: nom.trim(),
//       email: emailNorm,
//       telephone: telephone.trim(),
//       role: "Admin",
//       initiales: initialesDe(nom),
//     };

//     comptes.push({ email: emailNorm, motDePasse, user: nouvelUser });
//     localStorage.setItem(COMPTES_KEY, JSON.stringify(comptes));

//     return ouvrirSession(nouvelUser);
//   }

//   async function requestPasswordReset(email) {
//     // Simule l'appel POST /auth/forgot-password qui enverrait un email/SMS avec un code
//     await new Promise((r) => setTimeout(r, 600));

//     const emailNorm = email.trim().toLowerCase();
//     const comptes = lireComptesCrees();
//     const existe =
//       emailNorm === COMPTE_DEMO.email || comptes.some((c) => c.email === emailNorm);

//     if (!existe) {
//       throw new Error("Aucun compte associé à cet email.");
//     }

//     const code = genererCode();
//     localStorage.setItem(
//       RESET_KEY,
//       JSON.stringify({ email: emailNorm, code, expire: Date.now() + CODE_DUREE_MS })
//     );

//     // En production ce code partirait par email/SMS — ici il est simplement renvoyé
//     // pour permettre la démonstration du flux sans backend.
//     return { code };
//   }

//   async function resetPassword(email, code, nouveauMotDePasse) {
//     // Simule l'appel POST /auth/reset-password
//     await new Promise((r) => setTimeout(r, 600));

//     const emailNorm = email.trim().toLowerCase();
//     let demande;
//     try {
//       demande = JSON.parse(localStorage.getItem(RESET_KEY));
//     } catch {
//       demande = null;
//     }

//     if (!demande || demande.email !== emailNorm) {
//       throw new Error("Aucune demande de réinitialisation trouvée pour cet email.");
//     }
//     if (Date.now() > demande.expire) {
//       throw new Error("Ce code a expiré. Merci de refaire une demande.");
//     }
//     if (demande.code !== code.trim()) {
//       throw new Error("Code de vérification incorrect.");
//     }

//     if (emailNorm === COMPTE_DEMO.email) {
//       localStorage.setItem(DEMO_OVERRIDE_KEY, nouveauMotDePasse);
//     } else {
//       const comptes = lireComptesCrees();
//       const index = comptes.findIndex((c) => c.email === emailNorm);
//       if (index === -1) {
//         throw new Error("Compte introuvable.");
//       }
//       comptes[index].motDePasse = nouveauMotDePasse;
//       localStorage.setItem(COMPTES_KEY, JSON.stringify(comptes));
//     }

//     localStorage.removeItem(RESET_KEY);
//   }

//   function logout() {
//     localStorage.removeItem(STORAGE_KEY);
//     setUser(null);
//   }

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         loading,
//         login,
//         register,
//         requestPasswordReset,
//         resetPassword,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth doit être utilisé dans un <AuthProvider>");
//   return ctx;
// }
import { createContext, useContext, useEffect, useState } from "react";
import { authApi, SESSION_KEY } from "../services/api";

const AuthContext = createContext(null);

// ⚠️ Noms des champs attendus par ton backend (voir RegisterDto / LoginDto dans Swagger).
// Si l'API répond "property xxx should not exist", change la valeur ici.
const FIELDS = {
  email: "email",
  password: "motDePasse", // ou "password"
  name: "nom",            // ou "name"
  phone: "telephone",     // ou "phone"
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
      [FIELDS.email]: email.trim().toLowerCase(),
      [FIELDS.password]: motDePasse,
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
      [FIELDS.name]: nom.trim(),
      [FIELDS.email]: email.trim().toLowerCase(),
      [FIELDS.phone]: telephone.trim(),
      [FIELDS.password]: motDePasse,
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