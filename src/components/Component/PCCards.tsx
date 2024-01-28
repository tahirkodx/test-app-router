"use client";
import HelperContext from "@/store/helper-context";
import React, { useContext, useState } from "react";
import classes from "@/styles/PCCard.module.scss";
import styles from "@/styles/PCCards.module.scss";
import { Card } from "react-bootstrap";
import { nanoid } from "nanoid";
import FancyPrice from "../FancyPrice";
import FpsElements from "./ComponentCTRLCard/FpsElements";
import SpecialTags from "../DynamicCard/SpecialTags";
import LaptopHeighlights from "../Laptop/Controls/LaptopHeighlights";
import ImageLink from "./PC_Cards/ImageLink";
import { useTheme } from "@/store/ThemeContext";

const PCCards = (props: any) => {
  let Product = props.product;
  let Performance = {};

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const hasFPS = (Product: any) => {
    return (
      Product.Performance !== null &&
      Product.Performance !== undefined &&
      Product.Performance.length > 0
    );
  };

  const [performCard, setPerformCard] = useState(false);
  const helperCtx = useContext(HelperContext);

  const placeholderImg =
    "https://www.evetech.co.za/repository/ProductImages/image-placeholder.png";

  return (
    <>
      <div className={`${classes.product_card} ${classes.PCCard}`}>
        <Card
          key={nanoid(10)}
          className={`
            ${darkMode ? `bg-black border-secondary border-opacity-75` : ``} 
            p-0 shadow overflow-hidden h-100
          `}
        >
          <ImageLink Product={Product} classes={classes} />
          <Card.Body
            className={`
              ${classes.CardBody} 
              d-grid p-0
            `}
          >
            {/* Product Name */}
            <Card.Title
              className={`
                ${classes.CardTitle}
                ${darkMode ? `text-light` : `text-dark`} 
                overflow-hidden text-center text-bg-light p-2 pb-0 mb-0 px-3 rounded-2
            `}
            >
              {Product.name}
            </Card.Title>
            <Card.Footer className="text-center p-0 px-2 px-sm-3 border-0">
              <div
                className={`w-100 my-0 d-flex gap-1 justify-content-center align-bottom`}
              >
                {/* Price Area */}
                <FancyPrice price={Product.price_vat} />
              </div>
            </Card.Footer>

            {/* Product Highlights */}
            <div className={`${classes.CardHighlight} pb-1 px-3`}>
              {Product.high && <LaptopHeighlights high={Product.high} />}
            </div>

            <div className="px-2 px-sm-3 pb-2 text-center">
              <div className={`${styles.Products__Buttons} d-flex gap-1`}>
                {/* Product Page Link */}
                <ImageLink Product={Product} classes={classes} />

                {/* FPS Button and Gamebar(position-absolute) */}
                {hasFPS(Product) ? (
                  <FpsElements
                    styles={styles}
                    Product={Product}
                    filteredGame={props.filteredGame}
                    gameDataFPS={props.gameDataFPS}
                    setPerformCard={setPerformCard}
                    placeholderImg={placeholderImg}
                  />
                ) : null}
              </div>
            </div>

            {/* GameBar Placeholder */}
            {hasFPS(Product) ? <div style={{ height: `81px` }}></div> : null}

            {/* Special Tags */}
            <SpecialTags
              helperCtx={helperCtx}
              Product={Product}
              styles={styles}
            />
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default PCCards;
