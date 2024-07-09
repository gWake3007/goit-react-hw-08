import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { registrationOperation } from "../../redux/auth/operations";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
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
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z]{2})(?=.*\d{2}).{8,}$/,
        "Password must be at least 8 characters long, with at least 2 letters and 2 digits"
      )
      .required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    dispatch(registrationOperation(values))
      .unwrap()
      .then(() => {
        console.log("Registration successful! Welcome!");
      })
      .catch((error) => {
        console.error("Registration error. Please try again.", error);
      });
    resetForm();
  };

  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();

  return (
    <div className={css.containerForm}>
      <h2 className={css.title}>Please fill in all fields for registration!</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.container}>
            <label htmlFor={nameId} className={css.label}>
              Name:
            </label>
            <Field type="text" className={css.input} id={nameId} name="name" />
            <ErrorMessage className={css.error} component="span" name="name" />
          </div>
          <div className={css.container}>
            <label htmlFor={emailId} className={css.label}>
              Email:
            </label>
            <Field
              type="email"
              className={css.input}
              id={emailId}
              name="email"
            />
            <ErrorMessage className={css.error} component="span" name="email" />
          </div>
          <div className={css.container}>
            <label htmlFor={passwordId} className={css.label}>
              Password:
            </label>
            <Field
              type="password"
              className={css.input}
              id={passwordId}
              name="password"
            />
            <ErrorMessage
              className={css.error}
              component="span"
              name="password"
            />
          </div>
          <div className={css.containerBtn}>
            <button type="submit" className={css.btn}>
              Registration
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
