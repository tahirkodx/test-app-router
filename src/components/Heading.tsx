import { useTheme } from "@/store/ThemeContext";
import React from "react";

const Heading = ({ level, className, style, ...props }: any) => {
  const { isDarkMode } = useTheme();
  const classes = `
      ${className}
      ${isDarkMode ? `text-light` : `text-dark`}
      `;

  return (
    <>
      {level === 1 ? (
        <h1 className={classes}>
          <span style={style}>{props.children}</span>
        </h1>
      ) : null}
      {level === 2 ? (
        <h2 className={classes}>
          <span style={style}>{props.children}</span>
        </h2>
      ) : null}
      {level === 3 ? (
        <h3 className={classes}>
          <span style={style}>{props.children}</span>
        </h3>
      ) : null}
    </>
  );
};

export default Heading;
