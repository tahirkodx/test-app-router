"use client";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { ProductAPI } from "@/custom/utils/actions";
import React, { useEffect, useState } from "react";
import CardsWrapper from "../DynamicPage/CardsWrapper";
import styles from "@/styles/component/DynamicPage.module.scss";
import { nanoid } from "nanoid";
import PCCards from "./PCCards";

const _ = require("lodash");
const ComponentWithPCConfigSearch = (props: any) => {
  let ctrlId = props.CtrlId;
  let ctrlTags = props.Tags;
  let sort = props.Sort;
  let CacheControl = props.CacheControl;
  let CacheName = props.CacheName;
  let filterRange = props.filterRange;
  let gameData = props.gameData;
  let [activeGames, setActiveGames] = useState("");
  let [filterdGame, setFilterdGame] = useState("");
  let [gamingPCs, setGamingPCs] = useState("");
  let [initInfo, setInitInfo] = useState(false);
  const [products, setProducts] = useState([]);
  const isHD = useMediaQuery("(min-width: 1921px)");

  useEffect(() => {
    const getPCByConfigSearch = async () => {
      const cardData = await ProductAPI.getPCByConfigSearch({
        ctrlData: {
          ctrlid: ctrlId,
          tags: ctrlTags,
          sortOrder: sort,
          cacheControl: CacheControl,
          cacheName: CacheName,
        },
      });
      if (
        cardData !== null &&
        cardData !== undefined &&
        cardData.result !== undefined
      ) {
        let prods = cardData.result;
        let performancePCs = _.reject(prods, { Performance: "" });

        setProducts((prevProd) => {
          prevProd = prods;
          return prevProd;
        });
        setGamingPCs(performancePCs);
      }
      setInitInfo(true);
    };

    getPCByConfigSearch();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      props.onUpdateProductCount(products.length);
      props.onPriceRageSet({
        min: _.min(_.map(products, "price_vat")),
        max: _.max(_.map(products, "price_vat")),
      });
    }
  }, [products]);

  useEffect(() => {
    let availableGames = _.filter(gameData, { Status: 1 });
    setActiveGames(availableGames);
  }, []);

  const findPerformance = () => {
    if (_.find(products, "Performance") !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <CardsWrapper
        initInfo={initInfo}
        products={products}
        onUpdateProductCount={props.onUpdateProductCount}
        filterRange={filterRange}
        activeGames={activeGames}
        gamingPCs={gamingPCs}
        filteredGame={props.filteredGame}
        setFilteredGame={props.setFilteredGame}
        findPerformance={findPerformance}
        styles={styles}
      >
        {initInfo &&
        filterRange !== null &&
        filterRange.min !== undefined &&
        filterRange.max !== undefined
          ? _.orderBy(
              _.filter(products, (product: any) => {
                if (
                  product.price_vat >= filterRange.min &&
                  product.price_vat <= filterRange.max
                )
                  return product;
              }),
              ["price_vat"],
              ["asc"]
            ).map((product: any) => {
              return (
                <PCCards
                  product={product}
                  key={nanoid(5)}
                  gameDataFPS={gameData}
                  filterdGame={filterdGame}
                />
              );
            })
          : _.orderBy(products, ["price_vat"], ["asc"]).map((product: any) => {
              return (
                <PCCards
                  product={product}
                  key={nanoid(5)}
                  gameDataFPS={gameData}
                  filterdGame={filterdGame}
                />
              );
            })}
      </CardsWrapper>
    </>
  );
};

export default ComponentWithPCConfigSearch;
