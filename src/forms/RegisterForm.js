import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const formik = useFormikContext();
  const [loading, setLoading] = useState(false);

  return (
    <Form>
      <div>
        <label htmlFor="email" className="loginFormText">
          Email
        </label>
        <span className="registerAsterisk">&nbsp;*</span>
        <Field
          className={`registerFieldBox ${
            formik.touched.email && formik.errors.email ? "has-danger" : ""
          }`}
          id="registerField"
          type="email"
          name="email"
          placeholder="Email"
        />
        <ErrorMessage
          className="registerErrorMessage"
          name="email"
          component="div"
        />
      </div>
      <div>
        <label htmlFor="password" className="loginFormText">
          Password
        </label>
        <span className="registerAsterisk">&nbsp;*</span>
        <Field
          className={`registerFieldBox ${
            formik.touched.password && formik.errors.password
              ? "has-danger"
              : ""
          }`}
          id="registerField"
          type="password"
          name="password"
          placeholder="Password"
        />
        <ErrorMessage
          className="registerErrorMessage"
          name="password"
          component="div"
        />
      </div>
      <div>
        <label htmlFor="confirmPassword" className="loginFormText">
          Confirm Password
        </label>
        <span className="registerAsterisk">&nbsp;*</span>
        <Field
          className={`registerFieldBox ${
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "has-danger"
              : ""
          }`}
          id="registerField"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
        <ErrorMessage
          className="registerErrorMessage"
          name="confirmPassword"
          component="div"
        />
      </div>

      <div className="d-flex justify-content-end align-items-end">
        <Button
          className="registerButton my-2 text-white border-0"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </div>

      <div className="d-flex justify-content-center align-items-end">
        <span className="loginFormText">Already have an account?</span>
        <Link to="/login" className="registerLinkStyled">
          <span className="loginTextHighlight">&nbsp;Sign In</span>
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;
