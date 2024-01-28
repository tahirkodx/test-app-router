"use client";
import useClickScroll from "@/custom/hooks/useClickScroll";
import { ProductAPI } from "@/custom/utils/actions";
import AuthContext from "@/store/auth-context";
import HTMLReactParser from "html-react-parser";
import _ from "lodash";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "@/styles/component/DynamicPage.module.scss";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { ComponentsHeader } from "@/components/Home";
import Spinner from "@/components/Spinner";
import DoubleRangeSlider from "@/components/Component/DoubleRangeSlider";
import ComponentByQueryID from "@/components/Component/ComponentByQueryID";
import ComponentBySearchTermCache from "@/components/Component/ComponentBySearchTermCache";
import ComponentByAttributeID from "@/components/Component/ComponentByAttributeID";
import ComponentBySearchTerm from "@/components/Component/ComponentBySearchTerm";
import ComponentByMultipleIDS from "@/components/Component/ComponentByMultipleIDS";
import ComponentByDeal from "@/components/Component/ComponentByDeal";
import ComponentWithPCConfigSearch from "@/components/Component/ComponentWithPCConfigSearch";
import ComponentByQueryIDSearchCTRL from "@/components/Component/ComponentByQueryIDSearchCTRL";
import ComponentFPSDataByQueryID from "@/components/Component/ComponentFPSDataByQueryID";
import Script from "next/script";
import { useTheme } from "@/store/ThemeContext";
import EditDynamicOverlay from "@/components/EditDynamicOverlay";

const Home = () => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  const authCtx = useContext(AuthContext);
  const { clickScroll } = useClickScroll();
  const router = useRouter();
  const params = useParams();
  const [pageId, setPageId] = useState("");
  const [pageEditId, setPageEditId] = useState(0);
  const [pageData, setPageData] = useState({});
  const [pcount, setPcount] = useState(0);
  const [bgcolor, setBgcolor] = useState("");
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(999999);
  const [minRangeUp, setMinRangeUp] = useState(0);
  const [maxRangeUp, setMaxRangeUp] = useState(999999);
  const [gameData, setGameData] = useState([]);
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const [isTopDesSet, setIsTopDesSet] = useState(false);
  const [tDes, setTDes] = useState("");
  const [bDes, setBDes] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [ctrlHeading, setCtrlHeading] = useState("");
  const [ctrlType, setCtrlType] = useState(0);
  const [tags, setTags] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [leftBar, setLeftBar] = useState("");
  const [CacheControl, setCacheControl] = useState("");
  const [name, setName] = useState("");
  const [ctrlId, setCtrlId] = useState("");

  const [initPageData, setInitPageData] = useState(false);
  const [activeFPS, setActiveFPS] = useState("1080p");
  const topDes = useRef<any>();

  const prodCardsLink = () => {
    clickScroll("productCards", 110);
  };

  useEffect(() => {
    let PID: any = params?.id;
    if (PID !== undefined && PID.length > 0) {
      if (isNaN(PID)) {
        try {
          PID = PID.replace(".", "").replace("aspx", "").trim();
        } catch (e) {
          router.push("/");
        }
      }
      setPageId(PID);
    }
  }, [params]);

  useEffect(() => {
    const fetchPageData = async () => {
      const pdatas = await ProductAPI.getPages({ pageId });

      if (pdatas && pdatas.result !== null && pdatas.result.length > 0) {
        let data = pdatas.result[0];
        if (data) {
          setBgcolor(data.ctrlbgcolor);
          setPageData((prevPageData) => {
            prevPageData = data;
            return prevPageData;
          });
          setTDes((prevTDes) => {
            let tdes = data.tdes; 
            try{
               tdes = tdes.replace("grey-bg-2",""); 
            }catch(ex){}

            prevTDes = tdes;
            return prevTDes;
          });
          setBDes((prevBDes) => {
            prevBDes = data.bdes;
            return prevBDes;
          });
          setPageTitle((prevPageTitle) => {
            prevPageTitle = data.title;
            return prevPageTitle;
          });
          setMetaDescription((prevMetaDescription) => {
            prevMetaDescription = data.metades;
            return prevMetaDescription;
          });
          setCtrlHeading((prevCtrlHeading) => {
            prevCtrlHeading = data.ctrlheading;
            return prevCtrlHeading;
          });
          setCtrlType((prevCtrlType) => {
            prevCtrlType = data.ctrltype;
            return prevCtrlType;
          });
          setTags((prevTags) => {
            prevTags = data.tags;
            return prevTags;
          });
          setSortOrder((prevSortOrder) => {
            prevSortOrder = data.sortorder;
            return prevSortOrder;
          });
          setLeftBar((prevLeftBar) => {
            prevLeftBar = data.leftbar;
            return prevLeftBar;
          });
          setCacheControl((prevCacheControl) => {
            prevCacheControl = data.CacheControl;
            return prevCacheControl;
          });
          setName((prevName) => {
            prevName = data.name;
            return prevName;
          });
          setCtrlId((prevName) => {
            prevName = data.ctrlid;
            return prevName;
          });
        }
        setPageEditId(data.id);
      }
      setInitPageData(true);
    };

    const getGameData = async () => {
      const gameDatas = await ProductAPI.getPcGameData();
      if (gameDatas) {
        let gamesData = gameDatas.result;
        setGameData(gamesData);
      }
    };

    if (pageId !== null && pageId !== undefined && pageId.length > 0) {
      fetchPageData();
    }

    getGameData();
  }, [pageId]);

  const RenderHeader = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );
  const RenderFooter = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  const updateProductCount = (count: any) => {
    setPcount(count);
  };

  const setPriceRange = (prices: any) => {
    setMin(prices.min);
    setMax(prices.max);
  };

  const setRange = (min: any, max: any) => {
    setMinRange(min);
    setMaxRange(max);
  };

  useEffect(() => {
    if (!_.isEmpty(tDes)) {
      try {
        const node = document.createRange().createContextualFragment(tDes);
        console.log("node", node);
        console.log("topDes", topDes.current);
        topDes.current.appendChild(node);
        setIsTopDesSet(true);
      } catch (ex) {}
    }
  }, [pageData]);

  const resetFilters = () => {
    /*  */
  };

  return (
    <>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      {initPageData ? (
        <>
          {/*  <Script
              async
              src="https://code.jquery.com/jquery-3.6.0.min.js"
            ></Script> */}
          <Head>
            <title itemProp="name" lang="en">
              {pageTitle}
            </title>
            <meta name="description" content={metaDescription}></meta>
          </Head>
          <div
            className={`${styles.DynamicPage} ${
              darkMode ? `bg-dark evetechDark` : ``
            }`}
          >
            <Container
              fluid
              style={{
                backgroundColor:
                  bgcolor.trim().length > 0
                    ? darkMode
                      ? ``
                      : bgcolor
                    : darkMode
                    ? ``
                    : `white`,
              }}
              className="position-relative z-index-1"
            >
              <Col lg={{ span: 10, offset: 1 }} className={`py-4`}>
                <Row
                  className={`
                    px-2 px-sm-3 px-md-0 
                    ${ctrlHeading !== undefined && "mb-2 mb-md-3"}
                    ${darkMode ? `text-light` : ``}
                  `}
                >
                  <div
                    className={`${styles.Overview} p-0 overflow-hidden z-index-1`}
                  >
                    <div ref={topDes}></div>
                  </div>
                </Row>

                <div className="main-product-container">
                  <div
                    className={`
                      ${styles.Pagination} 
                      ${
                        ctrlType === 45
                          ? "bg-dark"
                          : `${
                              darkMode
                                ? `bg-dark bg-gradient border-secondary`
                                : `bg-light`
                            }`
                      } 
                      ${
                        min !== null &&
                        max !== null &&
                        min !== undefined &&
                        max !== undefined
                          ? ``
                          : `pt-2`
                      }
                      d-flex justify-content-between align-items-center rounded-bottom px-2 pb-2 border-bottom gap-2 position-sticky
                    `}
                    style={{
                      paddingTop:
                        min !== null &&
                        max !== null &&
                        min !== undefined &&
                        max !== undefined
                          ? `1.8rem`
                          : ``,
                    }}
                  >
                    <h2
                      className={`${
                        ctrlType === 45
                          ? "text-light"
                          : `${darkMode ? `text-light` : `text-dark`}`
                      } fs-6 m-0`}
                    >
                      {ctrlHeading} ({pcount})
                    </h2>
                    {ctrlType === 45 && (
                      <>
                        <div
                          className={`${styles.FpsFilters} d-flex gap-2 cursor-pointer bg-dark p-2 py-3 p-lg-0 justify-content-center`}
                          onClick={() => {
                            prodCardsLink();
                          }}
                        >
                          <Badge
                            bg={
                              activeFPS === "1080p"
                                ? "dark border border-light"
                                : "light"
                            }
                            text={activeFPS === "1080p" ? "light" : "dark"}
                            onClick={() => setActiveFPS("1080p")}
                            className="rounded-pill"
                          >
                            <span className="fw-1">1080p</span>
                          </Badge>
                          <Badge
                            bg={
                              activeFPS === "1440p"
                                ? "dark border border-light"
                                : "light"
                            }
                            text={activeFPS === "1440p" ? "light" : "dark"}
                            onClick={() => setActiveFPS("1440p")}
                            className="rounded-pill"
                          >
                            <span className="fw-1">1440p</span>
                          </Badge>
                          <Badge
                            bg={
                              activeFPS === "4k"
                                ? "dark border border-light"
                                : "light"
                            }
                            text={activeFPS === "4k" ? "light" : "dark"}
                            onClick={() => setActiveFPS("4k")}
                            className="rounded-pill"
                          >
                            <span className="fw-1">4k</span>
                          </Badge>
                        </div>
                      </>
                    )}

                    <span
                      className={`${styles.RangeSlider}`}
                      onClick={() => {
                        prodCardsLink();
                      }}
                    >
                      {min !== null &&
                        max !== null &&
                        min !== undefined &&
                        max !== undefined && (
                          <DoubleRangeSlider
                            min={min}
                            max={max}
                            onChange={({ min, max }) => setRange(min, max)}
                            onMouseUp={({ min, max }) => {
                              setMinRangeUp(min);
                              setMaxRangeUp(max);
                            }}
                            onTouchEnd={({ min, max }) => {
                              setMinRangeUp(min);
                              setMaxRangeUp(max);
                            }}
                            onResetFilters={resetFilters}
                          />
                        )}
                    </span>
                  </div>

                  {/* 2, 13, 14, 15, 16, 18, 20, 21, 22, 23, 25 */}

                  {/* Created / Look at later */}
                  {ctrlType === 2 ||
                  ctrlType === 13 ||
                  ctrlType === 14 ||
                  ctrlType === 15 ||
                  ctrlType === 16 ||
                  ctrlType === 18 ||
                  ctrlType === 20 ||
                  ctrlType === 21 ||
                  ctrlType === 22 ||
                  ctrlType === 23 ||
                  ctrlType === 25 ? (
                    <ComponentByAttributeID
                      CtrlId={ctrlId}
                      Heading={ctrlHeading}
                      Sort={parseInt(sortOrder)}
                      CtrlType={ctrlType}
                      CacheControl={CacheControl === "yes" ? true : false}
                      CacheName={name + pageId}
                      onUpdateProductCount={updateProductCount}
                      onPriceRageSet={setPriceRange}
                      filterRange={{ min: minRangeUp, max: maxRangeUp }}
                      gameData={gameData}
                    />
                  ) : null}

                  {/* Single Search Term */}
                  {ctrlType === 4 ? (
                    <ComponentBySearchTermCache
                      Tags={tags}
                      Sort={parseInt(sortOrder)}
                      LeftBar={leftBar}
                      Heading={ctrlHeading}
                      CacheControl={CacheControl === "yes" ? true : false}
                      CacheName={name + pageId}
                      Procedure={"get_pcs_search_term"}
                      onUpdateProductCount={updateProductCount}
                      onPriceRageSet={setPriceRange}
                      filterRange={{ min: minRangeUp, max: maxRangeUp }}
                      gameData={gameData}
                    />
                  ) : null}

                  {ctrlType === 5 ? (
                    <ComponentBySearchTermCache
                      Tags={tags}
                      Sort={parseInt(sortOrder)}
                      LeftBar={leftBar}
                      Heading={ctrlHeading}
                      CacheControl={CacheControl === "yes" ? true : false}
                      CacheName={name + pageId}
                      Procedure={"get_component_search_term"}
                      onUpdateProductCount={updateProductCount}
                      onPriceRageSet={setPriceRange}
                      filterRange={{ min: minRangeUp, max: maxRangeUp }}
                      gameData={gameData}
                    />
                  ) : null}

                  {ctrlType === 6 ? (
                    <ComponentBySearchTermCache
                      Tags={tags}
                      Sort={parseInt(sortOrder)}
                      LeftBar={leftBar}
                      Heading={ctrlHeading}
                      CacheControl={CacheControl === "yes" ? true : false}
                      CacheName={name + pageId}
                      Procedure={"get_pcs_component_search_term"}
                      onUpdateProductCount={updateProductCount}
                      onPriceRageSet={setPriceRange}
                      filterRange={{ min: minRangeUp, max: maxRangeUp }}
                      gameData={gameData}
                    />
                  ) : null}

                  {ctrlType === 7 ? (
                    <ComponentBySearchTermCache
                      Tags={tags}
                      Sort={parseInt(sortOrder)}
                      LeftBar={leftBar}
                      Heading={ctrlHeading}
                      CacheControl={CacheControl === "yes" ? true : false}
                      CacheName={name + pageId}
                      Procedure={"get_pcs_laptops_component_search_term"}
                      onUpdateProductCount={updateProductCount}
                      onPriceRageSet={setPriceRange}
                      filterRange={{ min: minRangeUp, max: maxRangeUp }}
                      gameData={gameData}
                    />
                  ) : null}

                  {/* 8, 9, 10, 11 */}

                  {(ctrlType === 8 ||
                    ctrlType === 9 ||
                    ctrlType === 10 ||
                    ctrlType === 11) && (
                    <ComponentBySearchTerm
                      Tags={tags}
                      Sort={parseInt(sortOrder)}
                      LeftBar={leftBar}
                      Heading={ctrlHeading}
                      CacheControl={CacheControl === "yes" ? true : false}
                      CacheName={name + pageId}
                      onUpdateProductCount={updateProductCount}
                      onPriceRageSet={setPriceRange}
                      filterRange={{ min: minRangeUp, max: maxRangeUp }}
                      gameData={gameData}
                      ctrlType={ctrlType}
                    />
                  )}

                  {ctrlType === 12 && (
                    <ComponentByMultipleIDS
                      Tags={tags}
                      Sort={parseInt(sortOrder)}
                      LeftBar={leftBar}
                      Heading={ctrlHeading}
                      CacheControl={CacheControl === "yes" ? true : false}
                      CacheName={name + pageId}
                      onUpdateProductCount={updateProductCount}
                      onPriceRageSet={setPriceRange}
                      Procedure={"get_comp_multiple_IDs"}
                      filterRange={{ min: minRangeUp, max: maxRangeUp }}
                      gameData={gameData}
                    />
                  )}

                  {ctrlType === 24 && (
                    <ComponentByDeal
                      Tags={tags}
                      Sort={parseInt(sortOrder)}
                      LeftBar={leftBar}
                      Heading={ctrlHeading}
                      CacheControl={CacheControl === "yes" ? true : false}
                      Procedure={"Get_Deals_Pro_Newv2"}
                      CacheName={name + pageId}
                      onUpdateProductCount={updateProductCount}
                      onPriceRageSet={setPriceRange}
                      dealId={ctrlId}
                      filterRange={{ min: minRangeUp, max: maxRangeUp }}
                      gameData={gameData}
                      isDev={
                        authCtx !== undefined &&
                        authCtx.user !== undefined &&
                        authCtx.user.CID === "DE402835"
                          ? true
                          : false
                      }
                    />
                  )}

                  {ctrlType === 27 ? (
                    <ComponentBySearchTermCache
                      Tags={tags}
                      Sort={parseInt(sortOrder)}
                      LeftBar={leftBar}
                      Heading={ctrlHeading}
                      CacheControl={CacheControl === "yes" ? true : false}
                      CacheName={name + pageId}
                      Procedure={"get_component_by_fts_search_term"}
                      onUpdateProductCount={updateProductCount}
                      onPriceRageSet={setPriceRange}
                      filterRange={{ min: minRangeUp, max: maxRangeUp }}
                      gameData={gameData}
                    />
                  ) : null}

                  {ctrlType === 28 ? (
                    <ComponentBySearchTermCache
                      Tags={tags}
                      Sort={parseInt(sortOrder)}
                      LeftBar={leftBar}
                      Heading={ctrlHeading}
                      CacheControl={CacheControl === "yes" ? true : false}
                      CacheName={name + pageId}
                      Procedure={"get_pcs_by_fts_search_term"}
                      onUpdateProductCount={updateProductCount}
                      onPriceRageSet={setPriceRange}
                      filterRange={{ min: minRangeUp, max: maxRangeUp }}
                      gameData={gameData}
                    />
                  ) : null}

                  {/* 33, 34, 35, 36, 37, 38, 39, 40, 41, 42  */}

                  {(ctrlType === 33 ||
                    ctrlType === 34 ||
                    ctrlType === 35 ||
                    ctrlType === 36 ||
                    ctrlType === 37 ||
                    ctrlType === 38 ||
                    ctrlType === 39 ||
                    ctrlType === 40 ||
                    ctrlType === 41 ||
                    ctrlType === 42) && (
                    <ComponentWithPCConfigSearch
                      CtrlId={ctrlId}
                      Tags={tags}
                      Sort={parseInt(sortOrder)}
                      LeftBar={leftBar}
                      Heading={ctrlHeading}
                      CacheControl={CacheControl === "yes" ? true : false}
                      CacheName={name + pageId}
                      onUpdateProductCount={updateProductCount}
                      onPriceRageSet={setPriceRange}
                      filterRange={{ min: minRangeUp, max: maxRangeUp }}
                      gameData={gameData}
                    />
                  )}

                  {ctrlType === 43 && (
                    <ComponentByQueryID
                      Tags={tags}
                      Sort={parseInt(sortOrder)}
                      LeftBar={leftBar}
                      Heading={ctrlHeading}
                      CacheControl={CacheControl === "yes" ? true : false}
                      CacheName={name + pageId}
                      onUpdateProductCount={updateProductCount}
                      onPriceRageSet={setPriceRange}
                      filterRange={{ min: minRangeUp, max: maxRangeUp }}
                      gameData={gameData}
                    />
                  )}

                  {ctrlType === 44 && (
                    <ComponentByQueryIDSearchCTRL
                      Tags={tags}
                      Sort={parseInt(sortOrder)}
                      Heading={ctrlHeading}
                      CacheControl={CacheControl === "yes" ? true : false}
                      CacheName={name + pageId}
                      onUpdateProductCount={updateProductCount}
                      onPriceRageSet={setPriceRange}
                      filterRange={{ min: minRangeUp, max: maxRangeUp }}
                      gameData={gameData}
                      isDev={
                        authCtx !== undefined &&
                        authCtx.user !== undefined &&
                        authCtx.user.CID === "DE402835"
                          ? true
                          : false
                      }
                    />
                  )}

                  {ctrlType === 45 && (
                    <ComponentFPSDataByQueryID
                      Tags={tags}
                      Sort={parseInt(sortOrder)}
                      LeftBar={leftBar}
                      Heading={ctrlHeading}
                      CacheControl={CacheControl === "yes" ? true : false}
                      CacheName={name + pageId}
                      onUpdateProductCount={updateProductCount}
                      onPriceRageSet={setPriceRange}
                      filterRange={{ min: minRangeUp, max: maxRangeUp }}
                      activeFPS={activeFPS}
                      gameData={gameData}
                    />
                  )}
                </div>

                <div
                  className={`
                  ${styles.Overview}
                  ${darkMode ? `text-light` : ``}
                `}
                >
                  {HTMLReactParser(bDes)}
                </div>
              </Col>
            </Container>

            {authCtx !== undefined && authCtx.isAdmin ? (
              <EditDynamicOverlay pageid={pageEditId} />
            ) : null}
          </div>
        </>
      ) : (
        <Spinner isEve={false} />
      )}
    </>
  );
};

export default Home;
