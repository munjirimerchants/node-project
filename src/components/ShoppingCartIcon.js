// ShoppingCartIcon.js
import React from "react";
import { ShoppingCartIcon as ShoppingCartSymbol } from "@heroicons/react/outline";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Link } from "react-router-dom";

const ShoppingCartIcon = () => {
  const { cartItems } = useShoppingCart();

  console.log("REFRESH ME: ", cartItems);
  return (
    <div className="shoppingcartIcon">
      <Link to="/shopping-cart">
        <ShoppingCartSymbol className="shoppingcartBagIcon"></ShoppingCartSymbol>
      </Link>
      <span>{cartItems?.length}</span>
      {/* Display number of items in the cart */}
    </div>
  );
};

export default ShoppingCartIcon;
