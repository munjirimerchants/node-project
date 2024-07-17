import "../assets/css/pages/Login.css";

import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../lib/LoginForm";
import { Formik } from "formik";
import * as Yup from "yup";
import { connections, endpoints } from "../config/connections";
import Banner from "../layouts/Banner";
import Logout from "../pages/Logout";
import axios from "axios";
import { resourceFolder, images, icons } from "../config/resources";

function LoginAdmin() {
  const bannerImage = `${resourceFolder.images}${images.loginPageBannerImage}`;
  const { login, setError, logout, userStatus, setStoredUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [localStorageLoading, setLocalStorageLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [prefill, setPrefill] = useState("");

  const [modal, setModal] = useState(false);

  useEffect(() => {
    //set stored user to nothing on page load to prevent the button from showing
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
    } catch (error) {
      // Logout the user from Firebase
      // Check if currentUser is not null before getting token
      if (userStatus) {
        // Expire the Firebase token
        await userStatus.getIdToken(true);
      }
      await logout();
      // Handle other errors
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

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PER_PAGE = 3;

  // Function to fetch data for the specified page
  const fetchDataForPage = async (page) => {
    const token = await userStatus.getIdToken();
    if (token) {
      const payloadHeader = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${connections.server}${endpoints.users}?page=${page}&limit=${PER_PAGE}`,
        payloadHeader
      );

      setData(response.data);
      setTotalPages(response?.data?.pagination?.totalPages);
    }
  };

  // Fetch data for the first page when the component mounts
  useEffect(() => {
    fetchDataForPage(1);
  }, []);

  // Function to handle "next" page button click
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      fetchDataForPage(currentPage + 1);
    }
  };

  // Function to handle "previous" page button click
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchDataForPage(currentPage - 1);
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
                <div className="d-flex loginFormHeading">
                  Sign In AS AN ADMIN
                </div>
                <div className="d-flex loginFormSubheading">
                  Please enter your details
                </div>
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
            </div>
          </div>
        </Container>
        {userStatus && (
          <>
            <div>
              <ul>
                {data?.users?.map((item, index) => (
                  <li style={{ color: "white" }} key={index}>
                    {item.email}
                  </li>
                ))}
              </ul>

              {/* Pagination controls */}
              <div>
                <button onClick={previousPage} disabled={currentPage === 1}>
                  Previous
                </button>
                <span>{currentPage}</span> {/* Display current page number */}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
        {userStatus && (
          <>
            <Button className="navbarLogoutInOffCanvas" onClick={setModal}>
              Logout as Admin
            </Button>{" "}
          </>
        )}
        <Container className="py-5 my-5"></Container>
        {modal && <Logout modal={modal} setModal={setModal} />}
      </Container>
    </>
  );
}

export default LoginAdmin;
