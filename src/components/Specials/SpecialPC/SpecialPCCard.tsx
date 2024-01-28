import { nanoid } from "nanoid";
import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import PageLink from "./PageLink";
import { FaEye } from "react-icons/fa";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import FpsButton from "../../FPSComps/FpsButton";
import FPS from "@/components/FPSComps/FPS";
import { useTheme } from "@/store/ThemeContext";
import FancyPrice from "@/components/FancyPrice";

const _ = require("lodash");

const SpecialPCCard = ({ styles, pc, gameDataFPS, filteredGame }: any) => {
  const isSM = useMediaQuery("(min-width: 576px)");
  const isLG = useMediaQuery("(min-width: 1200px)");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const hasFPS = (pc: any) => {
    return (
      pc.Performance !== null &&
      pc.Performance !== undefined &&
      pc.Performance.length > 0
    );
  };

  return (
    <div key={nanoid(6)} className={`${styles.HoverGrow} text-decoration-none`}>
      <Card
        className={`
          ${styles.ListCard}
          ${darkMode ? `border-primary border-opacity-50` : ``} 
          p-0 shadow d-grid gap-1 h-100 position-relative overflow-hidden
        `}
      >
        <div className="d-flex-row align-items-center justify-content-center text-center p-3 shadow position-relative">
          <PageLink pc={pc}>
            <Image
              fluid
              src={`https://www.evetech.co.za/${pc.imageurl}`}
              alt={pc.url}
              className={`position-relative h-100 w-100 object-fit-contain`}
            />
          </PageLink>
        </div>
        <div
          className={`
            ${styles.ListCard__Info}
            ${darkMode ? `bg-dark text-light` : ``} 
            d-grid
          `}
        >
          <p
            className={`
              ${styles.ListCard__Heading}
              
              overflow-hidden text-center  py-1 py-sm-2 pb-0 mb-0 px-2 px-sm-3 fs-6 fw-2
            `}
          >
            <PageLink
              pc={pc}
              className={`text-decoration-none ${
                darkMode ? `text-light` : `text-dark`
              }`}
            >
              {isSM ? <>{pc.ProName}</> : <small>{pc.ProName}</small>}
            </PageLink>
          </p>
          <div
            className={`
              p-2 py-1 p-sm-3 py-sm-2 mb-0
              ${hasFPS(pc) ? `pe-0 pe-sm-0` : `pe-2 pe-sm-2`}
              ${darkMode ? `bg-dark text-light` : ``}
            `}
          >
            <div
              className={`
                flex-col flex-xxl-row w-100 mt-1 mb-1 d-flex gap-2 justify-content-between align-items-center
                
              `}
            >
              <div
                className={`
                  lh-1 d-flex align-items-end justify-content-center flex-wrap gap-xxl-1
                  
                `}
              >
                <div
                  className={`
                    ${styles.ListCard__Price}
                    ${isLG ? `fs-3` : `fs-4`}
                  `}
                >
                  {isLG ? (
                    <>
                      <FancyPrice price={pc.price} />
                    </>
                  ) : (
                    <small>
                      <FancyPrice price={pc.price} />
                    </small>
                  )}
                </div>
              </div>

              <div className="d-flex gap-1 align-items-center">
                {/* Eye Button */}
                <PageLink
                  pc={pc}
                  className={`
                    text-decoration-none 
                    ${darkMode ? `text-light` : `text-dark`}
                  `}
                >
                  <Button
                    variant=""
                    size="sm"
                    className="bg-primary bg-opacity-10 border-primary border-opacity-25 rounded-circle p-2"
                  >
                    <FaEye className="d-flex align-items-center justify-content-center text-primary" />
                  </Button>
                </PageLink>
                {/* FPS Card */}
                {hasFPS(pc) ? (
                  <FPS
                    Product={pc}
                    filteredGame={filteredGame}
                    gameDataFPS={gameDataFPS}
                    button={<FpsButton styles={styles} />}
                    performCardTheme={`default`}
                    showHD={true}
                    showFHD={true}
                    showFourK={true}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SpecialPCCard;
