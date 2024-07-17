import "../assets/css/components/ModalStyle.css";
import { Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { connections, endpoints } from "../config/connections";
import React from "react";

const FormModal = ({
  modalstyleheader,
  modalstylebody,
  modalstyletitle,
  HeaderComponent,
  BodyComponent,
  headerProps,
  onHide,
  show,
  initialValues,
  validationSchema,
  loading,
}) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  // Destructure currentEnquiry and onEnquiryChange from headerProps
  const { currentEnquiry, onEnquiryChange } = headerProps || {};

  async function handleSubmit(values) {
    console.log("VALUES: " + values);
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

        // Open the modal or handle success based on your application logic
        navigate("/confirmation");
      } else {
        // Handle error cases
        console.error("Server error:", response.status, response.data);

        // You can also throw an error here to be caught in the catch block below
        throw new Error("Server error");
      }
    } catch (error) {
      // Handle any other errors (e.g., network issues, JSON parsing, etc.)
      console.error("Error submitting form:", error);

      // You can display an error message or handle the error as needed
    }
  }

  return (
    <Modal
      show={show}
      dialogClassName="modalStyle"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true} // Set this to true
        key={loading}
        onSubmit={(values) => {
          console.log("Form values:", values);
          handleSubmit(values);
        }}
      >
        <div>
          <Modal.Header closeButton className={modalstyleheader}>
            <Modal.Title
              id="contained-modal-title-vcenter"
              className={modalstyletitle}
            >
              <HeaderComponent {...headerProps} />
            </Modal.Title>
          </Modal.Header>
          <div className="machineBodyHeaderDiv">
            <h4 className="machineBodyHeader">
              Please fill in your enquiry information below
            </h4>
          </div>
          <Modal.Body className={modalstylebody}>
            <BodyComponent />
          </Modal.Body>
        </div>
      </Formik>
      <Modal.Footer>
        {" "}
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormModal;
