import { nanoid } from "nanoid";
import React from "react";
import { Col } from "react-bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import CompCard from "./CompSpecials/CompCard";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { ProductAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import Heading from "../Heading";

const CompSpecials = ({ styles, helperCtx }: any) => {
  const [specialComponent, setSpecialComponent] = useState([]);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const isHD = useMediaQuery("(min-width: 1921px)");

  const getSpecialComponents = async () => {
    const comps = await ProductAPI.getSpecialComponents();

    let specialComps = comps.result;
    setSpecialComponent(specialComps);
  };

  useEffect(() => {
    getSpecialComponents();
  }, []);

  return (
    <>
      <section
        className={`
          ${darkMode ? `bg-black` : `bg-light`}
           p-3 py-xxl-5 border-top border-bottom
        `}
        id="Comp"
      >
        <Col md={{ span: 10, offset: 1 }}>
          <Heading
            level={2}
            className={`
              mb-3 text-center compSpecialsH2
            `}
          >
            PC Components and Accessories Special ({specialComponent.length})
          </Heading>

          <div
            className={`
                d-grid cols-2 cols-md-3 cols-lg-4 gap-2 gap-sm-3 gap-xxl-5
                ${isHD ? `cols-xxl-5` : `cols-xxl-4`}
            `}
          >
            {specialComponent.map((component) => {
              return (
                <div key={nanoid(5)}>
                  <CompCard
                    styles={styles}
                    component={component}
                    helperCtx={helperCtx}
                  />
                </div>
              );
            })}
          </div>
        </Col>
      </section>
    </>
  );
};

export default CompSpecials;
