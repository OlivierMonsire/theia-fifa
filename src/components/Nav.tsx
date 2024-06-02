import "../styles/nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <div className="logo">
        <img src="/logo.webp" alt="logo" />
      </div>
      <ul className="nav-list">
        <li><a href="/ranking">Classement</a></li>
        <li><a href="/roundrobin">Tableau des matchs</a></li>
      </ul>
    </div>
  );
};

export default Nav;
