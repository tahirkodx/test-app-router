import React from "react";
import useMediaQuery from "@/custom/hooks/useMediaQuery";

const Rating = ({ Performance }: any) => {
  const isXL = useMediaQuery("(min-width: 1200px)");

  return (
    <div className="px-xl-2 w-100">
      <div
        className={`${
          isXL ? `rounded-pill` : ``
        } w-100 d-grid cols-4 bg-grey bg-gradient text-center overflow-hidden`}
      >
        <small
          className={`${
            Performance.timeSpyOverallScore !== undefined &&
            Performance.timeSpyOverallScore >= 2000
              ? "bg-secondary text-white"
              : "bg-warning text-dark"
          } bg-gradient py-lg-1`}
        >
          <small>Entry</small>
        </small>
        <small
          className={`${
            Performance.timeSpyOverallScore !== undefined &&
            Performance.timeSpyOverallScore >= 3500
              ? "bg-secondary text-white"
              : "bg-warning text-dark"
          } bg-gradient py-lg-1`}
        >
          <small>Good</small>
        </small>
        <small
          className={`${
            Performance.timeSpyOverallScore !== undefined &&
            Performance.timeSpyOverallScore >= 6000
              ? "bg-secondary text-white"
              : "bg-warning text-dark"
          } bg-gradient py-lg-1`}
        >
          <small>High</small>
        </small>
        <small
          className={`${
            Performance.timeSpyOverallScore !== undefined &&
            Performance.timeSpyOverallScore >= 7500
              ? "bg-secondary text-white"
              : "bg-warning text-dark"
          } bg-gradient py-lg-1`}
        >
          <small>Elite</small>
        </small>
      </div>
    </div>
  );
};

export default Rating;
