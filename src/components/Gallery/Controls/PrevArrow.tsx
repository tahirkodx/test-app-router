import { useTheme } from "@/store/ThemeContext";
import React from "react";
import { FaAngleUp } from "react-icons/fa";

const PrevArrow = ({ className, style, onClick }: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <div
      className={`
        slick-arrow text-center rounded-top w-100 position-absolute top-0 start-0 d-block cursor-pointer
        ${darkMode ? `text-light` : ``}
      `}
      style={{
        ...style,
        background: "rgba(211, 211, 211,0.3)",
        bottom: "unset",
      }}
      onClick={onClick}
    >
      <FaAngleUp />
    </div>
  );
};

export default PrevArrow;
