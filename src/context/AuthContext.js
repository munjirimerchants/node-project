import { useEffect, useState, createContext, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  reload,
  sendPasswordResetEmail,
} from "firebase/auth";

import auth from "../config/firebase-config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userStatus, setUserStatus] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [waitingForVerification, setWaitingForVerification] = useState(false);
  const [storedUser, setStoredUser] = useState(null); // State to temporarily store currentUser

  async function register(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      setError(error.message);
      throw error;
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  async function resetPasswordEmail(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      // Password reset email sent successfully
      console.log("Password reset email sent successfully");
    } catch (error) {
      // An error occurred while sending the password reset email
      console.error("Error sending password reset email:", error.message);
      throw error; // Rethrow the error to handle it in the UI if needed
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      console.log("Changes to User");
      setUserStatus(user);
      if (user) {
        if (user.emailVerified) {
          setCurrentUser(user); //set a verified user
          // User's email is verified
          console.log("Email is verified");
          // You can redirect the user to a different page or update the UI as needed
        } else {
          // User's email is not verified
          console.log("Email is not verified");
        }
      } else {
        setCurrentUser(user); //set user to "nothing"
        // No user signed in
        console.log("No user signed in");
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to reload all user data from Firebase
  async function reloadAllUserData() {
    if (userStatus) {
      try {
        console.log("reloading user data");
        await reload(userStatus);
        console.log(userStatus.emailVerified);
        setCurrentUser(userStatus);
      } catch (error) {
        console.error("Error reloading user data:", error.message);
      }
    }
    if (userStatus) {
      try {
        console.log("reloading user data");
        await reload(userStatus);
        console.log(userStatus.emailVerified);
        setUserStatus(userStatus);
      } catch (error) {
        console.error("Error reloading user data:", error.message);
      }
    }
  }

  const value = {
    currentUser,
    userStatus,
    login,
    register,
    error,
    setError,
    logout,
    setWaitingForVerification,
    waitingForVerification,
    sendEmailVerification,
    reloadAllUserData,
    storedUser,
    setStoredUser,
    resetPasswordEmail,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
