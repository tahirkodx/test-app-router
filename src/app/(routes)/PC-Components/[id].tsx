import React, { useEffect, useContext, useState } from "react";
import { useParams } from "next/navigation";
import AuthContext from "@/store/auth-context";
import { ProductAPI } from "@actions";
import { ComponentsHeader } from "@/components/Home";
import { BreadCrumb } from "@/components/Product";
import { Col, Stack } from "react-bootstrap";
import styles from "@/styles/PCComponents.module.scss";
import Spinner from "@/components/Spinner";
import { nanoid } from "nanoid";
import ComponentCard from "@/components/Product/ComponentCard";
import Head from "next/head";
import { useTheme } from "@/store/ThemeContext";
import useMediaQuery from "@/custom/hooks/useMediaQuery";

const _ = require("lodash");
const PcComponent = (props: any) => {
  const params: any = useParams();
  const authCtx = useContext(AuthContext);
  const [categoryBriefData, setCategoryBriefData] = useState<any>({});
  const [compTopBanners, setCompTopBanners] = useState<any>("");
  const [compBottomBanners, setCompBottomBanners] = useState<any>("");
  const [Products, setProducts] = useState<any[]>([]);
  const [showPageTopMsg, setShowPageTopMsg] = useState<any>(true);
  const [description, setDescription] = useState<any>("");
  const [title, setTitle] = useState<any>("");
  const [PageCrumbs, setPageCrumbs] = useState<any[]>([
    {
      title: "Home",
      link: "/",
      stage: "1",
    },
    {
      title: "Components",
      link: "/Components.aspx",
      stage: "2",
    },
    {
      title: "",
      link: "",
      stage: "3",
    },
    {
      title: "",
      link: "",
      stage: "4",
    },
  ]);
  const [initInfo, setInitInfo] = useState(false);
  /* WishList */
  const [showWish, setShowWish] = useState(false);
  const [reloadWish, setReloadWish] = useState(false);
  const [CatID, setCatID] = useState(0);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  const isHD = useMediaQuery("(min-width: 1921px)");

  useEffect(() => {
    let CID = params?.id;
    if (CID !== undefined && CID.split("-").length > 0) {
      CID.split("-").forEach((str: any) => {
        try {
          CID = parseInt(str.replace(".", "").replace("aspx", "").trim());
          setCatID(CID);
        } catch (e) {}
      });
    } else {
      try {
        CID = parseInt(CID.replace(".", "").replace("aspx", "").trim());
        setCatID(CID);
      } catch (e) {
        CID = 0;
        setCatID(CID);
      }
    }
    console.log(CID);
  }, [params]);

  const onWishClose = () => {
    setShowWish(false);
  };

  const AddToWishList = (product: any) => {};

  useEffect(() => {
    if (CatID !== undefined && CatID > 0 && !initInfo) {
      console.log("method call", CatID);
      const getCategoryDetailsBrief = async () => {
        const cdatas = await ProductAPI.getCategoryDetailsBrief({ CatID });
        let data = cdatas?.result[0];
        setCompTopBanners(data?.TopDes);
        setCompBottomBanners(data?.BottomDes);
        setTitle(data?.Pagetitle);
        setDescription(data?.MetaDes);

        if (
          data?.ParentCatName !== undefined &&
          data?.ParentCatName.trim().length > 0
        ) {
          _.map(PageCrumbs, (crumb: any) => {
            if (crumb.stage === "3") {
              crumb.title = data.ParentCatName;
              crumb.link = "/" + data.ParentCatUrl;
            }
          });
        }

        _.map(PageCrumbs, (crumb: any) => {
          if (crumb.stage === "4") {
            crumb.title = data?.cat;
            crumb.link = "";
          }
        });

        setCategoryBriefData((prevCategoryData: any) => {
          prevCategoryData = data;
          return prevCategoryData;
        });
      };

      const getProductComponents = async () => {
        const cdatas = await ProductAPI.getProductComponents({ CatID });
        let data = cdatas?.result;

        setProducts((prevProducts) => {
          prevProducts = data;
          return prevProducts;
        });
        setInitInfo(true);
      };

      getCategoryDetailsBrief();
      getProductComponents();
    } else {
    }
  }, [CatID]);

  const RenderHeader = (props: any) => (
    <div dangerouslySetInnerHTML={{ __html: props.HTML }}></div>
  );
  const RenderFooter = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  const ProductsAsc = _.orderBy(Products, ["price_vat"], ["asc"]);

  return (
    <>
      {description !== undefined && (
        <>
          <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} key="title" />
          </Head>
          <Head>
            <meta
              property="og:description"
              content={description}
              key="description"
            />
          </Head>
        </>
        /*  <Helmet>
            <title itemProp="name" lang="en">
                {title}
            </title>
            <meta name="description" content={description}></meta>
            </Helmet> */
      )}
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <Stack
        className={`${
          darkMode ? `evetechDark bg-dark text-light evetechDark` : ``
        } pb-4 p-2`}
      >
        <Col xs={12} md={{ span: 10, offset: 1 }} className="p-0 pe-2">
          <BreadCrumb PageCrumbs={PageCrumbs} />
        </Col>
        <section className={"py-3 "}>
          <Col xs={12} md={{ span: 10, offset: 1 }}>
            <div
              className={`${
                darkMode ? `text-light` : ``
              } d-block cols-12 gap-2 gap-sm-3 comp-top-section`}
            >
              <RenderHeader HTML={compTopBanners} />
            </div>
          </Col>
        </section>
        <section>
          <Col xs={12} md={{ span: 10, offset: 1 }}>
            <div
              className={`
                ${styles.StickyHeader}
                ${
                  darkMode
                    ? `bg-dark text-light bg-gradient border-secondary border-bottom border-left border-right rounded-bottom border-opacity-50`
                    : `bg-light`
                } 
                mb-3 position-sticky p-2
              `}
            >
              <h2
                className={`${
                  darkMode ? `text-light` : ``
                } text-left text-secondary m-0 fs-6`}
              >
                {categoryBriefData?.Heading} ({Products?.length})
              </h2>
            </div>

            <div
              className={`${
                isHD ? `cols-xxl-5` : `cols-xxl-4`
              } d-grid cols-2 cols-md-3 cols-lg-4 gap-2 gap-sm-3 gap-xxl-5`}
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
                  {" "}
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

              {!initInfo && (
                <div className="span-full mx-2 mx-sm-3 w-100 h-100">
                  <Spinner isEve={false} />
                </div>
              )}

              {initInfo &&
                ProductsAsc.map((product: any) => {
                  return (
                    <ComponentCard
                      Product={product}
                      key={nanoid(6)}
                      onAddToWishList={AddToWishList}
                    />
                  );
                })}
              {initInfo && Products?.length < 1 ? (
                <div className="span-full mx-2 mx-sm-3">
                  {/*  <NoPageData /> */}
                </div>
              ) : null}
            </div>
          </Col>
        </section>
      </Stack>

      {/* <WishModal
        isShow={showWish}
        isReload={reloadWish}
        onClose={onWishClose}
      /> */}
    </>
  );
};

export default PcComponent;
