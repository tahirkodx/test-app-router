"use client";
import React, { useEffect, useState } from "react";

// Custom Imports
import styles from "@/styles/category/CategoryTiles.module.scss";
import Spinner from "@/components/Spinner";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import HorizontalScrollView from "@/components/Main/Controls/HorizontalScrollView";
import CategoryBlocks from "@/components/Product/CategoryBlocks";
import { CmsAPI } from "@actions";
import { useTheme } from "@/store/ThemeContext";

const _ = require("lodash");
const CategoryTiles = () => {
  const [Tiles, setTiles] = useState([]);
  const [loader, setLoader] = useState(true);
  const [TilesBG, setTilesBG] = useState(
    "https://www.evetech.co.za/repository/ProductImages/laptop-tiles.jpg"
  );

  const isSM = useMediaQuery("(min-width: 576px)");
  // const isMD = useMediaQuery("(min-width: 768px)");
  // const isLG = useMediaQuery("(min-width: 992px)");
  // const isXL = useMediaQuery("(min-width: 1200px)");
  const isXXL = useMediaQuery("(min-width: 1400px)");
  const isHD = useMediaQuery("(min-width: 1921px)");
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchTiles = async () => {
      try {
        const data = await CmsAPI.getReactInfo({ id: 24 });

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
          "Failed to fetch React Info [CategoryTiles]:",
          error.message
        );
      }
    };

    fetchTiles();
  }, []);

  useEffect(() => {}, [Tiles]);

  const imgContainSize = () => {
    let size = `70px`;
    if (isSM) {
      size = `85px`;
    }
    if (isXXL) {
      size = `100px`;
    }
    if (isHD) {
      size = `113px`;
    }

    return size;
  };

  return (
    <>
      {loader && (
        <div
          className={`px-3 px-lg-3 d-grid gap-3 justify-content-start`}
          style={{
            gridTemplateColumns: `repeat(${5}, ${`60%`})`,
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

      {Tiles !== undefined && Tiles.length > 0 ? (
        <div
          className={`
            ${styles.Body} 
            ${isDarkMode ? styles.darkMode : ``}
            py-3
          `}
        >
          <HorizontalScrollView
            className="hide-scrollbar px-3 d-grid gap-4 gap-md-5 px-md-5"
            hideHeading={true}
            style={{
              gridTemplateColumns: `
                repeat(${Tiles.length}, ${imgContainSize()})
              `,
              gridAutoRows: `${`min-content`}`,
              overflowY: `hidden`,
            }}
            btnStyle={` 
              ${
                isDarkMode
                  ? `bg-dark text-light border-0`
                  : `bg-light bg-opacity-75`
              } 
            `}
            firstBtnStyle={`rounded-end`}
            secondBtnStyle={`rounded-start`}
            headingStyles={`rounded-0`}
          >
            <CategoryBlocks
              tileLinks={Tiles}
              TilesBG={TilesBG}
              imgContainSize={imgContainSize()}
              imgParentClass={`${styles.ImageContainer}`}
              textClass={`${styles.Text}`}
              classes={styles.Link}
            />
          </HorizontalScrollView>
        </div>
      ) : null}
    </>
  );
};

export default CategoryTiles;
