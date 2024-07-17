import "../assets/css/pages/Login.css";

import { resourceFolder, images, icons } from "../config/resources";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Formik } from "formik";
import * as Yup from "yup";
import ForgotPasswordForm from "../forms/ForgotPasswordForm";
import Banner from "../layouts/Banner";

function ForgotPassword() {
  const bannerPath = `${resourceFolder.images}${images.loginPageBannerImage}`;

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPasswordEmail } = useAuth();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Address Required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      await resetPasswordEmail(values.email);
      setMessage("Password reset email sent successfully.");
    } catch (error) {
      setMessage("Error sending password reset email.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Container className="px-0 pt-2">
        <Banner image={bannerPath} />
        <div className="py-5" />
        <Container className="d-flex justify-content-center">
          <div className="loginFormContainer d-flex justify-content-center align-items-center">
            <div className="loginInnerFormContainer px-5">
              <div className="py-4">
                <div className="d-flex loginFormHeading">Forgot Password</div>
                <div className="py-1 d-flex loginFormSubheading">
                  Enter the email associated with your account and we'll send a
                  link to reset your password.
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  className="py-1"
                >
                  <ForgotPasswordForm />
                </Formik>{" "}
              </div>
            </div>
          </div>
        </Container>

        <Container className="py-5 my-5" />
      </Container>
    </>
  );
}

export default ForgotPassword;
