import React from "react";
import { Form } from "react-bootstrap";

function BrickOptions({
  key,
  selectedOption,
  handleOptionChange,
  showPrice,
  showPriceColoured,
  brickProduct,
}) {
  return (
    <div className="pt-2">
      <Form.Check
        type="radio"
        id={key}
        label="Non-coloured Option:"
        value="nonColoured"
        checked={selectedOption === "nonColoured"}
        onChange={handleOptionChange}
      />
      <p className="brickpriceDollar">${showPrice}</p>
      <p className="brickpriceUSD">&nbsp;USD</p>
      <p className="brickpriceThousand">
        &nbsp;/ per {brickProduct.perUnit} bricks
      </p>
      <hr className="my-1 py-0" />

      {showPriceColoured !== null && showPriceColoured && (
        <div>
          <Form.Check
            type="radio"
            id={key}
            label="Coloured Option:"
            value="coloured"
            checked={selectedOption === "coloured"}
            onChange={handleOptionChange}
          />
          <p className="brickpriceDollar">${showPriceColoured}</p>
          <p className="brickpriceUSD">&nbsp;USD</p>
          <p className="brickpriceThousand">
            &nbsp;/ per {brickProduct.perUnit} bricks
          </p>
          <hr className="my-1 py-0" />
        </div>
      )}

      <p className="brickpriceLead">Lead Time</p>
      <p className="brickpriceLine">&nbsp;|</p>
      <p className="brickpriceWorking">
        &nbsp;{brickProduct.productionTime} working days
      </p>
    </div>
  );
}

export default BrickOptions;
