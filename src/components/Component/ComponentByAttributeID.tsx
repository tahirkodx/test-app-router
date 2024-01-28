"use client";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { ProductAPI } from "@/custom/utils/actions";
import React, { useEffect, useState } from "react";
import CardsWrapper from "../DynamicPage/CardsWrapper";
import { nanoid } from "nanoid";
import ComponentCTRLCard from "./ComponentCTRLCard";
const _ = require("lodash");

const ComponentByAttributeID = (props: any) => {
  let ctrlId = props.CtrlId;
  let cacheControl = props.CacheControl;
  let cacheName = props.CacheName;
  let filterRange = props.filterRange;
  let gameData = props.gameData;
  const [products, setProducts] = useState([]);
  const [initInfo, setInitInfo] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const pdatas = await ProductAPI.getComponentByAttributeId({
        Query: {
          AttID: ctrlId,
          PCount: null,
          Cname: "",
          Cdes: "",
          Keywords: "",
          titleText: "",
          MetaDes: "",
          Sort: 1,
          StartValue: 0,
          EndValue: 999999,
          cache: cacheControl,
          cacheName: cacheName,
        },
      });
      if (
        pdatas !== null &&
        pdatas !== undefined &&
        pdatas.result !== undefined
      ) {
        let data = pdatas.result;
        setProducts((prevProd) => {
          prevProd = data;
          return prevProd;
        });
        props.onUpdateProductCount(data.length);
        props.onPriceRageSet({
          min: _.min(_.map(data, "price")),
          max: _.max(_.map(data, "price")),
        });
      }
      setInitInfo(true);
    };
    fetchProducts();
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
            ).map((product: any) => {
              return (
                <ComponentCTRLCard
                  Product={product}
                  key={nanoid(6)}
                  gameDataFPS={gameData}
                />
              );
            })
          : _.orderBy(products, ["price"], ["asc"]).map((product: any) => {
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

export default ComponentByAttributeID;
