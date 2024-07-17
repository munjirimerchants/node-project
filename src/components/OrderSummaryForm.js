import "../assets/css/components/OrderSummaryModal.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { ORDER_SUMMARY_FIELDS } from "../forms/FormFieldNames";
import React from "react";
import UserDetails from "../utils/UserDetails";
import { useState, useEffect } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import OrderForm from "../forms/OrderForm";
import { connections, endpoints } from "../config/connections";

const OrderSummaryForm = ({ setModalShow, savedCartItems }) => {
  const {
    currentUser,
    register,
    setError,
    userStatus,
    logout,
    reloadAllUserData,
    sendEmailVerification,
  } = useAuth();
  const { setCartItems } = useShoppingCart();
  const { loading, userDetails } = UserDetails();
  const [loadings, setLoadings] = useState(false);
  const [userDetailsState, setUserDetailsState] = useState();
  const navigate = useNavigate();

  // Accessing the user and delivery information
  const userDeliveryInformations = userDetails?.UserDeliveryInformations || [];
  const firstDeliveryInfo =
    userDeliveryInformations?.length > 0 ? userDeliveryInformations[0] : null;

  let isNewUser = false;

  useEffect(() => {
    if (loading) {
      console.log("Loading user details...");
    } else if (userDetails) {
      console.log("User details:", JSON.stringify(userDetails));
      setUserDetailsState(userDetails);
    } else {
      console.log("User details are empty or not available");
    }
  }, [loading, userDetails]);

  useEffect(() => {
    console.log("ON RENDER");
    if (userStatus && !userStatus.emailVerified) {
      navigate("/login");
    }
  }, []);

  const initialValues = {
    [ORDER_SUMMARY_FIELDS.firstName]: userDetailsState?.firstName,
    [ORDER_SUMMARY_FIELDS.surname]: userDetailsState?.surname,
    [ORDER_SUMMARY_FIELDS.telephone]: userDetailsState?.telephone,
    [ORDER_SUMMARY_FIELDS.email]: userDetailsState?.email,
    [ORDER_SUMMARY_FIELDS.addressLine1]: firstDeliveryInfo?.addressLine1,
    [ORDER_SUMMARY_FIELDS.addressLine2]: firstDeliveryInfo?.addressLine2,
    [ORDER_SUMMARY_FIELDS.townCity]: firstDeliveryInfo?.townCity,
    [ORDER_SUMMARY_FIELDS.postcode]: firstDeliveryInfo?.postcode,
    [ORDER_SUMMARY_FIELDS.comments]: firstDeliveryInfo?.comments,
    password: "",
    confirmPassword: "",
    enablePassword: false,
  };

  function brickOrderJSON() {
    const jsonItems = savedCartItems.map((item) => JSON.stringify(item));
    const brickOrderItems = jsonItems.map((jsonItem) => {
      const item = JSON.parse(jsonItem);
      return {
        amount: item.quantity,
        itemPrice: `$${parseFloat(item.price).toFixed(2)}`,
        isColoured: item.colourOption === "coloured" ? "1" : "0",
        brickProductID: item.brickProduct.brickProductID,
      };
    });

    return { BrickOrderItems: brickOrderItems };
  }

  console.log("assaasasasasasasasas", userDetailsState);

  const validationSchema = Yup.object().shape({});

  console.log("initialValues:::::::", initialValues);

  function closeModal() {
    setModalShow(false);
  }

  function combineWithValues(values, brickOrder) {
    const { password, confirmPassword, ...newValues } = values;

    const combinedData = {
      ...newValues,
      ...brickOrder,
    };

    return combinedData;
  }

  async function registerToFB(values) {
    let user;
    try {
      const userCredential = await register(values.email, values.password);
      user = userCredential.user;

      return user;
    } catch (error) {
      console.log("Failed to Register");
      if (user) {
        console.log("deleting user...");
        await user.delete();
      }
      if (error.code && error.message) {
        console.error("Firebase Error:", error.message);
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("Email is already in use");
            break;

          default:
            setError("Failed to Register");
            break;
        }
      } else {
        console.error("Other Error:", error);
        setError("Failed to Register");
      }
      throw error;
    }
  }

  async function handleSubmit(values, { setSubmitting, resetForm, setErrors }) {
    let user;
    try {
      setLoadings(true);

      let endpointBrickOrder = `${connections.server}${endpoints.brickordersOrder}`;

      let headers = { "Content-Type": "application/json" };
      const brickOrder = brickOrderJSON();
      const combinedData = combineWithValues(values, brickOrder);

      if (currentUser) {
        //only verified user
        console.log("LOGGED IN");
        const bearerToken = await currentUser.getIdToken();

        // Check if the bearer token is available before making the request
        if (bearerToken) {
          endpointBrickOrder = `${connections.server}${endpoints.brickordersOrderAuthenticated}`;
          headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          };
        }
      } else {
        if (!userStatus) {
          //not unverified user -> only "non users" user
          console.log("NOT LOGGED IN");

          if (values.enablePassword) {
            user = await registerToFB(values);

            if (user) {
              console.log("LOGGED IN");
              const bearerToken = await user.getIdToken();

              // Check if the bearer token is available before making the request
              if (bearerToken) {
                isNewUser = true;
                endpointBrickOrder = `${connections.server}${endpoints.brickordersOrderAndRegister}`;
                headers = {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${bearerToken}`,
                };
              }
            }
          }
          //unverified user
        } else if (userStatus) {
          throw new Error("User is not verified!");
        } else {
          throw new Error("User not logged in");
        }
      }

      // Convert values to JSON and send to the server using Axios
      const response = await axios.post(endpointBrickOrder, combinedData, {
        headers: headers,
      });

      console.log("Server response:", response.data);

      // Check HTTP status code for success (2xx) or failure (4xx, 5xx)
      if (response.status >= 200 && response.status < 300) {
        // Successful response
        console.log("Form submitted successfully!");
        await reloadAllUserData();
        console.log(user);
        if (user && !user.emailVerified) {
          // Proceed to email verification
          try {
            console.log("Attempting to send Verification email.");
            await sendEmailVerification(user);
          } catch (error) {
            console.log("Received errors in sending verification email", error);
          }
          console.log("Logging out...");
          await logout();
        }

        // Open the modal or handle success based on your application logic
        navigate(`/order-confirmation/${isNewUser}`);
        setCartItems([]); // remove number from cart icon
        localStorage.setItem("cartItems", JSON.stringify([])); // remove shopping cart items in local storage
      } else {
        await user.delete();
        console.log("user deleted");
        // Handle error cases
        console.error("Server error:", response.status, response.data);

        // You can also throw an error here to be caught in the catch block below
        throw new Error("Server error");
      }
    } catch (error) {
      await user.delete();
      console.log("user deleted");
      // Handle any other errors (e.g., network issues, JSON parsing, etc.)
      console.error("Error submitting form:", error);
    } finally {
      //     setSubmitting(false);
      //     setLoadings(false);
      //     resetForm();
    }
  }
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true} // Set this to true
        key={loading}
        onSubmit={handleSubmit}
      >
        <OrderForm currentUser={currentUser} userStatus={userStatus} />
      </Formik>
    </div>
  );
};
export default OrderSummaryForm;
