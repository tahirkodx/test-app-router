"use client";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { ProductAPI } from "@/custom/utils/actions";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import CardsWrapper from "../DynamicPage/CardsWrapper";
import FPSPCCard from "./FPSPCCard";

const _ = require("lodash");
const ComponentFPSDataByQueryID = (props: any) => {
  let sort = props.Sort;
  let CacheControl = props.CacheControl;
  let CacheName = props.CacheName;
  let filterRange = props.filterRange;
  const [products, setProducts] = useState([]);
  const [initInfo, setInitInfo] = useState(false);
  const isBig = useMediaQuery("(min-width: 1450px)");
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

        /* correct Price */
        _.map(data, (product: any) => {
          let priceIncVat = product.PriceIncVat;
          let discPrice = Math.round(parseFloat(priceIncVat) * 0.95238);
          product.Price = discPrice;
          return product;
        });

        if (sort === 1) {
          data = _.sortBy(data, ["Price"]);
        }

        setProducts((prevProductsData) => {
          prevProductsData = data;
          return prevProductsData;
        });

        props.onUpdateProductCount(data !== undefined ? data.length : 0);
        props.onPriceRageSet({
          min: _.min(_.map(data, "Price")),
          max: _.max(_.map(data, "Price")),
        });
      }
      setInitInfo(true);
    };
    fetchProducts();
  }, [props.Tags]);

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
                  product.Price >= filterRange.min &&
                  product.Price <= filterRange.max
                )
                  return product;
              }),
              ["Price"],
              ["asc"]
            ).map((product: any) => {
              return (
                <FPSPCCard
                  Product={product}
                  key={nanoid(7)}
                  activeFPS={props.activeFPS}
                />
              );
            })
          : _.orderBy(products, ["Price"], ["asc"]).map((product: any) => {
              return (
                <FPSPCCard
                  Product={product}
                  key={nanoid(7)}
                  activeFPS={props.activeFPS}
                />
              );
            })}
      </CardsWrapper>
    </>
  );
};

export default ComponentFPSDataByQueryID;
