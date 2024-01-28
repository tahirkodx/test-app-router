import { useTheme } from "@/store/ThemeContext";
import React from "react";
import { Image } from "react-bootstrap";

const NoPageData = (props: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  return (
    <div className="span-full">
      <div
        className={`
              ${darkMode ? `bg-black text-light border-secondary` : `bg-light`}
              ${props.classNames}
              d-flex flex-column gap-2 gap-sm-3 justify-content-center align-items-center w-100 py-5 text-center shadow rounded overflow-hidden mb-2 border bg-gradient
            `}
      >
        <Image
          fluid
          src={
            props.isProduct !== undefined && props.isProduct === true
              ? "https://www.evetech.co.za/repository/ProductImages/woman-confused-laptop.png"
              : "https://www.evetech.co.za/repository/ProductImages/no-data-01.png"
          }
          alt=""
          width={
            props.isProduct !== undefined && props.isProduct === true
              ? "250px"
              : "250px"
          }
        />
        <p className="fs-3 fw-2">
          No
          {props.isProduct !== undefined && props.isProduct
            ? " Product "
            : " Page "}
          Data Found
        </p>
      </div>
    </div>
  );
};

export default NoPageData;
