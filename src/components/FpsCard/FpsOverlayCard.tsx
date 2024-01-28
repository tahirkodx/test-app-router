"use client";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Heading from "../Heading";
import CircularProgress from "../CircularProgress";
import Slider from "react-slick";
import { FaTimes } from "react-icons/fa";
import MobiNext from "./MobiNext";
import MobiPrev from "./MobiPrev";
import styles from "@/styles/FpsCard/FpsOverlayCard.module.scss";
import { useTheme } from "@/store/ThemeContext";

const FpsOverlayCard = ({
  Performance,
  gameImg,
  gameTitle,
  placeholderImg,
  hdPer,
  hdFPS,
  fhdPer,
  fhdFPS,
  fourkPer,
  fourkFPS,
  setPerformCard,
  gameTitles,
  quickView,
  productName,
  setGame,
  setShow,
  setProductTitle,
  setGameImg,
  setGameTitle,
  gameFPSData,
  setHdPer,
  setHdFPS,
  setFhdPer,
  setFhdFPS,
  setFourkPer,
  setFourkFPS,
}: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow:
      gameTitles.length !== undefined && gameTitles.length.length < 4
        ? gameTitles.length.length
        : 4,
    slidesToScroll:
      gameTitles.length !== undefined && gameTitles.length.length < 4
        ? gameTitles.length.length
        : 4,
    initialSlide: 0,
    nextArrow: <MobiNext />,
    prevArrow: <MobiPrev />,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow:
            gameTitles.length !== undefined && gameTitles.length.length < 4
              ? gameTitles.length.length
              : 3,
          slidesToScroll:
            gameTitles.length !== undefined && gameTitles.length.length < 4
              ? gameTitles.length.length
              : 3,
        },
      },
    ],
  };

  return (
    <>
      <div
        className={`
              ${styles.FPSPerform}
              ${darkMode ? `bg-black bg-gradient bg-opacity-75` : ``} 
              position-absolute w-100 h-100 top-0 start-0 bg-light d-grid gap-2
            `}
        style={{
          backdropFilter: `blur(16px) saturate(180%)`,
          WebkitBackdropFilter: `blur(16px) saturate(180%)`,
        }}
      >
        <div className={`${styles.LazyPlaceholder}`}>
          <LazyLoadImage
            src={gameImg}
            className="img-cover h-100 w-100"
            alt={gameTitle}
            width={300}
            height={300}
            placeholderSrc={placeholderImg}
            visibleByDefault={gameImg}
            style={{
              WebkitMaskImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))`,
              maskImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))`,
              opacity: `0.8`,
            }}
          />
        </div>

        <div className="">
          <div
            className={`${styles.Content} d-grid gap-1 h-100 align-items-center`}
          >
            <Heading level={3} className={`fs-6 text-center m-0 lh-1`}>
              <small>
                <span>Performance for </span>
                <span className="text-danger">{gameTitle}</span>
              </small>
            </Heading>

            {/* Circles */}
            <section
              className={`${styles.Circles} position-relative gap-sm-2 d-flex flex-wrap justify-content-center px-2`}
            >
              {/* {isHD ? "HD" : "No HD"} */}
              <div
                className={`
                      ${darkMode ? `bg-dark` : ``}
                      progress p-1 m-0
                    `}
              >
                <span
                  className={`${styles.Circles__Pill} text-white bg-black px-1 py-0 rounded-pill w-75 text-center`}
                >
                  1080p
                </span>
                <CircularProgress
                  Percentage={hdPer}
                  Text={hdFPS}
                  Duration={1}
                />
                <span
                  className={`${styles.Circles__FPS} ${
                    darkMode ? `text-light` : `text-dark`
                  }`}
                >
                  FPS
                </span>
              </div>

              <div
                className={`
                      ${darkMode ? `bg-dark` : ``}
                      progress p-1 m-0
                    `}
              >
                <span
                  className={`${styles.Circles__Pill} text-white bg-black px-1 py-0 rounded-pill w-75 text-center`}
                >
                  1440p
                </span>
                <CircularProgress
                  Percentage={fhdPer}
                  Text={fhdFPS}
                  Duration={1}
                />
                <span
                  className={`${styles.Circles__FPS} ${
                    darkMode ? `text-light` : `text-dark`
                  }`}
                >
                  FPS
                </span>
              </div>
              <div
                className={`
                      ${darkMode ? `bg-dark` : ``}
                      progress p-1 m-0
                    `}
              >
                <span
                  className={`${styles.Circles__Pill} text-white bg-black px-1 py-0 rounded-pill w-75 text-center`}
                >
                  4K
                </span>
                <CircularProgress
                  Percentage={fourkPer}
                  Text={fourkFPS}
                  Duration={1}
                />
                <span
                  className={`${styles.Circles__FPS} ${
                    darkMode ? `text-light` : `text-dark`
                  }`}
                >
                  FPS
                </span>
              </div>
            </section>
            {/* Performance */}
            <section
              className={`
                    ${darkMode ? `text-light` : `text-dark`}
                    lh-1 text-center d-grid gap-2
                  `}
            >
              <div className="d-flex flex-wrap align-items-stretch">
                <div className="d-grid cols-3 bg-secondary bg-opacity-10 p-1 px-2 flex-grow-1">
                  <small>
                    <small>
                      <div className="fw-2">GPU:</div>
                      {Performance.timeSpyScoreGPU}
                    </small>
                  </small>
                  <small>
                    <small>
                      <div className="fw-2">CPU:</div>
                      {Performance.timeSpyScoreCPU}
                    </small>
                  </small>
                  <small>
                    <small>
                      <div className="fw-2">Overall:</div>
                      {Performance.timeSpyOverallScore}
                    </small>
                  </small>
                </div>
                <small className="flex-grow-1 p-1 px-2 bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center">
                  <small className="d-flex gap-1 justify-content-center">
                    <div className="fw-2">Timespy:</div>
                    <span
                      className={`
                            ${darkMode ? `text-info` : `text-primary`} 
                            text-decoration-underline cursor-pointer
                          `}
                      onClick={() => {
                        quickView(productName, setShow, setProductTitle);
                      }}
                    >
                      Learn More
                    </span>
                  </small>
                </small>
              </div>

              <div
                className={`
                      text-dark px-2 w-100
                    `}
              >
                <div className="w-100 rounded-pill d-grid cols-4 bg-grey bg-gradient text-center overflow-hidden mt-1">
                  <small
                    className={`${
                      Performance.timeSpyOverallScore !== undefined &&
                      Performance.timeSpyOverallScore > 2000 &&
                      Performance.timeSpyOverallScore < 3500
                        ? "bg-warning"
                        : "bg-secondary text-dark text-opacity-50"
                    } bg-gradient`}
                    style={{ padding: "0px 0 2px 0" }}
                  >
                    <small>Entry</small>
                  </small>
                  <small
                    className={`${
                      Performance.timeSpyOverallScore !== undefined &&
                      Performance.timeSpyOverallScore > 3500 &&
                      Performance.timeSpyOverallScore < 6000
                        ? "bg-warning"
                        : "bg-secondary text-dark text-opacity-50"
                    } bg-gradient`}
                    style={{ padding: "0px 0 2px 0" }}
                  >
                    <small>Good</small>
                  </small>
                  <small
                    className={`${
                      Performance.timeSpyOverallScore !== undefined &&
                      Performance.timeSpyOverallScore > 6000 &&
                      Performance.timeSpyOverallScore < 7500
                        ? "bg-warning"
                        : "bg-secondary text-dark text-opacity-50"
                    } bg-gradient`}
                    style={{ padding: "0px 0 2px 0" }}
                  >
                    <small>High</small>
                  </small>
                  <small
                    className={`${
                      Performance.timeSpyOverallScore !== undefined &&
                      Performance.timeSpyOverallScore >= 7500
                        ? "bg-warning"
                        : "bg-secondary text-dark text-opacity-50"
                    } bg-gradient`}
                    style={{ padding: "0px 0 2px 0" }}
                  >
                    <small>Elite</small>
                  </small>
                </div>
              </div>
            </section>
            {/* Games */}
            <section className="position-relative h-100 w-100">
              <Slider
                {...settings}
                className="position-absolute w-100 h-100 d-grid align-items-center"
              >
                {gameTitles.map((game: any, index: any) => {
                  return (
                    <div key={index} className={`${styles.LazyPlaceholder}`}>
                      <LazyLoadImage
                        src={game.gameImg}
                        alt={game.gameTitle}
                        onClick={() => {
                          setGame(
                            game,
                            setGameImg,
                            setGameTitle,
                            gameFPSData,
                            setHdPer,
                            setHdFPS,
                            setFhdPer,
                            setFhdFPS,
                            setFourkPer,
                            setFourkFPS
                          );
                        }}
                        width={300}
                        height={300}
                        className="img-fluid cursor-pointer"
                        placeholderSrc={placeholderImg}
                        visibleByDefault={game.gameImg}
                        style={{ objectPosition: "50% 50%" }}
                      />
                    </div>
                  );
                })}
              </Slider>
            </section>
          </div>
        </div>
        <div className="px-2 px-sm-3 py-1 d-flex align-items-center justify-content-center bg-secondary bg-opacity-75 lh-1">
          <small>
            <small>
              <small>Powered By </small>
            </small>
          </small>
          <LazyLoadImage
            src="https://www.evetech.co.za/repository/ProductImages/3DMARK.png"
            alt="3D Mark"
            style={{ maxWidth: "75px" }}
            width={135}
            height={28}
            className="img-fluid"
            visibleByDefault={true}
            defaultValue="https://www.evetech.co.za/repository/ProductImages/3DMARK.png"
          />
          {/* <img
                src="https://www.evetech.co.za/repository/ProductImages/3DMARK.png"
                alt="3D Mark"
                style={{ maxWidth: "75px" }}
              /> */}
        </div>
        <div
          className="position-absolute top-0 end-0 bg-light shadow p-2 bg-light rounded-bottom-start-2 overflow-hidden cursor-pointer"
          onClick={() => setPerformCard(false)}
        >
          <FaTimes className="text-danger" />
        </div>
      </div>
    </>
  );
};

export default FpsOverlayCard;
