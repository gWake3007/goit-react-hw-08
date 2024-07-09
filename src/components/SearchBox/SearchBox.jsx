import css from "./SearchBox.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";
import { searchFilter } from "../../redux/filters/slice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchInput = useSelector(selectNameFilter);
  const handleSearch = (e) => {
    dispatch(searchFilter(e.target.value));
  };
  return (
    <div className={css.container}>
      <label className={css.label} htmlFor="search">
        Find contacts by name
      </label>
      <br />
      <input
        className={css.input}
        id="search"
        type="text"
        value={searchInput}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBox;
