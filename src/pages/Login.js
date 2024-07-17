import "../assets/css/pages/Login.css";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../forms/LoginForm";
import { Formik } from "formik";
import * as Yup from "yup";
import { handleDBLogin } from "../utils/authenticationUtils";
import Banner from "../layouts/Banner";
import { resourceFolder, images, icons } from "../config/resources";

function Login() {
  const bannerImage = `${resourceFolder.images}${images.loginPageBannerImage}`;
  const {
    login,
    setError,
    logout,
    userStatus,
    reloadAllUserData,
    sendEmailVerification,
    storedUser,
    setStoredUser,
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [verificationMessage, setVerificationMessage] = useState("");
  const [localStorageLoading, setLocalStorageLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [prefill, setPrefill] = useState("");

  useEffect(() => {
    if (userStatus && !userStatus.emailVerified) {
      setVerificationMessage("Please verify your email before continuing.");
    }
  }, [userStatus]);

  useEffect(() => {
    // Set stored user to nothing on page load to prevent the button from showing
    setStoredUser();
    // Load remember me preference from local storage

    const storedValue = localStorage.getItem("rememberMe");

    if (storedValue !== null) {
      setRememberMe(storedValue === "true");
      if (storedValue === "true") {
        setPrefill(localStorage.getItem("rememberedEmail"));
      }
    }
    setLocalStorageLoading(false);
  }, []);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid Email")
      .required("Required Email"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required Password"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  //submit the form, login to the DB and navigate to profile
  async function handleFormSubmit(values, { setSubmitting, setErrors }) {
    try {
      setLoading(true);
      const userCredential = await login(values.email, values.password);
      const user = userCredential.user;

      // Save remember me preference to local storage
      localStorage.setItem("rememberMe", rememberMe);
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", values.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const token = user && (await user.getIdToken());
      await handleDBLogin(values, token);
      // Check if the user's email is verified
      if (!user.emailVerified) {
        setStoredUser(user);
        // Set error message for form
        setError(
          "Please verify your email before logging in. We've sent a verification email to your email address."
        );
        await logout();
        return;
      }

      await reloadAllUserData();
      navigate("/account/profile");
    } catch (error) {
      // Logout the user from Firebase
      // Check if currentUser is not null before getting token
      if (userStatus) {
        // Expire the Firebase token
        await userStatus.getIdToken(true);
      }
      await logout();
      console.error(
        "Error logging in: " +
          error.code +
          " " +
          error.message +
          " " +
          error.name
      );
      // Set error message for form
      setError("Failed to login.");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  }

  const handleResendVerificationEmail = async () => {
    try {
      setLoading(true);

      await sendEmailVerification(storedUser);
      setVerificationMessage("Verification email resent successfully.");
      navigate("/verify-email");
    } catch (error) {
      console.error("Error resending verification email:", error.message);
      setError("Error resending verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="px-0 pt-2">
        <Banner image={bannerImage} />
        <div className="py-5" />
        <Container className="d-flex justify-content-center">
          <div className="loginFormContainer d-flex justify-content-center align-items-center">
            <div className="loginInnerFormContainer px-5">
              <div className="py-4">
                <div className="d-flex loginFormHeading">Sign In</div>
                <div className="d-flex loginFormSubheading">
                  Please enter your details
                </div>
                {verificationMessage && (
                  <Alert variant="info">{verificationMessage}</Alert>
                )}
                {storedUser && (
                  <Button
                    variant="primary"
                    onClick={handleResendVerificationEmail}
                    disabled={loading}
                  >
                    Resend Verification Email
                  </Button>
                )}
              </div>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
              >
                <LoginForm
                  rememberMe={rememberMe}
                  setRememberMe={setRememberMe}
                  prefill={prefill}
                  localStorageLoading={localStorageLoading}
                />
              </Formik>
              <div className="py-2" />
            </div>
          </div>
        </Container>
        <Container className="py-5 my-5"></Container>
      </Container>
    </>
  );
}

export default Login;
