"use client";
import React from "react";
import { useState } from "react";
import { customAlphabet } from "nanoid";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from "@/styles/FPS/FPSTab.module.scss";
import CircularProgress from "@/components/FPSComps/CirularProgress";
import Stack from "react-bootstrap/Stack";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "react-bootstrap";
import { useTheme } from "@/store/ThemeContext";
import Heading from "../Heading";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");

const FPSTab = (props: any) => {
  let FPSInfo = props.FPSData;
  let GameData = props.GameData;
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

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  let FPSData: any = {};

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 420,
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

    gameFPS.map((fpsgame: any, ind: any) => {
      if (fpsgame.titles === game.titles) fpsgame.isSeleceted = 1;
      else fpsgame.isSeleceted = 0;
    });
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

    gameFPSData.map((fps: any, ind: any) => {
      if (ind === 0) fps.isSeleceted = 1;
      else fps.isSeleceted = 0;
    });

    setGameFPS(gameFPSData);
    let selected = _.find(gameFPSData, (fps: any, ind: any) => {
      return ind === 0;
    });
    if (selected !== null && selected !== undefined) setGame(selected);

    setIsSet(true);
  }

  return (
    <>
      <div className={`pt-5`}>
        <div className="mt-3 mt-lg-0"></div>

        <div
          className={`${styles.Info} p-3 pt-4 position-relative rounded overflow-hidden mt-md-5`}
        >
          <div className={`d-grid rounded overflow-hidden bg-dark cols-xxl-2`}>
            <section
              className={`${styles.GameInfo} d-flex align-items-center position-relative`}
            >
              <Image
                src={gameImg}
                className={`${styles.Background} position-absolute opacity-25 w-100 h-100`}
                alt={gameTitle}
              />
              <div
                className={`${styles.DisplayImage} d-flex align-items-center justify-content-center spany-1 spany-sm-2 position-relative w-100 h-100 p-2 p-md-3`}
              >
                <Image
                  src={gameImg}
                  className={`${styles.BigImage} position-relative img-fluid`}
                  alt={gameTitle}
                />
              </div>
              <div
                className={`${styles.GameInfo__Right} py-2 pt-3 d-flex flex-column justify-content-center align-items-center gap-3 h-100 w-100 position-relative`}
              >
                <div
                  className={`${styles.Circles} position-relative d-flex justify-content-center flex-wrap`}
                >
                  <div className={`${styles.O} position-relative`}>
                    <div
                      className={`position-absolute w-100 h-100 bg-dark rounded-circle`}
                    ></div>
                    {isHD && (
                      <div className="progress p-2 m-0 position-relative w-100 h-100 rounded-circle bg-dark">
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
                        <span className={`${styles.Circles__FPS} text-light`}>
                          FPS
                        </span>
                      </div>
                    )}
                    {isFHD && (
                      <div className="progress p-2 m-0 position-relative w-100 h-100 rounded-circle bg-dark">
                        <span
                          className={`${styles.Circles__Pill} text-white bg-black px-1 py-0 rounded-pill`}
                        >
                          1080p
                        </span>
                        <CircularProgress
                          Percentage={fhdPer}
                          Text={fhdFPS}
                          Duration={1}
                        />
                        <span className={`${styles.Circles__FPS} text-light`}>
                          FPS
                        </span>
                      </div>
                    )}
                    {isFourK && (
                      <div className="progress p-2 m-0 position-relative w-100 h-100 rounded-circle bg-dark">
                        <span
                          className={`${styles.Circles__Pill} text-white bg-black px-1 py-0 rounded-pill`}
                        >
                          1080p
                        </span>
                        <CircularProgress
                          Percentage={fourkPer}
                          Text={fourkFPS}
                          Duration={1}
                        />
                        <span className={`${styles.Circles__FPS} text-light`}>
                          FPS
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <h2
                  className={`${styles.GameInfo__Title} p-2 bg-dark w-100 text-light text-center mb-0 position-relative`}
                >
                  {gameTitle}
                </h2>
              </div>
            </section>
            <section className={`${styles.TimeSpy}`}>
              <div
                className={`
                  ${darkMode ? `bg-secondary bg-gradient` : `bg-light`} 
                  p-2 d-flex justify-content-center align-items-center gap-1
                `}
              >
                <Image
                  src={`https://www.evetech.co.za/repository/ProductImages/3DMARK.png`}
                  alt="3D Mark"
                />
                <Heading level={2} className={`fs-5 mb-0`}>
                  Time Spy
                </Heading>
              </div>
              <div
                className={`
                  p-3
                  ${darkMode ? `bg-black bg-gradient text-white` : `bg-white`}
                `}
              >
                <div className={`d-grid gap-2 cols-md-2 align-items-center`}>
                  <section className={``}>
                    <div
                      className={`${styles.TimeSpy__Circles} position-relative d-flex gap-2 justify-content-center flex-wrap`}
                    >
                      <div className={`${styles.O} position-relative`}>
                        <div
                          className={`${styles.O__Lvl} position-absolute w-100 h-100 rounded-circle overflow-hidden d-grid gap-2 cols-2`}
                        >
                          <span
                            className={
                              (hdFPS < 60
                                ? `bg-danger`
                                : hdFPS < 120
                                ? `bg-warning`
                                : `bg-success`) + ` border border-dark`
                            }
                          ></span>
                          <span
                            className={
                              (hdFPS < 60
                                ? `bg-danger`
                                : hdFPS < 120
                                ? `bg-warning`
                                : `bg-success`) + ` border border-dark`
                            }
                          ></span>
                          <span
                            className={
                              (hdFPS < 60
                                ? `bg-danger`
                                : hdFPS < 120
                                ? `bg-warning`
                                : `bg-success`) + ` border border-dark`
                            }
                          ></span>
                          <span className={``}></span>
                        </div>
                        <div
                          className={`position-absolute w-100 h-100 bg-dark rounded-circle`}
                        ></div>
                        <div className="progress p-2 m-0 position-relative w-100 h-100 rounded-circle bg-dark">
                          <span
                            className={`${styles.Circles__Pill} text-white bg-black px-1 py-0 rounded-pill`}
                          >
                            1080p
                          </span>
                          <CircularProgress
                            Percentage={
                              timespyData.timeSpyOverallScore !== undefined &&
                              timespyData.timeSpyOverallScore < 7500
                                ? Math.ceil(
                                    (timespyData.timeSpyOverallScore * 100) /
                                      7500
                                  )
                                : 100
                            }
                            Text={timespyData.timeSpyOverallScore}
                            Duration={1}
                          />
                          <span className={`${styles.Circles__FPS} text-light`}>
                            Timespy
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className={`d-grid gap-2`}>
                    <div>
                      <h3 className={`fs-6`}>Quality Meter</h3>
                      <Stack
                        direction="horizontal"
                        className={`${styles.TimeSpy__Quality} d-grid`}
                        gap={1}
                      >
                        <div
                          className={
                            `rounded h-100 w-100 ` +
                            (timespyData.timeSpyOverallScore !== undefined &&
                            timespyData.timeSpyOverallScore >= 2000 &&
                            timespyData.timeSpyOverallScore <= 3500
                              ? `active`
                              : ``)
                          }
                        >
                          <small
                            className={` 
                              ${
                                darkMode
                                  ? `bg-black border-secondary border-opacity-75`
                                  : ``
                              }
                              border rounded p-1 d-flex flex-column bg-light h-100
                            `}
                          >
                            <span className={`fw-2`}>Entry</span>
                            <span>2000 - 3500</span>
                          </small>
                        </div>
                        <div
                          className={
                            `rounded h-100 w-100 ` +
                            (timespyData.timeSpyOverallScore !== undefined &&
                            timespyData.timeSpyOverallScore >= 3500 &&
                            timespyData.timeSpyOverallScore <= 6000
                              ? `active`
                              : ``)
                          }
                        >
                          <small
                            className={` 
                              ${
                                darkMode
                                  ? `bg-black border-secondary border-opacity-75`
                                  : ``
                              }
                              border rounded p-1 d-flex flex-column bg-light h-100
                            `}
                          >
                            <span className={`fw-2`}>Good</span>
                            <span>3500 - 6000</span>
                          </small>
                        </div>
                        <div
                          className={
                            `rounded h-100 w-100 ` +
                            (timespyData.timeSpyOverallScore !== undefined &&
                            timespyData.timeSpyOverallScore >= 6000 &&
                            timespyData.timeSpyOverallScore <= 7000
                              ? `active`
                              : ``)
                          }
                        >
                          <small
                            className={` 
                              ${
                                darkMode
                                  ? `bg-black border-secondary border-opacity-75`
                                  : ``
                              }
                              border rounded p-1 d-flex flex-column bg-light h-100
                            `}
                          >
                            <span className={`fw-2`}>High</span>
                            <span>6000 - 7500</span>
                          </small>
                        </div>
                        <div
                          className={
                            `rounded h-100 w-100 ` +
                            (timespyData.timeSpyOverallScore !== undefined &&
                            timespyData.timeSpyOverallScore >= 7500
                              ? `active`
                              : ``)
                          }
                        >
                          <small
                            className={` 
                              ${
                                darkMode
                                  ? `bg-black border-secondary border-opacity-75`
                                  : ``
                              }
                              m-0 border rounded p-1 d-flex flex-column bg-light h-100
                            `}
                          >
                            <span className={`fw-2`}>Elite</span>
                            <span>7500+</span>
                          </small>
                        </div>
                      </Stack>
                    </div>
                    <div>
                      <h3 className={`fs-6`}>Benchmark scores for gaming</h3>
                      <Stack
                        direction="horizontal"
                        className={`${styles.TimeSpy__Benchmarks}`}
                        gap={1}
                      >
                        <small
                          className={`m-0 border border-danger rounded p-1 d-flex flex-column`}
                        >
                          <span className={`bg-danger px-1 rounded text-light`}>
                            30+ FPS
                          </span>
                          <span>OK</span>
                        </small>
                        <small
                          className={`m-0 border border-warning rounded p-1 d-flex flex-column`}
                        >
                          <span className={`bg-warning px-1 rounded text-dark`}>
                            60+ FPS
                          </span>
                          <span>Average</span>
                        </small>
                        <small
                          className={`m-0 border border-success rounded p-1 d-flex flex-column`}
                        >
                          <span
                            className={`bg-success px-1 rounded text-light`}
                          >
                            120+ FPS
                          </span>
                          <span>Acceptable</span>
                        </small>
                      </Stack>
                    </div>
                  </section>
                  <section className={`span-md-full`}>
                    <div
                      className={`${styles.TimeSpy__Scores} d-flex flex-wrap gap-2 pt-3 justify-content-center lh-0 rounded`}
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
                  </section>
                  <section className={`lh-1`}>
                    <h3 className={`fs-6`}>Good - Next level of Gaming</h3>
                    <small className={`m-0`}>
                      You can comfortably play all current games at 1080p
                      resolution and high graphics settings. All PCs at this
                      level and above are VR-Ready.
                    </small>
                  </section>
                  <section className={`lh-1`}>
                    <h3 className={`fs-6`}>Entry - Step into the Game</h3>
                    <small className={`m-0`}>
                      The system provides a good experience with the majority of
                      games by 1080p resolution and acceptable graphics
                      settings.
                    </small>
                  </section>
                  <section className={`lh-1 span-md-full`}>
                    <h3 className={`fs-6`}>
                      What does the 3D mark score mean?
                    </h3>
                    <small className={`m-0`}>
                      3DMark is a popular tool for benchmarking the performance
                      of gaming PCs. The 3DMark score tells you how good a PC is
                      for gaming based on it&apos;s graphics card and processor.
                      The higher score. The better performance.
                    </small>
                  </section>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className={`${styles.Games__Area} position-absolute top-0 w-100`}>
          <div className={`${styles.Games} px-4`}>
            <Slider {...settings} className={`w-100`}>
              {gameFPS !== undefined &&
                gameFPS.length > 0 &&
                gameFPS.map((game: any, ind: any) => {
                  return (
                    <div
                      key={nanoid(5)}
                      className={
                        `${styles.Games__Item} position-relative user-select-none rounded shadow ` +
                        (game.isSeleceted === 1 ? `Selected` : ``)
                      }
                      onClick={() => {
                        setGame(game);
                      }}
                    >
                      <div
                        className={`${styles.Games__Mask} position-relative overflow-hidden rounded-top`}
                      >
                        <Image
                          src={game.gameImg}
                          alt={game.titles}
                          className={`${styles.Games__Option} w-100 rounded position-absolute top-0 start-0`}
                        />
                        <div
                          className={`position-absolute w-100 border-dark top-0 end-0`}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default FPSTab;
