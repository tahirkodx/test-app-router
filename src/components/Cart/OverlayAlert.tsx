import React from "react";
import { Alert } from "react-bootstrap";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaQuestionCircle,
  FaTimesCircle,
} from "react-icons/fa";
import styles from "@/styles/Cart/OverlayAlert.module.scss";

const OverlayAlert = (props:any) => {
  const icon = (iconOption:any) => {
    switch (iconOption) {
      case "success":
        return <FaCheckCircle />;
      case "error":
        return <FaTimesCircle />;
      case "question":
        return <FaQuestionCircle />;
      case "warning":
        return <FaExclamationCircle />;
      default:
        return "";
    }
  };

  const contentAlign = (position:any) => {
    switch (position) {
      case "topLeft":
        return "";
      case "topRight":
        return "justify-content-end";
      case "bottomLeft":
        return "align-items-end";
      case "bottomRight":
        return "justify-content-end align-items-end";
      case "bottomCenter":
        return "justify-content-center align-items-end px-3 py-5 px-md-5";
      case "center":
        return "justify-content-center align-items-center px-3 py-5 px-md-5";
      default:
        return "justify-content-end";
    }
  };

  const tagStyle = (position:any) => {
    switch (position) {
      case "topLeft":
        return `
            ${styles.TopLeftAlert}
            mt-5
        `;
      case "topRight":
        return `
            ${styles.TopRightAlert} 
            rounded-0 rounded-start mt-5 justify-content-end text-right
        `;
      case "bottomLeft":
        return `
            ${styles.BottomLeftAlert}
            rounded-0 rounded-end mb-5
        `;
      case "bottomRight":
        return `
            ${styles.BottomRightAlert} 
            rounded-0 rounded-start mb-5 justify-content-end text-right
        `;
      case "bottomCenter":
        return `
            ${styles.BottomCenterAlert}
            justify-content-center text-center
        `;
      case "center":
        return `
            ${styles.CenterAlert}
            justify-content-center text-center flex-column
        `;
      default:
        return "";
    }
  };

  return (
    <div
      className={`
            ${contentAlign(props.position)} 
            position-fixed w-100 h-100  start-0 top-0 z-index-5  d-flex pe-none overflow-hidden
        `}
    >
      <div
        className={`
            ${styles.Overlay}
            position-absolute z-index-1 w-100 h-100 top-0 start-0 bg-black bg-opacity-50
        `}
        style={{ animationDuration: `${props.seconds}s` }}
      ></div>
      <span className="position-relative z-index-2">
        <Alert
          variant={props.type}
          className={`
            ${tagStyle(props.position)} 
            shadow d-flex flex-wrap gap-2 align-items-center mb-0
          `}
          style={{ animationDuration: `${props.seconds}s` }}
        >
          <span className="fs-3 lh-0">{icon(props.icon)}</span>
          <span className="lh-1">{props.text}</span>
        </Alert>
      </span>
    </div>
  );
};

export default OverlayAlert;
