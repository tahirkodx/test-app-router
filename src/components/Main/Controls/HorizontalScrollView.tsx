import React from "react";
import { Button, Card } from "react-bootstrap";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCaretLeft,
  FaCaretRight,
} from "react-icons/fa";
import Link from "next/link";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";
import { useTheme } from "@/store/ThemeContext";

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

const HorizontalScrollView = (props: any) => {
  const ref: any = React.useRef();
  const isDragging = React.useRef(false);
  const [{ x }, set, stop]: any = useSpring(() => ({
    x: 0,
  }));
  const { isDarkMode } = useTheme();

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

  const isShowHeading = () => {
    return props.hideHeading === undefined || props.hideHeading === false;
  };

  const isShowButtons = () => {
    return props.hideButtons === undefined || props.hideButtons === false;
  };

  const strokeColor = `rgba(0,0,0,1)`;

  return (
    <div className="position-relative">
      <Card.Header
        className={`
        ${
          isShowHeading()
            ? `${
                isDarkMode ? `bg-black bg-opacity-50` : `bg-dark bg-opacity-25`
              } bg-gradient border-bottom border-dark`
            : `position-absolute w-100 h-100 z-index-2 pe-none`
        } border-0 position-relative`}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap h-100 position-relative">
          <h3
            className={`${isDarkMode ? `text-light` : `text-dark`} m-0 fs-4`}
            style={{
              textShadow: isDarkMode
                ? `${strokeColor} 1px 0px 0px, ${strokeColor} 0.540302px 0.841471px 0px, ${strokeColor} -0.416147px 0.909297px 0px, ${strokeColor} -0.989993px 0.14112px 0px, ${strokeColor} -0.653644px -0.756803px 0px, ${strokeColor} 0.283662px -0.958924px 0px, ${strokeColor} 0.96017px -0.279416px 0px`
                : ``,
            }}
          >
            {props.DealTitle}
          </h3>
          <div
            className={`
              rounded overflow-hidden d-flex
              ${isShowHeading() ? `` : `justify-content-between w-100 h-100`} 
              ${props.headingStyles}
            `}
          >
            {isShowHeading() ? (
              <Link href={props.PageLink ? props.PageLink : ""}>
                <Button
                  className={`
                    rounded-0 
                    ${props.btnStyle ? props.btnStyle : ``}
                  `}
                  size="sm"
                >
                  View All
                </Button>
              </Link>
            ) : null}

            {isShowButtons() ? (
              <>
                <Button
                  onClick={() => sideScroll(ref.current, 25, 275, -27)}
                  className={`
                    ${isShowHeading() ? `` : `p-0 h-100`} 
                    rounded-0 d-none d-lg-block pe-auto
                    ${props.btnStyle ? props.btnStyle : ``}
                    ${props.firstBtnStyle ? props.firstBtnStyle : ``}
              `}
                  size="sm"
                  variant={`${isShowHeading() ? `primary` : `light`}`}
                >
                  {isShowHeading() ? (
                    <FaCaretLeft className="d-flex align-items-center" />
                  ) : (
                    <FaAngleLeft className="d-flex align-items-center fs-3" />
                  )}
                </Button>
                <Button
                  onClick={() => sideScroll(ref.current, 25, 275, 27)}
                  className={`
                    ${isShowHeading() ? `` : `p-0 h-100`} 
                    rounded-0 d-none d-lg-block pe-auto
                    ${props.btnStyle ? props.btnStyle : ``}
                    ${props.secondBtnStyle ? props.secondBtnStyle : ``}
                  `}
                  size="sm"
                  variant={`${isShowHeading() ? `primary` : `light`}`}
                >
                  {isShowHeading() ? (
                    <FaCaretRight className="d-flex align-items-center" />
                  ) : (
                    <FaAngleRight className="d-flex align-items-center fs-3" />
                  )}
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </Card.Header>
      <Card.Body className="p-0 m-0 z-index-1">
        <animated.div
          ref={ref}
          scrollLeft={x}
          className={props.className}
          style={props.style}
          {...bind()}
        >
          {props.children}
        </animated.div>
      </Card.Body>
    </div>
  );
};

export default HorizontalScrollView;
