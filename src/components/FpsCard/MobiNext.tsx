import React from "react";
import { FaAngleRight } from "react-icons/fa";

const MobiNext = (props: any) => {
  const { style, onClick } = props;
  return (
    <div
      className={
        "slick-arrow text-center h-100 position-absolute bottom-0 end-0 d-flex align-items-center"
      }
      style={{
        ...style,
        background: "rgba(211, 211, 211,0.7)",
        top: "unset",
      }}
      onClick={onClick}
    >
      <FaAngleRight />
    </div>
  );
};

export default MobiNext;
