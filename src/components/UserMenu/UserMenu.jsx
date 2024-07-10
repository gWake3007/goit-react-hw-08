import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../redux/auth/selectors";
import { loginOutOperation } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";
import { TbLogin } from "react-icons/tb";

const UserMenu = () => {
  const dispatch = useDispatch();
  const { name } = useSelector(selectUser);
  return (
    <div className={css.container}>
      <p className={css.text}>Welcome, {name}!</p>
      <button onClick={() => dispatch(loginOutOperation())} className={css.btn}>
        <TbLogin />
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
