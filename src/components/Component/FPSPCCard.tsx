"use client";
import HelperContext from "@/store/helper-context";
import React, { useContext, useEffect, useState } from "react";
import cardCSS from "@/styles/FPSPCCard.module.scss";
import styles from "@/styles/PCFPSByQueryID.module.scss";
import Link from "next/link";
import { Badge, Button, Card } from "react-bootstrap";
import FancyPrice from "../FancyPrice";
import CircularProgress from "../CircularProgress";
import _ from "lodash";
import { useTheme } from "@/store/ThemeContext";

const FPSPCCard = (props: any) => {
  let Product = props.Product;
  let gameData: any = {};
  const [fpsTitle, setFpsTitle] = useState("");
  const [fpsPer, setFpsPer] = useState(0);
  const [fpsScore, setFpsScore] = useState(0);
  const helperCtx = useContext(HelperContext);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  if (Product.gameData !== undefined) {
    try {
      gameData = JSON.parse(Product.gameData);
    } catch (e) {}
  }

  useEffect(() => {
    if (
      props.activeFPS !== undefined &&
      props.activeFPS.trim().length > 0 &&
      !_.isEmpty(gameData) &&
      gameData !== undefined
    ) {
      if (_.toLower(props.activeFPS).includes("1440")) {
        setFpsTitle("1440p");
        setFpsPer(
          parseFloat(gameData.quadHdFps) > 240
            ? 100
            : Math.round((parseFloat(gameData.quadHdFps) * 100) / 240)
        );
        setFpsScore(gameData.quadHdFps);
      } else if (_.toLower(props.activeFPS).includes("4k")) {
        setFpsTitle("4k");
        setFpsPer(
          parseFloat(gameData.ultra4k) > 240
            ? 100
            : Math.round((parseFloat(gameData.ultra4k) * 100) / 240)
        );
        setFpsScore(gameData.ultra4k);
      } else {
        setFpsTitle("1080p");
        setFpsPer(
          parseFloat(gameData.fullHdFps) > 240
            ? 100
            : Math.round((parseFloat(gameData.fullHdFps) * 100) / 240)
        );
        setFpsScore(gameData.fullHdFps);
      }
    } else {
      if (!_.isEmpty(gameData) && gameData !== undefined) {
        setFpsTitle("1080p");
        setFpsPer(
          parseFloat(gameData.fullHdFps) > 240
            ? 100
            : Math.round((parseFloat(gameData.fullHdFps) * 100) / 240)
        );
        setFpsScore(gameData.fullHdFps);
      } else {
        setFpsTitle(Product.FPS);
        setFpsPer(
          parseFloat(Product.FPSScore) > 240
            ? 100
            : Math.round((parseFloat(Product.FPSScore) * 100) / 240)
        );
        setFpsScore(Product.FPSScore);
      }
    }
  }, [props.activeFPS]);

  return (
    <>
      <div className={cardCSS.product_card}>
        <Link
          href={_.replace(Product.Url, "https://www.evetech.co.za", "")}
          title={Product.Title}
          className="text-decoration-none"
        >
          <Card
            className={`${
              darkMode
                ? `${styles.darkCard} bg-black bg-opacity-50 border-info border-opacity-50`
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

              <div className="position-absolute top-0 start-0 p-3">
                {Product.IsSpecial !== "Not Special" && (
                  <Badge bg="danger">
                    <span className="fw-2">On Special</span>
                  </Badge>
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
                className={`w-100 d-flex gap-1 justify-content-center align-items-center flex-column flex-lg-row`}
              >
                <FancyPrice price={Product.Price}></FancyPrice>

                {/* <Button size="sm" title={Product.Title}>
                  <small>View/Buy Now</small>
                </Button> */}
              </div>
            </Card.Footer>
            <section className={`${styles.FPS} position-relative`}>
              <div className="d-grid justify-items-center gap-2 pb-2 px-3">
                <div className={`${styles.Circles} position-relative`}>
                  <div className="progress p-1 m-0">
                    <span
                      className={`${styles.Circles__Pill} text-white bg-black px-1 py-0 rounded-pill`}
                    >
                      {fpsTitle}
                    </span>
                    <CircularProgress
                      Percentage={fpsPer}
                      Text={fpsScore}
                      Duration={1}
                    />
                    <span
                      className={`${styles.Circles__FPS} ${
                        darkMode ? `text-info` : `text-primary`
                      }`}
                    >
                      FPS
                    </span>
                  </div>
                </div>
                <div className="text-center d-grid gap-1 position-relative">
                  <Badge
                    className={`${styles.TimespyHead} rounded-pill w-100`}
                    bg="light"
                    text={darkMode ? `light` : `dark`}
                  >
                    <span className="fw-2">TimeSpy Score</span>
                  </Badge>
                  <div
                    className={`
                        d-flex flex-wrap justify-content-center
                        ${darkMode ? `text-light` : `text-dark`}
                    `}
                  >
                    <small
                      className="d-flex flex-column flex-lg-row gap-lg-1"
                      style={{ padding: "0 3px" }}
                    >
                      <div className="fw-2">
                        <small>GPU:</small>
                      </div>
                      <div>
                        <small>{Product.timeSpyScoreGPU}</small>
                      </div>
                    </small>
                    <small
                      className="d-flex flex-column flex-lg-row gap-lg-1"
                      style={{ padding: "0 3px" }}
                    >
                      <div className="fw-2">
                        <small>CPU:</small>
                      </div>
                      <div>
                        <small>{Product.timeSpyScoreCPU}</small>
                      </div>
                    </small>
                    <small
                      className="d-flex flex-column flex-lg-row gap-lg-1"
                      style={{ padding: "0 3px" }}
                    >
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
      </div>
    </>
  );
};

export default FPSPCCard;
