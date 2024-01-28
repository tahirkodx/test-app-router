import React from "react";
import { Badge } from "react-bootstrap";

const StockStatus = ({ component }: any) => {
  return (
    <Badge
      className={`${
        component.stock === "In Stock with Evetech" ||
        component.stock === "In Stock"
          ? "bg-success"
          : "bg-danger"
      } bg-gradient w-100 text-wrap rounded-pill`}
    >
      <span
        className="fw-1 d-flex align-items-center justify-content-center"
        style={{ lineHeight: "0.55rem", fontSize: ".875em" }}
      >
        {component.stock === "In Stock with Evetech" ||
        component.stock === "In Stock"
          ? "In Stock with Evetech"
          : "Out of Stock"}
      </span>
    </Badge>
  );
};

export default StockStatus;
