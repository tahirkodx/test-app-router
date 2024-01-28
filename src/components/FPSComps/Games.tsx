"use client";
import { customAlphabet } from "nanoid";
import React from "react";
import { useState } from "react";
import { Image } from "react-bootstrap";
const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");

const Games = (props: any) => {
  let GameData = props.GameData;
  const [gameData, setGameData] = useState([]);
  const [gameImg, setGameImg] = useState("");
  const [gameTitle, setGameTitle] = useState("");

  const setGame = (game: any) => {
    setGameImg(!_.isEmpty(game, true) ? game.gameImg : "");
    setGameTitle(!_.isEmpty(game, true) ? game.titles : "");
    props.onGameSelected({
      gameTitle: game.gameTitle,
      gameImage: game.gameImg,
    });
  };

  return (
    <>
      {GameData !== undefined &&
        GameData.length > 0 &&
        GameData.map((game: any) => {
          return (
            <Image
              key={nanoid(6)}
              src={game.gameImg}
              alt={game.gameTitle}
              className={`rounded cursor-pointer`}
              onClick={() => {
                setGame(game);
              }}
            />
          );
        })}
    </>
  );
};

export default Games;
