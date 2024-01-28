"use client";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import React, { useEffect, useState } from "react";
import styles from "@/styles/component/DynamicPage.module.scss";
import { ProductAPI } from "@/custom/utils/actions";
import _ from "lodash";
import { nanoid } from "nanoid";
import ComponentCTRLCard from "@/components/Component/ComponentCTRLCard";
import CardsWrapper from "@/components/DynamicPage/CardsWrapper";

const ComponentByQueryID = ({ ...props }: any) => {
  let sort = props.Sort;
  let CacheControl = props.CacheControl;
  let CacheName = props.CacheName;
  let filterRange = props.filterRange;
  let gameData = props.gameData;
  let [activeGames, setActiveGames] = useState("");
  let [filteredGame, setFilteredGame] = useState("");
  let [gamingPCs, setGamingPCs] = useState("");
  const [initInfo, setInitInfo] = useState(false);
  const [products, setProducts] = useState([]);
  const isMD = useMediaQuery("(min-width: 768px)");
  const isHD = useMediaQuery("(min-width: 1921px)");

  useEffect(() => {
    const fetchProducts = async () => {
      const pdatas = await ProductAPI.getComponentByQueryID({
        queryId: props.Tags,
        cache: CacheControl,
        cacheName: CacheName,
      });
      if (
        pdatas !== null &&
        pdatas !== undefined &&
        pdatas.result !== undefined
      ) {
        let data = pdatas.result;

        let performancePCs:any = _.reject(data, { Performance: "" });
        setGamingPCs(performancePCs);

        if (sort === 1) {
          data = _.sortBy(data, ["price"]);
        }

        setProducts((prevProductsData) => {
          prevProductsData = data;
          return prevProductsData;
        });

        props.onUpdateProductCount(data !== undefined ? data.length : 0);
        props.onPriceRageSet({
          min: _.min(_.map(data, "price")),
          max: _.max(_.map(data, "price")),
        });
      }
      setInitInfo(true);
    };
    fetchProducts();
  }, [props.Tags]);

  useEffect(() => {
    let availableGames:any = _.filter(gameData, { Status: 1 });
    setActiveGames(availableGames);
  }, []);

  const findPerformance = () => {
    if (_.find(products, "Performance") !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    /* console.log("filterdGame", filterdGame); */
  }, [filteredGame]);

  return (
    <>
      <CardsWrapper
        initInfo={initInfo}
        products={products}
        onUpdateProductCount={props.onUpdateProductCount}
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
              _.filter(products, (product: any) => {
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

export default ComponentByQueryID;
