import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Annonces from "./pages/Annonces";
import Payments from "./pages/Payments";
import Disputes from "./pages/Disputes";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-sand">
      <Sidebar />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path="/inscription" element={<Register />} />
          <Route path="/connexion" element={<Login />} />
          
          <Route path="/mot-de-passe-oublie" element={<ForgotPassword />} />
          <Route path="/reinitialiser-mot-de-passe" element={<ResetPassword />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/utilisateurs"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Users />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/annonces"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Annonces />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/paiements"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Payments />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/litiges"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Disputes />
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
