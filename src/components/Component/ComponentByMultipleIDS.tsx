"use client";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { ProductAPI } from "@/custom/utils/actions";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import CardsWrapper from "../DynamicPage/CardsWrapper";
import ComponentCTRLCard from "./ComponentCTRLCard";
import { nanoid } from "nanoid";

const ComponentByMultipleIDS = (props: any) => {
  let ctrlTags = props.Tags;
  let sort = props.Sort;
  let CacheControl = props.CacheControl;
  let CacheName = props.CacheName;
  let Procedure = props.Procedure;
  let filterRange = props.filterRange;
  let gameData = props.gameData;
  const [products, setProducts] = useState([]);
  const [initInfo, setInitInfo] = useState(false);
  const isHD = useMediaQuery("(min-width: 1921px)");

  useEffect(() => {
    const getProductsBySearchTerm_Cache = async () => {
      let str = ctrlTags;
      let search = "";

      if (str.includes("|")) {
        search += "where c.parentiid <> 3 and p.status=1 and p.productid in (";
        _.map(_.split(str, "|"), (term) => {
          if (term.trim().length > 0) search += "" + term + ",";
        });
        search += " )";
      }

      const cardData = await ProductAPI.getProductsBySearchTerm_Cache({
        ctrlData: {
          tags: search,
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
        setProducts((prevProd) => {
          prevProd = prods;
          return prevProd;
        });
        props.onUpdateProductCount(prods.length);
        props.onPriceRageSet({
          min: _.min(_.map(prods, "price")),
          max: _.max(_.map(prods, "price")),
        });
      }
      setInitInfo(true);
    };

    getProductsBySearchTerm_Cache();
  }, []);

  return (
    <>
      <CardsWrapper
        initInfo={initInfo}
        products={products}
        onUpdateProductCount={props.onUpdateProductCount}
        filterRange={filterRange}
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
                />
              );
            })
          : _.orderBy(products, ["price"], ["asc"]).map((product) => {
              return (
                <ComponentCTRLCard
                  Product={product}
                  key={nanoid(6)}
                  gameDataFPS={gameData}
                />
              );
            })}
      </CardsWrapper>
    </>
  );
};

export default ComponentByMultipleIDS;
