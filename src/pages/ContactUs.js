import "../assets/css/components/ContactUs.css";

import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Row, Col, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { connections, endpoints } from "../config/connections";
import { resourceFolder, images, icons } from "../config/resources";
import { useAuth } from "../context/AuthContext";
import { CONTACT_US_FIELDS as FIELD_NAMES } from "../forms/FormFieldNames";

import ContactUsForm from "../forms/ContactUsForm";
import UserDetails from "../utils/UserDetails";
import Banner from "../layouts/Banner";
import * as Yup from "yup";
import axios from "axios";

function ContactUs() {
  const callIconPath = `${resourceFolder.icons}${icons.call}`;
  const emailIconPath = `${resourceFolder.icons}${icons.email}`;
  const locationIconPath = `${resourceFolder.icons}${icons.location}`;

  const bannerPath = `${resourceFolder.images}${images.aboutUsBannerImage}`;

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { loading, userDetails } = UserDetails();
  const [userDetailsState, setUserDetailsState] = useState();

  useEffect(() => {
    if (loading) {
      console.log("Loading user details...");
    } else if (userDetails) {
      console.log("User details:", JSON.stringify(userDetails));
      setUserDetailsState(userDetails);
      console.log("DETAILS: " + JSON.stringify(userDetailsState));
    } else {
      console.log("User details are empty or not available");
    }
  }, [loading, userDetails]);

  const validationSchema = Yup.object().shape({
    [FIELD_NAMES.enquiryType]: Yup.string().required("Please select an option"),
    [FIELD_NAMES.firstName]: Yup.string().required("First Name is required"),
    [FIELD_NAMES.surname]: Yup.string().required("Surname is required"),
    [FIELD_NAMES.telephone]: Yup.string()
      .required("Telephone is required")
      .matches(/^\d+$/, "Invalid telephone number"),
    [FIELD_NAMES.email]: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    [FIELD_NAMES.location]: Yup.string().required("Address is required"),
    [FIELD_NAMES.comments]: Yup.string().required("Comments are required"),
  });

  const initialValues = {
    [FIELD_NAMES.enquiryType]: "",
    [FIELD_NAMES.companyName]: "",
    [FIELD_NAMES.firstName]: userDetailsState?.firstName ?? "",
    [FIELD_NAMES.surname]: userDetailsState?.surname ?? "",
    [FIELD_NAMES.telephone]: userDetailsState?.telephone ?? "",
    [FIELD_NAMES.email]: userDetailsState?.email ?? "",
    [FIELD_NAMES.location]: "",
    [FIELD_NAMES.comments]: "",
  };

  console.log(userDetailsState?.firstName);
  async function handleSubmit(values) {
    try {
      let endpoint = `${connections.server}${endpoints.enquiriesEnquire}`;
      let headers = { "Content-Type": "application/json" };

      if (currentUser) {
        console.log("LOGGED IN");
        const bearerToken = await currentUser.getIdToken();

        // Check if the bearer token is available before making the request
        if (bearerToken) {
          endpoint = `${connections.server}${endpoints.enquiriesEnquireAuthenticated}`;
          headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          };
        }
      } else {
        console.log("NOT LOGGED IN");
      }

      // Convert values to JSON and send to the server using Axios
      const response = await axios.post(endpoint, values, {
        headers: headers,
      });

      console.log("Server response:", response.data);

      // Check HTTP status code for success (2xx) or failure (4xx, 5xx)
      if (response.status >= 200 && response.status < 300) {
        // Successful response
        console.log("Form submitted successfully!");

        navigate("/confirmation");
      } else {
        // Handle error cases
        console.error("Server error:", response.status, response.data);

        throw new Error("Server error");
      }
    } catch (error) {
      // Handle any other errors (e.g., network issues, JSON parsing, etc.)
      console.error("Error submitting form:", error);
    }
  }
  return (
    <div>
      <Container className="px-0 pt-2">
        <Banner image={bannerPath} height="20rem" />
        <div className="py-5" />
        <Container className="contactUstitleContainer py-5">
          <span className="text-uppercase p-0 pe-3 contactUsTitle1">
            Contact
          </span>
          <span className="text-uppercase p-0  contactUsTitle2">Us</span>
        </Container>
      </Container>
      <Container className="py-5">
        <Row>
          <Col sm="12" md="4" className="contactUsContactCol">
            <Container className="contactUsContactDiv">
              <p className="contactUsGetInTouch">Get in touch</p>
              <p className="contactUsSubText">We would love to hear from you</p>
              <p className="contactUsSubText">
                Please call, email or use the contact form to send us a message
              </p>

              <div className="contactIconDiv d-flex flex-row justify-content-start align-items-start">
                <Image
                  className="contactUsIcon  me-2"
                  src={callIconPath}
                  alt=""
                ></Image>
                <p className="m-0 contactUsContactText">1234567890</p>
              </div>
              <div className="contactIconDiv d-flex flex-row justify-content-start align-items-start">
                <Image
                  className="contactUsIcon  me-2"
                  src={emailIconPath}
                  alt=""
                ></Image>
                <p className="m-0 contactUsContactText">
                  something@blabla123.com{" "}
                </p>
              </div>
              <div className="contactIconDiv d-flex flex-row justify-content-start align-items-start">
                <Image
                  className="contactUsIcon me-2"
                  src={locationIconPath}
                  alt=""
                ></Image>
                <p className="m-0 contactUsContactText">
                  SOmwheere 5, SOmewhereelse InHere, Iwead, Aawdawd
                </p>
              </div>
            </Container>
          </Col>
          <Col sm="12" md="8" className="px-3">
            <div className="contactUsFormDiv">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnChange={true}
                validateOnBlur={true}
                onSubmit={handleSubmit}
                enableReinitialize={true}
                key={loading}
              >
                <ContactUsForm />
              </Formik>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactUs;
