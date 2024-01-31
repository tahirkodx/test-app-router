import React, { useEffect, useState } from "react";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import LaptopFooter from "@/components/Footers/LaptopFooter";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import LaptopDetailBanners from "@/components/Laptop/Controls/LaptopDetailBanners";
import NoPageData from "@/components/NoPageData";
import LaptopCard from "@/components/Laptop/Controls/LaptopCard";
import { nanoid } from "nanoid";
import styles from "@/styles/DynamicPage/DynamicPage.module.scss";
import Paginator from "@/components/Paginator/Paginator";
import useClickScroll from "@/custom/hooks/useClickScroll";
// import Compare from "./Controls/Compare";
import { Helmet } from "react-helmet";
import { ProductAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
var _ = require("lodash");

const GamingLaptops = () => {
  const [productData, setProductData] = useState([]);
  const [pcount, setPcount] = useState(0);
  const [initProduct, setInitProduct] = useState(false);
  const [initProducts, setInitProducts] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [refreshPages, setRefereshPages] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showCompare, setShowCompare] = useState(true);
  const { clickScroll } = useClickScroll();
  const [compared, setCompared] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [comparedCount, setComparedCount] = useState(0);
  const [initInfo, setInitInfo] = useState<any>(false);
  const [textFilters, setTextFilters] = useState([
    {
      field: "All",
      slug: "All",
      cnt: 0,
    },
  ]);
  const [activeTextFilter, setActiveTextFilter] = useState({
    field: "All",
    slug: "All",
    cnt: 0,
  });
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const setPagination = (count: any) => {
    setTotalPage(count > 28 ? Math.ceil(count / 28) : 1);
    setRefereshPages(false);
  };

  const onActivePageSet = (active: any) => {
    setActivePage(active);
  };

  const comparedUpdated = (products: any) => {
    setCompared(products);
  };

  const isHD = useMediaQuery("(min-width: 1921px)");

  const selectedCompare = (productId: any) => {
    if (compared.length < 4) {
      products.map((product: any, ind: any) => {
        if (product.npid === productId) {
          product.isCompared = true;
          setCompared((prevCompared: any) => {
            return [...prevCompared, product];
          });
        }
      });
      setProducts(products);
    }

    let comparedStat = products.filter((prod: any) => {
      if (prod.isCompared) return prod;
    });

    comparedUpdated(comparedStat);
    setComparedCount(comparedStat.length);
  };

  const removedCompare = (productId: any) => {
    products.map((product: any, ind: any) => {
      if (product.npid === productId) {
        product.isCompared = false;

        setCompared((prevCompared: any) => {
          prevCompared = prevCompared.filter((prod: any, ind: any) => {
            if (prod.npid !== productId) return prod;
          });
          return prevCompared;
        });
      }
    });
    setProducts(products);
    let comparedStat = products.filter((prod: any) => {
      if (prod.isCompared) return prod;
    });

    setInitProduct(true);

    comparedUpdated(comparedStat);
    setComparedCount(comparedStat.length);
  };

  const onPcountUpdate = (count: any) => {
    setPcount(count);
    setPagination(count);
    setInitProducts(true);
    setTextFilters((prevState) => {
      _.map(prevState, (state: any) => {
        if (state.slug === "All") state.cnt = count;
      });
      return prevState;
    });

    setActiveTextFilter((prevState) => {
      if (prevState.slug === "All") prevState.cnt = count;
      return prevState;
    });
  };

  useEffect(() => {
    const getGamingLaptop = async () => {
      const prodData = await ProductAPI.getGamingLaptops();

      let products = prodData.result;
      onPcountUpdate(products !== undefined ? products.length : 0);
      setProductData((prevProdData) => {
        prevProdData = products;
        return prevProdData;
      });

      setPcount(products.length);
      setPagination(products.length);
      setInitProduct(true);
    };

    getGamingLaptop();
    setInitInfo(true);
  }, []);

  useEffect(() => {
    const checkProductData = () =>
      productData.length === 0 ? setLoading(false) : null;
    setTimeout(checkProductData, 5000);
  }, [productData, loading]);

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Gaming Laptops
        </title>

        <meta
          name="description"
          content="Here at Evetech we handpicked the best Gaming laptops allowing you to choose between the best of best, whether you want to play your favorite game or create to inspire."
        />
        {/* <meta name="keywords" content={category.keyword} /> */}
      </Helmet>

      <ComponentsHeader />
      {initInfo && (
        <Container
          fluid
          className={`
            ${darkMode ? `evetechDark bg-dark text-light` : ``} 
            py-4
        `}
        >
          <Row>
            <Col lg={10}>
              <Row>
                <Col md={12}>
                  <Image
                    src="https://www.evetech.co.za/repository/ProductImages/Gaming-Laptop-Page-Header-980px-v2.jpg"
                    className="img-fluid float-xl-start mb-3 me-xl-3"
                    alt="Gaming Lasptops at Evetech"
                  ></Image>
                  <h1>Gaming Laptops</h1>
                  <p className="fsz-3">
                    A gaming laptop means high speed, huge memory, better
                    graphics, and fast processing power, but there are other
                    factors that play a role such as appearance for those slick
                    stylish looks and long-lasting battery life. Not to worry,
                    here at Evetech we handpicked the best of those laptops
                    allowing you to choose between the best of best gaming
                    laptops, whether you want to play your favorite game or
                    create to inspire.
                  </p>
                  <p className="fsz-3">
                    Don&apos;t let location or performance confine your gaming
                    experience. We provide the best laptop deals in South
                    Africa. Shop our latest Gaming laptops deals here.
                  </p>
                </Col>
              </Row>
              <div
                className={`
                  ${styles.Pagination} 
                  ${darkMode ? `bg-dark` : `bg-light`}
                  d-flex justify-content-between flex-wrap align-items-center rounded-bottom p-2 border-bottom gap-2
                `}
              >
                <h2 className={`fsz-3 m-0`}>Gaming Laptops ({pcount})</h2>
                <span onClick={() => clickScroll("Products", 125)}>
                  {pcount === 0 ? null : (
                    <Paginator
                      TotalPage={totalPage}
                      ActivePage={activePage}
                      onSetActivePage={onActivePageSet}
                      isReset={refreshPages}
                    />
                  )}
                </span>
              </div>

              <Container fluid className={`py-3 px-0`} id="Products">
                <div
                  className={`
                  ${isHD ? `cols-xxl-5` : `cols-xxl-4`}
                  d-grid cols-2 cols-md-3 cols-lg-3 cols-xxl-4 gap-2 gap-md-3 gap-xxl-5 mb-3
                `}
                >
                  {productData &&
                    productData.map(
                      (product, ind) =>
                        ind >= 28 * activePage - 28 &&
                        ind < 28 * activePage && (
                          <LaptopCard
                            product={product}
                            key={nanoid(5)}
                            ShowCompare={false}
                            onSelectedCompare={selectedCompare}
                            onRemovedCompare={removedCompare}
                            ComparedCount={comparedCount}
                          />
                        )
                    )}
                </div>
                {loading ? (
                  <section
                    className={`
                      ${darkMode ? `bg-dark text-light` : ``}
                      w-100 d-flex justify-content-center align-items-center gap-3 p-5 flex-wrap
                    `}
                  >
                    <Spinner animation="border" variant="primary" /> Loading
                    Products
                  </section>
                ) : (
                  productData &&
                  productData.length === 0 && <NoPageData isProduct={true} />
                )}
              </Container>
            </Col>
            <Col lg={2}>
              <LaptopDetailBanners />
            </Col>
          </Row>
        </Container>
      )}

      {/* {showCompare && <Compare Products={compared} />} */}
    </>
  );
};

export default GamingLaptops;
