import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { USER_PROFILE_FIELDS } from "../forms/FormFieldNames";

const UserProfileForm = ({ editProfile, stopEditing }) => {
  const formik = useFormikContext();

  return (
    <Form className="profileFormEdit">
      <Row>
        <Col sm="12" md="12" lg="6">
          <label
            htmlFor={USER_PROFILE_FIELDS.firstName}
            className="profileSmallText"
          >
            First Name
            <span className="registerAsterisk">&nbsp;*</span>
          </label>
          <Field
            className={`profileFieldBox ${
              formik.touched[USER_PROFILE_FIELDS.firstName] &&
              formik.errors[USER_PROFILE_FIELDS.firstName]
                ? "has-danger"
                : ""
            }`}
            id={USER_PROFILE_FIELDS.firstName}
            type="text"
            name={USER_PROFILE_FIELDS.firstName}
          />
          <ErrorMessage
            className="profileErrorMessage"
            name={USER_PROFILE_FIELDS.firstName}
            component="div"
          />
        </Col>
        <Col sm="12" md="12" lg="6">
          <label
            htmlFor={USER_PROFILE_FIELDS.surname}
            className="profileSmallText"
          >
            Surname
            <span className="registerAsterisk">&nbsp;*</span>
          </label>
          <Field
            className={`profileFieldBox ${
              formik.touched[USER_PROFILE_FIELDS.surname] &&
              formik.errors[USER_PROFILE_FIELDS.surname]
                ? "has-danger"
                : ""
            }`}
            id={USER_PROFILE_FIELDS.surname}
            type="text"
            name={USER_PROFILE_FIELDS.surname}
            placeholder=""
          />
          <ErrorMessage
            className="profileErrorMessage"
            name={USER_PROFILE_FIELDS.surname}
            component="div"
          />
        </Col>
      </Row>
      <Row>
        <Col sm="12" md="12" lg="6">
          <label
            htmlFor={USER_PROFILE_FIELDS.telephone}
            className="profileSmallText"
          >
            Telephone
            <span className="registerAsterisk">&nbsp;*</span>
          </label>
          <Field
            className={`profileFieldBox ${
              formik.touched[USER_PROFILE_FIELDS.telephone] &&
              formik.errors[USER_PROFILE_FIELDS.telephone]
                ? "has-danger"
                : ""
            }`}
            id={USER_PROFILE_FIELDS.telephone}
            type="text"
            name={USER_PROFILE_FIELDS.telephone}
            placeholder=""
          />
          <ErrorMessage
            className="profileErrorMessage"
            name={USER_PROFILE_FIELDS.telephone}
            component="div"
          />
        </Col>
        <Col sm="12" md="12" lg="6">
          <label
            htmlFor={USER_PROFILE_FIELDS.email}
            className="profileSmallText"
          >
            Email
          </label>
          <Field
            disabled={true}
            className={`profileFieldBox ${
              formik.touched[USER_PROFILE_FIELDS.email] &&
              formik.errors[USER_PROFILE_FIELDS.email]
                ? "has-danger"
                : ""
            }`}
            id={USER_PROFILE_FIELDS.email}
            type="email"
            name={USER_PROFILE_FIELDS.email}
            placeholder=""
          />
          <ErrorMessage
            className="profileErrorMessage"
            name={USER_PROFILE_FIELDS.email}
            component="div"
          />
        </Col>
      </Row>
      {/* BILLING ADDRESS */}
      {/********************* */}
      <div className="profileDeliveryInfoText pt-5">
        Billing Address <span className="profileOptional">(Optional)</span>
      </div>
      <Row>
        <Col>
          <Row>
            <Col sm="12" md="12" lg="6">
              <label
                htmlFor={USER_PROFILE_FIELDS.address}
                className="profileSmallText"
              >
                Address Line 1<span className="registerAsterisk">&nbsp;*</span>
              </label>
              <Field
                className={`profileFieldBox w-100 ${
                  formik.touched[USER_PROFILE_FIELDS.address] &&
                  formik.errors[USER_PROFILE_FIELDS.address]
                    ? "has-danger"
                    : ""
                }`}
                id={USER_PROFILE_FIELDS.address}
                type="text"
                name={USER_PROFILE_FIELDS.address}
                placeholder=""
              />
              <ErrorMessage
                className="profileErrorMessage"
                name={USER_PROFILE_FIELDS.address}
                component="div"
              />
            </Col>
            <Col sm="12" md="12" lg="6">
              <label
                htmlFor={USER_PROFILE_FIELDS.address2}
                className="profileSmallText"
              >
                Address Line 2
              </label>
              <Field
                className={`profileFieldBox w-100 ${
                  formik.touched[USER_PROFILE_FIELDS.address2] &&
                  formik.errors[USER_PROFILE_FIELDS.address2]
                    ? "has-danger"
                    : ""
                }`}
                id={USER_PROFILE_FIELDS.address2}
                type="text"
                name={USER_PROFILE_FIELDS.address2}
                placeholder=""
              />
              <ErrorMessage
                className="profileErrorMessage"
                name={USER_PROFILE_FIELDS.address2}
                component="div"
              />
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="12" lg="6">
              <label
                htmlFor={USER_PROFILE_FIELDS.townCity}
                className="profileSmallText"
              >
                Town/City
                <span className="registerAsterisk">&nbsp;*</span>
              </label>
              <Field
                className={`profileFieldBox ${
                  formik.touched[USER_PROFILE_FIELDS.townCity] &&
                  formik.errors[USER_PROFILE_FIELDS.townCity]
                    ? "has-danger"
                    : ""
                }`}
                id={USER_PROFILE_FIELDS.townCity}
                type="text"
                name={USER_PROFILE_FIELDS.townCity}
                placeholder=""
              />
              <ErrorMessage
                className="profileErrorMessage"
                name={USER_PROFILE_FIELDS.townCity}
                component="div"
              />
            </Col>
            <Col sm="12" md="12" lg="6">
              <label
                htmlFor={USER_PROFILE_FIELDS.postcode}
                className="profileSmallText"
              >
                Postcode
                <span className="registerAsterisk">&nbsp;*</span>
              </label>
              <Field
                className={`profileFieldBox ${
                  formik.touched[USER_PROFILE_FIELDS.postcode] &&
                  formik.errors[USER_PROFILE_FIELDS.postcode]
                    ? "has-danger"
                    : ""
                }`}
                id={USER_PROFILE_FIELDS.postcode}
                type="text"
                name={USER_PROFILE_FIELDS.postcode}
                placeholder=""
              />
              <ErrorMessage
                className="profileErrorMessage"
                name={USER_PROFILE_FIELDS.postcode}
                component="div"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* DELIVERY ADDRESS */}
      {/********************* */}
      <div className="profileDeliveryInfoText pt-5">
        Delivery Address <span className="profileOptional">(Optional)</span>
      </div>
      <Row>
        <Col>
          <Row>
            <Col sm="12" md="12" lg="6">
              <label
                htmlFor={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_address}`}
                className="profileSmallText"
              >
                Address Line 1
              </label>
              <Field
                className={`profileFieldBox w-100 ${
                  formik.touched[
                    `${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_address}`
                  ] &&
                  formik.errors[
                    `${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_address}`
                  ]
                    ? "has-danger"
                    : ""
                }`}
                id={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_address}`}
                type="text"
                name={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_address}`}
                placeholder=""
              />
              <ErrorMessage
                className="profileErrorMessage"
                name={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_address}`}
                component="div"
              />
            </Col>
            <Col sm="12" md="12" lg="6">
              <label
                htmlFor={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_address2}`}
                className="profileSmallText"
              >
                Address Line 2
              </label>
              <Field
                className={`profileFieldBox w-100 ${
                  formik.touched[
                    `${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_address2}`
                  ] &&
                  formik.errors[
                    `${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_address2}`
                  ]
                    ? "has-danger"
                    : ""
                }`}
                id={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_address2}`}
                type="text"
                name={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_address2}`}
                placeholder=""
              />
              <ErrorMessage
                className="profileErrorMessage"
                name={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_address2}`}
                component="div"
              />
            </Col>
          </Row>

          <Row>
            <Col sm="12" md="12" lg="6">
              <label
                htmlFor={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_townCity}`}
                className="profileSmallText"
              >
                Town/City
              </label>
              <Field
                className={`profileFieldBox ${
                  formik.touched[
                    `${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_townCity}`
                  ] &&
                  formik.errors[
                    `${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_townCity}`
                  ]
                    ? "has-danger"
                    : ""
                }`}
                id={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_townCity}`}
                type="text"
                name={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_townCity}`}
                placeholder=""
              />
              <ErrorMessage
                className="profileErrorMessage"
                name={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_townCity}`}
                component="div"
              />
            </Col>
            <Col sm="12" md="12" lg="6">
              <label
                htmlFor={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_postcode}`}
                className="profileSmallText"
              >
                Postcode
              </label>
              <Field
                className={`profileFieldBox ${
                  formik.touched[
                    `${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_postcode}`
                  ] &&
                  formik.errors[
                    `${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_postcode}`
                  ]
                    ? "has-danger"
                    : ""
                }`}
                id={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_postcode}`}
                type="text"
                name={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_postcode}`}
                placeholder=""
              />
              <ErrorMessage
                className="profileErrorMessage"
                name={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_postcode}`}
                component="div"
              />
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="12" lg="12">
              <label
                htmlFor={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_comments}`}
                className="profileSmallText"
              >
                Comments
              </label>
              <Field
                className={`profileFieldBox ${
                  formik.touched[
                    `${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_comments}`
                  ] &&
                  formik.errors[
                    `${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_comments}`
                  ]
                    ? "has-danger"
                    : ""
                }`}
                id={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_comments}`}
                type="text"
                name={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_comments}`}
                placeholder=""
              />
              <ErrorMessage
                className="profileErrorMessage"
                name={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_comments}`}
                component="div"
              />
            </Col>
          </Row>
          <Row className="mb-3" style={{ paddingLeft: "12px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                variant="primary"
                type="submit"
                className="profileFormButton"
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                className="profileFormButton"
                onClick={stopEditing}
              >
                Cancel
              </Button>
            </div>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};

export default UserProfileForm;
