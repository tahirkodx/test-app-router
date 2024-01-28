import React, { use, useEffect, useState } from "react";
import { Badge } from "react-bootstrap";

const _ = require("lodash");
const StockStatus = ({ Product }: any) => {
  const [stockState, setStockState] = useState("in stock");

  useEffect(() => {
    const changeStockStatus = (Product) => {
      if (Product !== undefined) {
        if (Product.stock) setStockState(Product.stock);
        if (Product.StockStatus) setStockState(Product.StockStatus);
      }
    };

    changeStockStatus(Product);
  }, [Product]);

  return (
    <>
      <div className="pb-2">
        <Badge
          className={`${
            _.lowerCase(stockState).includes("in stock")
              ? "bg-success"
              : "bg-danger"
          } w-100 d-none d-sm-block`}
        >
          <span className="fw-1 fs-6 text-wrap">
            <small>
              {_.lowerCase(stockState).includes("in stock")
                ? "In Stock with Evetech"
                : Product.stock}
            </small>
          </span>
        </Badge>
      </div>
    </>
  );
};

export default StockStatus;
