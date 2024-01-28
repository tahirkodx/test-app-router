import _ from "lodash";
import React from "react";

export const quickView = (title: any, setShow: any, setProductTitle: any) => {
  setShow(true);
  setProductTitle(title);
};

export function currencyFormat(num: any) {
  return "R" + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export const getSelectedGame = (gameTitle: any) => {};

export const setGame = (
  game: any,
  setGameImg: any,
  setGameTitle: any,
  gameFPSData: any,
  setHdPer: any,
  setHdFPS: any,
  setFhdPer: any,
  setFhdFPS: any,
  setFourkPer: any,
  setFourkFPS: any
) => {
  setGameImg(!_.isEmpty(game) ? game.gameImg : "");
  setGameTitle(!_.isEmpty(game) ? game.gameTitle : "");
  getSelectedGame(game);
  let gamePerform = _.first(
    _.filter(gameFPSData, (gameData) => {
      return gameData.titles.trim() === game.gameTitle.trim();
    })
  );
  setHdPer((prevHdPer: any) => {
    if (!_.isEmpty(gamePerform))
      prevHdPer =
        parseFloat(gamePerform.fullHdFps) > 240
          ? 100
          : Math.round((parseFloat(gamePerform.fullHdFps) * 100) / 240);
    return prevHdPer;
  });

  setHdFPS(!_.isEmpty(gamePerform) ? gamePerform.fullHdFps : 0);

  setFhdPer((prevHdPer: any) => {
    if (!_.isEmpty(gamePerform))
      prevHdPer =
        parseFloat(gamePerform.quadHdFps) > 240
          ? 100
          : Math.round((parseFloat(gamePerform.quadHdFps) * 100) / 240);
    return prevHdPer;
  });

  setFhdFPS(!_.isEmpty(gamePerform) ? gamePerform.quadHdFps : 0);

  setFourkPer((prevFourk: any) => {
    if (!_.isEmpty(gamePerform))
      prevFourk =
        parseFloat(gamePerform.ultra4k) > 240
          ? 100
          : Math.round((parseFloat(gamePerform.ultra4k) * 100) / 240);
    return prevFourk;
  });

  setFourkFPS(!_.isEmpty(gamePerform) ? gamePerform.ultra4k : 0);
};

const FpsFunctions = () => {
  return <></>;
};

export default FpsFunctions;
