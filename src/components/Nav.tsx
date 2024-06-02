import "../styles/nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <div className="brand">
        <a href="/">
          <img src="/logo.webp" alt="logo" />
          <span>Theia Fifa Championship</span>
        </a>
      </div>
      <ul className="nav-list">
        <li>
          <a href="/ranking">Classement</a>
        </li>
        <li>
          <a href="/round-robin">Tableau des matchs</a>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
