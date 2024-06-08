import { useNavigate } from "react-router-dom";
import "../styles/nav.css";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className="nav">
      <div className="brand">
        <a onClick={() => navigate("/")}>
          <img src="/logo.webp" alt="logo" />
          <span>Theia Fifa Championship</span>
        </a>
      </div>
      <ul className="nav-list">
        <li>
          <a onClick={() => navigate("/ranking")}>Classement</a>
        </li>
        <li>
          <a onClick={() => navigate("/round-robin")}>Tableau des matchs</a>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
