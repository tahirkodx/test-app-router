"use client";
import React from "react";
import { useState } from "react";
import { customAlphabet } from "nanoid";
import { useEffect } from "react";
import LaptopHeader from "@/components/Laptop/LaptopHeader";
import styles from "@/styles/Laptop/DynamicPage.module.scss";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import Paginator from "@/components/Paginator";
import LaptopCard from "@/components/Laptop/Controls/LaptopCard";
import LaptopDetailBanners from "@/components/Banners/LaptopDetailBanners";
import NoPageData from "@/components/NoPageData";
import { Helmet } from "react-helmet";
import { useRouter } from "next/navigation";
import { ProductAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import useMediaQuery from "@/custom/hooks/useMediaQuery";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");

// const renderData = (data) => {
//   return data.map((product, ind) => (
//     <LaptopCard product={product} key={nanoid(5)} />
//   ));
// };

const ByAtt = (props: any) => {
  let attid: any = parseInt(props.attid);
  const [attribute, setAttribute] = useState<any>({});
  const [productData, setProductData] = useState<any[]>([]);
  const [pcount, setPcount] = useState<any>(0);
  const router = useRouter();
  const [totalPage, setTotalPage] = useState<any>(1);
  const [activePage, setActivePage] = useState<any>(1);
  const [refreshPages, setRefereshPages] = useState<any>(false);
  const [initProducts, setInitProduct] = useState<any>(false);
  const [loading, setLoading] = useState<any>(true);
  const { isDarkMode } = useTheme();
  const isHD = useMediaQuery("(min-width: 1921px)");

  const RenderHTML = (props: any) => (
    <div dangerouslySetInnerHTML={{ __html: props.HTML }}></div>
  );
  const RenderTitle = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  const onActivePageSet = (active: any) => {
    setActivePage(active);
  };

  const setPagination = (count: any) => {
    setTotalPage(count > 28 ? Math.ceil(count / 28) : 1);
    setRefereshPages(false);
  };

  useEffect(() => {
    if (isNaN(attid)) {
      router.push("/");
    } else {
      attid = parseInt(attid);
      if (attid > 0) {
        const BindProductsByBrand = async (brandID: any) => {
          /*     const prodData = await fetch(`/api/getProductsByBrandID/${brandID}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }).then((res) => res.json()); */

          const prodData = await ProductAPI.getProductsByBrandID({ brandID });
          if (
            prodData !== null &&
            prodData !== undefined &&
            prodData.result !== null &&
            prodData.result !== undefined
          ) {
            let products = prodData.result;

            setProductData((prevProdData) => {
              prevProdData = products;
              return prevProdData;
            });

            setPcount(products.length);
            setPagination(products.length);
          }
          setInitProduct(true);
        };

        const BindProductsByScreen = async (screen: any) => {
          const prodData = await ProductAPI.getProductsByScreen({ screen });
          if (
            prodData !== null &&
            prodData !== undefined &&
            prodData.result !== null &&
            prodData.result !== undefined
          ) {
            let products = prodData.result;

            setProductData((prevProdData) => {
              prevProdData = products;
              return prevProdData;
            });

            setPcount(products.length);
            setPagination(products.length);
          }
          setInitProduct(true);
          setInitProduct(true);
        };

        const BindProductsByPrice = async (pStart: any, pEnd: any) => {
          const prodData = await ProductAPI.getProductsByPrice({
            prices: {
              pStart: pStart,
              pEnd: pEnd,
            },
          });
          if (
            prodData !== null &&
            prodData !== undefined &&
            prodData.result !== null &&
            prodData.result !== undefined
          ) {
            let products = prodData.result;

            setProductData((prevProdData) => {
              prevProdData = products;
              return prevProdData;
            });

            setPcount(products.length);
            setPagination(products.length);
            setInitProduct(true);
          }
        };

        const BindProductsByAttributeID = async (attID: any) => {
          const prodData = await ProductAPI.getProductsByAttributeID({ attID });
          if (
            prodData !== null &&
            prodData !== undefined &&
            prodData.result !== null &&
            prodData.result !== undefined
          ) {
            let products = prodData.result;

            setProductData((prevProdData) => {
              prevProdData = products;
              return prevProdData;
            });

            setPcount(products.length);
            setPagination(products.length);
          }
          setInitProduct(true);
          setInitProduct(true);
        };

        const BindProductsBySeries = async (series: any) => {
          const prodData = await ProductAPI.getProductsBySeries({ series });
          if (
            prodData !== null &&
            prodData !== undefined &&
            prodData.result !== null &&
            prodData.result !== undefined
          ) {
            let products = prodData.result;

            setProductData((prevProdData) => {
              prevProdData = products;
              return prevProdData;
            });

            setPcount(products.length);
            setPagination(products.length);
          }
          setInitProduct(true);
          setInitProduct(true);
        };

        const BindProducts = (attid: any) => {
          switch (attid) {
            case 19:
              BindProductsByBrand(4);
              break;
            case 28:
              BindProductsByBrand(15);
              break;
            case 15:
              BindProductsByScreen(22);
              BindProductsByAttributeID(15);
              break;
            case 16:
              BindProductsByScreen(30);
              BindProductsByAttributeID(16);
              break;
            case 17:
              BindProductsByScreen(3);
              BindProductsByAttributeID(17);
              break;
            case 18:
              BindProductsByScreen(4);
              BindProductsByAttributeID(18);
              break;
            case 9:
              BindProductsByPrice(0, 4999);
              break;
            case 10:
              BindProductsByPrice(5000, 8000);
              break;
            case 11:
              BindProductsByPrice(7999, 12000);
              break;
            case 12:
              BindProductsByPrice(11999, 20000);
              break;
            case 13:
              BindProductsByPrice(19999, 99999);
              break;
            case 33:
            case 32:
            case 31:
            case 20:
            case 21:
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
            case 27:
            case 2:
            case 3:
            case 14:
              BindProductsByAttributeID(attid);
              break;
            case 4:
              BindProductsBySeries(26);
              break;
            case 5:
              BindProductsBySeries(197);
              break;
            case 6:
              BindProductsBySeries(24);
              break;
            case 7:
              BindProductsBySeries(188);
              break;
            case 8:
              BindProductsBySeries(198);
              break;
            default:
              return "default";
          }
        };

        if (BindProducts(attid) === "default") {
          setInitProduct(true);
        }

        const AttributePageDetailsByID = async () => {
          /*  const attData = await fetch(`/api/getAttributeDetailsByID/${attid}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }).then((res) => res.json()); */
          const attData = await ProductAPI.getAttributeDetailsByID({ attid });
          if (
            attData !== null &&
            attData !== undefined &&
            attData.result !== null &&
            attData.result !== undefined
          ) {
            let pages = attData.result;

            if (pages !== undefined && pages.length > 0) {
              setAttribute((prevAtt: any) => {
                prevAtt = pages[0];
                return prevAtt;
              });
            }
          }
        };

        AttributePageDetailsByID();
      } else {
        router.push("/");
      }
    }
  }, []);

  useEffect(() => {
    const checkProductData = () =>
      productData.length === 0 ? setLoading(false) : null;
    setTimeout(checkProductData, 5000);
  }, []);

  return (
    <div className={isDarkMode ? `evetechDark` : ``}>
      {attribute !== undefined && !_.isEmpty(attribute) && (
        <Helmet>
          <title itemProp="name" lang="en">
            {attribute.pagetitle}
          </title>
          <meta name="description" content={attribute.metades}></meta>
        </Helmet>
      )}

      <LaptopHeader />
      <Container
        fluid
        className={`${isDarkMode ? `bg-dark text-light` : ``} py-4`}
      >
        <Row>
          <Col lg={10}>
            {attribute !== undefined && !_.isEmpty(attribute) && (
              <Row>
                <Col md={12}>
                  {attribute.bannerurl !== undefined &&
                    attribute.bannerurl.trim().length > 0 && (
                      <Image
                        src={attribute.bannerurl}
                        className="img-fluid"
                        alt={attribute.bigheading}
                      ></Image>
                    )}
                </Col>
                <Col md={12}>
                  <h1>{attribute.bigheading}</h1>
                  <RenderHTML HTML={attribute.des} />
                </Col>
              </Row>
            )}
            <div
              className={`
                ${styles.Pagination} 
                ${isDarkMode ? `bg-dark text-light` : ``}
                d-flex justify-content-between flex-wrap align-items-center bg-light rounded-bottom p-2 border-bottom gap-2
              `}
            >
              <h2 className={`fs-6 m-0`}>
                {attribute.bigheading} ({pcount})
              </h2>
              {pcount === 0 ? null : (
                <Paginator
                  TotalPage={totalPage}
                  ActivePage={activePage}
                  onSetActivePage={onActivePageSet}
                  isReset={refreshPages}
                />
              )}
            </div>

            <Container fluid className={`px-0`}>
              <div
                className={`
                ${isHD ? `cols-xxl-5` : `cols-xxl-4`}
                d-grid cols-2 cols-md-3 cols-lg-4 gap-xxl-5 gap-2 gap-sm-3 py-2
            `}
              >
                {initProducts &&
                  productData &&
                  productData.map(
                    (product, ind) =>
                      ind >= 28 * activePage - 28 &&
                      ind < 28 * activePage && (
                        <LaptopCard
                          product={product}
                          key={nanoid(5)}
                          ShowCompare={false}
                        />
                      )
                  )}
              </div>

              {!initProducts ? (
                <section className="w-100 d-flex justify-content-center align-items-center gap-3 p-5 flex-wrap">
                  <Spinner animation="border" variant="primary" /> Loading
                  Products
                </section>
              ) : null}

              {initProducts && productData.length === 0 ? (
                <NoPageData isProduct={true} />
              ) : null}
            </Container>
          </Col>
          <Col lg={2}>
            <LaptopDetailBanners />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ByAtt;
