// AppRoutes.js
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./assets/css/pages/App.css";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import PlantHire from "./pages/PlantHire";
import BricksPage from "./pages/BricksPage";
import UsefulInformation from "./pages/UsefulInformation1";
import BricksDetail from "./pages/BricksDetail";
import MachineDetails from "./pages/MachineDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AccountProfile from "./pages/AccountProfile";
import AccountOrders from "./pages/AccountOrders";
import AccountEnquiries from "./pages/AccountEnquiries";
import AccountSecurity from "./pages/AccountSecurity";
import WithPrivateRoute from "./utils/WithPrivateRoute";
import WithPrivateRouteAdmin from "./utils/WithPrivateRouteAdmin";
import ContactUs from "./pages/ContactUs";
import ShoppingCart from "./pages/ShoppingCart";
import Navbar from "./components/Navbars";
import Footer from "./components/Footer";
import ConfirmationPage from "./pages/ConfirmationPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import ForgotPassword from "./pages/ForgotPassword";
import AdminSignIn from "./pages/AdminSignIn";
import NavbarAdmin from "./components/NavbarAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminEnquiries from "./pages/AdminEnquiries";
import AdminEnquiryDetails from "./pages/AdminEnquiryDetails";
import AdminBrickOrders from "./pages/AdminBrickOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminBrickOrdersDetails from "./pages/AdminBrickOrdersDetails";
import AdminUsersDetails from "./pages/AdminUsersDetails";
import { useNavigate } from "react-router-dom";

function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");
  const isAdminLoginPage = location.pathname === "/admin/login";

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("admin/dashboard");
    }
  }, []);

  return (
    <>
      {!isAdminPath && <Navbar />}
      {isAdminPath && !isAdminLoginPage && (
        <WithPrivateRouteAdmin>
          <NavbarAdmin />
        </WithPrivateRouteAdmin>
      )}
      <Routes>
        {/* Regular User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/plant-hire" element={<PlantHire />} />
        <Route path="/bricks-page" element={<BricksPage />} />
        <Route path="/useful-information" element={<UsefulInformation />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/bricks-detail/:slug" element={<BricksDetail />} />
        <Route path="/machine-detail/:slug" element={<MachineDetails />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route
          path="/order-confirmation/:isNewUser"
          element={<OrderConfirmation />}
        />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route
          path="/account/profile"
          element={
            <WithPrivateRoute>
              <AccountProfile />
            </WithPrivateRoute>
          }
        />
        <Route
          path="/account/orders"
          element={
            <WithPrivateRoute>
              <AccountOrders />
            </WithPrivateRoute>
          }
        />{" "}
        <Route
          path="/account/enquiries"
          element={
            <WithPrivateRoute>
              <AccountEnquiries />
            </WithPrivateRoute>
          }
        />{" "}
        <Route
          path="/account/security"
          element={
            <WithPrivateRoute>
              <AccountSecurity />
            </WithPrivateRoute>
          }
        />
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminSignIn />} />
        <Route
          path="/admin/dashboard"
          element={
            <WithPrivateRouteAdmin>
              <AdminDashboard />
            </WithPrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/enquiries"
          element={
            <WithPrivateRouteAdmin>
              <AdminEnquiries />
            </WithPrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/enquiries/:id"
          element={
            <WithPrivateRouteAdmin>
              <AdminEnquiryDetails />
            </WithPrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/brick-orders"
          element={
            <WithPrivateRouteAdmin>
              <AdminBrickOrders />
            </WithPrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/users"
          element={
            <WithPrivateRouteAdmin>
              <AdminUsers />
            </WithPrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/brick-orders/:id"
          element={
            <WithPrivateRouteAdmin>
              <AdminBrickOrdersDetails />
            </WithPrivateRouteAdmin>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <WithPrivateRouteAdmin>
              <AdminUsersDetails />
            </WithPrivateRouteAdmin>
          }
        />
      </Routes>
      {!isAdminPath && <Footer />}
    </>
  );
}

export default AppRoutes;
