import css from "./ContactForm.module.css";
import * as Yup from "yup";
import { nanoid } from "nanoid";
import { useId, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addContact, changeContact } from "../../redux/contacts/operations";
import { setSelectedContact } from "../../redux/contacts/slice";
import { selectSelectedContact } from "../../redux/contacts/selectors";

const ContactForm = () => {
  const dispatch = useDispatch();
  const selectedContact = useSelector(selectSelectedContact);
  const initialValues = {
    name: selectedContact ? selectedContact.name : "",
    number: selectedContact ? selectedContact.number : "",
  };

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
    if (parts[0].length > 20 || parts[1].length > 20) {
      return "Both first and last name should be no longer than 20 characters";
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
      .required("Required")
      .test("custom-name-validation", function (value) {
        const validationResult = nameValidation(value);
        if (validationResult !== true) {
          return this.createError({ message: validationResult });
        }
        return true;
      }),
    number: Yup.string()
      .matches(
        /^\d{3}-\d{2}-\d{2}$/,
        "Phone number is not valid. Format should be 555-55-55"
      )
      .required("Required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (selectedContact) {
      const updatedContact = {
        name: values.name,
        number: values.number,
      };
      //?dispatch - тієї частини в operations з деструкторизацією!
      dispatch(
        changeContact({ id: selectedContact.id, updatedData: updatedContact })
      );
      dispatch(setSelectedContact(null)); // Скидання вибраного контакту після редагування
    } else {
      const newContact = {
        id: nanoid(),
        name: values.name,
        number: values.number,
      };
      dispatch(addContact(newContact));
    }
    resetForm();
  };

  const nameId = useId();
  const phoneId = useId();

  useEffect(() => {
    return () => {
      dispatch(setSelectedContact(null)); // Скидання вибраного контакту при виході з форми
    };
  }, [dispatch]);

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
      enableReinitialize
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
            {selectedContact ? "Change contact" : "Add contact"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default ContactForm;
