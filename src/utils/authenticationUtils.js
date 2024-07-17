import axios from "axios";
import Cookies from "js-cookie";
import { connections, endpoints } from "../config/connections";

async function handleDBLogin(values, token) {
  console.log("Login...");
  try {
    // Convert values to JSON and send to the server using Axios
    const response = await axios.post(
      `${connections.server}${endpoints.login}`,
      {
        email: values.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Set the cookie
    Cookies.set("userID", response.data.id, {
      expires: 1,
      sameSite: "Strict",
    });

    return Promise.resolve();
  } catch (error) {
    console.error(
      "Error logging into DB: " +
        error.code +
        " " +
        error.message +
        " " +
        error.name
    );
    return Promise.reject(error);
  }
}

async function handleDBRegistration(values, token) {
  console.log("Register...");
  try {
    // Convert values to JSON and send to the server using Axios
    const response = await axios.post(
      `${connections.server}${endpoints.register}`,
      {
        email: values.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Server response:", response.data);
    //login after registration
    await handleDBLogin(values, token);
  } catch (error) {
    console.error(
      "Error submitting form: " +
        error.code +
        " " +
        error.message +
        " " +
        error.name
    );
    throw error;
  }
}

async function handleDBRegistrationAdmin(values, token) {
  console.log("Register Admin...");
  try {
    // Convert values to JSON and send to the server using Axios
    const response = await axios.post(
      `${connections.server}${endpoints.adminRegister}`,
      {
        email: values.email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Server response:", response.data);
    //login after registration
    //await handleDBLogin(values, token);
  } catch (error) {
    console.error(
      "Error submitting form: " +
        error.code +
        " " +
        error.message +
        " " +
        error.name
    );
    throw error;
  }
}

export { handleDBRegistration, handleDBLogin, handleDBRegistrationAdmin };
