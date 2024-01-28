"use client";
import HelperContext from "@/store/helper-context";
import Link from "next/link";
import { useContext } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import SpecialTag from "../Main/Controls/SpecialTag";
import CircularProgress from "../CircularProgress";
import cardCSS from "@/styles/laptop/LaptopCard.module.scss";
import styles from "@/styles/laptop/LaptopFPSByQueryID.module.scss";
import { useTheme } from "@/store/ThemeContext";
import queryStyles from "@/styles/PCFPSByQueryID.module.scss";
import FancyPrice from "../FancyPrice";

const FPSLaptopCard = (props: any) => {
  let Product = props.Product;
  const helperCtx = useContext(HelperContext);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  return (
    <Link
      href={Product.Url.replace("https://www.evetech.co.za", "")}
      title={Product.Title}
      className={`${cardCSS.product_card} text-decoration-none`}
    >
      <Card
        className={`${
          darkMode
            ? `${queryStyles.darkCard} bg-black bg-opacity-50 border-info border-opacity-50`
            : ``
        } shadow p-0 overflow-hidden`}
      >
        <div
          className={`${cardCSS.CardImage} d-flex-row align-items-center justify-content-center text-center p-3 shadow position-relative`}
        >
          <div className="bg-white h-100 p-2 rounded">
            <Card.Img
              className={`${cardCSS.CardPic}`}
              src={Product.ProductImage}
              alt={Product.Title}
            />
          </div>
          <div className={`pe-none ${cardCSS.tags}`}>
            {helperCtx.dealTags !== undefined &&
            helperCtx.dealTags.length > 0 &&
            Product.IsSpecial === "Special" ? (
              <SpecialTag type={"On Special"} />
            ) : null}
            {(helperCtx.dealTags === undefined ||
              (helperCtx.dealTags !== undefined &&
                helperCtx.dealTags.length === 0)) &&
              Product.IsSpecial === "Special" && (
                <h3
                  id="ctl00_ContentPlaceHolder1_dl_products_ctl02_div_On_Special"
                  className={cardCSS.product_on_special}
                >
                  <span>
                    <p className={cardCSS.product_on_special_text}>
                      On Special
                    </p>
                  </span>
                </h3>
              )}
          </div>
        </div>
        <Card.Body className="p-0">
          <Card.Title
            className={`
                ${cardCSS.CardTitle}
                ${darkMode ? `text-light` : ``} 
                overflow-hidden text-center p-2 pb-0 mb-0 px-3 rounded-2
              `}
          >
            {Product.Name}
          </Card.Title>
        </Card.Body>
        <Card.Footer className="text-center px-2 px-lg-3 border-0">
          <div
            className={`w-100 mt-1 mb-1 d-flex justify-content-center flex-column flex-lg-row gap-1 align-items-center`}
          >
            <FancyPrice price={Product.PriceIncVat} />
          </div>
        </Card.Footer>
        <section className={`${queryStyles.FPS} position-relative`}>
          <div className="d-grid justify-items-center gap-2 pb-2 px-3">
            <div className={`${queryStyles.Circles} position-relative`}>
              <div className="progress p-1 m-0">
                <span
                  className={`${queryStyles.Circles__Pill} text-white bg-black px-1 py-0 rounded-pill`}
                >
                  1080p
                </span>
                <CircularProgress
                  Percentage={
                    parseFloat(Product.FPSScore) > 240
                      ? 100
                      : Math.round((parseFloat(Product.FPSScore) * 100) / 240)
                  }
                  Text={Product.FPSScore}
                  Duration={1}
                />
                <span className={`${queryStyles.Circles__FPS} text-secondary`}>
                  FPS
                </span>
              </div>
            </div>
            <div
              className={`
                text-center d-grid gap-1 position-relative
              `}
            >
              <Badge
                className={`${queryStyles.TimespyHead} rounded-pill w-100`}
                bg="light"
              >
                <span className="fw-2">TimeSpy Score</span>
              </Badge>
              <div
                className={`${
                  darkMode ? `text-light` : `text-dark`
                } d-flex gap-2`}
              >
                <small className="lh-1 d-grid d-lg-flex gap-0 gap-lg-1">
                  <div className="fw-2">
                    <small>GPU:</small>
                  </div>
                  <div>
                    <small>{Product.timeSpyScoreGPU}</small>
                  </div>
                </small>
                <small className="lh-1 d-grid d-lg-flex gap-0 gap-lg-1">
                  <div className="fw-2">
                    <small>CPU:</small>
                  </div>
                  <div>
                    <small>{Product.timeSpyScoreCPU}</small>
                  </div>
                </small>
                <small className="lh-1 d-grid d-lg-flex gap-0 gap-lg-1">
                  <div className="fw-2">
                    <small>Overall:</small>
                  </div>
                  <div>
                    <small>{Product.timeSpyOverallScore}</small>
                  </div>
                </small>
              </div>
            </div>
          </div>
        </section>
      </Card>
    </Link>
  );
};

export default FPSLaptopCard;
