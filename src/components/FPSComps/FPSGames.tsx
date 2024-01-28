"use client";
import React from "react";
import { Card, Image, Modal } from "react-bootstrap";
import styles from "@/styles/FPS/FpsGames.module.scss";
import { FaChevronRight, FaTimes } from "react-icons/fa";
import { useGesture } from "react-use-gesture";
import { useSpring, animated } from "react-spring";
import { nanoid } from "nanoid";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { useTheme } from "@/store/ThemeContext";
import { isBodyDark, isDarkHeaderFooter } from "../Auth/LoginModal";
import darkModalStyles from "@/styles/DarkModal.module.scss";

const FpsGames = (props: any) => {
  const gameFpsDetailData = props.gameFpsDetailData;
  const gameData = props.gameData;
  const isXXL = useMediaQuery("(min-width: 1400px)");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const _ = require("lodash");

  const image = (title: any) =>
    _.filter(gameData, ["gameTitle", title])[0].gameImg;

  const games = gameFpsDetailData.map((item: any, index: any) => (
    <Card
      key={nanoid(7)}
      className={`${
        darkMode ? `border-secondary` : `border-light`
      } shadow d-grid cols-10 overflow-hidden pe-none`}
    >
      <div className="span-7">
        <Image
          src={image(item.titles)}
          alt={item.titles}
          className="w-100 h-100 img-cover pe-none"
        />
      </div>
      <div className="span-3">
        <div className="h-100">
          <small>
            <small className="d-grid rows-3 h-100">
              <div
                className={`${
                  darkMode ? `bg-black border-dark` : `bg-light`
                } text-orange border h-100 d-flex align-items-center justify-content-center`}
              >
                {item.fullHdFps.includes(" ") ? "-" : item.fullHdFps}
              </div>
              <div
                className={`${
                  darkMode ? `bg-black border-dark` : `bg-light`
                } text-purple border h-100 d-flex align-items-center justify-content-center`}
              >
                {item.quadHdFps.includes(" ") ? "-" : item.quadHdFps}
              </div>
              <div
                className={`${
                  darkMode ? `bg-black border-dark` : `bg-light`
                } text-primary border h-100 d-flex align-items-center justify-content-center`}
              >
                {item.ultra4k.includes(" ") ? "-" : item.ultra4k}
              </div>
            </small>
          </small>
        </div>
      </div>
    </Card>
  ));

  const info = (
    <>
      Based on <span className="text-orange">1080P</span> /
      <span className="text-purple">1440P</span> /
      <span className="text-primary">4K</span>
    </>
  );

  const ref = React.useRef<any>();
  const isDragging = React.useRef(false);
  const [{ x }, set, stop]: any = useSpring(() => ({ x: 0 }));

  const sideScroll = (element: any, speed: any, distance: any, step: any) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
    }, speed);
  };

  const bind = useGesture(
    {
      onDrag({ down, movement: [x], first, last, vxvy: [vx] }) {
        if (first) isDragging.current = true;
        if (last) setTimeout(() => (isDragging.current = false), 0);
        set({ x: -x, immediate: down });
      },
      onClickCapture(ev: any) {
        if (isDragging.current) {
          try {
            ev.stopPropagation();
          } catch (e) {}
        }
        if (ref.current) {
          try {
            ev.stopPropagation();
          } catch (e) {}
        }
      },
      onWheelStart() {
        // Stop any user-land scroll animation from confcliting with the browser
        try {
          stop();
        } catch (e) {}
      },
    },
    {
      drag: {
        axis: "x",
        filterTaps: true,
        initial() {
          return [-ref.current.scrollLeft, 0];
        },
      },
    }
  );

  return (
    <>
      {!isXXL ? (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            className={`
              ${darkMode ? darkModalStyles.darkHeader : ``}
              ${isDarkHeaderFooter(darkMode)}
            `}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              FPS Games
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className={`${isBodyDark(darkMode)} text-center position-relative`}
          >
            <div className="d-grid cols-3 gap-2 cols-md-4 cols-lg-6 z-index-1">
              {games}
            </div>
            <div
              className={`${
                darkMode ? `bg-black` : `bg-light`
              } mt-3 position-sticky bottom-0 z-index-2 py-2`}
            >
              {info}
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <div
          className={`
            ${styles.FpsGamesDesktop} 
            ${props.fpsGamesPcShow === false ? styles.Closed : styles.Open} 
            ${darkMode ? `bg-dark border-dark` : `bg-light border`}
             position-fixed border shadow`}
        >
          <div className="d-flex align-items-center justify-content-between p-3 bg-secondary bg-opacity-10">
            <h2 className="fs-4 m-0 text-danger">
              FPS <span className="fw-1">Games</span>
            </h2>
            <div className="d-flex gap-2">
              <span>{info}</span>
              <span>
                <FaTimes
                  className="fs-4 text-danger cursor-pointer"
                  onClick={props.gamesHide}
                />
              </span>
            </div>
          </div>

          <div className="position-relative">
            <animated.div
              className="w-100 overflow-hidden"
              ref={ref}
              scrollLeft={x}
              {...bind()}
            >
              <div className="p-3 d-flex gap-2">
                <div className={`${styles.AllGames} d-grid gap-2`}>{games}</div>
                <div
                  className={`${
                    darkMode ? `bg-dark` : `bg-light`
                  } pe-4 z-index-3`}
                ></div>
              </div>
            </animated.div>
            <div
              className={`
                ${styles.RightScroll} 
                ${darkMode ? styles.darkMode : ``} 
                position-absolute end-0 top-0 h-100 d-flex align-items-center pe-auto
              `}
              onClick={() => sideScroll(ref.current, 25, 275, 27)}
            >
              <FaChevronRight
                className={`${darkMode ? `text-light` : `text-dark`} fs-2`}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FpsGames;
