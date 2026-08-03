import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Annonces from "./pages/Annonces";
import Payments from "./pages/Payments";
import Disputes from "./pages/Disputes";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-sand">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/utilisateurs" element={<Users />} />
            <Route path="/annonces" element={<Annonces/>} />
            <Route path="/paiements" element={<Payments />} />
            <Route path="/litiges" element={<Disputes />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;