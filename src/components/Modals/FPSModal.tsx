"use client";
import React from "react";
import { useState, useRef } from "react";
import { Col, Image, Modal, Row, Stack } from "react-bootstrap";
import styles from "@/styles/FPS/FPSModal.module.scss";
import { customAlphabet } from "nanoid";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import CircularProgress from "@/components/FPSComps/CirularProgress";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SpyModalCss from "@/styles/TimeSpyModal.module.scss";
import { useTheme } from "@/store/ThemeContext";
import { isBodyDark, isDarkHeaderFooter } from "../Auth/LoginModal";
import darkModalStyles from "@/styles/DarkModal.module.scss";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");

const FPSModal = (props: any) => {
  let FPSInfo: any = props.FPSData;
  let GameData: any = props.GameData;
  const [timespyData, setTimespyData] = useState<any>({});
  const [gameFPS, setGameFPS] = useState([]);
  const [isSet, setIsSet] = useState(false);
  const [isHD, setIsHD] = useState(false);
  const [isFHD, setIsFHD] = useState(false);
  const [isFourK, setIsFourK] = useState(false);
  const [gameImg, setGameImg] = useState("");
  const [gameTitle, setGameTitle] = useState("");
  const [hdPer, setHdPer] = useState(0);
  const [hdFPS, setHdFPS] = useState(0);
  const [fhdPer, setFhdPer] = useState(0);
  const [fhdFPS, setFhdFPS] = useState(0);
  const [fourkPer, setFourkPer] = useState(0);
  const [fourkFPS, setFourkFPS] = useState(0);
  const [show, setShow] = useState(false);

  const GameOptions = useRef<any>();

  const slideLeft = (offset: any) => () => {
    GameOptions.current.scrollLeft += offset;
  };

  const slideRight = (offset: any) => () => {
    GameOptions.current.scrollLeft -= offset;
  };

  let FPSData: any = {};

  const [fpsShow, setFpsShow] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const setGame = (game: any) => {
    setGameImg(!_.isEmpty(game, true) ? game.gameImg : "");
    setGameTitle(!_.isEmpty(game, true) ? game.titles : "");
    setHdPer((prevHdPer) => {
      if (!_.isEmpty(game, true))
        prevHdPer =
          parseFloat(game.fullHdFps) > 240
            ? 100
            : Math.round((parseFloat(game.fullHdFps) * 100) / 240);
      return prevHdPer;
    });

    setHdFPS(!_.isEmpty(game, true) ? game.fullHdFps : 0);

    setFhdPer((prevHdPer) => {
      if (!_.isEmpty(game, true))
        prevHdPer =
          parseFloat(game.quadHdFps) > 240
            ? 100
            : Math.round((parseFloat(game.quadHdFps) * 100) / 240);
      return prevHdPer;
    });

    setFhdFPS(!_.isEmpty(game, true) ? game.quadHdFps : 0);

    setFourkPer((prevFourk) => {
      if (!_.isEmpty(game, true))
        prevFourk =
          parseFloat(game.ultra4k) > 240
            ? 100
            : Math.round((parseFloat(game.ultra4k) * 100) / 240);
      return prevFourk;
    });

    setFourkFPS(!_.isEmpty(game, true) ? game.ultra4k : 0);
  };

  if (
    FPSInfo !== null &&
    FPSInfo !== undefined &&
    FPSInfo.fpsData !== undefined &&
    GameData !== undefined &&
    !isSet
  ) {
    FPSData = JSON.parse(FPSInfo.fpsData);
    setTimespyData(FPSData);

    if (FPSInfo.isFullHD !== undefined && FPSInfo.isFullHD === 1) setIsHD(true);

    if (FPSInfo.isQuadHD !== undefined && FPSInfo.isQuadHD === 1)
      setIsFHD(true);

    if (FPSInfo.isFourk !== undefined && FPSInfo.isFourk === 1)
      setIsFourK(true);

    let gameFPSData = _.filter(FPSData.gameTitles, (fps: any) => {
      let find = _.find(GameData, (game: any) => {
        return game.gameTitle === fps.titles;
      });

      if (find !== undefined && find !== null) return fps;
    });

    gameFPSData.map((game: any) => {
      let gameObj = _.find(GameData, (gameData: any) => {
        return gameData.gameTitle === game.titles;
      });

      if (gameObj !== null && gameObj.gameImg !== undefined)
        game.gameImg = gameObj.gameImg;
    });

    setGameFPS(gameFPSData);
    let selected = _.find(gameFPSData, (fps: any, ind: any) => {
      return ind === 0;
    });
    if (selected !== null && selected !== undefined) setGame(selected);
    setIsSet(true);
  }

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  return (
    <>
      <div className={`d-flex justify-content-end gap-2`}>
        <Image
          src="https://www.evetech.co.za/repository/ProductImages/FPS_Button_115px1.gif"
          alt="FPS"
          className={`${styles.ModalLink} rounded cursor-pointer`}
          onClick={() => setFpsShow(true)}
        />
      </div>
      <Modal
        size="lg"
        show={fpsShow}
        onHide={() => setFpsShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        centered
      >
        <Modal.Header
          closeButton
          className={`
          ${darkMode ? darkModalStyles.darkHeader : ``}
          ${isDarkHeaderFooter(darkMode)}
        `}
        >
          <Modal.Title id="example-modal-sizes-title-lg">
            FPS Game Performance
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${isBodyDark(darkMode)} d-grid gap-2 gap-md-3`}>
          <div className={`d-grid gap-2 cols-2`}>
            <div
              className={`bg-dark rounded overflow-hidden position-relative d-flex justify-content-center align-items-center`}
            >
              <Image
                src={gameImg}
                className={`${styles.Background} position-absolute opacity-25 w-100 h-100`}
                alt={gameTitle}
              />
              <Image
                src={gameImg}
                className={`${styles.BigImage} position-relative`}
                alt={gameTitle}
              />
            </div>
            <div
              className={`
                rounded overflow-hidden text-center border
                ${
                  darkMode
                    ? `bg-dark bg-opacity-25 bg-gradient border-secondary border-opacity-50`
                    : `bg-light`
                }
              `}
            >
              <h2 className={`fs-6 p-2 pb-0 p-md-3 pb-md-0`}>
                <div>Performance for</div>
                <div className={`text-danger`}>{gameTitle}</div>
              </h2>
              <div
                className={`
                  ${styles.Circles}
                  ${darkMode ? styles.darkMode : ``} 
                  pb-2 pb-md-3
                `}
              >
                {isHD && (
                  <div className="progress p-1 m-0">
                    <span
                      className={`${styles.Circles__Pill} text-white bg-black px-1 py-0 rounded-pill`}
                    >
                      1080p
                    </span>
                    <CircularProgress
                      Percentage={hdPer}
                      Text={hdFPS}
                      Duration={1}
                    />
                    <span className={`${styles.Circles__FPS}`}>FPS</span>
                  </div>
                )}
                {isFHD && (
                  <div className="progress p-1 m-0">
                    <span
                      className={`${styles.Circles__Pill} text-white bg-black px-1 py-0 rounded-pill`}
                    >
                      1440p
                    </span>
                    <CircularProgress
                      Percentage={fhdPer}
                      Text={fhdFPS}
                      Duration={1}
                    />
                    <span className={`${styles.Circles__FPS}`}>FPS</span>
                  </div>
                )}
                {isFourK && (
                  <div className="progress p-1 m-0">
                    <span
                      className={`${styles.Circles__Pill} text-white bg-black px-1 py-0 rounded-pill`}
                    >
                      4k
                    </span>
                    <CircularProgress
                      Percentage={fourkPer}
                      Text={fourkFPS}
                      Duration={1}
                    />
                    <span className={`${styles.Circles__FPS}`}>FPS</span>
                  </div>
                )}
              </div>
              <div>
                <div className={`${styles.Scores} p-2 pb-0 p-md-3 pb-md-2`}>
                  <div
                    className={`d-flex flex-wrap gap-1 pt-2 justify-content-center`}
                  >
                    <p className={`d-flex gap-1`}>
                      GPU
                      <span className={`fw-2`}>
                        {timespyData.timeSpyScoreGPU !== undefined
                          ? timespyData.timeSpyScoreGPU
                          : ""}
                      </span>
                    </p>
                    <p className={`d-flex gap-1`}>
                      CPU
                      <span className={`fw-2`}>
                        {timespyData.timeSpyScoreCPU !== undefined
                          ? timespyData.timeSpyScoreCPU
                          : ""}
                      </span>
                    </p>
                    <p className={`d-flex gap-1`}>
                      Overall
                      <span className={`fw-2`}>
                        {timespyData.timeSpyOverallScore !== undefined
                          ? timespyData.timeSpyOverallScore
                          : ""}
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className={`${styles.TimeSpy} p-2 pb-0 p-md-3 pb-md-2 d-flex justify-content-center flex-wrap`}
                >
                  <div className={`d-flex gap-1`}>
                    TimeSpy
                    <div className="fw-2">
                      {timespyData.timeSpyOverallScore !== undefined
                        ? timespyData.timeSpyOverallScore
                        : ""}
                    </div>
                  </div>
                  <div
                    className={`
                      ${darkMode ? `text-info` : `text-primary`} 
                      cursor-pointer
                    `}
                    onClick={() => {
                      setShow(true);
                    }}
                  >
                    Learn More
                  </div>

                  {/* Time Spy Score Modal */}
                  {!_.isEmpty(timespyData) &&
                    timespyData.timeSpyOverallScore !== undefined && (
                      <Modal
                        size="lg"
                        show={show}
                        onHide={() => {
                          setShow(false);
                        }}
                        aria-labelledby="Timespy-Modal"
                        centered
                        className={`${styles.TimeSpyModal} bg-black bg-opacity-50`}
                      >
                        <Modal.Header
                          closeButton
                          className={`
                            ${darkMode ? darkModalStyles.darkHeader : ``}
                            ${isDarkHeaderFooter(darkMode)}
                          `}
                        >
                          <Modal.Title id="example-modal-sizes-title-lg">
                            3DMark Time Spy
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body
                          className={`${isBodyDark(
                            darkMode
                          )} d-grid gap-2 gap-md-3`}
                        >
                          <Stack gap={3}>
                            <div className="d-grid cols-sm-2 gap-2 align-items-center">
                              <section>
                                <div
                                  className={`${SpyModalCss.TimeSpyCircles} position-relative d-flex gap-2 justify-content-center flex-wrap`}
                                >
                                  <div
                                    className={`${styles.O} position-relative`}
                                  >
                                    <div
                                      className={`${styles.O__Lvl} position-absolute w-100 h-100 rounded-circle overflow-hidden d-grid gap-2 cols-2 bg-light`}
                                    >
                                      <span
                                        className={
                                          (hdFPS < 60
                                            ? `bg-danger`
                                            : hdFPS < 120
                                            ? `bg-warning`
                                            : `bg-success`) +
                                          ` border border-dark`
                                        }
                                      ></span>
                                      <span
                                        className={
                                          (hdFPS < 60
                                            ? `bg-danger`
                                            : hdFPS < 120
                                            ? `bg-warning`
                                            : `bg-success`) +
                                          ` border border-dark`
                                        }
                                      ></span>
                                      <span
                                        className={
                                          (hdFPS < 60
                                            ? `bg-danger`
                                            : hdFPS < 120
                                            ? `bg-warning`
                                            : `bg-success`) +
                                          ` border border-dark`
                                        }
                                      ></span>
                                      <span className={``}></span>
                                    </div>
                                    <div
                                      className={`position-absolute w-100 h-100 bg-dark rounded-circle`}
                                    ></div>
                                    <div className="progress p-2 m-0 position-relative w-100 h-100 rounded-circle bg-dark">
                                      <CircularProgress
                                        Percentage={
                                          !_.isEmpty(timespyData) &&
                                          timespyData.timeSpyOverallScore !==
                                            undefined &&
                                          timespyData.timeSpyOverallScore < 7500
                                            ? Math.ceil(
                                                (timespyData.timeSpyOverallScore *
                                                  100) /
                                                  7500
                                              )
                                            : 100
                                        }
                                        Text={timespyData.timeSpyOverallScore}
                                        Duration={1}
                                      />
                                      <span
                                        className={`${SpyModalCss.TimeSpyCircles__FPS} text-light`}
                                      >
                                        Timespy
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </section>

                              <section>
                                <Stack gap={2}>
                                  <p className="m-0 lh-1">
                                    <small>
                                      <span className="fw-2 text-primary">
                                        Timespy Score for:
                                      </span>
                                      <span> {props.name}</span>
                                    </small>
                                  </p>

                                  <div>
                                    <h3 className="fs-6">Quality Meter</h3>
                                    <div
                                      className={`${SpyModalCss.QualityMeter} w-100 d-grid cols-4 cols-sm-2 gap-2 text-center lh-1`}
                                    >
                                      <div
                                        className={`${
                                          timespyData.timeSpyOverallScore >
                                            2000 &&
                                          timespyData.timeSpyOverallScore < 3500
                                            ? "active"
                                            : ""
                                        } border border-secondary rounded`}
                                      >
                                        <div
                                          className={`${
                                            darkMode ? `bg-dark` : `bg-light`
                                          } w-100 h-100 rounded pb-1 d-flex align-items-center justify-content-center flex-column`}
                                        >
                                          <h3 className="fs-6 m-0">Entry</h3>
                                          <p className="m-0">
                                            <small>
                                              <small>2000 - 3500</small>
                                            </small>
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        className={`${
                                          timespyData.timeSpyOverallScore >
                                            3500 &&
                                          timespyData.timeSpyOverallScore < 6000
                                            ? "active"
                                            : ""
                                        } border border-secondary rounded`}
                                      >
                                        <div
                                          className={`${
                                            darkMode ? `bg-dark` : `bg-light`
                                          } w-100 h-100 rounded pb-1 d-flex align-items-center justify-content-center flex-column`}
                                        >
                                          <h3 className="fs-6 m-0">Good</h3>
                                          <p className="m-0">
                                            <small>
                                              <small>3500 - 6000</small>
                                            </small>
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        className={`${
                                          timespyData.timeSpyOverallScore >
                                            6000 &&
                                          timespyData.timeSpyOverallScore < 7500
                                            ? "active"
                                            : ""
                                        } border border-secondary rounded`}
                                      >
                                        <div
                                          className={`${
                                            darkMode ? `bg-dark` : `bg-light`
                                          } w-100 h-100 rounded pb-1 d-flex align-items-center justify-content-center flex-column`}
                                        >
                                          <h3 className="fs-6 m-0">High</h3>
                                          <p className="m-0">
                                            <small>
                                              <small>6000 - 7500</small>
                                            </small>
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        className={`${
                                          timespyData.timeSpyOverallScore > 7500
                                            ? "active"
                                            : ""
                                        } border border-secondary rounded`}
                                      >
                                        <div
                                          className={`${
                                            darkMode ? `bg-dark` : `bg-light`
                                          } w-100 h-100 rounded d-flex align-items-center justify-content-center flex-column`}
                                        >
                                          <h3 className="fs-6 m-0">Elite</h3>
                                          <p className="m-0">
                                            <small>
                                              <small>7500+</small>
                                            </small>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Stack>
                              </section>
                            </div>

                            <section>
                              <small className="d-sm-grid cols-2 gap-2">
                                <div>
                                  <h3 className="fs-6">
                                    What does the 3D mark score mean?
                                  </h3>
                                  <p>
                                    3DMark is a popular tool for benchmarking
                                    the performance of gaming PCs. The 3DMark
                                    score tells you how good a PC is for gaming
                                    based on it&apos;s graphics card and
                                    processor. The higher score. The better
                                    performance.
                                  </p>
                                </div>
                                <div>
                                  <h3 className="fs-6">
                                    Entry Level - (Step into the Game)
                                  </h3>
                                  <p>
                                    The system provides a good experience with
                                    the majority of games by 1080p resolution
                                    and acceptable graphics settings.
                                  </p>
                                </div>
                                <div>
                                  <h3 className="fs-6">
                                    Good Level - (Next level of Gaming)
                                  </h3>
                                  <p>
                                    You can comfortably play all current games
                                    at 1080p resolution and high graphics
                                    settings. All PCs at this level and above
                                    are VR-Ready.
                                  </p>
                                </div>
                                <div className="lh-1">
                                  <h3 className="fs-6">
                                    Benchmark scores for gaming{" "}
                                  </h3>
                                  <p className="d-flex fle-wrap m-0 gap-2">
                                    <span className="bg-danger text-light p-1 px-2 rounded">
                                      30+ FPS - OK
                                    </span>
                                    <span className="bg-warning p-1 px-2 rounded text-dark">
                                      60+ FPS - Ideal
                                    </span>
                                    <span className="bg-success text-light p-1 px-2 rounded">
                                      120+ FPS - Perfect
                                    </span>
                                  </p>
                                </div>
                              </small>
                            </section>

                            <section className="text-end">
                              <div
                                className={`
                                ${
                                  darkMode
                                    ? `p-2 bg-light bg-opacity-25 rounded`
                                    : ``
                                }
                                d-inline-block
                              `}
                              >
                                <Image
                                  src="https://www.evetech.co.za/repository/ProductImages/3DMARK.png"
                                  alt="3DMARK"
                                  className="me-1"
                                />
                                <Image
                                  src="https://www.evetech.co.za/repository/ProductImages/UL.png"
                                  alt="UL"
                                />
                              </div>
                            </section>
                          </Stack>
                        </Modal.Body>
                      </Modal>
                    )}
                  {/* Time Spy Score Modal */}
                </div>
                <div className={`pt-2`}>
                  <Stack
                    direction="horizontal"
                    className={`${styles.Quality} text-center bg-secondary rounded-bottom overflow-hidden`}
                  >
                    <div
                      className={`w-100 bg-success ${
                        timespyData.timeSpyOverallScore > 2000 &&
                        timespyData.timeSpyOverallScore < 3500
                          ? "rounded-end overflow-hidden text-light fw-2 bg-danger border border-light border-opacity-50 fst-italic"
                          : ""
                      }`}
                    >
                      Entry
                    </div>
                    <div
                      className={`${
                        timespyData.timeSpyOverallScore > 3500 &&
                        timespyData.timeSpyOverallScore < 6000
                          ? "rounded-end overflow-hidden text-light fw-2 bg-danger border border-light border-opacity-50 fst-italic"
                          : ""
                      } ${
                        timespyData.timeSpyOverallScore > 3500
                          ? "bg-success"
                          : ""
                      } w-100`}
                    >
                      Good
                    </div>
                    <div
                      className={`w-100 ${
                        timespyData.timeSpyOverallScore > 6000 &&
                        timespyData.timeSpyOverallScore < 7500
                          ? "rounded-end overflow-hidden text-light fw-2 bg-danger border border-light border-opacity-50 fst-italic"
                          : ""
                      } ${
                        timespyData.timeSpyOverallScore > 6000
                          ? "bg-success"
                          : ""
                      }`}
                    >
                      High
                    </div>
                    <div
                      className={`${
                        timespyData.timeSpyOverallScore > 7500
                          ? "text-light fw-2 bg-danger border border-light border-opacity-50 fst-italic"
                          : ""
                      }  w-100`}
                    >
                      Elite
                    </div>
                  </Stack>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.GameOptions} position-relative pb-5 mb-5 mb-lg-3`}
          >
            <div className={`w-100 position-absolute px-4`}>
              <Slider {...settings} className={`w-100`}>
                {gameFPS !== undefined &&
                  gameFPS.length > 0 &&
                  gameFPS.map((game: any) => {
                    return (
                      <Image
                        key={nanoid(5)}
                        src={game.gameImg}
                        alt={game.gameTitle}
                        className={`rounded`}
                        onClick={() => {
                          setGame(game);
                        }}
                      />
                    );
                  })}
              </Slider>
            </div>
          </div>

          <div
            className={`
              ${darkMode ? `rounded bg-opacity-25` : ``}
              bg-light d-flex justify-content-center align-items-center gap-1 flex-wrap p-2 mt-lg-5
            `}
          >
            <small>Powered by</small>
            <Image
              src={`https://www.evetech.co.za/repository/ProductImages/3DMARK.png`}
              alt="Powered By 3D Mark"
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FPSModal;
