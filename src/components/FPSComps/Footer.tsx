"use client";
import { Image } from "react-bootstrap";
import React from "react";
import { useTheme } from "@/store/ThemeContext";

const FpsFooter = () => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <div
      className={`${
        darkMode ? `bg-dark text-light` : `bg-light`
      } position-relative z-index-2 `}
    >
      <div className="w-100 h-100 px-2 px-sm-3 py-0 d-flex align-items-center justify-content-center bg-secondary bg-opacity-25 lh-1">
        <small>
          <small>
            <small>Powered By </small>
          </small>
        </small>
        <Image
          src="https://www.evetech.co.za/repository/ProductImages/3DMARK.png"
          alt="3D Mark"
          style={{ maxWidth: "75px" }}
        />
      </div>
    </div>
  );
};

export default FpsFooter;
