"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/laptopHome.module.scss";
import { CmsAPI } from "@actions";
import { nanoid } from "nanoid";
import Spinner from "@/components/Spinner";
import { Image } from "react-bootstrap";
import Link from "next/link";
const _ = require("lodash");

function BrandTiles() {
  const [TilesBG, setTilesBG] = useState(
    "https://www.evetech.co.za/repository/ProductImages/laptop-tiles.jpg"
  );
  const [TilesBrand, setTilesBrand] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchBrandTiles = async () => {
      try {
        const data = await CmsAPI.getReactInfo({ id: 15 });
        console.log("Tiles", data);
        if (data.result !== undefined) {
          _.map(data.result, (tilesSet: any) => {
            if (tilesSet.type !== undefined && tilesSet.type === "setting") {
              if (
                tilesSet.content !== undefined &&
                tilesSet.content.length > 0
              ) {
                setTilesBG((prevState) => {
                  return tilesSet.content[0].background !== undefined
                    ? tilesSet.content[0].background
                    : prevState;
                });
              }
            }

            if (tilesSet.type !== undefined && tilesSet.type === "links") {
              if (
                tilesSet.content !== undefined &&
                tilesSet.content.length > 0
              ) {
                setTilesBrand(tilesSet.content);
              }
            }
          });
          setLoader(false);
        }
      } catch (error: any) {
        console.error(
          "Failed to fetch React Info [Laptop Brand Tiles]:",
          error.message
        );
      }
    };
    fetchBrandTiles();
  }, []);

  return (
    <div className={`${styles.Tiles} px-2 my-2 px-lg-3 my-lg-3`}>
      {loader ? (
        <>
          <Spinner isEve={false} />
          <Spinner isEve={false} />
          <Spinner isEve={false} />
          <Spinner isEve={false} />
          <Spinner isEve={false} />
        </>
      ) : null}
      {TilesBrand !== undefined &&
        TilesBrand.length > 0 &&
        TilesBrand.map((Child: any) => {
          return (
            <div
              className={`${styles.Tiles__Child} rounded overflow-hidden`}
              key={nanoid(7)}
              style={{
                background: `url(${TilesBG})`,
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
              }}
            >
              <Image
                src={Child.product}
                alt={Child.productAlt}
                className={`${styles.Tiles__Product}`}
              />
              <Link
                href={Child.url.replace("https://evereact.evetech.co.za", "")}
                title={Child.title}
                className={`${styles.Tiles__Link}`}
              >
                <Image
                  src={Child.logo}
                  alt={Child.logoAlt}
                  className={`${styles.Tiles__Logo}`}
                />
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default BrandTiles;
