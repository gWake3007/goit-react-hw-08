import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";

const ContactForm = () => {
  const initialValues = {
    name: "",
    number: "",
  };

  const dispatch = useDispatch();

  const nameValidation = (value) => {
    const nameRegex = /^[a-zA-Z]+$/;
    const parts = value.split(" ");
    if (parts.length !== 2) {
      return "Please enter both first and last name";
    }
    if (!nameRegex.test(parts[0]) || !nameRegex.test(parts[1])) {
      return "Both first and last name should only contain letters";
    }
    if (parts[0].length < 3 || parts[1].length < 3) {
      return "Both first and last name should be at least 3 characters long";
    }
    if (parts[0].length > 50 || parts[1].length > 50) {
      return "Both first and last name should be no longer than 50 characters";
    }
    if (
      parts[0][0] !== parts[0][0].toUpperCase() ||
      parts[1][0] !== parts[1][0].toUpperCase()
    ) {
      return "Both first and last name should start with a capital letter";
    }
    return true;
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "is-full-name",
        "User name is not valid. Format should be FirstName LastName",
        (value) => nameValidation(value) === true
      )
      .required("Required"),
    number: Yup.string()
      .matches(
        /^\d{3}-\d{2}-\d{2}$/,
        "Phone number is not valid. Format should be 555-55-55"
      )
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    dispatch(addContact(newContact));
    actions.resetForm();
  };

  const nameId = useId();
  const phoneId = useId();

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
    >
      <Form className={css.form}>
        <div className={css.container}>
          <label className={css.label} htmlFor={nameId}>
            Name
          </label>
          <Field className={css.input} id={nameId} type="text" name="name" />
          <ErrorMessage className={css.error} component="span" name="name" />
        </div>
        <div className={css.container}>
          <label className={css.label} htmlFor={phoneId}>
            Number
          </label>
          <Field className={css.input} id={phoneId} type="tel" name="number" />
          <ErrorMessage className={css.error} component="span" name="number" />
        </div>
        <div className={css.containerBtn}>
          <button className={css.btn} type="submit">
            Add contact
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default ContactForm;
