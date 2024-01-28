"use client";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import HelperContext from "@/store/helper-context";
import { useState } from "react";
import { nanoid } from "nanoid";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { Image } from "react-bootstrap";

const SpecialTag = (props: any) => {
  const helperCtx = useContext<any>(HelperContext);
  const [specialTags, SetSpecialTags] = useState(helperCtx.dealTags); /* [
    {
      image:
        "https://www.evetech.co.za/repository/ProductImages/special-tag.png",
      width: 80,
      height: 80,
      alt: "On Special",
      top: 0,
      left: 0,
      marginTop: "-10px",
      marginLeft: "-10px",
      position: "relative",
    },
    {
      image:
        "https://www.evetech.co.za/repository/ProductImages/clearance-tag.png",
      width: 99,
      height: 45,
      alt: "Clearance Sale",
      top: "0px",
      left: "calc(50% - (109px / 2))",
      marginTop: "-14px",
      marginLeft: "0",
      position: "absolute",
    },
    {
      image:
        "https://www.evetech.co.za/repository/ProductImages/spring-sale-tag.png",
      width: 69,
      height: 59,
      alt: "Spring Sale",
      top: "0px",
      left: "calc(100% - 69px)",
      marginTop: "-10px",
      marginLeft: "0",
      position: "relative",
    },
    {
      image:
        "https://www.evetech.co.za/repository/ProductImages/level-up-tag.png",
      width: 69,
      height: 59,
      alt: "Level Up",
      top: "0px",
      left: "calc(100% - 83px)",
      marginTop: "-10px",
      marginLeft: "0",
      position: "relative",
    },
  ];
 */
  /* useEffect(()=>{
    SetSpecialTags(helperCtx.dealTags);
  },[helperCtx]) */

  useEffect(() => {}, [props.type]);

  const isXXL = useMediaQuery("(min-width: 1400px)");
  const isXL = useMediaQuery("(min-width: 1200px)");
  const isSM = useMediaQuery("(min-width: 576px)");

  return specialTags.map((Tag: any) => {
    return (
      Tag.alt === `${props.type}` && (
        <span key={nanoid(4)}>
          <Image
            alt={Tag.alt}
            src={Tag.image}
            width={isXXL ? Tag.width + 14 : isSM ? Tag.width + 7 : Tag.width}
            height={
              isXXL ? Tag.height + 14 : isSM ? Tag.height + 7 : Tag.height
            }
            style={{
              marginTop: Tag.marginTop,
              marginLeft: Tag.marginLeft,
              position: Tag.position,
              top: Tag.top,
              left: Tag.left,
              maxWidth: "75px",
              maxHeight: "75px",
            }}
            className="img-contain"
          />
        </span>
      )
    );
  });
};

export default SpecialTag;
