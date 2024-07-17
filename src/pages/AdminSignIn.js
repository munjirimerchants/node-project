import "../assets/css/pages/AdminLogin.css";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Col, Row, Image } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../forms/LoginForm";
import { Formik } from "formik";
import * as Yup from "yup";
import Logout from "./Logout";
import { resourceFolder, images } from "../config/resources";

function AdminSignIn() {
  const Logo = `${resourceFolder.images}${images.adminPageLogo}`;
  const { login, setError, logout, userStatus, setStoredUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [localStorageLoading, setLocalStorageLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [prefill, setPrefill] = useState("");

  const [modal, setModal] = useState(false);

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

  // Submit the form, login to the DB and navigate to profile
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
      navigate("/admin/dashboard");
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

  return (
    <>
      <Row>
        <Col md="6" className="adminLoginCol1 d-none d-md-block">
          <div className="adminLoginBackgroundImage">
            <div className="adminLoginLogoPosition">
              <Image src={Logo}></Image>
            </div>
          </div>
        </Col>
        <Col sm="12" md="6" className="adminLoginCol2">
          <Container className="d-flex justify-content-center ">
            <div className="adminLoginBox">
              <div className="adminLoginInnerFormContainer px-5">
                <div className="py-2" />
                <div className="d-flex loginFormHeading">Sign In (Admin)</div>
                <div className="d-flex loginFormSubheading">
                  Please enter your details
                </div>
                <div className="py-2" />
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
        </Col>
      </Row>

      {modal && <Logout modal={modal} setModal={setModal} />}
    </>
  );
}

export default AdminSignIn;
