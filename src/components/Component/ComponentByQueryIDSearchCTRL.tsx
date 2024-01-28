"use client";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { PalladiumAPI, ProductAPI } from "@/custom/utils/actions";
import _ from "lodash";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import styles from "@/styles/ComponentByQueryIDSearchCTRL.module.scss";
import CardsWrapper from "../DynamicPage/CardsWrapper";
import ComponentCTRLCard from "./ComponentCTRLCard";
import { useTheme } from "@/store/ThemeContext";

const ComponentByQueryIDSearchCTRL = (props: any) => {
  let sort = props.Sort;
  let CacheControl = props.CacheControl;
  let CacheName = props.CacheName;
  let filterRange = props.filterRange;
  let gameData = props.gameData;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    { catTitle: "All", catCnt: 0 },
  ]);
  const [brands, setBrands] = useState([
    {
      brandTxt: "All",
      brandCnt: 0,
    },
  ]);
  const [actCat, setActCat] = useState("");
  const [actBrand, setActBrand] = useState("");
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
        let category = [];
        let brand = [];
        _.map(data, (product) => {
          product.Performance = "";
          category.push(product.Filters);
          if (product.Brand === null) product.Brand = "Evetech";
          brand.push(product.Brand);
          return product;
        });

        category = _.uniq(category);
        brand = _.uniq(brand);

        let catFilters = [{ catTitle: "All", catCnt: data.length }];
        _.map(category, (cat) => {
          catFilters.push({
            catTitle: cat,
            catCnt: _.filter(data, (prod) => {
              return prod.Filters === cat;
            }).length,
          });
        });
        setCategories(
          _.filter(catFilters, function (o) {
            return o.catTitle !== null;
          })
        );

        let brandFilters = [
          {
            brandTxt: "All",
            brandCnt: data.length,
          },
        ];
        _.map(brand, (brnd) => {
          brandFilters.push({
            brandTxt: brnd,
            brandCnt: _.filter(data, (prod) => {
              return prod.Brand === brnd;
            }).length,
          });
        });
        setBrands(brandFilters);

        if (sort === 1) {
          data = _.sortBy(data, ["Price"]);
        }

        setProducts((prevProductsData) => {
          prevProductsData = data;
          return prevProductsData;
        });

        setPallData((prevPallData) => {
          prevPallData = _.map(data, (prod) => {
            if (prod.WEBID !== undefined) {
              return {
                WebId: prod.WEBID,
                Price: prod.price,
              };
            }
          });
          return prevPallData;
        });

        setFilteredProd((prevProductsData) => {
          prevProductsData = data;
          return prevProductsData;
        });

        props.onUpdateProductCount(data !== undefined ? data.length : 0);
        props.onPriceRageSet({
          min: _.min(_.map(data, "Price")),
          max: _.max(_.map(data, "Price")),
        });

        /* props.textFilters */
        let textFilters = _.map(_.uniq(_.map(data, "Brand")), (brand) => {
          return {
            field: "Brand",
            slug: brand,
            cnt: _.filter(data, (prod) => {
              return prod.Brand === brand;
            }).length,
          };
        });
        /* props.onTextFilterUpdate(_.orderBy(textFilters, ["cnt"], ["desc"])); */
      }
      setInitInfo(true);
    };

    fetchProducts();
  }, [props.Tags]);

  useEffect(() => {
    if (pallData.length > 0 && isDev) {
      const getPalladiumData = async () => {
        let auth = JSON.parse(localStorage.getItem("user_auth")) || null;
        const pallProdData = await PalladiumAPI.getPalladiumData({
          pDatas: pallData,
        });
        /*  const pallProdData = await fetch(`/palladium/pdata`, {
          method: "POST",
          headers: {
            Authorization:
              auth !== null && auth.token.length > 0
                ? "Bearer " + auth.token
                : "Bearer ",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({pDatas:pallData}),
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

  useEffect(() => {
    let filtered = products;
    try {
      if (actCat.trim().length > 0 && _.lowerCase(actCat.trim()) !== "all") {
        filtered = _.filter(filtered, (prod) => {
          return prod.Filters === actCat.trim();
        });
      }
    } catch (e) {}

    try {
      if (
        actBrand.trim().length > 0 &&
        _.lowerCase(actBrand.trim()) !== "all"
      ) {
        filtered = _.filter(filtered, (prod) => {
          return prod.Brand === actBrand.trim();
        });
      }
    } catch (e) {}

    setFilteredProd(filtered);
  }, [actCat, actBrand]);

  return (
    <>
      <div
        className={`
          ${styles.Filters} 
          ${isDarkMode ? `bg-dark` : `bg-light`}
          d-flex flex-column gap-2 justify-content-between flex-wrap px-2 pt-1 z-index-2
        `}
      >
        <div className="mt-2 mb-3 pt-1 d-flex gap-2 flex-wrap justify-content-between justify-content-lg-end">
          <div className={`d-flex gap-2`}>
            <FormGroup className="d-flex align-items-center gap-2">
              <span className="fw-2">
                <small className={`${isDarkMode ? `text-light` : `text-dark`}`}>
                  {"Category:"}
                </small>
              </span>
              <Form.Select
                name="categoryFitler"
                size="sm"
                onChange={(e) => {
                  setActCat(
                    _.first(
                      _.filter(categories, (cat: any) => {
                        return cat.catTitle === e.target.value;
                      })
                    ).catTitle
                  );
                  setActiveCat(e.target.value);
                }}
                value={actCat}
                className={`
                  ${isDarkMode ? `text-light bg-black border-secondary` : ``}
                `}
              >
                {_.map(categories, (cat) => {
                  return (
                    <option value={cat.catTitle} key={nanoid(3)}>
                      {cat.catTitle + " - " + cat.catCnt}
                    </option>
                  );
                })}
              </Form.Select>
            </FormGroup>
            <FormGroup className="d-flex align-items-center gap-2">
              <span className="fw-2">
                <small className={`${isDarkMode ? `text-light` : `text-dark`}`}>
                  {"Brand:"}
                </small>
              </span>
              <Form.Select
                name="brandFitler"
                size="sm"
                onChange={(e) => {
                  setActBrand(
                    _.first(
                      _.filter(brands, (brand: any) => {
                        return brand.brandTxt === e.target.value;
                      })
                    ).brandTxt
                  );
                }}
                className={`
                  ${isDarkMode ? `text-light bg-black border-secondary` : ``}
                `}
                value={actBrand}
              >
                {_.map(brands, (brand) => {
                  return (
                    <option value={brand.brandTxt} key={nanoid(4)}>
                      {brand.brandTxt + " - " + brand.brandCnt}
                    </option>
                  );
                })}
              </Form.Select>
            </FormGroup>
          </div>
        </div>
      </div>

      {isMD ? (
        <div className="d-flex gap-2 flex-wrap justify-content-center p-2 filter-tab ">
          {_.map(categories, (cat) => {
            return (
              <Button
                value={cat.catTitle}
                key={nanoid(3)}
                className={`
                  border rounded-pill d-flex align-items-center
                  ${isDarkMode ? `border-secondary text-light` : ``}
                  ${activeCat === cat.catTitle ? `text-light` : ``}
                `}
                size="sm"
                style={{
                  fontSize: ".75rem",
                  backgroundColor: activeCat === cat.catTitle ? `purple` : ``,
                }}
                variant={activeCat === cat.catTitle ? "dark" : ""}
                onClick={(e: any) => {
                  setActCat(
                    _.first(
                      _.filter(categories, (cat) => {
                        return cat.catTitle === e.target.value;
                      })
                    ).catTitle
                  );
                  setActiveCat(e.target.value);
                }}
              >
                {cat.catTitle + " - " + cat.catCnt}
              </Button>
            );
          })}
        </div>
      ) : null}

      <CardsWrapper
        initInfo={initInfo}
        products={products}
        onUpdateProductCount={props.onUpdateProductCount}
        filterRange={filterRange}
        styles={styles}
      >
        {initInfo &&
        filterRange !== null &&
        filterRange.min !== undefined &&
        filterRange.max !== undefined
          ? _.orderBy(
              _.filter(filteredProd, (product) => {
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
          : _.orderBy(filteredProd, ["price"], ["asc"]).map((product) => {
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

export default ComponentByQueryIDSearchCTRL;
