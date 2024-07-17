import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/components/BrickProductCard.css";

import ShoppingCartProductInfo from "./ShoppingCartProductInfo";

function ShoppingCartProduct({
  brickProduct,
  quantity,
  price,
  colourOption,
  savedCartItems,
  setSavedCartItems,
  key,
  index,
}) {
  return (
    <>
      <ShoppingCartProductInfo
        key={key}
        index={index}
        quantity={quantity}
        price={price}
        colourOption={colourOption}
        brickProduct={brickProduct}
        savedCartItems={savedCartItems}
        setSavedCartItems={setSavedCartItems}
      />
    </>
  );
}

export default ShoppingCartProduct;
