import "../assets/css/pages/Register.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import RegisterForm from "../forms/RegisterForm";
import { Formik } from "formik";
import * as Yup from "yup";
import { Container } from "react-bootstrap";
import Banner from "../layouts/Banner";
import { handleDBRegistration } from "../utils/authenticationUtils";
import { resourceFolder, images, icons } from "../config/resources";

function Register() {
  const bannerImage = `${resourceFolder.images}${images.loginPageBannerImage}`;

  const { register, setError, sendEmailVerification, logout, setStoredUser } =
    useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required Email"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required Password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required Password"),
  });

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  async function handleFormSubmit(
    values,
    { setSubmitting, resetForm, setErrors }
  ) {
    let user;
    try {
      setLoading(true);
      const userCredential = await register(values.email, values.password);
      user = userCredential.user;
      const token = user && (await user.getIdToken());
      await handleDBRegistration(values, token);
      // Proceed to email verification
      await sendEmailVerification(user);
      setStoredUser(user);
      await logout();
      navigate("/verify-email");
    } catch (error) {
      setError("Failed to Register");
      if (user) {
        await user.delete();
      }
    } finally {
      setSubmitting(false);
      setLoading(false);
      resetForm();
    }
  }

  return (
    <>
      <Container className="px-0 pt-2">
        <Banner image={bannerImage} />
        <div className="py-5" />
        <Container className="d-flex justify-content-center">
          <div className="registerFormContainer d-flex justify-content-center align-items-center">
            <div className="registerInnerFormContainer px-5">
              <div className="py-4">
                <div className="d-flex registerFormHeading">Sign Up</div>
                <div className="d-flex registerFormSubheading">
                  Please enter your details
                </div>
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                <RegisterForm />
              </Formik>
            </div>
          </div>
        </Container>
        <Container className="py-5 my-5"></Container>
      </Container>
    </>
  );
}

export default Register;
