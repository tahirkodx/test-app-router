"use client";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { PalladiumAPI, ProductAPI } from "@/custom/utils/actions";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import styles from "@/styles/ComponentByDeal.module.scss";
import CardsWrapper from "../DynamicPage/CardsWrapper";
import ComponentCTRLCard from "./ComponentCTRLCard";
import { useTheme } from "@/store/ThemeContext";
const _ = require("lodash");

const ComponentByDeal = (props: any) => {
  let sort = props.Sort;
  let CacheControl = props.CacheControl;
  let CacheName = props.CacheName;
  let Procedure = props.Procedure;
  let filterRange = props.filterRange;
  let gameData = props.gameData;
  let dealId = props.dealId;
  const [filters, setFilters] = useState([
    { filterTitle: "All", filterCnt: 0 },
  ]);
  const [products, setProducts] = useState([]);
  const [actFilter, setActFilter] = useState("");
  const [filteredProd, setFilteredProd] = useState([]);
  const [activeCat, setActiveCat] = useState("All");
  const isMD = useMediaQuery("(min-width: 768px)");
  const isHD = useMediaQuery("(min-width: 1921px)");
  const [initInfo, setInitInfo] = useState(false);
  const [pallData, setPallData] = useState([]);
  const [pallRecData, setPallRecData] = useState([]);
  const [isDev, setIsDev] = useState(
    props.isDev !== undefined ? props.isDev : false
  );
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    const getProductsBySearchTerm_Cache = async () => {
      const cardData = await ProductAPI.getProductByDeal({
        ctrlData: {
          tags: dealId,
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

        let filterAr = [];
        _.map(prods, (product: any) => {
          product.Performance = "";
          filterAr.push(product.Filters);
          return product;
        });
        filterAr = _.uniq(filterAr);

        let prodFilters = [{ filterTitle: "All", filterCnt: prods.length }];
        _.map(filterAr, (fltrTxt: any) => {
          prodFilters.push({
            filterTitle: fltrTxt,
            filterCnt: _.filter(prods, (prod: any) => {
              return prod.Filters === fltrTxt;
            }).length,
          });
        });
        setFilters(prodFilters);

        setProducts((prevProd) => {
          prevProd = prods;
          return prevProd;
        });

        setPallData((prevPallData) => {
          prevPallData = _.map(prods, (prod: any) => {
            if (prod.WEBID !== undefined) {
              return {
                WebId: prod.WEBID,
                Price: prod.price,
              };
            }
          });
          return prevPallData;
        });

        setFilteredProd(prods);
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

  useEffect(() => {
    let filtered = products;
    try {
      if (
        actFilter.trim().length > 0 &&
        _.lowerCase(actFilter.trim()) !== "all"
      ) {
        filtered = _.filter(filtered, (prod: any) => {
          return prod.Filters === actFilter.trim();
        });
      }
    } catch (e) {}
    setFilteredProd(filtered);
  }, [actFilter]);

  useEffect(() => {
    if (pallData.length > 0 && isDev) {
      const getPalladiumData = async () => {
        let auth = JSON.parse(localStorage.getItem("user_auth")) || null;
        const pallProdData = await PalladiumAPI.getPalladiumData({
          pDatas: pallData,
        });

        /* const pallProdData = await fetch(`/palladium/pdata`, {
          method: "POST",
          headers: {
            Authorization:
              auth !== null && auth.token.length > 0
                ? "Bearer " + auth.token
                : "Bearer ",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ pDatas: pallData }),
        }).then((res) => res.json()); */
        let pallRecord = pallProdData.result;
        if (pallRecord !== undefined && pallRecord.length > 0) {
          let pallDataN = pallRecord;
          setPallRecData((prevData) => {
            prevData = pallDataN;
            return prevData;
          });
        }
      };

      getPalladiumData();
    }
  }, [pallData, isDev]);

  return (
    <>
      <div className={styles.Main}>
        {initInfo && filters.length > 1 && (
          <>
            <FormGroup
              className={`
                ${styles.Filters} 
                ${darkMode ? `bg-dark` : `bg-light`}
                d-flex gap-2 p-2 align-items-center justify-content-center justify-content-lg-end z-index-2
              `}
              id="productCards"
            >
              <small className="fw-2">{"Category:"}</small>
              <span>
                <Form.Select
                  name="categoryFitler"
                  size="sm"
                  onChange={(e) => {
                    setActFilter(
                      _.first(
                        _.filter(filters, (fltr: any) => {
                          return fltr.filterTitle === e.target.value;
                        })
                      ).filterTitle
                    );
                    setActiveCat(e.target.value);
                  }}
                  value={actFilter}
                  className={` ${
                    isDarkMode
                      ? "text-light bg-black border-secondary"
                      : "text-dark"
                  }`}
                >
                  {_.map(filters, (fltr: any) => {
                    return (
                      <option value={fltr.filterTitle} key={nanoid(3)}>
                        {fltr.filterTitle + " - " + fltr.filterCnt}
                      </option>
                    );
                  })}
                </Form.Select>
              </span>
            </FormGroup>

            {isMD ? (
              <div className="d-flex gap-2 flex-wrap mt-3 justify-content-center">
                {_.map(filters, (fltr: any) => {
                  return (
                    <Button
                      value={fltr.filterTitle}
                      key={nanoid(3)}
                      className={`
                        border rounded-pill d-flex align-items-center 
                        ${isDarkMode ? `border-secondary text-light` : ``}
                        ${activeCat === fltr.filterTitle ? `text-light` : ``}
                      `}
                      size="sm"
                      style={{
                        fontSize: ".75rem",
                        backgroundColor:
                          activeCat === fltr.filterTitle ? `purple` : ``,
                      }}
                      variant={
                        activeCat === fltr.filterTitle
                          ? `${isDarkMode ? `dark` : ``}`
                          : ""
                      }
                      onClick={(e: any) => {
                        setActFilter(
                          _.first(
                            _.filter(filters, (fltr: any) => {
                              return fltr.filterTitle === e.target.value;
                            })
                          ).filterTitle
                        );
                        setActiveCat(e.target.value);
                      }}
                    >
                      {fltr.filterTitle + " - " + fltr.filterCnt}
                    </Button>
                  );
                })}
              </div>
            ) : null}
          </>
        )}

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
                _.filter(filteredProd, (product: any) => {
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
                    palladiumData={
                      pallRecData.length > 0
                        ? _.find(pallRecData, (prData: any) => {
                            if (product.WEBID === prData.webid) return prData;
                          })
                        : {}
                    }
                  />
                );
              })
            : _.orderBy(filteredProd, ["price"], ["asc"]).map(
                (product: any) => {
                  return (
                    <ComponentCTRLCard
                      Product={product}
                      key={nanoid(6)}
                      gameDataFPS={gameData}
                      palladiumData={
                        pallRecData.length > 0
                          ? _.find(pallRecData, (prData: any) => {
                              if (product.WEBID === prData.webid) return prData;
                            })
                          : {}
                      }
                    />
                  );
                }
              )}
        </CardsWrapper>
      </div>
    </>
  );
};

export default ComponentByDeal;
