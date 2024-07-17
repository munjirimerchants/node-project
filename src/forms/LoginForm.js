import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginForm = ({
  rememberMe,
  setRememberMe,
  localStorageLoading,
  prefill,
}) => {
  const formik = useFormikContext();
  const [loading, setLoading] = useState(false);

  // handle form submit
  useEffect(() => {
    if (!localStorageLoading) {
      formik.resetForm({
        values: { email: prefill, password: "" },
        errors: {},
        touched: {},
        isSubmitting: false,
      });
    }
  }, [localStorageLoading]);

  return (
    <Form>
      <label htmlFor="email" className="loginFormText">
        Email
      </label>
      <span className="loginAsterisk">&nbsp;*</span>
      <div>
        <Field
          className={`loginFieldBox ${
            formik.touched.email && formik.errors.email ? "has-danger" : ""
          }`}
          id="loginField"
          type="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <ErrorMessage
          className="loginErrorMessage"
          name="email"
          component="div"
        />
      </div>
      <label htmlFor="password" className="loginFormText">
        Password
      </label>
      <span className="loginAsterisk">&nbsp;*</span>
      <div>
        <Field
          className={`loginFieldBox ${
            formik.touched.password && formik.errors.password
              ? "has-danger"
              : ""
          }`}
          id="loginField"
          type="password"
          name="password"
          placeholder="Password"
        />
        <ErrorMessage
          className="loginErrorMessage"
          name="password"
          component="div"
        />
      </div>
      <Row>
        <Col xs="12" sm="6">
          <div className="rememberMeCheckbox">
            <label className="rememberMeLabel">
              <input
                className="rememberMeInput"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
          </div>
        </Col>
        <Col xs="12" sm="6" className="loginFieldCol">
          <div className="loginField d-flex py-2">
            <Link to="/forgot-password" className="loginLinkStyled">
              I forgot my password
            </Link>
          </div>
        </Col>
      </Row>
      <div>
        <Button
          className="my-2 text-white loginButton border-0"
          type="submit"
          disabled={loading}
        >
          {loading ? "Confirming..." : "Confirm"}
        </Button>
      </div>

      <div className="d-flex justify-content-center">
        <span className="loginFormText">Don't have an account?</span>
        <Link to="/register" className="loginLinkStyled ">
          <span className="loginTextHighlight">&nbsp;Sign Up</span>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
