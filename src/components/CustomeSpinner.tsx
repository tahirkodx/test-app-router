import { useTheme } from "@/store/ThemeContext";
import React from "react";
import { Row, Spinner } from "react-bootstrap";

const CustomeSpinner = (props: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <Row
      className={`${
        darkMode ? `bg-dark` : ``
      } w-100 p-5 text-center justify-content-center`}
    >
      <Spinner
        animation="border"
        role="status"
        variant={props.variant === undefined ? "default" : props.variant}
        className="text-center"
        size={props.size === undefined ? "lg" : props.size}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Row>
  );
};

export default CustomeSpinner;
