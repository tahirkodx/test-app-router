"use client";
import React, { useEffect, useState } from "react";
import TimeSpyModal from "@/components/Modals/TimeSpyModal";
import FpsPerformCard from "./FpsPerformCard";

var _ = require("lodash");

const FPS = ({
  Product,
  filteredGame,
  gameDataFPS,
  button,
  performCardTheme,
  showHD,
  showFHD,
  showFourK,
}: any) => {
  let Performance: any = {};

  try {
    if (
      Product !== null &&
      !_.isEmpty(Product) &&
      Product.Performance !== undefined
    ) {
      Performance = JSON.parse(Product.Performance);
    }
  } catch (e) {}

  let gameData = gameDataFPS;
  let gameTitles: any = [];
  let gameFPSData: any = [];
  let FPSInfo: any = Performance;
  let FPSData: any = {};
  let FilteredGame = filteredGame;

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
  const [show, setShow] = useState<any>(false);
  const [productTitle, setProductTitle] = useState("");

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

  return (
    <>
      {/* FPS Button */}
      {!_.isEmpty(Performance) &&
      Performance.timeSpyScoreGPU !== undefined &&
      performCardTheme === "default" ? (
        <div onClick={() => setPerformCard(true)}>{button}</div>
      ) : null}

      {performCard && performCardTheme === "default" ? (
        <FpsPerformCard
          gameImg={gameImg}
          gameTitle={gameTitle}
          hdPer={hdPer}
          hdFPS={hdFPS}
          fhdPer={fhdPer}
          fhdFPS={fhdFPS}
          fourkPer={fourkPer}
          fourkFPS={fourkFPS}
          quickView={quickView}
          Product={Product}
          gameTitles={gameTitles}
          setGame={setGame}
          setPerformCard={setPerformCard}
          Performance={Performance}
          showHD={showHD}
          showFHD={showFHD}
          showFourK={showFourK}
        />
      ) : null}

      {/* Time Spy Score Modal */}

      {!_.isEmpty(Performance) &&
        Performance.timeSpyOverallScore !== undefined && (
          <TimeSpyModal
            show={show}
            setShow={setShow}
            hdFPS={hdFPS}
            productTitle={productTitle}
            Performance={Performance}
          />
        )}

      {/* Time Spy Score Modal */}
    </>
  );
};

export default FPS;
