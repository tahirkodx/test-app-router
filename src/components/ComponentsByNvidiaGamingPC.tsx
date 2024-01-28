import React from "react";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { nanoid } from "nanoid";
import ComponentCTRLCard from "./Component/ComponentCTRLCard";
import _ from "lodash";

const ComponentsByNvidiaGamingPC = (props: any) => {
  let products = props.products;
  let gameData = props.gameData;
  const isHD = useMediaQuery("(min-width: 1921px)");
  return (
    <>
      <div
        className={`
            ${isHD ? `cols-xxl-5` : `cols-xxl-4`}
            d-grid cols-2 cols-md-3 cols-lg-4 gap-2 gap-sm-3 gap-xxl-5 py-4
          `}
        id="productCards"
      >
        <svg width="0" height="0" className="position-absolute">
          <linearGradient id="purpleGradient1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#AF40FF" />
            <stop offset="50%" stopColor="#5B42F3" />
            <stop offset="100%" stopColor="#00DDEB" />
          </linearGradient>
          {/* Level up  */}
          <linearGradient id="LevelUp" x1={"0"} x2={"1"} y1={"0"} y2={"1"}>
            {" "}
            <stop offset="0%" stopColor={"#5757D9"} />
            <stop offset="100%" stopColor={"#21D9F7"} />
          </linearGradient>
          {/* Clearance  */}
          <linearGradient id="Clearance" x1={"1"} x2={"0"} y1={"1"} y2={"0"}>
            <stop offset="0%" stopColor={"#f25025"} />
            <stop offset="100%" stopColor={"#ff8e41"} />
          </linearGradient>
        </svg>

        {_.orderBy(products, ["price"], ["asc"]).map((product) => {
          return (
            <ComponentCTRLCard
              Product={product}
              key={nanoid(6)}
              gameDataFPS={gameData}
            />
          );
        })}
      </div>
    </>
  );
};

export default ComponentsByNvidiaGamingPC;
