import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header({ locale, setLocale, translations }) {
  const t = translations.common;

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand">
          {t.home.title}
        </Link>

        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => getNavClass(isActive)}>
            {t.nav.home}
          </NavLink>
          <NavLink to="/questionnaire" className={({ isActive }) => getNavClass(isActive)}>
            {t.nav.questionnaire}
          </NavLink>
          <NavLink to="/results" className={({ isActive }) => getNavClass(isActive)}>
            {t.nav.results}
          </NavLink>
          <NavLink to="/report" className={({ isActive }) => getNavClass(isActive)}>
            {t.nav.report}
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => getNavClass(isActive)}>
            {t.nav.about}
          </NavLink>
        </nav>

        <select
          className="language-select"
          value={locale}
          onChange={(e) => setLocale(e.target.value)}
        >
          <option value="en">EN</option>
          <option value="de">DE</option>
        </select>
      </div>
    </header>
  );
}

function getNavClass(isActive) {
  return isActive ? "nav-link active" : "nav-link";
}