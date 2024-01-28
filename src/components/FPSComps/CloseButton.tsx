import React from "react";
import { FaTimes } from "react-icons/fa";

const CloseButton = ({ setClosing, setPerformCard }: any) => {
  const firstFunction = () => {
    // Your code for the first function
    setClosing(true);
    // Wait for 300 milliseconds before calling the next function
    setTimeout(function () {
      secondFunction();
    }, 300);
  };

  const secondFunction = () => {
    // Your code for the second function
    setPerformCard(false);
    setClosing(false);
  };

  return (
    <div
      className="
        position-absolute top-0 end-0 bg-light shadow p-2 bg-light rounded-bottom-start-2 overflow-hidden cursor-pointer z-index-2
      "
      onClick={() => firstFunction()}
    >
      <FaTimes className="text-danger" />
    </div>
  );
};

export default CloseButton;
