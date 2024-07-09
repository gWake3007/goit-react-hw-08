import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";
import clsx from "clsx";
import { GiArchiveRegister } from "react-icons/gi";
import { TbLogin2 } from "react-icons/tb";

const getClassNames = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

const AuthNav = () => {
  return (
    <nav className={css.nav}>
      <NavLink to="/register" className={getClassNames}>
        <span>
          <GiArchiveRegister />
        </span>
        Register
      </NavLink>
      <NavLink to="/login" className={getClassNames}>
        <span>
          <TbLogin2 />
        </span>
        Login
      </NavLink>
    </nav>
  );
};

export default AuthNav;
