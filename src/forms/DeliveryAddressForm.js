import { Field, ErrorMessage, useFormikContext } from "formik";
import { Button, Col, Row } from "react-bootstrap";
import { USER_PROFILE_FIELDS } from "../forms/FormFieldNames";

const DeliveryAddressForm = ({ user, stopEditingDeliveryAddress }) => {
  const formik = useFormikContext();
  return (
    <div>
      <div className="profileDeliveryInfoText ">
        Delivery Address 2 <span className="profileOptional">(Optional)</span>
      </div>
      <Row>
        <Col>
          <Col>
            <label
              htmlFor={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_address}`}
              className="profileSmallText"
            >
              Address Line 1<span className="registerAsterisk">&nbsp;*</span>
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
          <Col>
            <label
              htmlFor={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_address2}`}
              className="profileSmallText"
            >
              Address Line 2<span className="registerAsterisk">&nbsp;*</span>
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
          <Row>
            <Col>
              <label
                htmlFor={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_townCity}`}
                className="profileSmallText"
              >
                Town/City
                <span className="registerAsterisk">&nbsp;*</span>
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
            <Col>
              <label
                htmlFor={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_postcode}`}
                className="profileSmallText"
              >
                Postcode
                <span className="registerAsterisk">&nbsp;*</span>
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
          <Col>
            <label
              htmlFor={`${USER_PROFILE_FIELDS.UserDeliveryInformations}[0].${USER_PROFILE_FIELDS.delivery_comments}`}
              className="profileSmallText"
            >
              Comments
              <span className="registerAsterisk">&nbsp;*</span>
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

          <Row className="mb-5" style={{ paddingLeft: "12px" }}>
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
                className="contactUsSubmit"
              >
                Save
              </Button>
              <Button
                variant="primary"
                type="button"
                className="contactUsSubmit"
                onClick={stopEditingDeliveryAddress}
              >
                Cancel
              </Button>
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DeliveryAddressForm;
