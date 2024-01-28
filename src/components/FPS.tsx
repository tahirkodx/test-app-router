"use client";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import FpsOverlayCard from "@/components/FpsCard/FpsOverlayCard";
import TimeSpyModal from "@/components/TimeSpyModal";
import Gamebar from "./FpsCard/Gamebar";

const FPS = ({
  Product,
  filteredGame,
  gameDataFPS,
  button,
  productName,
  placeholderImg,
  gameBar,
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

  let gameData: any = gameDataFPS;
  let gameTitles: any = [];
  let gameFPSData: any = [];
  let FPSInfo: any = Performance;
  let FPSData: any = {};
  let FilteredGame: any = filteredGame;

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

  if (!_.isEmpty(Performance) && Performance.timeSpyScoreGPU !== undefined) {
    gameFPSData = Performance.gameTitles;
    gameTitles = _.filter(gameData, (games) => {
      return _.find(gameFPSData, (gameData) => {
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

  const getSelectedGame = (gameTitle) => {};

  const setGame = (game: any) => {
    setGameImg(!_.isEmpty(game) ? game.gameImg : "");
    setGameTitle(!_.isEmpty(game) ? game.gameTitle : "");
    getSelectedGame(game);
    let gamePerform = _.first(
      _.filter(gameFPSData, (gameData) => {
        return gameData.titles.trim() === game.gameTitle.trim();
      })
    );
    setHdPer((prevHdPer) => {
      if (!_.isEmpty(gamePerform))
        prevHdPer =
          parseFloat(gamePerform.fullHdFps) > 240
            ? 100
            : Math.round((parseFloat(gamePerform.fullHdFps) * 100) / 240);
      return prevHdPer;
    });
    setHdFPS(!_.isEmpty(gamePerform) ? gamePerform.fullHdFps : 0);

    setFhdPer((prevHdPer) => {
      if (!_.isEmpty(gamePerform))
        prevHdPer =
          parseFloat(gamePerform.quadHdFps) > 240
            ? 100
            : Math.round((parseFloat(gamePerform.quadHdFps) * 100) / 240);
      return prevHdPer;
    });
    setFhdFPS(!_.isEmpty(gamePerform) ? gamePerform.quadHdFps : 0);

    setFourkPer((prevFourk) => {
      if (!_.isEmpty(gamePerform))
        prevFourk =
          parseFloat(gamePerform.ultra4k) > 240
            ? 100
            : Math.round((parseFloat(gamePerform.ultra4k) * 100) / 240);
      return prevFourk;
    });

    setFourkFPS(!_.isEmpty(gamePerform) ? gamePerform.ultra4k : 0);
  };

  useEffect(() => {
    if (FilteredGame !== undefined && FilteredGame.trim().length > 0) {
      let game = _.first(
        _.filter(gameTitles, (title) => {
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

    let gameFPSData = _.filter(FPSData.gameTitles, (fps) => {
      let find = _.find(gameData, (game) => {
        return game.gameTitle === fps.titles;
      });

      if (find !== undefined && find !== null) return fps;
    });

    gameFPSData.map((game) => {
      let gameObj = _.find(gameData, (gameData) => {
        return gameData.gameTitle === game.titles;
      });

      if (gameObj !== null && gameObj.gameImg !== undefined)
        game.gameImg = gameObj.gameImg;
    });

    setGameFPS(gameFPSData);
    let selected = _.find(gameFPSData, (fps, ind) => {
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
      {!_.isEmpty(Performance) && Performance.timeSpyScoreGPU !== undefined ? (
        <div className="h-100" onClick={() => setPerformCard(true)}>
          {button}
        </div>
      ) : null}

      {!_.isEmpty(Performance) &&
        Performance.timeSpyOverallScore !== undefined &&
        gameBar && (
          <>
            <div className="position-absolute bottom-0 start-0 w-100">
              <Gamebar
                gameTitle={gameTitle}
                gameImg={gameImg}
                placeholderImg={placeholderImg}
                hdFPS={hdFPS}
                fhdFPS={fhdFPS}
                fourkFPS={fourkFPS}
              />
            </div>
          </>
        )}

      {performCard ? (
        <>
          <FpsOverlayCard
            productName={productName}
            Performance={Performance}
            gameImg={gameImg}
            gameTitle={gameTitle}
            placeholderImg={placeholderImg}
            hdPer={hdPer}
            hdFPS={hdFPS}
            fhdFPS={fhdFPS}
            fhdPer={fhdPer}
            fourkPer={fourkPer}
            fourkFPS={fourkFPS}
            setPerformCard={setPerformCard}
            gameTitles={gameTitles}
            quickView={quickView}
            setGame={setGame}
            setShow={setShow}
            setProductTitle={setProductTitle}
            setGameImg={setGameImg}
            setGameTitle={setGameTitle}
            gameFPSData={gameFPSData}
            setHdPer={setHdPer}
            setHdFPS={setHdFPS}
            setFhdPer={setFhdPer}
            setFhdFPS={setFhdFPS}
            setFourkPer={setFourkPer}
            setFourkFPS={setFourkFPS}
          />
          <TimeSpyModal
            show={show}
            setShow={setShow}
            hdFPS={hdFPS}
            productTitle={productName}
            Performance={Performance}
          />
        </>
      ) : null}
    </>
  );
};

export default FPS;
