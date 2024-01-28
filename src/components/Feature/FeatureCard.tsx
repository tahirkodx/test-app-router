"use client";
import React from "react";
import { customAlphabet } from "nanoid";
// import { useRouter } from "next/navigation";
import Card from "react-bootstrap/Card";
import styles from "@/styles/FeatureList.module.scss";
import { useTheme } from "@/store/ThemeContext";

var _ = require("lodash");

const FeatureCard = (props: any) => {
  let feature = props.Feature;
  let carasoulItem = null;
  //   const router.push = useRouter();
  const nanoid = customAlphabet("1234567890abcdef", 10);
  // const moreInfoClick = (feature) =>{
  //     router.push(`/${_.replace(_.toLower(feature.url),new RegExp(" ","g"),"-").trim()}/best-deal/${feature.npid}.aspx`);
  // }
  const { isDarkMode } = useTheme();

  const RenderHTML = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  return (
    <Card
      className={`${styles.FeatureCard} ${
        isDarkMode ? `bg-black text-light` : `shadow`
      } `}
      key={nanoid(10)}
    >
      <RenderHTML
        HTML={props.Feature.card_desc.replace(
          "<img",
          `<img width="300" height="150" style="object-fit: contain; background-color: black;"  `
        )}
      />
    </Card>
  );
};

export default FeatureCard;
