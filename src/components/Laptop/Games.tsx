"use client";
import { useTheme } from "@/store/ThemeContext";
import { customAlphabet } from "nanoid";
import React from "react";
import { useState } from "react";
import { Image } from "react-bootstrap";
import MobiNext from "../Specials/SpecialPC/MobiNext";
import MobiPrev from "../Specials/SpecialPC/MobiPrev";
import Slider from "react-slick";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");

const Games = ({ gameTitles, setGame }: any) => {
  const [isDragging, setIsDragging] = useState(false);

  const checkTitleLength = (title, number) => {
    return title.length !== undefined && title.length.length < number;
  };
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: checkTitleLength(gameTitles, 4)
      ? gameTitles.length.length
      : 4,
    slidesToScroll: checkTitleLength(gameTitles, 4)
      ? gameTitles.length.length
      : 4,
    beforeChange: () => {
      setIsDragging(true);
    },
    afterChange: () => {
      setIsDragging(false);
    },
    initialSlide: 0,
    nextArrow: <MobiNext />,
    prevArrow: <MobiPrev />,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: checkTitleLength(gameTitles, 3)
            ? gameTitles.length.length
            : 3,
          slidesToScroll: checkTitleLength(gameTitles, 3)
            ? gameTitles.length.length
            : 3,
        },
      },
    ],
  };

  return (
    <>
      <section
        className={`
        ${darkMode ? `bg-dark` : `bg-light`}
        position-relative h-100 w-100
      `}
      >
        <Slider
          {...settings}
          className={`
        ${isDragging ? `cursor-grabbing` : `cursor-pointer`} 
        position-absolute w-100 h-100 d-grid align-items-center pb-1
    `}
        >
          {gameTitles.map((game) => {
            return (
              <Image
                key={nanoid(6)}
                src={game.gameImg}
                alt={game.gameTitle}
                onClick={() => {
                  !isDragging && setGame(game);
                }}
              />
            );
          })}
        </Slider>
      </section>
    </>
  );
};

export default Games;
