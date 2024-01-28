"use client";
import React from "react";
import styles from "@/styles/FPS/FpsPerformCard.module.scss";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import Rating from "./Rating";
import Games from "../Laptop/Games";
import Footer from "./Footer";
import RespCircles from "./RespCircles";
import CloseButton from "./CloseButton";
import Header from "./Header";
import Perform from "./Perform";
import { useState } from "react";
import Image from "react-bootstrap/Image";
import { useTheme } from "@/store/ThemeContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FpsPerformCard = ({
  gameImg,
  gameTitle,
  hdPer,
  hdFPS,
  fhdPer,
  fhdFPS,
  fourkPer,
  fourkFPS,
  quickView,
  Product,
  gameTitles,
  setGame,
  setPerformCard,
  Performance,
  showHD,
  showFHD,
  showFourK,
}: any) => {
  const isXL = useMediaQuery("(min-width: 1200px)");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const [closing, setClosing] = useState(false);

  return (
    <>
      <div
        className={`
            ${styles.FPSPerform} 
            ${!closing ? `` : styles.closing}
            ${darkMode ? `bg-dark` : `bg-light`}
            position-absolute top-0 start-0 w-100 h-100 d-grid gap-2 pe-auto
        `}
        style={{ gridAutoColumns: "100%" }}
      >
        <div className="position-absolute w-100 top-0 start-0 z-index-1">
          <Image src={gameImg} className="img-fluid w-100 opacity-75" alt="" />
          <div
            className="position-absolute w-100 h-100 top-0 start-0"
            style={{
              background: darkMode
                ? `linear-gradient(to top, rgb(33, 37, 41), rgba(33, 37, 41, 0))`
                : `linear-gradient(to top, rgb(248, 249, 250), rgba(248, 249, 250, 0))`,
            }}
          ></div>
        </div>
        <div className="w-100 h-100 top-0 start-0 position-relative z-index-2">
          <div
            className={`${styles.Content} d-grid gap-1 w-100 h-100 align-items-center`}
            style={{ gridAutoColumns: `100%` }}
          >
            <Header gameTitle={gameTitle} />
            {/* Circles */}
            <RespCircles
              styles={styles}
              hdPer={hdPer}
              hdFPS={hdFPS}
              fhdFPS={fhdFPS}
              fhdPer={fhdPer}
              fourkFPS={fourkFPS}
              fourkPer={fourkPer}
              showHD={showHD}
              showFHD={showFHD}
              showFourK={showFourK}
            />

            {/* Performance */}
            <section
              className={`
                ${darkMode ? `bg-dark` : `bg-light`}
                lh-1 text-center d-grid gap-1 w-100 py-1
              `}
            >
              <Perform
                Performance={Performance}
                Product={Product}
                quickView={quickView}
              />

              <Rating Performance={Performance} />
            </section>
            {/* Games */}
            <Games gameTitles={gameTitles} setGame={setGame} />
          </div>
        </div>
        <Footer />
        <CloseButton setClosing={setClosing} setPerformCard={setPerformCard} />
      </div>
    </>
  );
};

export default FpsPerformCard;
