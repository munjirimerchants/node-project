import { MACHINE_ENQUIRY_FIELDS as FIELD_NAMES } from "../../forms/FormFieldNames";
import UserDetails from "../../utils/UserDetails";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const MachineFormValues = () => {
  const { loading, userDetails } = UserDetails();
  const [userDetailsState, setUserDetailsState] = useState();

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

  const userDeliveryInformations =
    userDetailsState?.UserDeliveryInformations || [];
  const deliveryLocation =
    userDeliveryInformations.length > 0 ? userDeliveryInformations[0] : null;

  let location =
    deliveryLocation &&
    `${deliveryLocation.addressLine1}${deliveryLocation.addressLine2 || ""}${
      deliveryLocation.townCity
    }${deliveryLocation.postcode || ""}`;

  if (
    deliveryLocation &&
    deliveryLocation.addressLine1 &&
    deliveryLocation.townCity
  ) {
    location = deliveryLocation.addressLine1 + " ";
    if (deliveryLocation.addressLine2) {
      location += deliveryLocation.addressLine2 + " ";
    }
    location += deliveryLocation.townCity + " ";
    if (deliveryLocation.postcode) {
      location += deliveryLocation.postcode + " ";
    }
  } else {
    location = null;
  }
  const initialValues = {
    [FIELD_NAMES.enquiryType]: "Machine",
    [FIELD_NAMES.firstName]: userDetailsState?.firstName || null,
    [FIELD_NAMES.surname]: userDetailsState?.surname || null,
    [FIELD_NAMES.telephone]: userDetailsState?.telephone || null,
    [FIELD_NAMES.email]: userDetailsState?.email || null,
    [FIELD_NAMES.location]: location || null,
    [FIELD_NAMES.comments]: null,
    [FIELD_NAMES.machineID]: null,
    [FIELD_NAMES.userID]: userDetailsState?.userID || null,
  };

  const validationSchema = Yup.object().shape({
    [FIELD_NAMES.enquiryType]: Yup.string().required("Query Type is required"),
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

  return { initialValues, validationSchema, loading };
};

export default MachineFormValues;
