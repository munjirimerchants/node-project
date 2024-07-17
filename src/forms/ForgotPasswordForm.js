import { Button, Alert } from "react-bootstrap";
import { Field, ErrorMessage, Form, useFormikContext } from "formik";
import { Link } from "react-router-dom";

function PasswordResetForm({ loading, message }) {
  const formik = useFormikContext();
  return (
    <>
      <Form>
        <label htmlFor="email" className="profileSmallText">
          Email<span className="registerAsterisk">&nbsp;*</span>
        </label>
        <Field
          disabled={!!formik.initialValues["email"]}
          className={`profileFieldBox w-100 ${
            formik.touched["email"] && formik.errors["email"]
              ? "has-danger"
              : ""
          }`}
          id="email"
          type="text"
          name="email"
          placeholder="Your Email"
        />
        <ErrorMessage
          className="profileErrorMessage"
          name="email"
          component="div"
        />

        <Button className="my-2 text-white loginButton border-0" type="submit">
          {loading ? "Sending..." : "Send Reset Email"}
        </Button>

        <div className="d-flex justify-content-center">
          <Link to="/login" className="loginLinkStyled">
            <span className="loginTextHighlight">&nbsp;Back to Sign Up</span>
          </Link>
        </div>

        {message && (
          <div className="mt-3">
            <Alert variant="info">{message}</Alert>
          </div>
        )}
      </Form>
    </>
  );
}

export default PasswordResetForm;
