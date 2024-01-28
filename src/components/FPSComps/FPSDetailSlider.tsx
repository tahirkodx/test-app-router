"use client";
import React, { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import styles from "@/styles/FPS/FPSSlider.module.scss";
import SpyModalCss from "@/styles/FPS/TimeSpyModal.module.scss";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import {
  Col,
  Image,
  Modal,
  Offcanvas,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import CircularProgress from "@/components/FPSComps/CirularProgress";
import FpsGames from "@/components/FPSComps/FPSGames";
import useClickScroll from "@/custom/hooks/useClickScroll";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { useTheme } from "@/store/ThemeContext";
import { isBodyDark, isDarkHeaderFooter } from "../Auth/LoginModal";
import darkModalStyles from "@/styles/DarkModal.module.scss";
const nanoid = customAlphabet("12345ab67890cdef", 10);
var _ = require("lodash");

const FPSDetailSlider = (props: any) => {
  const [gameImg, setGameImg] = useState("");
  const [hdPer, setHdPer] = useState(0);
  const [hdFPS, setHdFPS] = useState(0);
  const [fhdPer, setFhdPer] = useState(0);
  const [fhdFPS, setFhdFPS] = useState(0);
  const [fourkPer, setFourkPer] = useState(0);
  const [fourkFPS, setFourkFPS] = useState(0);
  const [loader, setLoader] = useState(props.IsLoader);
  const [show, setShow] = useState(false);
  let fpsDetailData = props.FpsData;
  const [selectGame, setSelectGame] = useState("");
  const [fpsGamesShow, setFpsGamesShow] = useState(false);
  const [fpsGamesPcShow, setFpsGamesPcShow] = useState(false);

  const gamesToggle = () => {
    setFpsGamesPcShow((current) => !current);
  };

  const gamesHide = () => {
    setFpsGamesPcShow(false);
  };

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const DarkModeCircle = () => {
    return darkMode ? (
      <div
        className={`
          ${styles.darkModeFPSCircles} 
          position-absolute rounded-circle overflow-hidden
        `}
      >
        <div
          className={`${styles.RGBCircle} position-absolute w-100 h-100 top-0 start-0`}
        ></div>
        <div
          className={`${styles.BlackFadeCircle} position-absolute w-100 h-100 top-0 start-0`}
        ></div>
        <div
          className={`${styles.BlackFadeCircle2} position-absolute w-100 h-100 top-0 start-0`}
        ></div>
        <div
          className="position-absolute w-100 h-100 top-0 start-0 bg-black"
          style={{ opacity: `0.6` }}
        ></div>
      </div>
    ) : null;
  };

  /* Props state */
  let gameData = props.gameData;
  let gameFpsDetailData = props.gameFpsData;
  let gameDetailsTitles = props.gameTitles;

  const getGameData = (gameTitle: any) => {
    let gameFps = _.find(gameFpsDetailData, ["titles", gameTitle]);
    let gameInfo = _.find(gameData, ["gameTitle", gameTitle]);
    setGameImg(!_.isEmpty(gameInfo, true) ? gameInfo.gameImg : "");

    setHdPer((prevHdPer) => {
      if (!_.isEmpty(gameFps, true))
        prevHdPer =
          parseFloat(gameFps.fullHdFps) > 240
            ? 100
            : Math.round((parseFloat(gameFps.fullHdFps) * 100) / 240);
      return prevHdPer;
    });

    setHdFPS(!_.isEmpty(gameFps, true) ? gameFps.fullHdFps : 0);

    setFhdPer((prevHdPer) => {
      if (!_.isEmpty(gameFps, true))
        prevHdPer =
          parseFloat(gameFps.quadHdFps) > 240
            ? 100
            : Math.round((parseFloat(gameFps.quadHdFps) * 100) / 240);
      return prevHdPer;
    });

    setFhdFPS(!_.isEmpty(gameFps, true) ? gameFps.quadHdFps : 0);

    setFourkPer((prevFourk) => {
      if (!_.isEmpty(gameFps, true))
        prevFourk =
          parseFloat(gameFps.ultra4k) > 240
            ? 100
            : Math.round((parseFloat(gameFps.ultra4k) * 100) / 240);
      return prevFourk;
    });

    setFourkFPS(!_.isEmpty(gameFps, true) ? gameFps.ultra4k : 0);
  };

  const getSelectedData = (e: any) => {
    let selectTitle = e.target.value;
    props.updateSelectedGame(selectTitle);
    setSelectGame(selectTitle);
    getGameData(selectTitle);
  };

  useEffect(() => {
    if (gameDetailsTitles.length > 0) {
      let selectedGame = _.first(gameDetailsTitles);

      if (
        props.GameSelected !== undefined &&
        props.GameSelected.trim().length > 0
      )
        selectedGame = props.GameSelected;

      setSelectGame(selectedGame);
      getGameData(selectedGame);
      setLoader(false);
    }
  }, [props]);

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {props}
    </Tooltip>
  );

  const { clickScroll } = useClickScroll();

  const cpuLink = () => clickScroll("processorcpu", 110);
  const gpuLink = () => clickScroll("graphics-card", 110);
  const ramLink = () => clickScroll("memoryram", 110);

  const isXXL = useMediaQuery("(min-width: 1400px)");

  return (
    <>
      <svg className="position-absolute pe-none">
        <defs>
          <linearGradient
            id="rainbowGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" style={{ stopColor: "#f79533" }} />
            <stop
              offset="14.28571428571429%"
              style={{ stopColor: "#f37055" }}
            />
            <stop
              offset="28.57142857142857%"
              style={{ stopColor: "#ef4e7b" }}
            />
            <stop
              offset="42.85714285714287%"
              style={{ stopColor: "#a166ab" }}
            />
            <stop
              offset="57.14285714285716%"
              style={{ stopColor: "#5073b8" }}
            />
            <stop
              offset="71.42857142857145%"
              style={{ stopColor: "#1098ad" }}
            />
            <stop
              offset="85.71428571428574%"
              style={{ stopColor: "#07b39b" }}
            />
            <stop offset="100%" style={{ stopColor: "#6fba82" }} />
          </linearGradient>
        </defs>
      </svg>

      <div
        className={`${styles.FPSSlider} ${
          darkMode
            ? `bg-black`
            : `bg-light border rounded border-secondary border-opacity-50`
        } wrapper mt-xxl-2 position-sticky`}
      >
        <div
          className={`
            ${styles.Heading} 
            bg-secondary bg-gradient bg-opacity-75 rounded-top d-flex flex-wrap justify-content-center align-items-center gap-x-1 px-2 py-1 border-bottom border-secondary lh-1
          `}
        >
          <Image
            className={`${styles.Heading__image} img-fluid GAMEBAR__headerIMG opaque`}
            src="https://www.evetech.co.za/repository/ProductImages/3DMARK.png"
            alt="3DMARK"
          />
          <p
            className={`
              ${styles.Heading__text} 
              ${darkMode ? `text-light` : ``}
              m-0
            `}
          >
            Game Performance
          </p>
        </div>

        <div className={`px-2 pb-2`}>
          <div className="py-2">
            <div className={`shadow border border-dark rounded`}>
              <Form.Select
                id="gameTitle"
                onChange={(event) => getSelectedData(event)}
                value={selectGame}
                size="sm"
              >
                {gameDetailsTitles.length > 0 &&
                  gameDetailsTitles.map((game: any) => {
                    return (
                      <option key={nanoid(8)} value={game}>
                        {game}
                      </option>
                    );
                  })}
                ;
              </Form.Select>
            </div>
          </div>
          <div className="rounded">
            <Image
              className="w-100 rounded GAMEBAR__headerIMG opaque"
              src={gameImg}
              alt={`${selectGame}`}
            />
          </div>
          <div
            className={`${styles.Circles} ${
              darkMode ? styles.darkMode : ``
            } d-flex flex-wrap text-center justify-content-center py-2`}
          >
            <div className="progress p-1 m-0">
              <DarkModeCircle />
              <span
                className={`
                  ${styles.Circles__Pill} 
                  ${darkMode ? `` : `bg-black`} 
                  text-white px-1 py-0 rounded-pill
                `}
              >
                1080p
              </span>
              <CircularProgress Percentage={hdPer} Text={hdFPS} Duration={1} />
              <span className={`${styles.Circles__FPS} text-secondary`}>
                FPS
              </span>
            </div>
            <div className="progress p-1 m-0">
              <span
                className={`
                  ${styles.Circles__Pill} 
                  ${darkMode ? `` : `bg-black`} 
                  text-white px-1 py-0 rounded-pill
                `}
              >
                1440p
              </span>
              <DarkModeCircle />
              <CircularProgress
                Percentage={fhdPer}
                Text={fhdFPS}
                Duration={1}
              />
              <span className={`${styles.Circles__FPS} text-secondary`}>
                FPS
              </span>
            </div>
            <div className="progress p-1 m-0">
              <span
                className={`
                  ${styles.Circles__Pill} 
                  ${darkMode ? `` : `bg-black`} 
                  text-white px-1 py-0 rounded-pill
                `}
              >
                4k
              </span>
              <DarkModeCircle />
              <CircularProgress
                Percentage={fourkPer}
                Text={fourkFPS}
                Duration={1}
              />
              <span className={`${styles.Circles__FPS} text-secondary`}>
                FPS
              </span>
            </div>
          </div>

          <Stack
            gap={1}
            className={`text-center lh-1 mb-2 ${
              darkMode ? `text-light` : `text-dark`
            }`}
          >
            <small>Change options to improve score</small>
            <div>
              <ButtonGroup aria-label="FPSButtonGroup" className={`w-100`}>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip("" + props.FilterData.cpuName + "")}
                >
                  <Button
                    variant={`${`${
                      darkMode ? `outline-secondary` : `outline-dark`
                    } `}`}
                    className={`p-0`}
                    onClick={cpuLink}
                  >
                    <small>CPU</small>
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip("" + props.FilterData.gpuName + "")}
                >
                  <Button
                    variant={`${`${
                      darkMode ? `outline-secondary` : `outline-dark`
                    } `}`}
                    className={`p-0`}
                    onClick={gpuLink}
                  >
                    <small>GPU</small>
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip(
                    "" + props.FilterData.memfrequency + ""
                  )}
                >
                  <Button
                    variant={`${`${
                      darkMode ? `outline-secondary` : `outline-dark`
                    } `}`}
                    className={`p-0`}
                    onClick={ramLink}
                  >
                    <small>RAM</small>
                  </Button>
                </OverlayTrigger>
              </ButtonGroup>
            </div>
          </Stack>

          <Stack gap={2} className={`${darkMode ? `text-light` : `text-dark`}`}>
            <div className="d-flex flex-wrap justify-content-between">
              <div className="">
                <small>
                  <small>
                    <span>Timespy : </span>
                    <span className="fw-3">
                      {fpsDetailData.timeSpyOverallScore !== undefined
                        ? fpsDetailData.timeSpyOverallScore
                        : ""}
                    </span>
                  </small>
                </small>
              </div>
              <div className="">
                <span
                  className={`
                  ${darkMode ? `text-info` : `text-primary`} 
                  cursor-pointer
                `}
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  <small>
                    <small>Learn More</small>
                  </small>
                </span>

                {/* Time Spy Score Modal */}
                {!_.isEmpty(fpsDetailData) &&
                  fpsDetailData.timeSpyOverallScore !== undefined && (
                    <Modal
                      size="lg"
                      show={show}
                      onHide={() => {
                        setShow(false);
                      }}
                      aria-labelledby="Timespy-Modal"
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
                          3DMark Time Spy
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className={`${isBodyDark(darkMode)}`}>
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
                                        !_.isEmpty(fpsDetailData) &&
                                        fpsDetailData.timeSpyOverallScore !==
                                          undefined &&
                                        fpsDetailData.timeSpyOverallScore < 7500
                                          ? Math.ceil(
                                              (fpsDetailData.timeSpyOverallScore *
                                                100) /
                                                7500
                                            )
                                          : 100
                                      }
                                      Text={fpsDetailData.timeSpyOverallScore}
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
                                        fpsDetailData.timeSpyOverallScore >
                                          2000 &&
                                        fpsDetailData.timeSpyOverallScore < 3500
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
                                        fpsDetailData.timeSpyOverallScore >
                                          3500 &&
                                        fpsDetailData.timeSpyOverallScore < 6000
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
                                        fpsDetailData.timeSpyOverallScore >
                                          6000 &&
                                        fpsDetailData.timeSpyOverallScore < 7500
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
                                        fpsDetailData.timeSpyOverallScore > 7500
                                          ? "active"
                                          : ""
                                      } border border-secondary rounded`}
                                    >
                                      <div
                                        className={`
                                          ${darkMode ? `bg-dark` : `bg-light`}
                                          w-100 h-100 rounded d-flex align-items-center justify-content-center flex-column
                                      `}
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
                                  3DMark is a popular tool for benchmarking the
                                  performance of gaming PCs. The 3DMark score
                                  tells you how good a PC is for gaming based on
                                  it&apos;s graphics card and processor. The
                                  higher score. The better performance.
                                </p>
                              </div>
                              <div>
                                <h3 className="fs-6">
                                  Entry Level - (Step into the Game)
                                </h3>
                                <p>
                                  The system provides a good experience with the
                                  majority of games by 1080p resolution and
                                  acceptable graphics settings.
                                </p>
                              </div>
                              <div>
                                <h3 className="fs-6">
                                  Good Level - (Next level of Gaming)
                                </h3>
                                <p>
                                  You can comfortably play all current games at
                                  1080p resolution and high graphics settings.
                                  All PCs at this level and above are VR-Ready.
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
            </div>
            <div className="">
              <ProgressBar className={`p-0`}>
                <ProgressBar
                  variant={`${
                    fpsDetailData.timeSpyOverallScore > 2000 &&
                    fpsDetailData.timeSpyOverallScore < 3500
                      ? "warning"
                      : "secondary"
                  }`}
                  className="text-black fw-2"
                  now={25}
                  key={1}
                  label="Entry"
                />
                <ProgressBar
                  variant={`${
                    fpsDetailData.timeSpyOverallScore > 3500 &&
                    fpsDetailData.timeSpyOverallScore < 6000
                      ? "warning"
                      : "secondary"
                  }`}
                  className="text-black fw-2"
                  now={25}
                  key={2}
                  label="Good"
                />
                <ProgressBar
                  variant={`${
                    fpsDetailData.timeSpyOverallScore > 6000 &&
                    fpsDetailData.timeSpyOverallScore < 7500
                      ? "warning"
                      : "secondary"
                  }`}
                  className="text-black fw-2"
                  now={25}
                  key={3}
                  label="High"
                />
                <ProgressBar
                  variant={`${
                    fpsDetailData.timeSpyOverallScore > 7500
                      ? "warning"
                      : "secondary"
                  }`}
                  className="text-black fw-2"
                  now={25}
                  key={4}
                  label="Elite"
                />
              </ProgressBar>
            </div>
            <div className="text-center d-grid cols-3 lh-1 gap-1">
              {/* <span className="bg-dark text-white py-2 w-100 text-center rounded-3 span-full">
              Score Breakdown
            </span> */}
              <div className={``}>
                <div className="fw-3">GPU</div>
                <div
                  className={`${styles.TimeSpyScore} ${
                    darkMode ? `opacity-50` : ``
                  }`}
                >
                  {fpsDetailData.timeSpyScoreGPU !== undefined
                    ? fpsDetailData.timeSpyScoreGPU
                    : ""}
                </div>
              </div>
              <div className={``}>
                <div className="fw-3">CPU</div>
                <div
                  className={`${styles.TimeSpyScore} ${
                    darkMode ? `opacity-50` : ``
                  }`}
                >
                  {fpsDetailData.timeSpyScoreCPU !== undefined
                    ? fpsDetailData.timeSpyScoreCPU
                    : ""}
                </div>
              </div>
              <div className={``}>
                <div className="fw-3">Overall</div>
                <div
                  className={`${styles.TimeSpyScore} ${
                    darkMode ? `opacity-50` : ``
                  }`}
                >
                  {fpsDetailData.timeSpyOverallScore !== undefined
                    ? fpsDetailData.timeSpyOverallScore
                    : ""}
                </div>
              </div>
            </div>
            <div className="position-relative">
              <Button
                variant={darkMode ? `dark` : `light`}
                className={`${
                  darkMode ? `border-opacity-50` : ``
                } shadow border-danger fst-italic w-100`}
                onClick={!isXXL ? () => setFpsGamesShow(true) : gamesToggle}
              >
                <Image
                  src="https://www.evetech.co.za/repository/ProductImages/Speedometer%20resized.png"
                  alt="FPS Symbol"
                />
                <span className="fw-3"> FPS Games</span>
              </Button>
            </div>
          </Stack>
        </div>

        {loader && (
          <div
            className={`${styles.Loader} position-absolute w-100 h-100 left-0 bottom-0 d-flex align-items-center justify-content-center flex-column rounded`}
          >
            <Image
              src="https://www.evetech.co.za/repository/ProductImages/loading.gif"
              alt="loader"
              className={`${styles.Loader__image} rounded-circle img-fluid`}
            />
            <div className={`text-light mt-2 fs-5`}>...LOADING...</div>
          </div>
        )}
        {darkMode ? (
          <div
            className={`${styles.RainbowBorder} position-absolute w-100 h-100 top-0 start-0 pe-none`}
          ></div>
        ) : null}
      </div>
      {!isXXL ? (
        <FpsGames
          show={fpsGamesShow}
          onHide={() => setFpsGamesShow(false)}
          gameFpsDetailData={gameFpsDetailData}
          gameData={gameData}
        />
      ) : (
        <FpsGames
          gameFpsDetailData={gameFpsDetailData}
          gameData={gameData}
          fpsGamesPcShow={fpsGamesPcShow}
          gamesHide={gamesHide}
        />
      )}
    </>
  );
};

export default FPSDetailSlider;
