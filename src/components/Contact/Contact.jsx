import css from "./Contact.module.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modal/slice";
import { setSelectedContact } from "../../redux/contacts/slice";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal(contact.id));
  };

  const handleChange = () => {
    dispatch(setSelectedContact(contact));
  };

  return (
    <li className={css.item}>
      <div className={css.container}>
        <div className={css.stroke}>
          <FaUser />
          <h4 className={css.title}>{contact.name}</h4>
        </div>
        <div className={css.stroke}>
          <BsFillTelephoneFill />
          <p className={css.text}>{contact.number}</p>
        </div>
      </div>
      <div className={css.containerBtn}>
        <button className={css.btn} type="button" onClick={handleOpenModal}>
          Delete
        </button>
        <button className={css.btn} type="button" onClick={handleChange}>
          Change
        </button>
      </div>
    </li>
  );
};

export default Contact;
