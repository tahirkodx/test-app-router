"use client";
import React, { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { Button, Col, Image, Offcanvas } from "react-bootstrap";
import stylesFps from "@/styles/LaptopDetail.module.scss";
import FPSDetailSlider from "@/components/FPSComps/FPSDetailSlider";
import darkModalStyles from "@/styles/DarkModal.module.scss";
import { useTheme } from "@/store/ThemeContext";

const FPSSlider = (props: any) => {
  let isXXL = props.IsXXL;
  const [isShow, setIsShow] = useState(false);
  const [showFPS, setShowFPS] = useState(false);
  const handleCloseFPS = () => setShowFPS(false);
  const handleShowFPS = () => setShowFPS(true);
  const [fpsData, setFpsData] = useState(props.Performance);
  const [gameFpsData, setGameFpsData] = useState([]);
  const [gameTitles, setGameTitles] = useState([]);
  const [gameData, setGameData] = useState(props.GameData);
  const [slider, setSlider] = useState<any>(null);
  const [isReload, setIsReload] = useState(false);
  const [isFpsXXL, setIsFpsXXL] = useState(props.IsXXL);
  const [gameSlct, setGameSlct] = useState("");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  let element = null;
  const _ = require("lodash");
  useEffect(() => {
    setFpsData((prevFpsData: any) => {
      try {
        prevFpsData = JSON.parse(props.Performance);
      } catch (e) {
        prevFpsData = props.Performance;
      }
      return prevFpsData;
    });

    setGameFpsData(props.Performance.gameTitles);
    let gameList = _.map(props.Performance.gameTitles, (game: any) => {
      return game.titles;
    });

    setGameTitles((prevTitles: any) => {
      prevTitles = gameList;
      return prevTitles;
    });
  }, [props.Performance]);

  useEffect(() => {
    if (
      fpsData !== null &&
      fpsData !== undefined &&
      gameFpsData !== undefined &&
      gameFpsData.length > 0 &&
      gameTitles !== undefined &&
      gameTitles.length > 0
    ) {
      setIsShow(props.IsShowFPS);
      getSlider();
      setIsReload(false);
    }
  }, [gameFpsData]);

  const onSelectGame = (title: any) => {
    setGameSlct(title);
  };

  const getSlider = () => {
    setSlider(
      <FPSDetailSlider
        FpsData={fpsData}
        gameData={gameData}
        gameFpsData={gameFpsData}
        gameTitles={gameTitles}
        IsLoader={true}
        FilterData={props.FilterData}
        GameSelected={gameSlct}
        updateSelectedGame={onSelectGame}
        name={props.name}
      />
    );
  };

  useEffect(() => {
    setIsFpsXXL(props.IsXXL);
  }, [props.IsXXL]);

  useEffect(() => {
    setIsReload(props.IsReload);
  }, [props.IsReload]);

  useEffect(() => {
    if (isReload) {
      getSlider();
      setIsReload(false);
    }
  }, [isReload]);

  useEffect(() => {}, [isShow]);

  return (
    <>
      {isShow &&
        fpsData !== undefined &&
        (!isFpsXXL ? (
          <Col xxl={2}>
            <Button
              variant="danger"
              onClick={handleShowFPS}
              className={`${stylesFps.FPSToggle} p-0 me-2 position-fixed start-0 top-50 translate-middle-y rounded-0 rounded-end z-index-1 overflow-hidden shadow`}
            >
              <Image
                src={`https://www.evetech.co.za/repository/ProductImages/assassin-creed-valhalla-300px-v21.jpg`}
                alt={``}
                className={`position-absolute top-0 left-0 translate-middle-x`}
              />
              <div className={`fw-2`}>
                <div
                  className={`${stylesFps.FPSToggle__Text} position-relative p-2`}
                >
                  <div>F</div>
                  <div>P</div>
                  <div>S</div>
                </div>
                <div className={`my-5`}></div>
              </div>
            </Button>
            <Offcanvas
              className={darkMode ? `bg-dark text-light` : ``}
              show={showFPS}
              onHide={handleCloseFPS}
              name="FPSSlider"
              backdropClassName="FPSSlider"
              style={{ maxWidth: "calc(250rem / 16)" }}
            >
              <Offcanvas.Header
                closeButton
                className={`${darkMode ? darkModalStyles.darkHeader : ``}`}
              >
                <Offcanvas.Title>FPS Games</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className={`pt-0`}>{slider}</Offcanvas.Body>
            </Offcanvas>
          </Col>
        ) : (
          <Col xxl={2} className={`ps-2`}>
            {slider}
          </Col>
        ))}
    </>
  );
};

export default FPSSlider;
