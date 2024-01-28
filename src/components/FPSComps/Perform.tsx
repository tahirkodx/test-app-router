import { useTheme } from "@/store/ThemeContext";
import React from "react";

const Perform = ({ Performance, Product, quickView }: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  return (
    <div className="d-flex flex-wrap align-items-stretch">
      <div className="d-grid cols-3 bg-secondary bg-opacity-10 p-1 px-2 flex-grow-1">
        <small>
          <small>
            <div className="fw-2">GPU:</div>
            {Performance.timeSpyScoreGPU}
          </small>
        </small>
        <small>
          <small>
            <div className="fw-2">CPU:</div>
            {Performance.timeSpyScoreCPU}
          </small>
        </small>
        <small>
          <small>
            <div className="fw-2">Overall:</div>
            {Performance.timeSpyOverallScore}
          </small>
        </small>
      </div>
      <small className="flex-grow-1 p-1 px-2 bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center">
        <small className="d-flex gap-1 justify-content-center">
          <div className="fw-2">Timespy:</div>
          <span
            className={`${
              darkMode ? `text-info` : `text-primary`
            } text-decoration-underline cursor-pointer`}
            onClick={() => {
              quickView(Product.ProName);
            }}
          >
            Learn More
          </span>
        </small>
      </small>
    </div>
  );
};

export default Perform;
