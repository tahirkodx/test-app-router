import React from "react";
import { Col, ListGroup } from "react-bootstrap";
import styles from "@/styles/LaptopDetail.module.scss";
import { useTheme } from "@/store/ThemeContext";

const LaptopSpecDetails = (props: any) => {
  const specDetails = props.SpecDetails;
  let details = null;
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  if (specDetails) {
    details = specDetails.map((sDetails: any, ind: any) => {
      return (
        <ListGroup.Item
          as="li"
          className={`
            d-flex justify-content-between align-items-starts p-0  py-1 p-sm-1 border-0 border-bottom border-secondary  
            ${styles.SpecDetails}
            ${darkMode ? `border-opacity-50` : `border-opacity-25`}
          `}
          key={ind}
        >
          <Col className="pe-1 m-0" xs={4} md={4} sm={6}>
            <p
              className={`
                ${darkMode ? `text-light` : `text-dark`} m-0 fw-2
              `}
            >
              {sDetails.SpecDetail}
            </p>
          </Col>
          <Col xs={8} md={8} sm={6} className="text-left ps-1 m-0" bg="primary">
            <span
              className={`
                ${darkMode ? `text-white opacity-75` : `text-dark`}
              `}
            >
              {sDetails.Opt}
            </span>
          </Col>
        </ListGroup.Item>
      );
    });
  }

  return (
    <ListGroup
      as="ol"
      className={`
        ${darkMode ? styles.DarkListGroup : ``}
      `}
    >
      {details}
    </ListGroup>
  );
};

export default LaptopSpecDetails;
