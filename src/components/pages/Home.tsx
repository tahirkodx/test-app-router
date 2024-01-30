"use client";
import React, { useEffect, useContext, useState } from "react";
import Head from "next/head";
import Stack from "react-bootstrap/Stack";
import {
  ComponentsHeader,
  ComponentSlideShow,
  ComponentTiles,
} from "@/components/Home";
import { ProductDeals, Brands, CategoryTiles } from "@/components/Product";
import Banners from "@/components/Home/Banners";
import FeatureList from "@/components/Feature/FeatureList";
import { nanoid } from "nanoid";
import { Col } from "react-bootstrap";
import CustomeSpinner from "@/components/CustomeSpinner";
import AuthContext from "@/store/auth-context";
import Spinner from "@/components/Spinner";
import styles from "@/styles/Component.module.scss";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { CmsAPI, ProductAPI } from "@actions";
import { useTheme } from "@/store/ThemeContext";

const _ = require("lodash");


const Home = (props: any) => {
  const [productCard, setProductCard] = useState<any>([]);
  const [initCards, setInitCards] = useState(false);
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const [FooterBanners, setFooterBanners] = useState([]);
  const [DealsBanners, setDealsBanners] = useState([]);
  const [InfluencerBanner, setInfluencerBanner] = useState([]);
  const [isSetBanners, setIsSetBanners] = useState(false);
  const [loader, setLoader] = useState(true);
  const [initDeals, setInitDeals] = useState(false);
  const [dealsData, setDealsData] = useState([]);
  const isLG = useMediaQuery("(min-width: 992px)");
  const { isDarkMode } = useTheme();

  const authCtx = useContext(AuthContext);
  const showLogin = props.showLogin !== undefined ? props.showLogin : false;

  const fetchFooterBanners = async () => {
    try {
      const footerData = await CmsAPI.rctwebinfmulti({
        id: "4,6,9",
      });

      if (footerData.result !== undefined && footerData.result.length > 0) {
        let footBanner = _.find(footerData.result, (res: any) => {
          if (res.col_id !== undefined && res.col_id === "4") return res;
        });
        let influeBanner = _.find(footerData.result, (res: any) => {
          if (res.col_id !== undefined && res.col_id === "6") return res;
        });
        let dealBanner = _.find(footerData.result, (res: any) => {
          if (res.col_id !== undefined && res.col_id === "9") return res;
        });

        if (footBanner !== undefined && footBanner.result !== undefined)
          setFooterBanners(footBanner.result);

        if (influeBanner !== undefined && influeBanner.result !== undefined)
          setInfluencerBanner(influeBanner.result);

        if (dealBanner !== undefined && dealBanner.result !== undefined)
          setDealsBanners(dealBanner.result);

        setLoader(false);
        setIsSetBanners(true);
      }
    } catch (error: any) {
      console.error("Failed to fetch React Info [Home]:", error.message);
    }
  };

  const fetchData = async (queryIds: any) => {
    const prods = await ProductAPI.bmultiqids({
      queryIds: queryIds,
      cache: true,
    });
    /*  const prods = await fetch("/api/bmultiqids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        queryIds: queryIds,
        cache: true,
      }),
    }).then((res) => res.json()); */
    /*    setLaptops(prods.result);
    setInitData(true); */
    setDealsData(prods?.result);
    setInitDeals(true);
  };

  useEffect(() => {
    if (
      DealsBanners !== undefined &&
      DealsBanners !== null &&
      DealsBanners.length > 0 &&
      !initDeals
    ) {
      let queryIDs = _.join(
        DealsBanners.map((deal: any) => {
          return deal.queryId;
        }),
        ","
      );
      fetchData(queryIDs);
    }
  }, [DealsBanners]);

  useEffect(() => {}, [dealsData]);

  useEffect(() => {
    try {
      fetchFooterBanners();
      console.log(initCards, " ---- testing ----", productCard);
      if (
        (!initCards && productCard == undefined) ||
        productCard.length === 0
      ) {
        console.log(initCards, " ---- inside testing ----", productCard);
        const getProductsCard = async () => {
          const cardData = await ProductAPI.getProductCards();
          console.log("Products Card", cardData);
          let prodCards = cardData.result;

          setProductCard((prevProdCards: any) => {
            prevProdCards = prodCards;
            return prevProdCards;
          });
          setInitCards(true);
        };

        getProductsCard();
      }

      if (showLogin) authCtx.onShowLogin(true);
    } catch (error: any) {
      console.error(
        "Failed to fetch React Info [Home useEffect]:",
        error.message
      );
    }
  }, []);

  useEffect(() => {}, [isSetBanners]);

  const getViewAllLink = (title: any) => {
    switch (title) {
      case "PC Deals":
        return "/specials.aspx#PCs";
      case "Component Deals":
        return "/specials.aspx#Comp";
      case "Laptop Deals":
        return "/laptop-specials-for-sale-south-africa.aspx";
      default:
        return "";
    }
  };

  return (
    <>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />

      <div className={`${isDarkMode ? `bg-secondary evetechDark` : ``}`}>
        <div
          className={`
          ${isDarkMode ? `bg-dark bg-opacity-75` : ``}
          position-relative z-index-1 overflow-hidden
        `}
        >
          <Stack gap={isLG ? 4 : 3} className="position-relative z-index-1">
            <ComponentSlideShow />

            <ComponentTiles />

            <CategoryTiles />

            <div
              className={`
                ${styles.MainTitle} 
                ${isLG ? "px-3 d-block" : "d-none"}
              `}
            >
              <div className="d-grid gap-1 align-items-center">
                <div
                  className={`
                ${styles.RainbowLine} 
                ${!isLG ? "h-100" : "rounded-pill"} 
                  w-100  
              `}
                ></div>
                <h1
                  className={`
                    ${isLG ? `fs-4 px-3` : `${styles.Shadow} text-light p-3`} 
                    ${isDarkMode ? `text-light` : ``}
                    position-relative m-0 text-center fs-5
                  `}
                >
                  Custom Computer Systems, Gaming Computers, Desktops Gaming PCs
                  & so much more
                </h1>
                <div
                  className={`
                    ${styles.RainbowLine} 
                    ${!isLG ? "h-100" : "rounded-pill"} 
                      w-100  
                  `}
                ></div>
              </div>
            </div>

            <Col md={{ span: 10, offset: 1 }}>
              <Stack gap={isLG ? 4 : 3}>
                {loader && (
                  <>
                    <Spinner />
                  </>
                )}
                {DealsBanners !== undefined &&
                  DealsBanners.length > 0 &&
                  DealsBanners.map((deal: any) => {
                    return (
                      <ProductDeals
                        QueryId={deal.queryId}
                        DealTitle={deal.dealTitle}
                        DealsProds={_.get(dealsData, deal.queryId)}
                        BannerData={deal.banners}
                        key={nanoid(5)}
                        PageLink={getViewAllLink(deal.dealTitle)}
                      />
                    );
                  })}
              </Stack>
            </Col>

            {loader && <Spinner />}
            {FooterBanners !== undefined && FooterBanners.length > 0 && (
              <Banners source={FooterBanners} />
            )}

            <Brands />

            <section className="px-1 px-md-0 bg-secondary bg-opacity-25">
              <Col md={{ span: 10, offset: 1 }}>
                {!initCards && <CustomeSpinner variant="danger" />}
                {initCards && <FeatureList Features={productCard} />}
              </Col>
            </section>

            {loader && <Spinner />}
            {InfluencerBanner !== undefined && InfluencerBanner.length > 0 && (
              <Banners source={InfluencerBanner} />
            )}
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Home;
