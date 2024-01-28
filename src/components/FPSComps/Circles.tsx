import React from "react";
import { CircularProgress } from "@ui-layouts";
import useMediaQuery from "@/custom/hooks/useMediaQuery";

const Circles = ({
  styles,
  showHD,
  showFHD,
  showFourK,
  hdPer,
  hdFPS,
  fhdFPS,
  fhdPer,
  fourkFPS,
  fourkPer,
}: any) => {
  const isXL = useMediaQuery("(min-width: 1200px)");
  return (
    <section
      className={`${styles.Circles} ${
        isXL
          ? `flex-wrap d-flex justify-content-center gap-2`
          : `d-grid cols-3 cursor-grab`
      } w-100 position-relative px-2`}
    >
      {showHD ? (
        <div className="progress p-1 m-0 user-select-none">
          <span
            className={`${styles.Circles__Pill} text-white bg-black px-1 py-0 rounded-pill w-75 text-center`}
          >
            1080p
          </span>
          <CircularProgress Percentage={hdPer} Text={hdFPS} Duration={1} />
          <span className={`${styles.Circles__FPS} text-dark`}>FPS</span>
        </div>
      ) : null}

      {showFHD ? (
        <div className="progress p-1 m-0 user-select-none">
          <span
            className={`${styles.Circles__Pill} text-white bg-black px-1 py-0 rounded-pill w-75 text-center`}
          >
            1440p
          </span>
          <CircularProgress Percentage={fhdPer} Text={fhdFPS} Duration={1} />
          <span className={`${styles.Circles__FPS} text-dark`}>FPS</span>
        </div>
      ) : null}

      {showFourK ? (
        <div className="progress p-1 m-0 user-select-none">
          <span
            className={`${styles.Circles__Pill} text-white bg-black px-1 py-0 rounded-pill w-75 text-center`}
          >
            4K
          </span>
          <CircularProgress
            Percentage={fourkPer}
            Text={fourkFPS}
            Duration={1}
          />
          <span className={`${styles.Circles__FPS} text-dark`}>FPS</span>
        </div>
      ) : null}
    </section>
  );
};

export default Circles;
