import React from "react";
import classes from "@/styles/LoadingSpinner.module.css";
import { FaSpinner } from "react-icons/fa";
import { Image } from "react-bootstrap";
import { useTheme } from "@/store/ThemeContext";

const LoadingSpinner = (props: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <div
      className={`
            ${darkMode ? `bg-black` : `bg-white`}
            position-fixed z-index-10 top-0 start-0 z-index-9 w-100 h-100
        `}
    >
      <div
        className={`position-absolute w-100 h-100 left-0 bottom-0 d-flex align-items-center justify-content-center flex-column`}
      >
        {props === undefined ||
          props.isEve === undefined ||
          (props.isEve && (
            <>
              <Image
                src={
                  darkMode
                    ? `https://www.evetech.co.za/repository/ProductImages/evetech-logo11.gif`
                    : `https://www.evetech.co.za/repository/ProductImages/evetech-logo1.gif`
                }
                alt="evetech loader"
                className={`img-fluid`}
              />
              <div
                className={`
                  ${darkMode ? `text-light` : `text-dark`}
                  mt-2 fs-5
                `}
              >
                ...LOADING...
              </div>
            </>
          ))}
        {props && props.isEve !== undefined && !props.isEve && (
          <FaSpinner
            className={`${classes.Spinner} ${
              darkMode ? `text-light` : `text-dark`
            } fs-1 h-100`}
          />
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
