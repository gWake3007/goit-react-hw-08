import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { loginOutOperation } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);
  return (
    <div className={css.container}>
      <p className={css.text}>Welcome, {name}</p>
      <button onClick={() => dispatch(loginOutOperation())} className={css.btn}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
