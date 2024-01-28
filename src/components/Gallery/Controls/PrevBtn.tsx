import React from "react";
import { FaAngleLeft } from "react-icons/fa";

const PrevBtn = ({ arrowStyles, style, onClick }:any) => {
  return (
    <div
      className={`
        ${arrowStyles}
        start-0
      `}
      style={{
        ...style,
        background: "rgba(211, 211, 211,0.75)",
        bottom: "unset",
      }}
      onClick={onClick}
    >
      <FaAngleLeft />
    </div>
  );
};

export default PrevBtn;
