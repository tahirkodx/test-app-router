"use client";
import LaptopHeader from "@/components/Laptop/LaptopHeader";
import LoadingSpinner from "@/components/Spinner";
import useClickScroll from "@/custom/hooks/useClickScroll";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { ProductAPI } from "@/custom/utils/actions";
import AuthContext from "@/store/auth-context";
import HTMLReactParser from "html-react-parser";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import styles from "@/styles/Laptop/DynamicPage.module.scss";
import { FaFacebook, FaSlidersH, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { nanoid } from "nanoid";
import _ from "lodash";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import MultiRangeSlider from "@/components/Component/MultiRangeSlider";
import Paginator from "@/components/Paginator";
import NoPageData from "@/components/NoPageData";
import LaptopDetailBanners from "@/components/Laptop/LaptopDetailBanners";
import Compare from "@/components/Compare";
import EditDynamicOverlay from "@/components/EditDynamicOverlay";
import LaptopByAttributeID from "@/components/Laptop/LaptopByAttributeID";
import LaptopByQueryID from "@/components/Laptop/LaptopByQueryID";
import LaptopSpecialsByBrandID from "@/components/Laptop/LaptopSpecialsByBrandID";
import LaptopOnSpecialByAttributeID from "@/components/Laptop/LaptopOnSpecialByAttributeID";
import LaptopByFTSSearchTerm from "@/components/Laptop/LaptopByFTSSearchTerm";
import LaptopFPSByQueryID from "@/components/Laptop/LaptopFPSByQueryID";
import LaptopBySearchTerms from "@/components/Laptop/LaptopBySearchTerms";
import LaptopByMultipleSearchTerm from "@/components/Laptop/LaptopByMultipleSearchTerm";
import { useTheme } from "@/store/ThemeContext";
import Heading from "@/components/Heading";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const { clickScroll } = useClickScroll();
  const router = useRouter();
  const params = useParams();
  const [pageData, setPageData] = useState<any>({});
  const [pcount, setPcount] = useState<any>(0);
  const [totalPage, setTotalPage] = useState<any>(1);
  const [activePage, setActivePage] = useState<any>(1);
  const [refreshPages, setRefereshPages] = useState<any>(false);
  const [compared, setCompared] = useState<any>([]);
  const [initPageInfo, setInitPageInfo] = useState<any>(false);
  const [initProducts, setInitProducts] = useState<any>(false);
  const [minValue, setMinValue] = useState<any>(0);
  const [maxValue, setMaxValue] = useState<any>(999999999);
  const [minRange, setMinRange] = useState<any>(minValue);
  const [maxRange, setMaxRange] = useState<any>(maxValue);
  const [minRangeUp, setMinRangeUp] = useState<any>(minValue);
  const [maxRangeUp, setMaxRangeUp] = useState(maxValue);
  const [rangeFilterTitle, setRangeFilterTitle] = useState("");
  const [sortByFilter, setSortByFilter] = useState(0);
  const [textFilters, setTextFilters] = useState<any[]>([
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
  const [showFilter, setShowFilter] = useState(false);
  const [showCompare, setShowCompare] = useState(true);
  const [pageEditId, setPageEditId] = useState(0);
  const [pageId, setPageId] = useState(0);
  const [Filt, setFilt] = useState(false);
  const closeFilt = () => setFilt(false);
  const showFilt = () => setFilt(true);
  const isLG = useMediaQuery("(min-width: 992px)");
  const isXXL = useMediaQuery("(min-width: 1400px)");
  const isHD = useMediaQuery("(min-width: 1921px)");
  const [pageTitle, setPageTitle] = useState("");

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    let PID: any = params?.id;
    let Title: any = params?.pageTitle;
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
    if (Title !== undefined && Title.length > 0) {
      setPageTitle(Title);
    }
  }, [params]);

  const setPagination = (count: any) => {
    setTotalPage(count > 28 ? Math.ceil(count / 28) : 1);
    setRefereshPages(false);
  };

  const comparedUpdated = (products: any) => {
    setCompared(products);
  };

  useEffect(() => {
    const fetchPageData = async () => {
      const pdatas = await ProductAPI.getPages({ pageId });

      if (pdatas && pdatas.result !== null && pdatas.result.length > 0) {
        let data = pdatas.result;
        if (data !== undefined) {
          setPageData((prevPageData) => {
            prevPageData = data[0];
            return prevPageData;
          });
          setInitPageInfo(true);
          setInitProducts(true);
          try {
            setPageEditId(data[0].id);
          } catch (e) {}
        }
      }
    };
    fetchPageData();
  }, [pageId]);

  const onPcountUpdate = (count: any) => {
    setPcount(count);
    setPagination(count);
    setInitProducts(true);
    setTextFilters((prevState) => {
      _.map(prevState, (state) => {
        if (state.slug === "All") state.cnt = count;
      });
      return prevState;
    });

    setActiveTextFilter((prevState) => {
      if (prevState.slug === "All") prevState.cnt = count;
      return prevState;
    });
  };

  const onActivePageSet = (active: any) => {
    setActivePage(active);
  };

  const onRangeFilterUpdate = (min: any, max: any, title: any) => {
    if (min !== undefined && max !== undefined && title !== undefined) {
      setMinValue(min);
      setMaxValue(max);
      setRangeFilterTitle(title);
    }
  };

  const onShowFitlerUpdate = (show: any) => {
    setShowFilter(show);
  };

  const onTextFilterUpdate = (filters: any) => {
    setTextFilters((prevFilters) => {
      if (filters !== undefined && filters.length > 0)
        return [...prevFilters, ...filters];
      else return prevFilters;
    });
  };

  const onSetShowCompare = (isShow: any) => {
    setShowCompare(isShow);
  };

  const prodCardsLink = () => {
    clickScroll("productCards", 125);
  };

  const currentURL = `https://www.evetech.co.za/${pageTitle}/l/${pageId}`;

  return (
    <>
      {initPageInfo && pageData !== null && pageData !== undefined && (
        <Head>
          <title itemProp="name" lang="en">
            {pageData.title}
          </title>
          <meta name="description" content={pageData.metades}></meta>
        </Head>
      )}
      <LaptopHeader />
      <Container
        fluid
        className={`
          ${darkMode ? `bg-dark evetechDark` : ``}
          py-4
        `}
      >
        <Row>
          <Col lg={10} className="z-index-1">
            {!initPageInfo && <LoadingSpinner isEve={false} />}

            {initPageInfo && pageData !== null && pageData !== undefined && (
              <div
                className={`
                ${styles.Overview}
                ${darkMode ? `text-light` : ``}
              `}
              >
                {HTMLReactParser(pageData.tdes)}
              </div>
            )}

            {initProducts && pageData !== null && pageData !== undefined && (
              <div
                className={`
                  ${styles.Pagination} 
                  d-flex justify-content-between flex-wrap align-items-center justify-content-center rounded-bottom p-2 border-bottom gap-2 mb-3
                  ${
                    pageData.ctrltype === 45
                      ? `bg-dark text-light`
                      : `${
                          darkMode
                            ? `bg-dark bg-gradient border-secondary border-opacity-50`
                            : `bg-light`
                        }`
                  }
                `}
              >
                <span
                  className="d-flex gap-2 flex-wrap align-items-center justify-content-between"
                  style={{ maxWidth: "100%" }}
                >
                  <Heading
                    level={2}
                    className={`fs-6 m-0`}
                    style={{ maxWidth: "100%" }}
                  >
                    {pageData.ctrlheading} ({pcount})
                  </Heading>
                  {pageData.ctrltype === 45 ? (
                    <div className="d-flex gap-1 fs-5">
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
                        // related=""
                      >
                        <FaTwitter className="text-info" />
                      </TwitterShareButton>
                    </div>
                  ) : null}
                </span>

                {showFilter && isXXL ? (
                  <div
                    className="d-flex gap-2 align-items-center"
                    onClick={prodCardsLink}
                  >
                    <Form className={`${styles.Form} d-flex flex-wrap gap-2`}>
                      <Form.Select
                        aria-label="Default select example"
                        className={`
                          ${styles.SmallSelect} 
                          ${
                            darkMode
                              ? `bg-black text-light border-secondary`
                              : ``
                          }
                        `}
                        key={nanoid(2)}
                        onChange={(event: any) => {
                          setSortByFilter(event.target.value);
                        }}
                        defaultValue={sortByFilter}
                      >
                        <option value="0">Sort By:</option>
                        <option value="-1">Price: Low to High </option>
                        <option value="1">Price: High to Low</option>
                      </Form.Select>
                      <Form.Select
                        aria-label="Default select example"
                        className={`
                          ${styles.SmallSelect} 
                          ${
                            darkMode
                              ? `bg-black text-light border-secondary`
                              : ``
                          }
                        `}
                        key={nanoid(2)}
                        onChange={(event) => {
                          setActiveTextFilter(
                            _.first(
                              _.filter(textFilters, (filter) => {
                                return filter.slug === event.target.value;
                              })
                            )
                          );
                        }}
                        defaultValue={activeTextFilter.slug}
                      >
                        {_.map(textFilters, (filters, index) => {
                          if (index === 0) {
                            return (
                              <option value={filters.slug} key={nanoid(5)}>
                                {filters.slug + " - " + filters.cnt}
                              </option>
                            );
                          } else {
                            return (
                              <option value={filters.slug} key={nanoid(5)}>
                                {filters.slug + " - " + filters.cnt}
                              </option>
                            );
                          }
                        })}
                      </Form.Select>
                    </Form>
                    <div className="position-relative d-flex align-items-center">
                      <MultiRangeSlider
                        min={minValue}
                        max={maxValue}
                        onChange={({ min, max }: any) => {
                          setMinRange(min);
                          setMaxRange(max);
                        }}
                        onMouseUp={({ min, max }: any) => {
                          setMinRangeUp(min);
                          setMaxRangeUp(max);
                        }}
                        onTouchEnd={({ min, max }: any) => {
                          setMinRangeUp(min);
                          setMaxRangeUp(max);
                        }}
                      />

                      <div
                        className="text-center position-absolute bottom-0 w-100 pe-none top-50"
                        style={{ marginTop: "-8px" }}
                      >
                        <Badge bg="secondary">
                          <span className="fw-1 z-index-2">
                            <small>{rangeFilterTitle}</small>
                          </span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : null}
                {totalPage < 2 ? null : (
                  <span onClick={prodCardsLink}>
                    <Paginator
                      TotalPage={totalPage}
                      ActivePage={activePage}
                      onSetActivePage={onActivePageSet}
                      isReset={refreshPages}
                    />
                  </span>
                )}

                {!isXXL && showFilter ? (
                  <div className={`d-flex flex-wrap gap-2`}>
                    <Button variant="primary" size="sm" onClick={showFilt}>
                      <FaSlidersH /> <small>Filters</small>
                    </Button>
                    <Modal show={Filt} onHide={closeFilt}>
                      <Modal.Header closeButton>
                        <Modal.Title>Filters</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="d-flex flex-wrap gap-4 justify-content-center">
                          <Form
                            className={`${styles.Form} d-flex flex-wrap gap-2`}
                          >
                            <Form.Select
                              aria-label="Default select example"
                              className={`${styles.SmallSelect}`}
                              key={nanoid(2)}
                              onChange={(event: any) => {
                                setSortByFilter(event.target.value);
                              }}
                              defaultValue={sortByFilter}
                              onClick={prodCardsLink}
                            >
                              <option value="0">Sort By:</option>
                              <option value="-1">Price: Low to High </option>
                              <option value="1">Price: High to Low</option>
                            </Form.Select>
                            <Form.Select
                              aria-label="Default select example"
                              className={`${styles.SmallSelect}`}
                              key={nanoid(2)}
                              onChange={(event) => {
                                setActiveTextFilter(
                                  _.first(
                                    _.filter(textFilters, (filter) => {
                                      return filter.slug === event.target.value;
                                    })
                                  )
                                );
                              }}
                              onClick={prodCardsLink}
                              defaultValue={activeTextFilter.slug}
                            >
                              {_.map(textFilters, (filters, index) => {
                                if (index === 0) {
                                  return (
                                    <option
                                      value={filters.slug}
                                      key={nanoid(5)}
                                    >
                                      {filters.slug + " - " + filters.cnt}
                                    </option>
                                  );
                                } else {
                                  return (
                                    <option
                                      value={filters.slug}
                                      key={nanoid(5)}
                                    >
                                      {filters.slug + " - " + filters.cnt}
                                    </option>
                                  );
                                }
                              })}
                            </Form.Select>
                          </Form>
                          <div
                            className="position-relative d-flex align-items-center"
                            onClick={prodCardsLink}
                          >
                            <MultiRangeSlider
                              min={minValue}
                              max={maxValue}
                              onChange={({ min, max }: any) => {
                                setMinRange(min);
                                setMaxRange(max);
                              }}
                              onMouseUp={({ min, max }: any) => {
                                setMinRangeUp(min);
                                setMaxRangeUp(max);
                              }}
                              onTouchEnd={({ min, max }: any) => {
                                setMinRangeUp(min);
                                setMaxRangeUp(max);
                              }}
                            />

                            <div
                              className="text-center position-absolute bottom-0 w-100 pe-none top-50"
                              style={{ marginTop: "-8px" }}
                            >
                              <Badge bg="secondary">
                                <span className="fw-1 z-index-2">
                                  <small>{rangeFilterTitle}</small>
                                </span>
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="danger" onClick={closeFilt}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                ) : null}
              </div>
            )}

            {/* <>
              <div className="bg-danger fw-3 fs-3 text-light">
                pageData.ctrltype: {pageData.ctrltype} ((Referance))
              </div>
            </> */}

            <div
              className={`
                ${isHD ? `cols-xxl-5` : `cols-xxl-4`}
                d-grid cols-2 cols-md-3 cols-lg-3 cols-xxl-4 gap-2 gap-md-3 gap-xxl-5 mb-3
              `}
              id="productCards"
            >
              {!initProducts ? (
                <>
                  <LoadingSpinner isEve={false} />
                  <LoadingSpinner isEve={false} />
                  <LoadingSpinner isEve={false} />
                  <LoadingSpinner isEve={false} />
                  <LoadingSpinner isEve={false} />
                </>
              ) : null}
              {pageData !== undefined && pageData.ctrltype === 1 && (
                <LaptopBySearchTerms
                  Tags={pageData.tags}
                  Sort={parseInt(pageData.sortorder)}
                  CacheControl={pageData.CacheControl === "yes" ? true : false}
                  CacheName={
                    pageData.name.replace(/ /g, "-").toLowerCase() +
                    pageId.toString().toLowerCase()
                  }
                  onUpdateCount={onPcountUpdate}
                  pageShow={activePage}
                  onComparedUpdated={comparedUpdated}
                />
              )}
              {pageData !== undefined &&
                pageData.ctrltype === 2 &&
                parseInt(pageData.ctrlid) > 0 && (
                  <LaptopByAttributeID
                    CtrlId={parseInt(pageData.ctrlid)}
                    Sort={parseInt(pageData.sortorder)}
                    CacheControl={
                      pageData.CacheControl === "yes" ? true : false
                    }
                    CacheName={(
                      pageData.name.replace(/ /g, "-").toLowerCase() + pageId
                    ).toLowerCase()}
                    onUpdateCount={onPcountUpdate}
                    pageShow={activePage}
                    onComparedUpdated={comparedUpdated}
                  />
                )}
              {pageData !== undefined && pageData.ctrltype === 3 && (
                <LaptopByMultipleSearchTerm
                  Tags={pageData.tags}
                  Sort={parseInt(pageData.sortorder)}
                  CacheControl={pageData.CacheControl === "yes" ? true : false}
                  CacheName={
                    pageData.name.replace(/ /g, "-").toLowerCase() +
                    pageId.toString().toLowerCase()
                  }
                  onUpdateCount={onPcountUpdate}
                  pageShow={activePage}
                  onComparedUpdated={comparedUpdated}
                />
              )}
              {pageData !== undefined && pageData.ctrltype === 17 && (
                <LaptopSpecialsByBrandID
                  CtrlId={parseInt(pageData.ctrlid)}
                  Sort={parseInt(pageData.sortorder)}
                  CacheControl={pageData.CacheControl === "yes" ? true : false}
                  CacheName={
                    pageData.name.replace(/ /g, "-").toLowerCase() +
                    pageId.toString().toLowerCase()
                  }
                  onUpdateCount={onPcountUpdate}
                  pageShow={activePage}
                  onComparedUpdated={comparedUpdated}
                />
              )}
              {pageData !== undefined && pageData.ctrltype === 19 && (
                <LaptopOnSpecialByAttributeID
                  CtrlId={parseInt(pageData.ctrlid)}
                  Sort={parseInt(pageData.sortorder)}
                  CacheControl={pageData.CacheControl === "yes" ? true : false}
                  CacheName={
                    pageData.name.replace(/ /g, "-").toLowerCase() +
                    pageId.toString().toLowerCase()
                  }
                  onUpdateCount={onPcountUpdate}
                  pageShow={activePage}
                  onComparedUpdated={comparedUpdated}
                />
              )}
              {pageData !== undefined && pageData.ctrltype === 26 && (
                <LaptopByFTSSearchTerm
                  Tags={pageData.tags}
                  Sort={parseInt(pageData.sortorder)}
                  CacheControl={pageData.CacheControl === "yes" ? true : false}
                  CacheName={
                    pageData.name.replace(/ /g, "-").toLowerCase() +
                    pageId.toString().toLowerCase()
                  }
                  onUpdateCount={onPcountUpdate}
                  pageShow={activePage}
                  onComparedUpdated={comparedUpdated}
                />
              )}
              {/* By Query ID */}
              {pageData !== undefined && pageData.ctrltype === 43 && (
                <LaptopByQueryID
                  QueryId={pageData.tags}
                  Sort={parseInt(pageData.sortorder)}
                  IsCache={pageData.CacheControl === "yes" ? true : false}
                  CacheName={`/${_.replace(
                    _.toLower(pageData.url),
                    new RegExp(" ", "g"),
                    "-"
                  ).trim()}`}
                  onUpdateCount={onPcountUpdate}
                  IsSearch={false}
                  pageShow={activePage}
                  onComparedUpdated={comparedUpdated}
                />
              )}
              {pageData !== undefined && pageData.ctrltype === 44 && (
                <LaptopByQueryID
                  QueryId={pageData.tags}
                  IsCache={pageData.CacheControl === "yes" ? true : false}
                  CacheName={`/${_.replace(
                    _.toLower(pageData.url),
                    new RegExp(" ", "g"),
                    "-"
                  ).trim()}`}
                  onUpdateCount={onPcountUpdate}
                  IsSearch={true}
                  pageShow={activePage}
                  onComparedUpdated={comparedUpdated}
                />
              )}
              {pageData !== undefined && pageData.ctrltype === 45 && (
                <LaptopFPSByQueryID
                  QueryId={pageData.tags}
                  Sort={parseInt(pageData.sortorder)}
                  IsCache={pageData.CacheControl === "yes" ? true : false}
                  CacheName={
                    pageData.name.replace(/ /g, "-").toLowerCase() +
                    pageId.toString().toLowerCase()
                  }
                  Heading={pageData.ctrlheading}
                  onUpdateCount={onPcountUpdate}
                  IsSearch={true}
                  pageShow={activePage}
                  onComparedUpdated={comparedUpdated}
                  filterRange={{
                    min: minRangeUp,
                    max: maxRangeUp,
                  }}
                  filterSort={{ sortBy: sortByFilter }}
                  filterText={{ filterBy: activeTextFilter }}
                  isFilter={{ isFilter: showFilter }}
                  onRangeFilterUpdate={onRangeFilterUpdate}
                  onShowFitlerUpdate={onShowFitlerUpdate}
                  onTextFilterUpdate={onTextFilterUpdate}
                  onSetShowCompare={onSetShowCompare}
                />
              )}
            </div>

            {initPageInfo && pageData === undefined && <NoPageData />}

            {pageData !== null &&
              pageData !== undefined &&
              pageData.bdes !== undefined && (
                <div
                  className={`
                    ${styles.Overview}
                    ${darkMode ? `text-light` : ``} 
                  `}
                >
                  {HTMLReactParser(pageData.bdes)}
                </div>
              )}
          </Col>

          <Col lg={2} className="z-index-1">
            <LaptopDetailBanners />
          </Col>
        </Row>
      </Container>

      {showCompare && compared !== undefined && compared.length > 0 && (
        <Compare Products={compared} />
      )}

      {authCtx !== undefined && authCtx.isAdmin ? (
        <EditDynamicOverlay pageid={pageEditId} />
      ) : null}
    </>
  );
};

export default Home;
