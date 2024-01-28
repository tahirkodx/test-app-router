import React from "react";
import { Card } from "react-bootstrap";
import LinkImage from "./LinkImage";
import { useTheme } from "@/store/ThemeContext";
import Heading from "@/components/Heading";

const LargeLinks = ({ Component, styles, placeholderImg, isLG }: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <Card
      className={`${
        darkMode ? `bg-black border border-light border-opacity-25` : ``
      } p-2 py-3 p-xxl-3 shadow d-grid gap-1 h-100`}
    >
      <Heading level={3} className={`fs-5`}>
        {Component.heading}
      </Heading>
      <div
        className={`${styles.Card__ColorBar} rounded p-1 position-relative overflow-hidden`}
      ></div>
      <p className="text-secondary">{Component.description}</p>
      <LinkImage
        Component={Component}
        placeholderImg={placeholderImg}
        isLG={isLG}
      />
    </Card>
  );
};

export default LargeLinks;
