import React from "react";
import { FaAngleRight } from "react-icons/fa";

const NextBtn = ({ arrowStyles, style, onClick }:any) => {
  return (
    <div
      className={`
        ${arrowStyles}
        end-0
      `}
      style={{
        ...style,
        background: "rgba(211, 211, 211,0.75)",
        top: "unset",
      }}
      onClick={onClick}
    >
      <FaAngleRight />
    </div>
  );
};

export default NextBtn;