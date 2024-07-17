// App.js
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import ErrorMessage from "./layouts/ErrorMessage";
import AppRoutes from "./AppRoutes";
import ScrollToTop from "./utils/ScrollToTop";

//TODO: change all loading and error states to a proper site / page / image
function App() {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <BrowserRouter>
          <div>
            <ScrollToTop />
            <ErrorMessage />
            <AppRoutes />
          </div>
        </BrowserRouter>
      </ShoppingCartProvider>
    </AuthProvider>
  );
}

export default App;
