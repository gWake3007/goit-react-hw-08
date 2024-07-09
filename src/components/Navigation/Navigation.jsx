import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import css from "./Navigation.module.css";
import clsx from "clsx";
import { IoHome } from "react-icons/io5";
import { MdOutlineImportContacts } from "react-icons/md";

const getClassNames = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav className={css.nav}>
      <NavLink className={getClassNames} to="/">
        <span>
          <IoHome />
        </span>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={getClassNames} to="/contacts">
          <span>
            <MdOutlineImportContacts />
          </span>
          Your contacts
        </NavLink>
      )}
    </nav>
  );
};

export default Navigation;
