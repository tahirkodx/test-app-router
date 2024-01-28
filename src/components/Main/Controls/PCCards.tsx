"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaAngleLeft, FaAngleRight, FaTimes } from "react-icons/fa";
import { CircularProgress } from "@ui-layouts";
import { customAlphabet } from "nanoid";
import classes from "@/styles/PCCard.module.scss";
import LaptopHeighlights from "@/components/Laptop/Controls/LaptopHeighlights";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import styles from "@/styles/PCCards.module.scss";
import Image from "react-bootstrap/Image";
import { useTheme } from "@/store/ThemeContext";
import FancyPrice from "@/components/FancyPrice";

var _ = require("lodash");

function MobiNext(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={
        "slick-arrow text-center h-100 position-absolute bottom-0 end-0 d-flex align-items-center"
      }
      style={{
        ...style,
        background: "rgba(211, 211, 211,0.7)",
        top: "unset",
      }}
      onClick={onClick}
    >
      <FaAngleRight />
    </div>
  );
}

function MobiPrev(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={
        "slick-arrow text-center h-100 position-absolute top-0 start-0 d-flex align-items-center z-index-1"
      }
      style={{
        ...style,
        background: "rgba(211, 211, 211,0.7)",
        bottom: "unset",
      }}
      onClick={onClick}
    >
      <FaAngleLeft />
    </div>
  );
}

const PCCards = (props: any) => {
  let Product: any = props.product;
  const router = useRouter();
  let Performance: any = {};

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  try {
    if (
      Product != null &&
      !_.isEmpty(Product) &&
      Product.Performance !== undefined
    ) {
      Performance = JSON.parse(Product.Performance);
    }
  } catch (e) {}
  let gameData: any = props.gameDataFPS;
  let gameTitles: any = [];
  let gameFPSData: any = [];
  let FPSInfo = props.Performance;
  let FPSData: any = {};
  let FilteredGame = props.filterdGame;

  const [performCard, setPerformCard] = useState(false);
  const [timespyData, setTimespyData] = useState({});
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
  const [productTitle, setProductTitle] = useState("");
  const isSM = useMediaQuery("(min-width: 576px)");

  if (!_.isEmpty(Performance) && Performance.timeSpyScoreGPU !== undefined) {
    gameFPSData = Performance.gameTitles;
    gameTitles = _.filter(gameData, (games: any) => {
      return _.find(gameFPSData, (gameData: any) => {
        return (
          gameData.titles.trim() === games.gameTitle.trim() &&
          games.Status === 1
        );
      });
    });

    if (
      Performance.fullHdFps !== undefined &&
      Performance.fullHdFps !== "-2 Resolution not supported by evaluation"
    )
      setIsHD(true);
  }

  const getSelectedGame = (gameTitle: any) => {};

  const setGame = (game: any) => {
    setGameImg(!_.isEmpty(game, true) ? game.gameImg : "");
    setGameTitle(!_.isEmpty(game, true) ? game.gameTitle : "");
    getSelectedGame(game);
    let gamePerform = _.first(
      _.filter(gameFPSData, (gameData: any) => {
        return gameData.titles.trim() === game.gameTitle.trim();
      })
    );
    setHdPer((prevHdPer) => {
      if (!_.isEmpty(gamePerform, true))
        prevHdPer =
          parseFloat(gamePerform.fullHdFps) > 240
            ? 100
            : Math.round((parseFloat(gamePerform.fullHdFps) * 100) / 240);
      return prevHdPer;
    });

    setHdFPS(!_.isEmpty(gamePerform, true) ? gamePerform.fullHdFps : 0);

    setFhdPer((prevHdPer) => {
      if (!_.isEmpty(gamePerform, true))
        prevHdPer =
          parseFloat(gamePerform.quadHdFps) > 240
            ? 100
            : Math.round((parseFloat(gamePerform.quadHdFps) * 100) / 240);
      return prevHdPer;
    });

    setFhdFPS(!_.isEmpty(gamePerform, true) ? gamePerform.quadHdFps : 0);

    setFourkPer((prevFourk) => {
      if (!_.isEmpty(gamePerform, true))
        prevFourk =
          parseFloat(gamePerform.ultra4k) > 240
            ? 100
            : Math.round((parseFloat(gamePerform.ultra4k) * 100) / 240);
      return prevFourk;
    });

    setFourkFPS(!_.isEmpty(gamePerform, true) ? gamePerform.ultra4k : 0);
  };

  useEffect(() => {
    if (FilteredGame !== undefined && FilteredGame.trim().length > 0) {
      let game = _.first(
        _.filter(gameTitles, (title: any) => {
          if (title.gameTitle === FilteredGame) return title;
        })
      );
      if (game !== undefined) setGame(game);
    } else {
      if (_.first(gameTitles) !== undefined) setGame(_.first(gameTitles));
    }
  }, []);

  if (
    FPSInfo !== null &&
    FPSInfo !== undefined &&
    FPSInfo.Performance !== undefined &&
    gameData !== undefined &&
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
      let find = _.find(gameData, (game: any) => {
        return game.gameTitle === fps.titles;
      });

      if (find !== undefined && find !== null) return fps;
    });

    gameFPSData.map((game: any) => {
      let gameObj = _.find(gameData, (gameData: any) => {
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

  const quickView = (title: any) => {
    setShow(true);
    setProductTitle(title);
  };

  function currencyFormat(num: any) {
    return "R" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

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

  const nanoid = customAlphabet("1234567890abcdef", 10);
  const moreInfoClick = (product: any) => {
    router.push(
      `/${_.replace(
        _.toLower(product.title),
        new RegExp(" ", "g"),
        "-"
      ).trim()}/best-pc-deal/${product.ProductID}.aspx`
    );
  };

  return (
    <>
      <div className={`${classes.product_card} ${classes.PCCards}`}>
        <Card
          key={nanoid(10)}
          className={`
            ${
              darkMode
                ? `bg-black text-light border-secondary border-opacity-75`
                : ``
            } 
            p-0 shadow overflow-hidden h-100
          `}
        >
          {/* Card Image */}
          <Link
            href={`/${_.replace(
              _.toLower(Product.title),
              new RegExp(" ", "g"),
              "-"
            ).trim()}/best-pc-deal/${Product.ProductID}.aspx`}
            title={Product.TitleText}
            className={`${classes.CardImage} d-flex-row cursor-pointer align-items-center justify-content-center text-center p-3 shadow`}
          >
            <div className="bg-light h-100 p-2 rounded">
              <Card.Img
                variant=""
                className={`p-1 ${classes.CardPic}`}
                src={"https://www.evetech.co.za/" + Product.productimage}
                alt={Product.TitleText}
                title={Product.TitleText}
              />
            </div>
          </Link>
          <Card.Body className="p-0">
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
            <Card.Footer className="text-center px-3 border-0">
              <div
                className={`w-100 mt-1 mb-1 d-flex gap-1 justify-content-center align-bottom`}
              >
                {/* Price Area */}
                <div className={classes.price_tag + " lh-1"}>
                  <div>
                    <FancyPrice price={Product.price_vat} />
                  </div>
                  {/* <small className={`text-dark`}>Inc. VAT</small> */}
                </div>
              </div>
            </Card.Footer>

            {/* Product Highlights */}
            <div className={`${classes.CardHighlight} pb-3 px-3`}>
              {Product.high && <LaptopHeighlights high={Product.high} />}
            </div>

            <div className="px-2 px-sm-3 pb-2 pb-sm-3 text-center">
              <div className={`${styles.Products__Buttons} d-flex gap-1`}>
                {/* Product Page Link */}
                <Link
                  href={`/${_.replace(
                    _.toLower(Product.title),
                    new RegExp(" ", "g"),
                    "-"
                  ).trim()}/best-pc-deal/${Product.ProductID}.aspx`}
                  title={Product.TitleText}
                  className={`flex-grow-1 text-decoration-none text-dark rounded cursor-pointer`}
                >
                  <Button
                    className={`
                      ${darkMode ? `text-light` : `text-dark`}
                      bg-gradient rounded w-100 h-100 lh-1 d-flex align-items-center justify-content-center
                    `}
                    variant={darkMode ? `dark` : `light`}
                    size="sm"
                  >
                    <span className="d-flex align-items-center justify-content-center">
                      Customize / Buy
                    </span>
                  </Button>
                </Link>

                {!_.isEmpty(Performance) &&
                Performance.timeSpyScoreGPU !== undefined ? (
                  <div
                    className={`${styles.Products__FPSButton} text-decoration-none text-dark rounded`}
                  >
                    <Button
                      variant={darkMode ? `dark` : `light`}
                      size="sm"
                      className={`
                        ${darkMode ? `text-light` : `text-dark`}
                        bg-gradient rounded w-100 h-100 lh-1 d-flex align-items-center justify-content-center
                      `}
                      onClick={() => setPerformCard(true)}
                    >
                      <span className="d-flex align-items-center justify-content-center">
                        FPS
                      </span>
                    </Button>
                  </div>
                ) : null}
              </div>
            </div>

            {/* FPS GameBar */}
            {!_.isEmpty(Performance) &&
            Performance.timeSpyScoreGPU !== undefined ? (
              <section className="position-relative overflow-hidden rounded-bottom">
                <div className="position-absolute w-100 h-100">
                  <Image className="w-100 img-cover" alt="" src={gameImg} />
                </div>
                <div className="p-2 px-sm-3 bg-dark bg-opacity-25 position-relative">
                  <div className="d-grid gap-1 cols-3 text-center">
                    <div>
                      <div className="bg-dark bg-opacity-75 border-bottom border-secondary text-info rounded-top">
                        <small>
                          <small>1080P</small>
                        </small>
                      </div>
                      <div className="lh-1 text-light bg-dark bg-opacity-75 py-1 rounded-bottom">
                        <div
                          className="fw-2"
                          style={{ lineHeight: isNaN(hdFPS) ? "0.7rem" : "" }}
                        >
                          {isNaN(hdFPS) ? (
                            <small>
                              <small>
                                <small>Not Playable</small>
                              </small>
                            </small>
                          ) : (
                            hdFPS
                          )}
                        </div>
                        <div>
                          <small>
                            <small>FPS</small>
                          </small>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="bg-dark bg-opacity-75 border-bottom border-secondary text-info rounded-top">
                        <small>
                          <small>1440P</small>
                        </small>
                      </div>
                      <div className="lh-1 text-light bg-dark bg-opacity-75 py-1 rounded-bottom">
                        <div
                          className="fw-2"
                          style={{ lineHeight: isNaN(fhdFPS) ? "0.7rem" : "" }}
                        >
                          {" "}
                          {isNaN(fhdFPS) ? (
                            <small>
                              <small>
                                <small>Not Playable</small>
                              </small>
                            </small>
                          ) : (
                            fhdFPS
                          )}
                        </div>
                        <div>
                          <small>
                            <small>FPS</small>
                          </small>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="bg-dark bg-opacity-75 border-bottom border-secondary text-info rounded-top">
                        <small>
                          <small>4K</small>
                        </small>
                      </div>
                      <div className="lh-1 text-light bg-dark bg-opacity-75 py-1 rounded-bottom">
                        <div
                          className="fw-2"
                          style={{
                            lineHeight: isNaN(fourkFPS) ? "0.7rem" : "",
                          }}
                        >
                          {isNaN(fourkFPS) ? (
                            <small>
                              <small>
                                <small>Not Playable</small>
                              </small>
                            </small>
                          ) : (
                            fourkFPS
                          )}
                        </div>
                        <div>
                          <small>
                            <small>FPS</small>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : null}

            {/* Stock Status */}
            {/* <div className={`${classes.StockStatus} w-100 px-3`}>
              <div
                className={" bg-success mb-0 w-100 rounded p-1 text-light mb-2"}
              >
                <span className={`fw-1`}>In Stock With Evetech!</span>
              </div>
            </div> */}
          </Card.Body>

          {/* FPS Overlay Card */}
          {Product.Performance !== null &&
          Product.Performance !== undefined &&
          performCard === true ? (
            <div
              className={`
                ${styles.FPSPerform}
                ${darkMode ? `bg-black` : `bg-light`}
                position-absolute w-100 h-100 d-grid gap-2
              `}
            >
              <Image src={gameImg} className="img-cover h-100 w-100" alt="" />
              <div className="">
                <div
                  className={`${styles.Content} d-grid gap-1 h-100 align-items-center`}
                >
                  <h3 className="fs-6 text-center m-0 lh-1">
                    <small>
                      <span>Performance for </span>
                      <span className="text-danger">{gameTitle}</span>
                    </small>
                  </h3>
                  {/* Circles */}
                  <section
                    className={`${styles.Circles} position-relative d-flex flex-wrap justify-content-center px-2`}
                  >
                    {/* {isHD ? "HD" : "No HD"} */}
                    <div className="progress p-1 m-0">
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

                    <div className="progress p-1 m-0">
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
                    <div className="progress p-1 m-0">
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
                      ${darkMode ? `text-light` : ``}
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
                              quickView(Product.ProName);
                            }}
                          >
                            Learn More
                          </span>
                        </small>
                      </small>
                    </div>

                    <div className="px-2 w-100">
                      <div className="w-100 rounded-pill d-grid cols-4 bg-grey bg-gradient text-center overflow-hidden mt-1">
                        <small
                          className={`${
                            Performance.timeSpyOverallScore !== undefined &&
                            Performance.timeSpyOverallScore >= 2000
                              ? "bg-warning"
                              : "bg-secondary text-white"
                          } bg-gradient py-1`}
                        >
                          <small>Entry</small>
                        </small>
                        <small
                          className={`${
                            Performance.timeSpyOverallScore !== undefined &&
                            Performance.timeSpyOverallScore >= 3500
                              ? "bg-warning"
                              : "bg-secondary text-white"
                          } bg-gradient py-1`}
                        >
                          <small>Good</small>
                        </small>
                        <small
                          className={`${
                            Performance.timeSpyOverallScore !== undefined &&
                            Performance.timeSpyOverallScore >= 6000
                              ? "bg-warning"
                              : "bg-secondary text-white"
                          } bg-gradient py-1`}
                        >
                          <small>High</small>
                        </small>
                        <small
                          className={`${
                            Performance.timeSpyOverallScore !== undefined &&
                            Performance.timeSpyOverallScore >= 7500
                              ? "bg-warning"
                              : "bg-secondary text-white"
                          } bg-gradient py-1`}
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
                          <Image
                            key={nanoid(6)}
                            src={game.gameImg}
                            alt={game.gameTitle}
                            onClick={() => {
                              setGame(game);
                            }}
                          />
                        );
                      })}
                    </Slider>
                  </section>
                </div>
              </div>
              <div className="px-2 px-sm-3 py-1 border d-flex align-items-center justify-content-center bg-secondary bg-opacity-25 lh-1">
                <small>
                  <small>
                    <small>Powered By </small>
                  </small>
                </small>
                <Image
                  src="https://www.evetech.co.za/repository/ProductImages/3DMARK.png"
                  alt="3D Mark"
                  style={{ maxWidth: "75px" }}
                />
              </div>
              <div
                className="position-absolute top-0 end-0 bg-light shadow p-2 bg-light rounded-bottom-start-2 overflow-hidden"
                onClick={() => setPerformCard(false)}
              >
                <FaTimes className="text-danger" />
              </div>
            </div>
          ) : null}
          {/* FPS Overlay Card */}
        </Card>
      </div>

      {/* Time Spy Score Modal */}
      {!_.isEmpty(Performance) &&
        Performance.timeSpyOverallScore !== undefined && (
          <Modal
            size="lg"
            show={show}
            onHide={() => {
              setShow(false);
            }}
            aria-labelledby="Timespy-Modal"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                3DMark Time Spy
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Stack gap={3}>
                <div className="d-grid cols-sm-2 gap-2 align-items-center">
                  <section>
                    <div
                      className={`${styles.TimeSpyCircles} position-relative d-flex gap-2 justify-content-center flex-wrap`}
                    >
                      <div className={`${styles.O} position-relative`}>
                        <div
                          className={`${styles.O__Lvl} position-absolute w-100 h-100 rounded-circle overflow-hidden d-grid gap-2 cols-2 bg-light`}
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
                          <CircularProgress
                            Percentage={
                              !_.isEmpty(Performance) &&
                              Performance.timeSpyOverallScore !== undefined &&
                              Performance.timeSpyOverallScore < 7500
                                ? Math.ceil(
                                    (Performance.timeSpyOverallScore * 100) /
                                      7500
                                  )
                                : 100
                            }
                            Text={Performance.timeSpyOverallScore}
                            Duration={1}
                          />
                          <span
                            className={`${styles.TimeSpyCircles__FPS} text-light`}
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
                          {productTitle}
                        </small>
                      </p>

                      <div>
                        <h3 className="fs-6">Quality Meter</h3>
                        <div
                          className={`${styles.QualityMeter} w-100 d-grid cols-4 cols-sm-2 gap-2 text-center lh-1`}
                        >
                          <div
                            className={`${
                              Performance.timeSpyOverallScore > 2000 &&
                              Performance.timeSpyOverallScore < 3500
                                ? "active"
                                : ""
                            } border border-secondary rounded`}
                          >
                            <div className="bg-light w-100 h-100 rounded pb-1 d-flex align-items-center justify-content-center flex-column">
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
                              Performance.timeSpyOverallScore > 3500 &&
                              Performance.timeSpyOverallScore < 6000
                                ? "active"
                                : ""
                            } border border-secondary rounded`}
                          >
                            <div className="bg-light w-100 h-100 rounded pb-1 d-flex align-items-center justify-content-center flex-column">
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
                              Performance.timeSpyOverallScore > 6000 &&
                              Performance.timeSpyOverallScore < 7500
                                ? "active"
                                : ""
                            } border border-secondary rounded`}
                          >
                            <div className="bg-light w-100 h-100 rounded pb-1 d-flex align-items-center justify-content-center flex-column">
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
                              Performance.timeSpyOverallScore > 7500
                                ? "active"
                                : ""
                            } border border-secondary rounded`}
                          >
                            <div className="bg-light w-100 h-100 rounded d-flex align-items-center justify-content-center flex-column">
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
                        performance of gaming PCs. The 3DMark score tells you
                        how good a PC is for gaming based on it&apos;s graphics
                        card and processor. The higher score. The better
                        performance.
                      </p>
                    </div>
                    <div>
                      <h3 className="fs-6">
                        Entry Level - (Step into the Game)
                      </h3>
                      <p>
                        The system provides a good experience with the majority
                        of games by 1080p resolution and acceptable graphics
                        settings.
                      </p>
                    </div>
                    <div>
                      <h3 className="fs-6">
                        Good Level - (Next level of Gaming)
                      </h3>
                      <p>
                        You can comfortably play all current games at 1080p
                        resolution and high graphics settings. All PCs at this
                        level and above are VR-Ready.
                      </p>
                    </div>
                    <div className="lh-1">
                      <h3 className="fs-6">Benchmark scores for gaming </h3>
                      <p className="d-flex fle-wrap m-0 gap-2">
                        <span className="bg-danger text-light p-1 px-2 rounded">
                          30+ FPS - OK
                        </span>
                        <span className="bg-warning p-1 px-2 rounded">
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
                      ${darkMode ? `p-2 bg-light bg-opacity-25 rounded` : ``}
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
    </>
  );
};

export default PCCards;
