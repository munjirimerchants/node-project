import "bootstrap/dist/css/bootstrap.css";
import "../assets/css/components/BrickProductCard.css";

import OrderSummaryProductInfo from "./OrderSummaryProductInfo";

function OrderSummaryBody({ brickProduct, quantity, price }) {
  return (
    <>
      <OrderSummaryProductInfo
        quantity={quantity}
        price={price}
        brickProduct={brickProduct}
      />
      <hr className="p-0 m-2 ordersummaryProductLine"></hr>
    </>
  );
}

export default OrderSummaryBody;
