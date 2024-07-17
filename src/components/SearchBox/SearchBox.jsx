import css from "./SearchBox.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNameFilter,
  selectNumberFilter,
} from "../../redux/filters/selectors";
import { setNameFilter, setNumberFilter } from "../../redux/filters/slice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const nameFilter = useSelector(selectNameFilter);
  const numberFilter = useSelector(selectNumberFilter);

  const handleNameSearch = (e) => {
    dispatch(setNameFilter(e.target.value));
  };

  const handleNumberSearch = (e) => {
    dispatch(setNumberFilter(e.target.value));
  };

  return (
    <div className={css.container}>
      <label className={css.label} htmlFor="name-search">
        Find contacts by name
      </label>
      <br />
      <input
        className={css.input}
        id="name-search"
        type="text"
        value={nameFilter}
        onChange={handleNameSearch}
      />
      <br />
      <label className={css.label} htmlFor="number-search">
        Find contacts by number
      </label>
      <br />
      <input
        className={css.input}
        id="number-search"
        type="text"
        value={numberFilter}
        onChange={handleNumberSearch}
      />
    </div>
  );
};

export default SearchBox;
