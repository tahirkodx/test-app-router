import React from "react";
import { FaAngleLeft } from "react-icons/fa";

const MobiPrev = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={
        "slick-arrow text-center h-100 position-absolute top-0 start-0 d-flex align-items-center z-index-1 cursor-pointer text-dark"
      }
      style={{
        ...style,
        background: "rgba(211, 211, 211,0.7)",
        bottom: "unset",
      }}
      onClick={onClick}
    >
      <FaAngleLeft />
    </div>
  );
};

export default MobiPrev;
