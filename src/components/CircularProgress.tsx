import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "@/store/AnimatedProgressProvider";

const CircularProgress = (props: any) => {
  let per = props.Percentage !== undefined ? props.Percentage : 0;
  let text = props.Text !== undefined ? props.Text : "";
  let duration = props.Duration !== undefined ? props.Duration : 1.4;
  return (
    <AnimatedProgressProvider
      valueStart={0}
      valueEnd={per}
      duration={duration}
      easingFunction={easeQuadInOut}
      className={`${props.className}`}
    >
      {(value: any) => {
        const roundedValue = Math.round(value);
        return (
          <CircularProgressbar
            value={value}
            text={isNaN(text) ? "Not Playable" : text}
            /* This is important to include, because if you're fully managing the animation yourself, you'll want to disable the CSS animation. */
            styles={buildStyles({
              pathTransition: "none",
              textSize: isNaN(text) && "13px",
            })}
          />
        );
      }}
    </AnimatedProgressProvider>
  );
};

export default CircularProgress;
