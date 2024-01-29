"use client";
import React, { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import LaptopHeader from "@/components/Laptop/LaptopHeader";
import { Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import LaptopDetailBanners from "@/components/Banners/LaptopDetailBanners";
import Paginator from "@/components/Paginator";
import styles from "@/styles/DynamicPage.module.scss";
import LaptopCard from "@/components/Laptop/Controls/LaptopCard";
import NoPageData from "@/components/NoPageData";
import { Helmet } from "react-helmet";
import { useRouter } from "next/navigation";
import { ProductAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");

const ByBrand = (props: any) => {
  let brandId = parseInt(props.brandId);
  const [brand, setBrand] = useState<any>({});
  const [productData, setProductData] = useState<any[]>([]);
  const [pcount, setPcount] = useState<any>(0);
  const router = useRouter();
  const [totalPage, setTotalPage] = useState<any>(1);
  const [activePage, setActivePage] = useState<any>(1);
  const [refreshPages, setRefereshPages] = useState<any>(false);
  const [initProducts, setInitProduct] = useState<any>(false);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  function toTitleCase(str: any) {
    return str.replace(/\w\S*/g, function (txt: any) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const onActivePageSet = (active: any) => {
    setActivePage(active);
  };

  const setPagination = (count: any) => {
    setTotalPage(count > 28 ? Math.ceil(count / 28) : 1);
    setRefereshPages(false);
  };

  useEffect(() => {
    if (isNaN(brandId)) {
      router.push("/");
    } else {
      if (brandId > 0) {
        const BrandInfo = async (brandId: any) => {
          const brandData = await ProductAPI.getBrandInfo({ brandId });
          if (
            brandData !== null &&
            brandData !== undefined &&
            brandData.result !== null &&
            brandData.result !== undefined
          ) {
            let brands = brandData.result;
            if (brands.length > 0) {
              setBrand((prevBrandData: any) => {
                prevBrandData = brands[0];
                return prevBrandData;
              });
            }
          }
        };

        const BindProduct = async (brandId: any) => {
          const productData = await ProductAPI.getProductByBrandId({ brandId });
          if (
            productData !== null &&
            productData !== undefined &&
            productData.result !== null &&
            productData.result !== undefined
          ) {
            let products = productData.result;

            setProductData((prevProductData) => {
              prevProductData = products;
              return prevProductData;
            });

            setPcount(products.length);
            setPagination(products.length);
          }
          setInitProduct(true);
        };

        BrandInfo(brandId);
        BindProduct(brandId);
      } else {
        router.push("/");
      }
    }
  }, []);

  /*  useEffect(() => {
    const checkProductData = () =>
      productData.length === 0 ? setLoading(false) : null;
    setTimeout(checkProductData, 5000);
  }, []); */

  return (
    <>
      {brand !== undefined && !_.isEmpty(brand) ? (
        <Helmet>
          <title itemProp="name" lang="en">
            {brand.PageTitle}
          </title>
          <meta name="description" content={brand.des}></meta>
        </Helmet>
      ) : null}

      <LaptopHeader />
      <Container
        fluid
        className={`${darkMode ? `bg-dark text-light` : ``} py-4`}
      >
        <Row>
          <Col lg={10}>
            {brand !== undefined && !_.isEmpty(brand) && (
              <Card>
                <Card.Body>
                  <Row>
                    <Col lg={9}>
                      <h2>{toTitleCase(brand.pageheading)}</h2>
                      <p>{brand.des}</p>
                    </Col>
                    <Col lg={3}>
                      <Image
                        src={`https://www.evetech.co.za/` + brand.pagelogourl}
                        className="img-fluid"
                        alt={brand.PageTitle}
                      ></Image>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
            <div
              className={`
                ${styles.Pagination} 
                ${darkMode ? `bg-dark text-light` : `bg-light`}
                d-flex justify-content-between flex-wrap align-items-center rounded-bottom p-2 border-bottom gap-2
              `}
            >
              <h2 className={`fs-6 m-0`}>
                {brand !== undefined &&
                  !_.isEmpty(brand) &&
                  toTitleCase(brand.pageheading)}{" "}
                Deals ({pcount} products)
              </h2>
              {pcount === 0 ? null : (
                <Paginator
                  TotalPage={totalPage}
                  ActivePage={activePage}
                  onSetActivePage={onActivePageSet}
                  isReset={refreshPages}
                  items_per_page={28}
                />
              )}
            </div>
            <Container fluid className={`py-2 px-0`}>
              <div
                className={`d-grid cols-2 cols-md-3 cols-lg-3 cols-xxl-4 cols-1700-5 gap-2 gap-md-3 mb-3`}
              >
                {productData !== undefined &&
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
              ) : (
                productData !== undefined &&
                productData.length === 0 && <NoPageData isProduct={true} />
              )}
            </Container>
          </Col>
          <Col lg={2}>
            <LaptopDetailBanners />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ByBrand;
