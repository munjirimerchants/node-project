import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import { ENQUIRY_COMMENT_FIELDS as FIELD_NAMES } from "../forms/FormFieldNames";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";
import { connections, endpoints } from "../config/connections";

const CommentForm = ({
  setIsCommentBoxOpen,
  enquiry,
  setEnquiry,
  updateUserEnquiry,
}) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    [FIELD_NAMES.comment]: Yup.string().required("Comments are required"),
  });

  const initialValues = {
    [FIELD_NAMES.comment]: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  async function handleSubmit(values) {
    try {
      setIsCommentBoxOpen(false);
      if (currentUser) {
        const bearerToken = await currentUser.getIdToken();

        // Check if the bearer token is available before making the request
        if (bearerToken) {
          let endpoint = `${connections.server}${endpoints.enquiries}/${enquiry.userEnquiryID}/userComment`;
          let headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          };
          // Convert values to JSON and send to the server using Axios
          const response = await axios.post(endpoint, values, {
            headers: headers,
          });

          // Check HTTP status code for success (2xx) or failure (4xx, 5xx)
          if (response.status >= 200 && response.status < 300) {
            // Successful response
          } else {
            // Handle error cases
            console.error("Server error:", response.status, response.data);
            throw new Error("Server error");
          }

          setEnquiry(response.data);
          updateUserEnquiry(response.data.userEnquiryID, response.data);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      // Handle any other errors (e.g., network issues, JSON parsing, etc.)
      console.error("Error submitting form:", error);
    }
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange={true}
        validateOnBlur={true}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <Form>
          <label htmlFor={FIELD_NAMES.comment} style={{ marginTop: "1rem" }}>
            Comments
            <span style={{ color: "red" }}> *</span>
          </label>
          <Field
            as="textarea"
            id={FIELD_NAMES.comment}
            name={FIELD_NAMES.comment}
            className={`my-textarea ${
              formik.errors[FIELD_NAMES.comment] &&
              formik.touched[FIELD_NAMES.comment]
                ? "error"
                : ""
            }`}
          />
          <ErrorMessage
            className="custom-error-message"
            name={FIELD_NAMES.comment}
            component="div"
          />
          <div style={{ color: "red", fontSize: "0.8rem" }}>
            <p>Maximum of 3 comments per enquiry!</p>
          </div>
          <div className="enquiryModalCommentButtonDiv">
            <Button type="submit" className="enquiryModalReplyButton">
              Send
            </Button>{" "}
            <Button
              className="enquiryModalReplyButton"
              onClick={() => setIsCommentBoxOpen(false)}
            >
              Cancel
            </Button>{" "}
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default CommentForm;
