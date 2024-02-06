"use client";
import React from "react";
import LaptopHeader from "@/components/Laptop/LaptopHeader";
import BrandTiles from "@/components/Laptop/Home/BrandFiles";
import MainSlideshow from "@/components/Laptop/Home/MainSlideShow";
import { nanoid } from "nanoid";
import { ProductList } from "@/components/Product";
import { useState } from "react";
import { useEffect } from "react";
import { CmsAPI, ProductAPI } from "@actions";
import HorizontalScrollView from "@/components/Laptop/Controls/HorizontalScrollView";
import Head from "next/head";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { useTheme } from "@/store/ThemeContext";
// import CommonContext from "../Store/common-context";

const _ = require("lodash");

const MobileLanding = () => {
  const [brands, setBrands] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [loader, setLoader] = useState(true);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    const fetchBrandDeals = async () => {
      try {
        const data = await CmsAPI.getReactInfo({ id: 14 });

        if (data.result !== undefined) {
          setBrands(data.result);
          setLoader(false);
        }
      } catch (error: any) {
        console.error(
          "Failed to fetch React Info [Laptop Brand Deals]:",
          error.message
        );
      }
    };
    fetchBrandDeals();
  }, []);

  useEffect(() => {
    if (!isFetched) {
      if (brands !== undefined && brands.length > 0) {
        _.map(brands, async (brand: any) => {
          /* const prods = await fetch("/api/laptopByBrand", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              brand: brand.brand,
            }),
          }).then((res) => res.json());
 */
          const prods = await ProductAPI.getLaptopByBrand({
            brand: brand.brand,
          });

          if (prods !== null && prods.result !== undefined) {
            let brandData = prods.result;
            setBrands((prevBrands) => {
              let brandsStat = _.map(prevBrands, (bd: any) => {
                if (bd.brand === brand.brand) bd.data = brandData;
                return bd;
              });
              return brandsStat;
            });
          }
        });
        setIsFetched(true);
      }
    }
  }, [brands]);

  return (
    <>
      <Head>
        <title itemProp="name" lang="en">
          Buy Laptop Direct Online - Best Laptop Deals In South Africa
        </title>
        <link rel="canonical" href="https://www.evetech.co.za/mobile/" />
        {/* <meta name="description" content={category.MetaDescription} />
        <meta name="keywords" content={category.keyword} /> */}
      </Head>

      <LaptopHeader />

      <Container
        fluid
        className={`
          ${darkMode ? `evetechDark bg-dark` : ``} 
          pb-3 px-0 position-relative z-index-1
        `}
        style={{ overflowX: "hidden" }}
      >
        <MainSlideshow />
        <BrandTiles />

        <section>
          <Col md={{ span: 10, offset: 1 }} className="px-0 pb-4">
            <Stack gap={3}>
              {brands !== undefined &&
                brands.length > 0 &&
                _.map(brands, (brand: any) => {
                  return (
                    <Row key={nanoid(4)}>
                      <HorizontalScrollView
                        className="hide-scrollbar p-3"
                        key={nanoid(10)}
                        dealtitle={brand.title}
                        pagelink={brand.pageUrl}
                      >
                        <ProductList
                          data={brand.data}
                          key={nanoid(10)}
                        ></ProductList>
                      </HorizontalScrollView>
                    </Row>
                  );
                })}
            </Stack>
          </Col>
        </section>
      </Container>
    </>
  );
};

export default MobileLanding;
