import React from "react";
import { Accordion, ListGroup, ListGroupItem } from "react-bootstrap";
import LaptopSpecDetails from "@/components/Product/Laptop/LaptopSpecDetails";
import { customAlphabet } from "nanoid";
import styles from "@/styles/LaptopDetail.module.scss";
import { useTheme } from "@/store/ThemeContext";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FaAngleUp } from "react-icons/fa6";

const nanoid = customAlphabet("1234567890abcdef", 10);

const LaptopSpec = (props: any) => {
  const specs = props.Specs;
  let specData = null;
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  if (specs) {
    specData = specs.map((spec: any, ind: any) => {
      return (
        <Accordion
          defaultActiveKey="0"
          className={`d-grid gap-3 mb-3 overflow-hidden`}
          key={nanoid(5)}
        >
          <Accordion.Item
            eventKey="0"
            className={`
                overflow-hidden border-secondary
                ${darkMode ? `bg-black border-opacity-75` : `border-opacity-50`}
            `}
          >
            <Accordion.Header
              className={`
                fw-3 border-0 position-relative w-100
                ${styles.Spec}
                ${darkMode ? styles.darkMode : ``}
            `}
            >
              {spec.Spec}
              <div
                className={`ps-2 position-absolute end-0 top-0 px-4 h-100 d-flex align-items-center`}
                style={{ boxShadow: `none` }}
              >
                <FaAngleUp
                  className="border-0 border-opacity-0"
                  style={{ boxShadow: `none` }}
                />
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                <LaptopSpecDetails
                  SpecDetails={JSON.parse(spec.Specifications)}
                />
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );
    });
  }

  return <>{specData}</>;
};

export default LaptopSpec;
