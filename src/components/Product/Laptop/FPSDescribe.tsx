import React from "react";
import { useState } from "react";
import { customAlphabet } from "nanoid";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleUp,
  FaAngleDown,
} from "react-icons/fa";
import CircularProgress from "@/components/FPSComps/CirularProgress";
import styles from "@/styles/FPS/FPSDescribe.module.scss";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Image } from "react-bootstrap";
import { useTheme } from "@/store/ThemeContext";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");

const FPSDescribe = (props: any) => {
  const isSM = useMediaQuery("(min-width: 576px)");

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

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

  let FPSData: any = {};

  const [fpsShow, setFpsShow] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
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
        breakpoint: 375,
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

  return (
    <div
      className={`
        ${
          darkMode
            ? `bg-black text-white border-info border-opacity-75`
            : `bg-light text-dark`
        }
        mt-3 rounded border overflow-hidden shadow
      `}
    >
      <div
        className={`
          ${styles.Heading} 
          ${darkMode ? `bg-secondary bg-opacity-75` : ``}
          p-2 d-flex flex-wrap gap-1 justify-content-center align-items-center
        `}
      >
        <Image
          src={`https://www.evetech.co.za/repository/ProductImages/3DMARK.png`}
          alt=""
        />
        <h2 className={`fs-4 m-0`}>FPS Game Performance</h2>
      </div>
      <div className={`${styles.Content} d-grid rows-2`}>
        <div
          className={`${styles.DisplayImage} d-flex align-items-center justify-content-center spany-1 spany-sm-2 position-relative bg-dark`}
        >
          <Image
            src={gameImg}
            className={`${styles.Background} position-absolute opacity-25 w-100 h-100`}
            alt=""
          />
          <Image
            src={gameImg}
            className={`${styles.BigImage} position-relative img-fluid`}
            alt=""
          />
        </div>
        <div
          className={`
            ${styles.Stats}
            ${darkMode ? `bg-dark bg-opacity-50` : ``} 
            p-2 d-flex align-items-center justify-content-center
          `}
        >
          <div
            className={`d-flex gap-2 flex-column align-items-center flex-sm-row`}
          >
            <div
              className={`
                ${styles.Circles} 
                ${darkMode ? styles.darkMode : ``}
                position-relative
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
            <div
              className={`${styles.Scores} d-flex flex-wrap gap-1 pt-2 justify-content-center lh-1 p-md-3 rounded`}
            >
              <p className={`d-flex gap-1 m-0`}>
                GPU
                <span className={`fw-2`}>
                  {timespyData.timeSpyScoreGPU !== undefined
                    ? timespyData.timeSpyScoreGPU
                    : ""}
                </span>
              </p>
              <p className={`d-flex gap-1 m-0`}>
                CPU
                <span className={`fw-2`}>
                  {timespyData.timeSpyScoreCPU !== undefined
                    ? timespyData.timeSpyScoreCPU
                    : ""}
                </span>
              </p>
              <p className={`d-flex gap-1 m-0`}>
                Overall
                <span className={`fw-2`}>
                  {timespyData.timeSpyOverallScore !== undefined
                    ? timespyData.timeSpyOverallScore
                    : ""}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${styles.Games} d-flex align-items-center justify-content-center p-2 px-4 span-2 span-sm-1`}
        >
          <div className={`position-relative d-grid align-items-center w-100`}>
            <div className={`w-100 position-absolute px-2`}>
              <Slider {...settings} className={`w-100`}>
                {gameFPS !== undefined &&
                  gameFPS.length > 0 &&
                  gameFPS.map((game: any) => {
                    return (
                      <Image
                        key={nanoid(5)}
                        src={game.gameImg}
                        alt={game.gameTitle}
                        className={`${styles.Games__Option} w-100 rounded`}
                        onClick={() => {
                          setGame(game);
                        }}
                      />
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FPSDescribe;
