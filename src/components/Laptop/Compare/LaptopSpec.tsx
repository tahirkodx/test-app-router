import { nanoid } from "nanoid";
import { Accordion, ListGroup } from "react-bootstrap";
import styles from "@/styles/LaptopDetail.module.scss";
import LaptopSpecDetails from "./LaptopSpecDetails";
import { useTheme } from "@/store/ThemeContext";

const LaptopSpec = (props: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  const specs = props.Specs;
  let specData = null;

  if (specs) {
    specData = specs.map((spec: any) => {
      return (
        <Accordion
          defaultActiveKey="0"
          className={`
            d-grid gap-3 mb-3 overflow-hidden
        `}
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
                fw-3 border-0 
                ${styles.Spec}
                ${darkMode ? styles.darkMode : ``}
            `}
            >
              {spec.Spec}
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
