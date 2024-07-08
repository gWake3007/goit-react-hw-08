import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";
import css from "./LoginForm.module.css";

const LoginForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
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

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  const emailId = useId();
  const passwordId = useId();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.container}>
          <label htmlFor={emailId} className={css.label}>
            Email:
          </label>
          <Field type="email" className={css.input} id={emailId} name="email" />
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
            Login
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default LoginForm;
