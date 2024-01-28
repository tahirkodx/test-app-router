"use client";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { ProductAPI } from "@/custom/utils/actions";
import React, { useEffect, useState } from "react";
import CardsWrapper from "../DynamicPage/CardsWrapper";
import ComponentCTRLCard from "./ComponentCTRLCard";
import { nanoid } from "nanoid";

const _ = require("lodash");

const ComponentBySearchTerm = (props: any) => {
  let ctrlTags = props.Tags;
  let sort = props.Sort;
  let CacheControl = props.CacheControl;
  let CacheName = props.CacheName;
  let ctrlType = props.ctrlType;
  let filterRange = props.filterRange;
  let gameData = props.gameData;
  const [products, setProducts] = useState([]);
  const [initInfo, setInitInfo] = useState(false);
  const isHD = useMediaQuery("(min-width: 1921px)");

  useEffect(() => {
    const getProductsBySearchTerm_Cache = async () => {
      let str = ctrlTags;
      let search = "";
      let search2 = "";
      let search3 = "";
      let Procedure = "";

      if (str.includes("|")) {
        search += "where c.parentiid=3 and p.status=1  and (";
        _.map(_.split(str, "|"), (term: any) => {
          if (term.trim().length > 0) {
            search =
              search +
              "p.name LIKE '%" +
              term +
              "%' or ttt.tag like '%" +
              term +
              "%' or ";
          }
        });
        search = _.trimEnd(search, "or");
        search += " )";
      }

      if (ctrlType === 8) {
        Procedure = "get_pcs_multiple_search_terms";
      } else if (ctrlType === 9) {
        Procedure = "get_comp_multiple_search_terms";
        search = "";
        search += "where c.parentiid <> 3 and p.status=1  and (";
        _.map(_.split(str, "|"), (term: any) => {
          if (term.trim().length > 0) {
            search =
              search +
              "p.name LIKE '%" +
              term +
              "%' or ttt.tag like '%" +
              term +
              "%' or ";
          }
        });
        search = _.trimEnd(search, "or");
        search += " )";
      } else if (ctrlType === 10) {
        Procedure = "get_comp_multiple_search_terms";

        search2 += "where c.parentiid <>3 and p.status=1  and (";
        _.map(_.split(str, "|"), (term: any) => {
          if (term.trim().length > 0) {
            search2 =
              search2 +
              "p.name LIKE '%" +
              term +
              "%' or ttt.tag like '%" +
              term +
              "%' or ";
          }
        });
        search2 = _.trimEnd(search2, "or");
        search2 += " )";
      } else if (ctrlType === 11) {
        Procedure = "get_pcs_laptops_comp_multiple_search_terms";

        search2 += "where c.parentiid <>3 and p.status=1  and (";
        _.map(_.split(str, "|"), (term: any) => {
          if (term.trim().length > 0) {
            search2 =
              search2 +
              "p.name LIKE '%" +
              term +
              "%' or ttt.tag like '%" +
              term +
              "%' or ";
          }
        });
        search2 = _.trimEnd(search2, "or");
        search2 += " )";

        search3 += "where p.status=1  and (";
        _.map(_.split(str, "|"), (term: any) => {
          if (term.trim().length > 0) {
            search3 =
              search3 +
              "p.name LIKE '%" +
              term +
              "%' or ttt.tag like '%" +
              term +
              "%' or ";
          }
        });
        search3 = _.trimEnd(search3, "or");
        search3 += " )";
      }

      const cardData = await ProductAPI.getProductsBySearchTerm({
        ctrlData: {
          tags: search,
          tags2: search2,
          tags3: search3,
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
        console.log("prods", prods);
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

export default ComponentBySearchTerm;
