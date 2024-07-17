import "../assets/css/components/ContactUs.css";

import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import { MACHINE_ENQUIRY_FIELDS as FIELD_NAMES } from "../forms/FormFieldNames";

const MachineEnquiryForm = () => {
  const formik = useFormikContext();

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // Function to get the current date in the format "dd month yyyy"
    const getCurrentDate = () => {
      const today = new Date();
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      return today.toLocaleDateString("en-GB", options);
    };

    // Set the current date when the component mounts
    setCurrentDate(getCurrentDate());
  }, []);

  return (
    <>
      <Form>
        <Row>
          <Col xs="12" sm="6" className="contactCols">
            <label htmlFor={FIELD_NAMES.firstName}>
              First Name
              <span style={{ color: "red" }}> *</span>
            </label>
            <Field
              disabled={!!formik.initialValues[FIELD_NAMES.firstName]}
              type="text"
              id={FIELD_NAMES.firstName}
              name={FIELD_NAMES.firstName}
              className={`my-field ${
                formik.errors[FIELD_NAMES.firstName] &&
                formik.touched[FIELD_NAMES.firstName]
                  ? "error"
                  : ""
              }`}
            />
            <ErrorMessage
              className="custom-error-message"
              name={FIELD_NAMES.firstName}
              component="div"
            />
          </Col>
          <Col xs="12" sm="6" className="contactCols">
            <label htmlFor={FIELD_NAMES.surname}>
              Surname
              <span style={{ color: "red" }}> *</span>
            </label>
            <Field
              disabled={!!formik.initialValues[FIELD_NAMES.surname]}
              type="text"
              id={FIELD_NAMES.surname}
              name={FIELD_NAMES.surname}
              className={`my-field ${
                formik.errors[FIELD_NAMES.surname] &&
                formik.touched[FIELD_NAMES.surname]
                  ? "error"
                  : ""
              }`}
            />
            <ErrorMessage
              className="custom-error-message"
              name={FIELD_NAMES.surname}
              component="div"
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" className="contactCols">
            <label htmlFor={FIELD_NAMES.telephone}>
              Telephone
              <span style={{ color: "red" }}> *</span>
            </label>
            <Field
              disabled={!!formik.initialValues[FIELD_NAMES.telephone]}
              type="text"
              id={FIELD_NAMES.telephone}
              name={FIELD_NAMES.telephone}
              className={`my-field ${
                formik.errors[FIELD_NAMES.telephone] &&
                formik.touched[FIELD_NAMES.telephone]
                  ? "error"
                  : ""
              }`}
            />
            <ErrorMessage
              className="custom-error-message"
              name={FIELD_NAMES.telephone}
              component="div"
            />
          </Col>
          <Col xs="12" sm="6" className="contactCols">
            <label htmlFor={FIELD_NAMES.email}>
              Email
              <span style={{ color: "red" }}> *</span>
            </label>
            <Field
              disabled={!!formik.initialValues[FIELD_NAMES.email]}
              type="text"
              id={FIELD_NAMES.email}
              name={FIELD_NAMES.email}
              className={`my-field ${
                formik.errors[FIELD_NAMES.email] &&
                formik.touched[FIELD_NAMES.email]
                  ? "error"
                  : ""
              }`}
            />
            <ErrorMessage
              className="custom-error-message"
              name={FIELD_NAMES.email}
              component="div"
            />
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" className="contactCols">
            <label htmlFor={FIELD_NAMES.location}>
              Hire Location
              <span style={{ color: "red" }}> *</span>
            </label>
            <Field
              type="text"
              id={FIELD_NAMES.location}
              name={FIELD_NAMES.location}
              className={`my-field ${
                formik.errors[FIELD_NAMES.location] &&
                formik.touched[FIELD_NAMES.location]
                  ? "error"
                  : ""
              }`}
            />
            <ErrorMessage
              className="custom-error-message"
              name={FIELD_NAMES.location}
              component="div"
            />
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col className="contactCols">
            <label htmlFor={FIELD_NAMES.comments} style={{ marginTop: "1rem" }}>
              Comments
              <span style={{ color: "red" }}> *</span>
            </label>
            <Field
              as="textarea"
              id={FIELD_NAMES.comments}
              name={FIELD_NAMES.comments}
              className={`textarea-machine ${
                formik.errors[FIELD_NAMES.comments] &&
                formik.touched[FIELD_NAMES.comments]
                  ? "error"
                  : ""
              }`}
            />
            <ErrorMessage
              className="custom-error-message"
              name={FIELD_NAMES.comments}
              component="div"
            />
          </Col>
        </Row>
        <Row className="enquiryDateHeaderMachineForm">Enquiry Date:</Row>
        <Row className="enquiryDateMachineForm">{currentDate}</Row>
        <Row className="mb-1" style={{ paddingLeft: "12px" }}>
          <Button variant="primary" type="submit" className="contactUsSubmit">
            Submit
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default MachineEnquiryForm;
