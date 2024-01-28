"use client";
import React, { useEffect, useState } from "react";

// Custom Imports
import styles from "@/styles/Component.module.scss";
import Spinner from "@/components/Spinner";
// import { FetchReactInfo } from "../../util/Helper";
import { CmsAPI } from "@actions";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import HorizontalScrollView from "@/components/Main/Controls/HorizontalScrollView";
import TileBlocks from "@/components/Main/Controls/TileBlocks";

const _ = require("lodash");
const ComponentTiles = () => {
  const [Tiles, setTiles] = useState([]);
  const [loader, setLoader] = useState(true);
  const [TilesBG, setTilesBG] = useState(
    "https://www.evetech.co.za/repository/ProductImages/laptop-tiles.jpg"
  );

  const isSM = useMediaQuery("(min-width: 576px)");
  // const isMD = useMediaQuery("(min-width: 768px)");
  const isLG = useMediaQuery("(min-width: 992px)");
  // const isXL = useMediaQuery("(min-width: 1200px)");
  const isXXL = useMediaQuery("(min-width: 1400px)");
  const isHD = useMediaQuery("(min-width: 1921px)");

  useEffect(() => {
    const fetchTiles = async () => {
      try {
        const data = await CmsAPI.getReactInfo({ id: 2 });

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
                setTiles(tilesSet.content);
              }
            }
          });
          setLoader(false);
        }
      } catch (error: any) {
        console.error(
          "Failed to fetch React Info [ComponentTiles]:",
          error.message
        );
      }
    };

    fetchTiles();
  }, []);

  useEffect(() => {}, [Tiles]);

  return (
    <>
      {loader && (
        <div
          className={`${styles.Tiles} px-3 px-lg-3 d-grid gap-3 justify-content-start`}
          style={{
            gridTemplateColumns: `repeat(${5}, ${`70%`})`,
            gridAutoRows: `${`175px`}`,
          }}
        >
          <Spinner />
          <Spinner />
          <Spinner />
          <Spinner />
          <Spinner />
        </div>
      )}

      {Tiles !== undefined && Tiles.length > 0 && !isXXL ? (
        <HorizontalScrollView
          className="hide-scrollbar px-3 d-grid gap-3"
          hideHeading={true}
          hideButtons={true}
          style={{
            gridTemplateColumns: `repeat(${Tiles.length}, ${
              isLG ? `400px` : isSM ? `300px` : `175px`
            })`,
            gridAutoRows: `${`125px`}`,
          }}
        >
          <TileBlocks tileLinks={Tiles} TilesBG={TilesBG} />
        </HorizontalScrollView>
      ) : null}

      {Tiles !== undefined && Tiles.length > 0 && isXXL ? (
        <section className="px-3">
          <div
            className="d-grid cols-5 gap-3"
            style={{ gridAutoRows: `${isHD ? `250px` : `180px`}` }}
          >
            <TileBlocks tileLinks={Tiles} TilesBG={TilesBG} />
          </div>
        </section>
      ) : null}
    </>
  );
};

export default ComponentTiles;
