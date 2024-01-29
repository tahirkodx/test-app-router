"use client";
import React from "react";
import { customAlphabet } from "nanoid";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import LaptopDetailBanners from "./Banners/LaptopDetailBanners";
import styles from "@/styles/PCByCategory.module.scss";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import PCCards from "@/components/PCCards";
import Paginator from "@/components/Paginator";
import { Helmet } from "react-helmet";
import NoPageData from "@/components/NoPageData";
import { useRouter } from "next/navigation";
import { ProductAPI } from "@/custom/utils/actions";
import Spinner from "@/components/Spinner";
import { get } from "lodash";
import { useTheme } from "@/store/ThemeContext";
import { isSelectDark } from "./Auth/LoginModal";
import useMediaQuery from "@/custom/hooks/useMediaQuery";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");

const PCByCategory = (props: any) => {
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const [category, setCategory] = useState<any>({});
  const [productData, setProductData] = useState<any[]>([]);
  const [pcount, setPcount] = useState<any>(0);
  const [gameData, setGameData] = useState<any[]>([]);
  const [activeGames, setActiveGames] = useState<any>("");
  const [filterdGame, setFilterdGame] = useState<any>("");
  const [gamingPCs, setGamingPCs] = useState<any>("");
  const [initProducts, setInitProduct] = useState<any>(false);
  const [initPage, setInitPage] = useState<any>(false);
  const router = useRouter();
  const [CategoryId, setCategoryId] = useState(0);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const isHD = useMediaQuery("(min-width: 1921px)");

  useEffect(() => {
    let CID: any = parseInt(props.cid);
    if (isNaN(CID)) {
      try {
        CID = parseInt(CID.replace(".", "").replace("aspx", "").trim());
        setCategoryId(CID);
      } catch (e) {
        router.push("/");
      }
    } else {
      setCategoryId(CID);
    }
  }, [props]);

  const RenderHTML = (props: any) => (
    <div dangerouslySetInnerHTML={{ __html: props.HTML }}></div>
  );
  const RenderTitle = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  useEffect(() => {
    const PCByCategoryID = async () => {
      const prods = await ProductAPI.getPCByCategoryID({
        categoryParams: {
          categoryID: CategoryId,
          ProductCount: 0,
          CategoryName: "",
          CategoryDes: "",
          Keywords: "",
          Title: "",
          MetaDes: "",
          SortOrder: 2,
          StartValue: 0,
          EndValue: 9999999,
        },
      });
      /* const prods = await fetch(`/api/PCByCategoryID`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            categoryParams: {
              categoryID: CategoryId,
              ProductCount: null,
              CategoryName: "",
              CategoryDes: "",
              Keywords: "",
              Title: "",
              MetaDes: "",
              SortOrder: 2,
              StartValue: 0,
              EndValue: 9999999,
            },
          }),
        }).then((res) => res.json());
 */
      if (
        prods !== null &&
        prods !== undefined &&
        prods.result !== undefined &&
        prods.result !== null
      ) {
        let categoryData = prods.result;

        categoryData.map((prod: any) => {
          prod.product_type = 1;
        });

        let performancePCs = _.reject(categoryData, { Performance: "" });
        setGamingPCs(performancePCs);

        setPcount(categoryData !== undefined ? categoryData.length : 0);
        setProductData(categoryData);
      }
      setInitProduct(true);
    };

    const getCategoryInfo = async () => {
      const categoryData = await ProductAPI.getCategoryById({ CategoryId });
      if (
        categoryData !== null &&
        categoryData !== undefined &&
        categoryData.result !== undefined &&
        categoryData.result !== null
      ) {
        let categoryInfo = categoryData.result[0];
        setCategory(categoryInfo);
      }
      /*  const categoryData = await fetch(`/api/GetCategoryById/${CategoryId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }).then((res) => res.json()); */
    };

    const getGameData = async () => {
      const gameDatas = await ProductAPI.getPcGameData();
      if (
        gameDatas !== null &&
        gameDatas !== undefined &&
        gameDatas.result !== undefined &&
        gameDatas.result !== null
      ) {
        let gamesData = gameDatas.result;
        setGameData(gamesData);
      }
      /* const gameDatas = await fetch(`/api/getPcGameData`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }).then((res) => res.json()); */
    };

    if (!initPage && CategoryId > 0) {
      PCByCategoryID();
      getCategoryInfo();
      getGameData();
      setInitPage(true);
    }
  }, [CategoryId]);

  useEffect(() => {
    let availableGames = _.filter(gameData, { Status: 1 });
    setActiveGames(availableGames);
  }, [gameData]);

  const findPerformance = () => {
    if (_.find(productData, "Performance") !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {}, [activeGames]);

  useEffect(() => {}, [filterdGame]);

  return (
    <>
      {category !== undefined && (
        <Helmet>
          <title itemProp="name" lang="en">
            {category.TitleText}
          </title>
          <meta name="description" content={category.MetaDescription}></meta>
        </Helmet>
      )}
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <Container fluid className={`${darkMode ? `bg-dark` : ``} py-4`}>
        {initPage && (
          <Row>
            <Col lg={10}>
              <div
                className={`
                ${styles.Overview}
                ${darkMode ? `text-light` : ``}
              `}
              >
                <RenderTitle HTML={category.Description} />
              </div>
              <div className="clearfix">
                <br></br>
              </div>
              <div
                className={`
                  ${styles.Pagination} 
                  ${darkMode ? `bg-dark text-light` : `bg-light`}
                  d-flex justify-content-between flex-wrap align-items-center rounded-bottom p-2 border-bottom gap-2
                `}
              >
                <h2 className={`fs-6 m-0`}>
                  {category.name} ({pcount})
                </h2>
                {pcount === 0 ? null : <Paginator />}

                {findPerformance() &&
                productData.length > 0 &&
                activeGames !== undefined &&
                activeGames.length > 1 &&
                gamingPCs.length > 0 ? (
                  <div
                    className={`${styles.FpsSelector} d-grid position-sticky z-index-1 pe-none`}
                  >
                    <div className="d-flex bg-danger rounded">
                      <div className="text-light fst-italic px-2 d-flex align-items-center fw-2">
                        FPS
                      </div>

                      <select
                        className={`
                          pe-auto form-select form-select-sm
                          ${isSelectDark(darkMode)}
                        `}
                        onChange={(e) => setFilterdGame(e.target.value)}
                        value={filterdGame}
                      >
                        {activeGames !== undefined &&
                          activeGames.length > 1 &&
                          activeGames.map((Select: any) => {
                            return (
                              <option value={Select.gameTitle} key={nanoid(7)}>
                                {Select.gameTitle}
                              </option>
                            );
                          })}
                      </select>

                      {/* <Form.Select
                                onChange={(e) => setFilterdGame(e.target.value)}
                                defaultValue={filterdGame}
                                size="sm"
                                className="pe-auto"
                            >
                                {activeGames !== undefined && activeGames.length > 1 && activeGames.map((Select) => {
                                return (
                                    <option value={Select.gameTitle} key={nanoid(7)}>
                                    {Select.gameTitle}
                                    </option>
                                );
                                })}
                            </Form.Select> */}
                    </div>
                  </div>
                ) : null}
              </div>
              <Row>
                <Container fluid>
                  <div
                    className={`
                      ${isHD ? `cols-xxl-5` : `cols-xxl-4`}
                      d-grid cols-2 cols-sm-3 cols-lg-3 cols-xxl-4 gap-xxl-5 gap-2 gap-md-3 my-3
                    `}
                  >
                    {initProducts &&
                      productData &&
                      productData.map((product, ind) => (
                        <PCCards
                          product={product}
                          key={nanoid(5)}
                          gameDataFPS={gameData}
                          filterdGame={filterdGame}
                        />
                      ))}
                  </div>

                  {!initProducts ? (
                    <section className="w-100 d-flex justify-content-center align-items-center gap-3 p-5 flex-wrap">
                      <Spinner animation="border" variant="primary" /> Loading
                      Products
                    </section>
                  ) : (
                    productData !== undefined &&
                    productData.length === 0 && <NoPageData isProduct={true} />
                  )}
                </Container>
              </Row>
            </Col>
            <Col lg={2}>
              {/* Temporary */}
              <LaptopDetailBanners />
            </Col>
          </Row>
        )}

        {!initPage && <Spinner isEve={false} />}
      </Container>
    </>
  );
};

export default PCByCategory;
