"use client";
import React, { use } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Image,
  Row,
  Stack,
} from "react-bootstrap";

import styles from "@/styles/Specials/Specials.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LaptopListFilters from "@/components/Laptop/Controls/LaptopListFilters";
import { FaTh, FaThList } from "react-icons/fa";
import useClickScroll from "@/custom/hooks/useClickScroll";
import { Helmet } from "react-helmet";
import { CmsAPI } from "@/custom/utils/actions";
import { ProductAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import Heading from "@/components/Heading";
import LaptopSpecialList from "@/components/Laptop/LaptopSpecialList";
import LaptopHeader from "@/components/Laptop/LaptopHeader";

const _ = require("lodash");

function Specials() {
  const [topText, setTopText] = useState<any>();
  const [bottomText, setBottomText] = useState<any>();
  const [sepcialText, setSpecialText] = useState<any>();
  const [specialData, setSpecialData] = useState<any>([]);
  const [SpecialDeals, setSpecialDeals] = useState<any>([]);
  const [laptops, setLaptops] = useState<any>([]);
  const [listGrid, setListGrid] = useState<any>(true);
  const divRef = useRef<any>();
  const { clickScroll } = useClickScroll();
  const [loader, setLoader] = useState<any>(true);
  const [initInfo, setInitInfo] = useState(false);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const RenderSection = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );
  const RenderSpecials = (props: any) => (
    <div dangerouslySetInnerHTML={{ __html: props.HTML }}></div>
  );

  const RenderScript = (props: any) => {
    useEffect(() => {
      const fragment: any = document
        .createRange()
        .createContextualFragment(props.HTML);

      divRef.current.append(fragment);
    }, []);

    return <div ref={divRef} />;
  };

  const getTopText = async () => {
    const tText = await CmsAPI.getInfoByColumn({ no: 33 });

    let text = tText.result[0];

    try {
      setTopText(text.columnData);
    } catch (e) {}
  };

  const getBottomText = async () => {
    const bText = await CmsAPI.getInfoByColumn({ no: 34 });

    let text = bText.result[0];

    try {
      setBottomText(text.columnData);
    } catch (e) {}
  };

  const getSpecials = async () => {
    const specialText = await CmsAPI.getInfoByColumn({ no: 36 });

    let specials = specialText.result[0];
    try {
      setSpecialText(specials.columnData);
    } catch (e) {}
  };

  const getLaptopsSpecial = async (specialInfo) => {
    const laptops = await ProductAPI.laptopSpecials();
    let specialLaps = laptops.result;
    if (specialLaps != undefined && specialLaps !== null) {
      setLaptops(specialLaps);
      let specials = _.map(specialInfo, (special: any) => {
        special.data = _.filter(specialLaps, (laptops: any) => {
          return _.lowerCase(laptops.Brand) === _.lowerCase(special.brand);
        });
        return special;
      });
      setSpecialData(specials);
    }
  };

  const fetchSpecials = async () => {
    const data = await CmsAPI.getReactInfo({ id: 16 });
    if (data != undefined && data !== null && data.result !== undefined) {
      let specialDatas = data.result;
      setSpecialDeals(specialDatas);
      setLoader(false);
      await getLaptopsSpecial(specialDatas);
    } else {
      await getLaptopsSpecial([]);
    }
  };

  useEffect(() => {
    if (!initInfo) {
      getSpecials();
      fetchSpecials();
      getTopText();
      getBottomText();
      setInitInfo(true);
    }
  }, []);

  const newKey = "IsSpecial";
  let newValue = 1;

  _.forEach(laptops, function (item: any) {
    item[newKey] = newValue;
  });

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Laptop Specials & Laptop Deals - Laptops for sale at discounted price
        </title>
        <link
          rel="canonical"
          href="https://www.evetech.co.za/laptop-specials-for-sale-south-africa.aspx"
        />
        <meta
          name="description"
          content="We strive to offer the best laptop specials in South Africa, covering a vast variety of laptop deals. Take a look at our current laptops for sale on offer"
        />
        {/* <meta name="keywords" content={category.keyword} /> */}
      </Helmet>

      <LaptopHeader />

      {initInfo && (
        <Container
          fluid
          className={`${
            darkMode ? `evetechDark bg-dark` : ``
          } position-relative z-index-1`}
        >
          <Col md={{ span: 10, offset: 1 }} className={`py-4`}>
            {/* Top Text */}
            {topText !== undefined && (
              <Row className={`${darkMode ? `text-light` : ``}`}>
                <RenderSection HTML={topText} />
                <RenderScript
                  HTML={`<script> document.getElementsByClassName("moreText")[0].style.display = "none"; document.getElementById("rdLess").style.display = "none"; function more() { document.getElementsByClassName("moreText")[0].style.display = ""; document.getElementById("rdMore").style.display = "none"; document.getElementById("rdLess").style.display = ""; } function less() { document.getElementsByClassName("moreText")[0].style.display = "none"; document.getElementById("rdMore").style.display = ""; document.getElementById("rdLess").style.display = "none"; } </script>`}
                />
              </Row>
            )}
            <Row className={styles.RenderSpecials}>
              <RenderSpecials HTML={sepcialText} />
            </Row>

            <div
              className={`${styles.SalesHeader} ${
                !listGrid ? `${styles.ListHeader} mb-3` : ``
              } position-sticky`}
              style={{ zIndex: !listGrid ? "2" : "1" }}
            >
              <div
                className={`${styles.LayoutSwitch} ${
                  listGrid ? styles.Grid : styles.List
                } position-sticky pe-none mt-3`}
              >
                <div className="p-2 pe-none" id="LaptopSale">
                  <ButtonGroup className="pe-auto">
                    <Button
                      size="sm"
                      className={`${
                        listGrid ? `bg-dark text-light` : `bg-light text-dark`
                      } border-dark`}
                      onClick={() => {
                        setListGrid(true);
                        clickScroll("LaptopSale", 150);
                      }}
                    >
                      <FaTh />
                    </Button>
                    <Button
                      size="sm"
                      className={`${
                        !listGrid ? `bg-dark text-light` : `bg-light text-dark`
                      } border-dark`}
                      onClick={() => {
                        setListGrid(false);
                        clickScroll("LaptopSale", 150);
                      }}
                    >
                      <FaThList />
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
              {/* Special List Layout With filters*/}
              {listGrid ? (
                <LaptopListFilters
                  Laptops={laptops}
                  FilterKeys={["Brand"]}
                  FilterText={[]}
                  Title={"Laptops on Sale"}
                  styles={styles}
                />
              ) : (
                <Row
                  className={`
                  ${
                    darkMode
                      ? `bg-dark bg-gradient text-light border-bottom border-secondary border-opacity-50 rounded-bottom mt-2`
                      : `bg-light`
                  } shadow position-sticky py-2 pb-3`}
                >
                  <Heading level={2} className="m-0 fs-6">
                    Laptops on Sale
                  </Heading>
                </Row>
              )}
              {/* Special List Layout  With filters*/}
            </div>

            {/* Special Slider Layout */}
            {!listGrid && (
              <>
                <Stack className="gap-2 gap-md-3">
                  <LaptopSpecialList specialData={specialData} />
                </Stack>
              </>
            )}
            {/* Special  Slider Layout */}

            {/* Top Text */}
          </Col>
          <Col
            md={{ span: 10, offset: 1 }}
            className={`${darkMode ? `text-light` : ``} pb-5`}
          >
            <div className="w-100">
              <RenderSection HTML={bottomText} />
            </div>
          </Col>
        </Container>
      )}
    </>
  );
}

export default Specials;
