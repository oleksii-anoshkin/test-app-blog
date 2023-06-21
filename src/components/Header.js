import "../css/Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  function closeMenu() {
    const btn = document.querySelector(".navbar-toggler");
    const nav = document.querySelector(".navbar-collapse");

    btn.removeAttribute("aria-expanded");
    btn.setAttribute("aria-expanded", false);
    btn.className = "navbar-toggler collapsed";
    nav.className = "navbar-collapse collapse";
  }

  return (
    <header className="navbar navbar-expand-lg bg-body-tertiary">
      <section className="container-fluid">
        <span className="navbar-brand mb-0 h1">Oleksii Anoshkin Blog</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <nav className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={closeMenu}>
                Blogs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create/" className="nav-link" onClick={closeMenu}>
                Create
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}
