"use client";
import React, { useEffect, useState } from "react";
import { Col, Form, Image, Stack } from "react-bootstrap";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import styles from "@/styles/FindGaming.module.scss";
import FindGameNav from "@/components/Laptop/Controls/FindGameNav";
import { useRouter, useParams, usePathname } from "next/navigation";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

import { nanoid } from "nanoid";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import CustomeSpinner from "@/components/CustomeSpinner";
import NoPageData from "@/components/NoPageData";

import DoubleRangeSlider from "@/components/DoubleRangeSlider";
import { FPSPCCard } from "@components";
// import LaptopHeader from "../../Layouts/LaptopHeader";

import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from "react-share";
import { ProductAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
// import LaptopFooter from "../../Layouts/LaptopFooter";

const _ = require("lodash");

const FindGamingLaptopsByFPS = () => {
  const pathname: any = usePathname();
  const params: any = useParams();
  const router = useRouter();
  // let gameTitle = params.game;
  // let resolutions = params.fps;

  const isLG = useMediaQuery("(min-width: 992px)");
  const isHD = useMediaQuery("(min-width: 1921px)");
  const [initProducts, setInitProducts] = useState(false);
  const [pcount, setPcount] = useState(0);
  const [products, setProducts] = useState([]);
  const [filtProducts, setFiltProducts] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [selectData, setSelectedData] = useState({});
  const [gameImg, setGameImg] = useState("");
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(999999);
  const [sortByFilter, setSortByFilter] = useState("fpsAsc");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("pcs");
  const [minRangeUp, setMinRangeUp] = useState(0);
  const [maxRangeUp, setMaxRangeUp] = useState(999999);
  const [gameTitle, setGameTitle] = useState("");
  const [resolutions, setResolutions] = useState("");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    if (params !== null && params !== undefined) {
      let gameTtl = params.game;
      let resol = params.fps;

      if (gameTtl !== undefined && gameTtl !== null) setGameTitle(gameTtl);

      if (resol !== undefined && resol !== null) setResolutions(resol);
    }
  }, [params]);

  useEffect(() => {
    const getPcGameData = async () => {
      const gameDatas = await ProductAPI.getPcGameData();

      let gamesData = gameDatas.result;
      setGameData(gamesData);
    };

    const fetchPageData = async () => {
      const pdatas = await ProductAPI.gamingLaptopsByFps();

      let prods = pdatas.result;
      setProducts(prods);
      if (prods.length > 0) {
        let filProds = _.filter(
          _.map(prods, (product: any) => {
            let gameData = JSON.parse(product.gameData);
            let selectedGameData = _.first(
              _.filter(gameData, (game: any) => {
                return game.titles.trim() === gameTitle;
              })
            );

            if (selectedGameData !== undefined) {
              product.gameData = selectedGameData;
              if (resolutions.includes("1080"))
                product.FPSScore = selectedGameData.fullHdFps;
              else if (resolutions.includes("1440"))
                product.FPSScore = selectedGameData.quadHdFps;
              else product.FPSScore = selectedGameData.ultra4k;
              product.FPS = resolutions;
            }
            let priceIncVat = product.PriceIncVat;
            let discPrice = Math.round(parseFloat(priceIncVat) * 0.95238);
            product.Price = discPrice;
            return product;
          }),
          (product: any) => {
            return (
              product.FPSScore !== undefined &&
              product.FPSScore.trim().length > 0
            );
          }
        );
        setFiltProducts(filProds);
        setFilteredProducts(filProds);
      }
      setInitProducts(true);
    };
    if (
      !initProducts &&
      gameTitle.trim().length > 0 &&
      resolutions.trim().length > 0
    ) {
      getPcGameData();
      fetchPageData();
    }
  }, [gameTitle, resolutions]);

  useEffect(() => {
    let FPSScores = _.map(filtProducts, (product: any) => {
      return Number(product.FPSScore);
    });
    setMin(_.min(FPSScores));
    setMax(_.max(FPSScores));
  }, [filtProducts]);

  useEffect(() => {
    let game = _.first(
      _.filter(gameData, (game: any) => {
        if (game.gameTitle.trim() === gameTitle.trim()) return game;
      })
    );
    setSelectedData(game);
    try {
      setGameImg(game.gameImg);
    } catch (ex) {}
  }, [gameData]);

  useEffect(() => {
    setPcount(filteredProducts.length);
  }, [filteredProducts]);

  const setRange = (min: any, max: any) => {
    setMinRange(Number(min));
    setMaxRange(Number(max));
  };

  const onActiveTabSet = (tabStr: any) => {
    setActiveTab(tabStr);
  };

  const currentURL = pathname.replace(
    "http://localhost:3000/",
    "https://www.evetech.co.za/"
  );

  const sortOrder = (filter: any) => {
    switch (filter) {
      case "fpsAsc":
      case "priceAsc":
        return "asc";
      case "fpsDesc":
      case "priceDesc":
        return "desc";
      default:
        return "asc";
    }
  };

  const sortBy = (filter: any) => {
    switch (filter) {
      case "fpsAsc":
      case "fpsDesc":
        return "FPSScore";
      case "priceAsc":
      case "priceDesc":
        return "Price";
      default:
        return "FPSScore";
    }
  };

  let newFilteredProducts = _.map(filteredProducts, (item: any) => {
    let newItem = _.clone(item);
    newItem.FPSScore = Number(newItem.FPSScore);
    return newItem;
  });

  return (
    <>
      <ComponentsHeader />
      <main className={`${styles.Main} pt-5 px-2`}>
        {darkMode ? (
          <div className="position-absolute w-100 h-100 bg-black bg-opacity-50 z-index-1 top-0 start-0"></div>
        ) : null}
        <Col md={{ span: 10, offset: 1 }} className={`${styles.MainCol}`}>
          <Stack gap={4} className="mb-5">
            <div className="d-flex justify-content-center align-items-center">
              <Image
                src={gameImg}
                alt={gameTitle}
                className={`${styles.FinalGame} rounded border`}
              />
              <h1 className="text-light border-0 p-1 pt-3 p-md-3 pt-md-4 mt-2 bg-black bg-opacity-50 rounded-0 rounded-end">
                <div className="fs-6 fw-1">
                  <small className="bg-black rounded-pill px-2 py-1">
                    <small>Gaming Laptops for</small>
                  </small>
                </div>
                <div className={`${styles.MainTitle} fs-2 m-1`}>
                  <span className="text-info">{gameTitle} </span>
                  <span className="fw-1">@ {resolutions}</span>
                </div>
              </h1>
            </div>

            {!initProducts && <CustomeSpinner variant="info" />}

            {initProducts && (
              <div
                className={`${styles.Pagination} d-flex justify-content-between align-items-center justify-content-center bg-dark text-light rounded-bottom p-2 border-bottom gap-2 position-sticky`}
              >
                <span className="d-flex gap-2 align-items-center justify-content-between w-100">
                  <span className="d-flex  gap-2 align-items-center">
                    <Image
                      src={gameImg}
                      alt={gameTitle}
                      className={`${styles.SmallGame} rounded h-100`}
                    />
                    <h2 className={`${styles.FiltersTitle} fs-4 m-0`}>
                      <span className="text-info">{gameTitle} </span>
                      <span className="fw-1">@ {resolutions}</span> ({pcount})
                    </h2>
                    <span className="d-flex gap-1 fs-5">
                      <WhatsappShareButton url={currentURL} title="">
                        <FaWhatsapp className="text-success" />
                      </WhatsappShareButton>
                      <FacebookShareButton url={currentURL} hashtag="">
                        <FaFacebook className="text-primary" />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={currentURL}
                        title=""
                        via=""
                        hashtags={[""]}
                        // related=""
                      >
                        <FaTwitter className="text-info" />
                      </TwitterShareButton>
                    </span>
                  </span>

                  <span
                    className={`${styles.Filters} d-flex align-items-center justify-content-between gap-2 bg-dark  mx-md-0 p-2 p-xl-0 rounded`}
                  >
                    <div>
                      <Form.Select
                        aria-label="Default select example"
                        className={`
                          ${styles.SmallSelect}
                          ${
                            darkMode
                              ? `bg-black text-light border-secondary border-opacity-75`
                              : ``
                          }
                        `}
                        size="sm"
                        key={nanoid(2)}
                        onChange={(event) => {
                          setSortByFilter(event.target.value);
                        }}
                        value={sortByFilter}
                      >
                        <option value="fpsAsc">Sort By</option>
                        <option value="fpsAsc">▲ FPS</option>
                        <option value="fpsDesc">▼ FPS</option>
                        <option value="priceAsc">▲ Price</option>
                        <option value="priceDesc">▼ Price</option>
                      </Form.Select>
                    </div>
                    <div className={styles.RangeSlider}>
                      {min !== null &&
                        max !== null &&
                        min !== undefined &&
                        max !== undefined && (
                          <DoubleRangeSlider
                            min={min}
                            max={max}
                            onChange={({ min, max }) => setRange(min, max)}
                            // Remove the 'title' prop
                            onMouseUp={({ min, max }) => {
                              setMinRangeUp(min);
                              setMaxRangeUp(max);
                            }}
                            onTouchEnd={({ min, max }) => {
                              setMinRangeUp(min);
                              setMaxRangeUp(max);
                            }}
                          />
                        )}
                    </div>
                  </span>
                </span>
              </div>
            )}

            {products !== null &&
              products !== undefined &&
              products.length > 0 && (
                <div
                  className={`
                    ${isHD ? `cols-xxl-5` : ``} 
                    d-grid cols-2 cols-sm-3 cols-lg-3 cols-xxl-4 gap-2 gap-md-3 gap-lg-3 gap-xxl-5 pb-4
                  `}
                >
                  <svg width="0" height="0" className="position-absolute">
                    <linearGradient
                      id="purpleGradient1"
                      x1="0"
                      x2="1"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#AF40FF" />
                      <stop offset="50%" stopColor="#5B42F3" />
                      <stop offset="100%" stopColor="#00DDEB" />
                    </linearGradient>
                    {/* Level up  */}
                    <linearGradient
                      id="LevelUp"
                      x1={"0"}
                      x2={"1"}
                      y1={"0"}
                      y2={"1"}
                    >
                      <stop offset="0%" stopColor={"#5757D9"} />
                      <stop offset="100%" stopColor={"#21D9F7"} />
                    </linearGradient>
                    {/* Clearance  */}
                    <linearGradient
                      id="Clearance"
                      x1={"1"}
                      x2={"0"}
                      y1={"1"}
                      y2={"0"}
                    >
                      <stop offset="0%" stopColor={"#f25025"} />
                      <stop offset="100%" stopColor={"#ff8e41"} />
                    </linearGradient>
                  </svg>
                  {_.map(
                    _.orderBy(
                      _.filter(newFilteredProducts, (product: any) => {
                        return (
                          product.FPSScore <= maxRangeUp &&
                          product.FPSScore >= minRangeUp
                        );
                      }),
                      [sortBy(sortByFilter)],
                      [sortOrder(sortByFilter)]
                    ),
                    (product: any) => {
                      return (
                        <FPSPCCard
                          Product={product}
                          key={nanoid(7)}
                          activeFPS={resolutions}
                        />
                      );
                    }
                  )}
                </div>
              )}

            {initProducts && filtProducts.length === 0 && <NoPageData />}
          </Stack>
        </Col>

        <FindGameNav />
      </main>
    </>
  );
};

export default FindGamingLaptopsByFPS;
