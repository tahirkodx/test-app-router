"use client";
import React from "react";
import Col from "react-bootstrap/Col";
import HorizontalScrollView from "@/components/Main/Controls/HorizontalScrollView";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import BrandLogos from "./BrandLogos";
import styles from "@/styles/Brands.module.scss";
import scrollbarStyles from "@/styles/Scrollbar.module.scss";
import backgroundStyles from "@/styles/Background.module.scss";

function Brands() {
  const isSM = useMediaQuery("(min-width: 576px)");
  const isXL = useMediaQuery("(min-width: 1200px)");

  return (
    <Col md={{ span: 10, offset: 1 }} className="px-3 p-md-0">
      {!isXL ? (
        <HorizontalScrollView
          className="hide-scrollbar p-3 bg-white rounded"
          hideHeading={true}
        >
          <div className="d-inline-flex gap-3 px-3">
            <BrandLogos />
          </div>
        </HorizontalScrollView>
      ) : null}
      {isXL ? (
        <>
          <div
            className={`
              overflow-hidden bg-white p-2
            `}
          >
            <div
              className={`
                ${styles.BrandsCard}
                ${scrollbarStyles.main}
                ${scrollbarStyles.v_1}
                position-relative
              `}
            >
              <div
                className={`position-absolute w-100 h-100 top-0 start-0 overflow-auto`}
              >
                <div
                  className={`${styles.BrandLogosXL} d-grid cols-6 flex-wrap gap-2`}
                >
                  <BrandLogos />
                </div>
              </div>
              <div
                className={`
                  ${styles.Fade} 
                  ${backgroundStyles.whiteFadeToTop}
                  position-absolute w-100 start-0 bottom-0 pe-none
                `}
              ></div>
            </div>
          </div>
        </>
      ) : null}
    </Col>
  );
}

export default Brands;
