import "../assets/css/pages/Profile.css";

import { useAuth } from "../context/AuthContext";
import Banner from "../layouts/Banner";
import { Col, Container, Row } from "react-bootstrap";
import UserProfileForm from "../forms/UserProfileForm";
import UserProfileDisplay from "../forms/UserProfileDisplay";
import DeliveryAddressForm from "../forms/DeliveryAddressForm";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import ProfileTabs from "../components/ProfileTabs";
import axios from "axios";
import Cookies from "js-cookie";
import { USER_PROFILE_FIELDS } from "../forms/FormFieldNames";
import { connections, endpoints } from "../config/connections";
import { resourceFolder, images } from "../config/resources";

function AccountProfile() {
  const bannerImage = `${resourceFolder.images}${images.profilePageBannerImage}`;
  console.log(bannerImage);
  const { currentUser, setError } = useAuth();
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [editing, setEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const userDeliveryInformations = userDetails?.UserDeliveryInformations || [];
  const firstDeliveryInfo =
    userDeliveryInformations?.length > 0 ? userDeliveryInformations[0] : null;

  useEffect(() => {
    const fetchData = async () => {
      const userIDCookie = Cookies.get("userID");

      if (userIDCookie) {
        const user = currentUser;

        if (user) {
          try {
            const bearerToken = await user.getIdToken();

            // Check if the bearer token is available before making the request
            if (bearerToken) {
              const response = await axios.get(
                `${connections.server}${endpoints.usersByUserID}/${userIDCookie}`,
                {
                  headers: {
                    Authorization: `Bearer ${bearerToken}`,
                  },
                }
              );

              setUserDetails(response.data);

              setLoadingDetails(false);
            } else {
              console.error("Error: Bearer token not available");
            }
          } catch (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error(
                `Server error: ${error.response.status} - ${JSON.stringify(
                  error.response.data
                )}`
              );
            } else if (error.request) {
              // The request was made but no response was received
              console.error("No response received from the server");
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error(`Error during request setup: ${error.message}`);
            }

            setError("Error fetching user details");
          }
        } else {
          console.error("Error: User not authenticated");
          setError("User not authenticated");
        }
      } else {
        console.log("No userID cookie found");
      }
    };

    fetchData();
  }, [setError, currentUser]);

  const validationSchema = Yup.object().shape({
    [USER_PROFILE_FIELDS.firstName]: Yup.string().required(
      "First Name is required"
    ),
    [USER_PROFILE_FIELDS.surname]: Yup.string().required("Surname is required"),
    [USER_PROFILE_FIELDS.telephone]: Yup.string()
      .required("Telephone is required")
      .matches(/^\d+$/, "Invalid telephone number"),
    [USER_PROFILE_FIELDS.email]: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    [USER_PROFILE_FIELDS.address]: Yup.string().required("Address is required"),
    [USER_PROFILE_FIELDS.townCity]: Yup.string().required(
      "Town/City is required"
    ),
    [USER_PROFILE_FIELDS.postcode]: Yup.string().required(
      "Postcode is required"
    ),
  });

  const initialValues = {
    [USER_PROFILE_FIELDS.firstName]: userDetails?.firstName || "",
    [USER_PROFILE_FIELDS.surname]: userDetails?.surname || "",
    [USER_PROFILE_FIELDS.telephone]: userDetails?.telephone || "",
    [USER_PROFILE_FIELDS.email]: userDetails?.email || "",
    [USER_PROFILE_FIELDS.address]: userDetails?.addressLine1 || "",
    [USER_PROFILE_FIELDS.address2]: userDetails?.addressLine2 || "",
    [USER_PROFILE_FIELDS.townCity]: userDetails?.townCity || "",
    [USER_PROFILE_FIELDS.postcode]: userDetails?.postcode || "",
    [USER_PROFILE_FIELDS.comments]: "",
    [USER_PROFILE_FIELDS.UserDeliveryInformations]: [
      {
        [USER_PROFILE_FIELDS.delivery_address]: firstDeliveryInfo?.addressLine1,
        [USER_PROFILE_FIELDS.delivery_address2]:
          firstDeliveryInfo?.addressLine2,
        [USER_PROFILE_FIELDS.delivery_townCity]: firstDeliveryInfo?.townCity,
        [USER_PROFILE_FIELDS.delivery_postcode]: firstDeliveryInfo?.postcode,
        [USER_PROFILE_FIELDS.delivery_comments]: firstDeliveryInfo?.comments,
      },
    ],
  };

  async function patchUserInfo(
    values,
    { setSubmitting, resetForm, setErrors }
  ) {
    stopEditing();
    try {
      const token = await currentUser.getIdToken();
      const userIDCookie = Cookies.get("userID");

      if (userIDCookie) {
        const response = await axios.patch(
          `http://localhost:3001/api/users/${userIDCookie}`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserDetails(response.data);
      }
    } catch (error) {
      setErrors({ email: "Failed to Register. Please check your credentials" });
    } finally {
      setSubmitting(false);
      resetForm();
    }
  }

  function editProfile() {
    setEditing(true);
  }

  function stopEditing() {
    setEditing(false);
  }

  const [editDelivery, setEditDelivery] = useState(false);

  function editingDeliveryAddress() {
    setEditDelivery(true);
  }

  function stopEditingDeliveryAddress() {
    setEditDelivery(false);
  }

  return (
    <div className="px-2 pt-2">
      <Banner image={bannerImage} height={"19rem"} />
      <div className="py-5" />
      <Container className="d-flex justify-content-center py-5">
        <p className="text-uppercase p-0 profileTitleHome1">Your</p>
        <span className="text-uppercase p-0 mx-2 profileTitleHome2">
          Account
        </span>
      </Container>
      <div className="profilePaddingDiv"></div>
      <Container>
        <ProfileTabs />
      </Container>
      <Container className="py-5">
        <div>
          <div className="profileText text-uppercase">Your Profile</div>

          {editing ? (
            <></>
          ) : (
            <div className="py-2 profileEditText" onClick={editProfile}>
              <p>Edit Profile</p>
            </div>
          )}

          <div className="profileLine" />
        </div>
      </Container>
      <Container>
        <Row>
          <Col xs="0" sm="3" className="profilePictureCol">
            <div className="profilePicture text-white d-flex justify-content-center align-items-center">
              {userDetails?.firstName && userDetails?.surname
                ? `${userDetails.firstName[0]} ${userDetails.surname[0]}`
                : "P"}
            </div>
          </Col>
          <Col xs="12" sm="9">
            {loadingDetails ? (
              <div>Loading user details...</div>
            ) : editing ? (
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={patchUserInfo}
              >
                <UserProfileForm
                  editProfile={editProfile}
                  stopEditing={stopEditing}
                />
              </Formik>
            ) : (
              !editDelivery && (
                <UserProfileDisplay
                  user={userDetails}
                  editProfile={editProfile}
                  stopEditing={stopEditing}
                  editingDeliveryAddress={editingDeliveryAddress}
                />
              )
            )}

            {editDelivery && (
              <>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={patchUserInfo}
                >
                  <DeliveryAddressForm
                    stopEditingDeliveryAddress={stopEditingDeliveryAddress}
                  />
                </Formik>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AccountProfile;
