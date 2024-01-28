"use client";
import { ProductAPI } from "@/custom/utils/actions";
import _ from "lodash";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import styles from "@/styles/component/DynamicPage.module.scss";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import CardsWrapper from "@/components/DynamicPage/CardsWrapper";
import ComponentCTRLCard from "@/components/Component/ComponentCTRLCard";

const ComponentBySearchTermCache = ({
  Tags,
  Sort,
  LeftBar,
  Heading,
  CacheControl,
  CacheName,
  Procedure,
  onUpdateProductCount,
  onPriceRageSet,
  filterRange,
  gameData,
}: any) => {
  let ctrlTags = Tags;
  let sort = Sort;
  let ctrlLeftBar = LeftBar;
  let ctrlHeading = Heading;
  let [activeGames, setActiveGames] = useState("");
  let [filteredGame, setFilteredGame] = useState("");
  let [gamingPCs, setGamingPCs] = useState("");
  const [products, setProducts] = useState([]);
  const [initInfo, setInitInfo] = useState(false);
  const isHD = useMediaQuery("(min-width: 1921px)");

  useEffect(() => {
    const getProductsBySearchTerm_Cache = async () => {
      console.log("Procedure", Procedure);
      const cardData = await ProductAPI.getProductsBySearchTerm_Cache({
        ctrlData: {
          tags: ctrlTags,
          sortOrder: sort,
          cacheControl: CacheControl,
          cacheName: CacheName,
          procedure: Procedure,
        },
      });
      if (
        cardData !== null &&
        cardData !== undefined &&
        cardData.result !== undefined
      ) {
        let prods = cardData.result;
        let performancePCs: any = _.reject(prods, { Performance: "" });
        setProducts((prevProd) => {
          prevProd = prods;
          return prevProd;
        });
        setGamingPCs(performancePCs);
        onUpdateProductCount(prods.length);
        onPriceRageSet({
          min: _.min(_.map(prods, "price")),
          max: _.max(_.map(prods, "price")),
        });
      }
      setInitInfo(true);
    };

    getProductsBySearchTerm_Cache();
  }, []);

  useEffect(() => {
    let availableGames: any = _.filter(gameData, { Status: 1 });
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
        onUpdateProductCount={onUpdateProductCount}
        filterRange={filterRange}
        activeGames={activeGames}
        gamingPCs={gamingPCs}
        filteredGame={filteredGame}
        setFilteredGame={setFilteredGame}
        findPerformance={findPerformance}
        styles={styles}
      >
        {initInfo &&
        filterRange !== null &&
        filterRange.min !== undefined &&
        filterRange.max !== undefined
          ? _.orderBy(
              _.filter(products, (product) => {
                if (
                  product.price >= filterRange.min &&
                  product.price <= filterRange.max
                )
                  return product;
              }),
              ["price"],
              ["asc"]
            ).map((product) => {
              return (
                <ComponentCTRLCard
                  Product={product}
                  key={nanoid(6)}
                  gameDataFPS={gameData}
                  filteredGame={filteredGame}
                />
              );
            })
          : _.orderBy(products, ["price"], ["asc"]).map((product) => {
              return (
                <ComponentCTRLCard
                  Product={product}
                  key={nanoid(6)}
                  gameDataFPS={gameData}
                  filteredGame={filteredGame}
                />
              );
            })}
      </CardsWrapper>
    </>
  );
};

export default ComponentBySearchTermCache;
