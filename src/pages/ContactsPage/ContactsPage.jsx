import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import ModalDeleteContact from "../../components/ModalDeleteContact/ModalDeleteContact";
import { selectLoading } from "../../redux/contacts/selectors";
import { fetchContacts } from "../../redux/contacts/operations";
import css from "./ContactsPage.module.css";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1 className={css.title}>Your contacts</h1>
      <ContactForm />
      <p className={css.text}>{isLoading && "Request in progress..."}</p>
      <SearchBox />
      <ContactList />
      <ModalDeleteContact />
    </div>
  );
};

export default ContactsPage;
