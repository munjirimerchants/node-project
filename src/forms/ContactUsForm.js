import "../assets/css/components/ContactUs.css";

import { Row, Col, Button } from "react-bootstrap";
import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import { CONTACT_US_FIELDS as FIELD_NAMES } from "../forms/FormFieldNames";

const ContactUsForm = () => {
  const formik = useFormikContext();
  const options = ["General", "Brick", "Machine"];

  return (
    <>
      <Form>
        <Row className="contactUsForm">
          <Col xs="12" sm="6" className="contactCols">
            <label htmlFor={FIELD_NAMES.enquiryType}>
              Query Type
              <span style={{ color: "red" }}> *</span>
            </label>
            <Field
              as="select"
              name={FIELD_NAMES.enquiryType}
              className={`my-field ${
                formik.errors[FIELD_NAMES.enquiryType] &&
                formik.touched[FIELD_NAMES.enquiryType]
                  ? "error"
                  : ""
              }`}
              onChange={(event) => {
                const selectedOption = event.target.value;
                formik.setFieldValue([FIELD_NAMES.enquiryType], selectedOption);
                formik.setFieldError(
                  FIELD_NAMES.enquiryType,
                  selectedOption ? "" : "Please select an option"
                );
              }}
            >
              <option value="">Select an option</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Field>
            <ErrorMessage
              className="custom-error-message"
              name={FIELD_NAMES.enquiryType}
              component="div"
            />
          </Col>
          <Col xs="12" sm="6" className="contactCols">
            <label htmlFor={FIELD_NAMES.companyName}>Company Name</label>
            <Field
              type="text"
              id={FIELD_NAMES.companyName}
              name={FIELD_NAMES.companyName}
              className={`my-field ${
                formik.errors[FIELD_NAMES.companyName] &&
                formik.touched[FIELD_NAMES.companyName]
                  ? "error"
                  : ""
              }`}
            />
            <ErrorMessage
              className="custom-error-message"
              name={FIELD_NAMES.companyName}
              component="div"
            />
          </Col>
        </Row>

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
              className={`my-textarea ${
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
        <Row className="mb-5" style={{ paddingLeft: "12px" }}>
          <Button variant="primary" type="submit" className="contactUsSubmit">
            Submit
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default ContactUsForm;
