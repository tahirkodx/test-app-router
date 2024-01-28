"use client";
import HelperContext from "@/store/helper-context";
import _ from "lodash";
import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "@/styles/ComponentCTRLCard.module.scss";
import Heading from "@/components/Heading";
import FancyPrice from "@/components/FancyPrice";
import SpecialTags from "@/components/DynamicCard/SpecialTags";
import PalladiumSmallTable from "@/components/PalladiumSmallTable";
import ImageLink from "./ComponentCTRLCard/ImageLink";
import OldPrice from "./ComponentCTRLCard/OldPrice";
import StockStatus from "./ComponentCTRLCard/StockStatus";
import ViewLink from "./ComponentCTRLCard/ViewLink";
import FpsElements from "./ComponentCTRLCard/FpsElements";
import { useTheme } from "@/store/ThemeContext";

const ComponentCTRLCard = ({
  Product,
  filteredGame,
  gameDataFPS,
  palladiumData,
}: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const hasFPS = (Product: any) => {
    return (
      Product.Performance !== null &&
      Product.Performance !== undefined &&
      Product.Performance.length > 0
    );
  };

  const [pallCtrlData, setPallCtrlData] = useState(palladiumData);
  const [performCard, setPerformCard] = useState(false);
  const helperCtx = useContext(HelperContext);

  const placeholderImg =
    "https://www.evetech.co.za/repository/ProductImages/image-placeholder.png";

  return (
    <>
      <Card
        className={`
          ${hasFPS(Product) ? styles.NoFPS : ""} 
          ${styles.Products__Card} 
          ${styles.HoverGrow} 
          ${darkMode ? `bg-black border-info border-opacity-50` : ``}
        shadow overflow-hidden h-100 gap-2 position-relative align-content-center
        `}
      >
        {/* Image Link to product */}
        <ImageLink
          Product={Product}
          placeholderImg={placeholderImg}
          styles={styles}
        />

        {/* Product Name */}
        <div className="px-2 px-sm-3 text-center overflow-hidden h-100">
          <Heading level={3} className={`fs-6 fw-2 lh-1 m-0`}>
            {Product.ProName ? Product.ProName : ``}
            {Product.name ? Product.name : ``}
            {Product.NAME ? Product.NAME : ``}
          </Heading>
        </div>

        {/* Price Area */}
        <div
          className={`
            ${styles.Products__PriceArea} 
            ${
              Product.oldprice !== undefined &&
              Product.oldprice - Product.price > 0
                ? `justify-content-between`
                : `justify-content-center`
            } 
          px-2 px-sm-3 d-xl-grid cols-2 gap-2 align-items-center 
        `}
        >
          <FancyPrice price={Product.price} className={`w-100 text-center`} />

          {/* Old Price */}
          {Product.oldprice !== undefined &&
            Product.oldprice - Product.price > 0 && (
              <OldPrice Product={Product} styles={styles} />
            )}
        </div>

        {/* FPS And More Info Buttons */}
        {/* palladium table */}
        {!_.isEmpty(pallCtrlData) && pallCtrlData !== undefined && (
          <div className="row px-2 px-sm-3 text-center">
            <PalladiumSmallTable pData={pallCtrlData} />
          </div>
        )}
        <div className="px-2 px-sm-3 text-center">
          {/* Stock Status */}
          <StockStatus Product={Product} />
          <div className={`${styles.Products__Buttons} d-flex gap-1 mb-1`}>
            <ViewLink Product={Product} />
            {/* FPS Button and Gamebar(position-absolute) */}
            {hasFPS(Product) ? (
              <FpsElements
                styles={styles}
                Product={Product}
                filteredGame={filteredGame}
                gameDataFPS={gameDataFPS}
                setPerformCard={setPerformCard}
                placeholderImg={placeholderImg}
              />
            ) : null}
          </div>
        </div>

        {/* GameBar Placeholder */}
        {hasFPS(Product) ? <div style={{ height: `81px` }}></div> : null}

        {/* Special Tags */}
        <SpecialTags helperCtx={helperCtx} Product={Product} styles={styles} />
      </Card>
    </>
  );
};

export default ComponentCTRLCard;
