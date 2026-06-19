import "../../styles/Header.css";
import reactLogo from "../../assets/Ada_Lovelace.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul className="nav-left">
        <li><h1>TROCSKILL-HUB</h1></li>
      </ul>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span></span><span></span><span></span>
      </button>

      <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <ul className="nav-center">
          <li><a href="">Tableau de bord</a></li>
          <li><a href="">Offres</a></li>
          <li><a href="">Mon Profil</a></li>
        </ul>
        <ul className="nav-right">
          <li><button onClick={handleLogout}>Déconnexion</button></li>
          <li><img src={reactLogo} alt="Profil" className="nav-avatar" /></li>
        </ul>
      </div>
    </nav>
  );
};