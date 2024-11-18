import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const Navigation = () => {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.listHeader}>
          <li className={css.itemHeader}>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>
          <li className={css.itemHeader}>
            <NavLink
              to="/movies"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
