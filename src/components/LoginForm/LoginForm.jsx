import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { loginOperation } from "../../redux/auth/operations";
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

  const handleSubmit = (values, { resetForm }) => {
    dispatch(loginOperation(values))
      .unwrap()
      .then(() => {
        console.log("login success");
      })
      .catch((error) => {
        console.log("login error", error);
      });
    resetForm();
  };

  const emailId = useId();
  const passwordId = useId();

  return (
    <div className={css.containerForm}>
      <h2 className={css.title}>Please enter your Login!</h2>
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
              Login
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
