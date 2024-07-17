import "../assets/css/components/OrderSummaryModal.css";
import React from "react";

import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import { ORDER_SUMMARY_FIELDS } from "../forms/FormFieldNames";
import { Button, Col, Row } from "react-bootstrap";

const OrderForm = ({ currentUser, userStatus }) => {
  const formik = useFormikContext();
  return (
    <Form>
      <div>
        <p>Customer Information</p>
        <Row>
          <Col xs={12} sm={6}>
            <label
              htmlFor={`${ORDER_SUMMARY_FIELDS.firstName}`}
              className="profileSmallText"
            >
              First Name
              <span className="registerAsterisk">&nbsp;*</span>
            </label>
            <Field
              disabled={!!formik.initialValues[ORDER_SUMMARY_FIELDS.firstName]}
              className={`profileFieldBox w-100 ${
                formik.touched[`${ORDER_SUMMARY_FIELDS.firstName}`] &&
                formik.errors[`${ORDER_SUMMARY_FIELDS.firstName}`]
                  ? "has-danger"
                  : ""
              }`}
              id={`${ORDER_SUMMARY_FIELDS.firstName}`}
              type="text"
              name={`${ORDER_SUMMARY_FIELDS.firstName}`}
              placeholder=""
            />
            <ErrorMessage
              className="profileErrorMessage"
              name={`${ORDER_SUMMARY_FIELDS.firstName}`}
              component="div"
            />
          </Col>
          <Col xs={12} sm={6}>
            <label
              htmlFor={`${ORDER_SUMMARY_FIELDS.surname}`}
              className="profileSmallText"
            >
              Surname<span className="registerAsterisk">&nbsp;*</span>
            </label>
            <Field
              disabled={!!formik.initialValues[ORDER_SUMMARY_FIELDS.surname]}
              className={`profileFieldBox w-100 ${
                formik.touched[`${ORDER_SUMMARY_FIELDS.surname}`] &&
                formik.errors[`${ORDER_SUMMARY_FIELDS.surname}`]
                  ? "has-danger"
                  : ""
              }`}
              id={`${ORDER_SUMMARY_FIELDS.surname}`}
              type="text"
              name={`${ORDER_SUMMARY_FIELDS.surname}`}
              placeholder=""
            />
            <ErrorMessage
              className="profileErrorMessage"
              name={`${ORDER_SUMMARY_FIELDS.surname}`}
              component="div"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={6}>
            <label
              htmlFor={`${ORDER_SUMMARY_FIELDS.telephone}`}
              className="profileSmallText"
            >
              Telephone<span className="registerAsterisk">&nbsp;*</span>
            </label>
            <Field
              disabled={!!formik.initialValues[ORDER_SUMMARY_FIELDS.telephone]}
              className={`profileFieldBox w-100 ${
                formik.touched[`${ORDER_SUMMARY_FIELDS.telephone}`] &&
                formik.errors[`${ORDER_SUMMARY_FIELDS.telephone}`]
                  ? "has-danger"
                  : ""
              }`}
              id={`${ORDER_SUMMARY_FIELDS.telephone}`}
              type="text"
              name={`${ORDER_SUMMARY_FIELDS.telephone}`}
              placeholder=""
            />
            <ErrorMessage
              className="profileErrorMessage"
              name={`${ORDER_SUMMARY_FIELDS.telephone}`}
              component="div"
            />
          </Col>
          <Col xs={12} sm={6}>
            <label
              htmlFor={`${ORDER_SUMMARY_FIELDS.email}`}
              className="profileSmallText"
            >
              E-mail<span className="registerAsterisk">&nbsp;*</span>
            </label>
            <Field
              disabled={!!formik.initialValues[ORDER_SUMMARY_FIELDS.email]}
              className={`profileFieldBox w-100 ${
                formik.touched[`${ORDER_SUMMARY_FIELDS.email}`] &&
                formik.errors[`${ORDER_SUMMARY_FIELDS.email}`]
                  ? "has-danger"
                  : ""
              }`}
              id={`${ORDER_SUMMARY_FIELDS.email}`}
              type="text"
              name={`${ORDER_SUMMARY_FIELDS.email}`}
              placeholder=""
            />
            <ErrorMessage
              className="profileErrorMessage"
              name={`${ORDER_SUMMARY_FIELDS.email}`}
              component="div"
            />
          </Col>
        </Row>
        <p className="pt-1">Delivery Information</p>
        <Col>
          <label
            htmlFor={`${ORDER_SUMMARY_FIELDS.addressLine1}`}
            className="profileSmallText"
          >
            Address Line 1<span className="registerAsterisk">&nbsp;*</span>
          </label>
          <Field
            className={`profileFieldBox w-100 ${
              formik.touched[`${ORDER_SUMMARY_FIELDS.addressLine1}`] &&
              formik.errors[`${ORDER_SUMMARY_FIELDS.addressLine1}`]
                ? "has-danger"
                : ""
            }`}
            id={`${ORDER_SUMMARY_FIELDS.addressLine1}`}
            type="text"
            name={`${ORDER_SUMMARY_FIELDS.addressLine1}`}
            placeholder=""
          />
          <ErrorMessage
            className="profileErrorMessage"
            name={`${ORDER_SUMMARY_FIELDS.addressLine1}`}
            component="div"
          />
        </Col>
        <Col>
          <label
            htmlFor={`${ORDER_SUMMARY_FIELDS.addressLine2}`}
            className="profileSmallText"
          >
            Address Line 2<span className="registerAsterisk">&nbsp;*</span>
          </label>
          <Field
            className={`profileFieldBox w-100 ${
              formik.touched[`${ORDER_SUMMARY_FIELDS.addressLine2}`] &&
              formik.errors[`${ORDER_SUMMARY_FIELDS.addressLine2}`]
                ? "has-danger"
                : ""
            }`}
            id={`${ORDER_SUMMARY_FIELDS.addressLine2}`}
            type="text"
            name={`${ORDER_SUMMARY_FIELDS.addressLine2}`}
            placeholder=""
          />
          <ErrorMessage
            className="profileErrorMessage"
            name={`${ORDER_SUMMARY_FIELDS.addressLine2}`}
            component="div"
          />
        </Col>
        <Row>
          <Col xs={12} sm={6}>
            <label
              htmlFor={`${ORDER_SUMMARY_FIELDS.townCity}`}
              className="profileSmallText"
            >
              Town/City
              <span className="registerAsterisk">&nbsp;*</span>
            </label>
            <Field
              className={`profileFieldBox ${
                formik.touched[`${ORDER_SUMMARY_FIELDS.townCity}`] &&
                formik.errors[`${ORDER_SUMMARY_FIELDS.townCity}`]
                  ? "has-danger"
                  : ""
              }`}
              id={`${ORDER_SUMMARY_FIELDS.townCity}`}
              type="text"
              name={`${ORDER_SUMMARY_FIELDS.townCity}`}
              placeholder=""
            />
            <ErrorMessage
              className="profileErrorMessage"
              name={`${ORDER_SUMMARY_FIELDS.townCity}`}
              component="div"
            />
          </Col>
          <Col xs={12} sm={6}>
            <label
              htmlFor={`${ORDER_SUMMARY_FIELDS.postcode}`}
              className="profileSmallText"
            >
              Postcode
              <span className="registerAsterisk">&nbsp;*</span>
            </label>
            <Field
              className={`profileFieldBox ${
                formik.touched[`${ORDER_SUMMARY_FIELDS.postcode}`] &&
                formik.errors[`${ORDER_SUMMARY_FIELDS.postcode}`]
                  ? "has-danger"
                  : ""
              }`}
              id={`${ORDER_SUMMARY_FIELDS.postcode}`}
              type="text"
              name={`${ORDER_SUMMARY_FIELDS.postcode}`}
              placeholder=""
            />
            <ErrorMessage
              className="profileErrorMessage"
              name={`${ORDER_SUMMARY_FIELDS.postcode}`}
              component="div"
            />
          </Col>
        </Row>
        <Col>
          <label
            htmlFor={`${ORDER_SUMMARY_FIELDS.comments}`}
            className="profileSmallText"
          >
            Comments
            <span className="registerAsterisk">&nbsp;*</span>
          </label>
          <Field
            className={`profileFieldBox ${
              formik.touched[`${ORDER_SUMMARY_FIELDS.comments}`] &&
              formik.errors[`${ORDER_SUMMARY_FIELDS.comments}`]
                ? "has-danger"
                : ""
            }`}
            id={`${ORDER_SUMMARY_FIELDS.comments}`}
            type="text"
            name={`${ORDER_SUMMARY_FIELDS.comments}`}
            placeholder=""
          />
          <ErrorMessage
            className="profileErrorMessage"
            name={`${ORDER_SUMMARY_FIELDS.comments}`}
            component="div"
          />
        </Col>

        {typeof currentUser !== "undefined" &&
          typeof userStatus !== "undefined" &&
          (!currentUser || !userStatus) && (
            <>
              <div className="mt-3">
                Create free account
                <Field
                  className="ms-1"
                  type="checkbox"
                  id="enablePassword"
                  name="enablePassword"
                  onChange={formik.handleChange}
                />
              </div>
              {formik.values.enablePassword && (
                <>
                  {/* Password fields */}
                  <Row>
                    <Col xs={12} sm={6}>
                      <div>
                        <label htmlFor="password" className="loginFormText">
                          Password
                        </label>
                        <span className="registerAsterisk">&nbsp;*</span>
                        <Field
                          className={`registerFieldBox ${
                            formik.touched.password && formik.errors.password
                              ? "has-danger"
                              : ""
                          }`}
                          id="registerField"
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                        <ErrorMessage
                          className="registerErrorMessage"
                          name="password"
                          component="div"
                        />
                      </div>
                    </Col>
                    <Col xs={12} sm={6}>
                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="loginFormText"
                        >
                          Confirm Password
                        </label>
                        <span className="registerAsterisk">&nbsp;*</span>
                        <Field
                          className={`registerFieldBox ${
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                              ? "has-danger"
                              : ""
                          }`}
                          id="registerField"
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                        />
                        <ErrorMessage
                          className="registerErrorMessage"
                          name="confirmPassword"
                          component="div"
                        />
                      </div>
                    </Col>
                  </Row>
                  <i className="ordersummaryFootNote">
                    Please note. Once you click PLACE ORDER, we will create a
                    Munjiri Merchants account for you to be able to manage your
                    order.
                  </i>
                </>
              )}
            </>
          )}

        <Button className="mt-3" type="submit">
          Place Order
        </Button>
      </div>
    </Form>
  );
};

export default OrderForm;
