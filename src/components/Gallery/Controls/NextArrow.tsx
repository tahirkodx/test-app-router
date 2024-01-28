import { useTheme } from "@/store/ThemeContext";
import React from "react";
import { FaAngleDown } from "react-icons/fa";

const NextArrow = ({ className, style, onClick }: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <div
      className={`${
        darkMode ? `text-light` : ``
      } slick-arrow text-center rounded-bottom w-100 position-absolute bottom-0 end-0 d-block cursor-pointer`}
      style={{
        ...style,
        background: "rgba(211, 211, 211,0.3)",
        top: "unset",
      }}
      onClick={onClick}
    >
      <FaAngleDown />
    </div>
  );
};

export default NextArrow;
