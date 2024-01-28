import { nanoid } from "nanoid";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Button, Card, Col, Row, Image } from "react-bootstrap";
import ComponentCard from "@/components/Product/ComponentCard";
import NCartContext from "@/store/ncart-context";
import PCConfigBundles from "@/components/config/PCConfigBundles";
import PCConfigFooter from "@/components/config/PCConfigFooter";
import {
  FaCartPlus,
  FaEnvelopeOpenText,
  FaExclamationTriangle,
  FaSmileBeam,
  FaUndo,
} from "react-icons/fa";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import useClickScroll from "@/custom/hooks/useClickScroll";
import AskQuestion from "@/components/Modals/AskQuestion";
import styles from "@/styles/Config.module.scss";
import AuthContext from "@/store/auth-context";
import { ComponentsHeader } from "@/components/Home";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { CartAPI, ProductAPI } from "@/custom/utils/actions";
import { useTheme } from "@/store/ThemeContext";

const _ = require("lodash");
const Swal = require("sweetalert2");
const moment = require("moment");

const Config = () => {
  const params = useParams();
  const cartCtx = useContext(NCartContext);
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const [config, setConfig]: any = useState({});
  const [configBundle, setConfigBundles] = useState({});
  const [pc, setPc]: any = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedBundleItems, setSelecetecBundleItems] = useState([]);
  const [upgradeBundles, setUpgradeBundles] = useState(null);
  const [optionDetails, setOptionDetails] = useState([]);
  const [stockStatus, setStockStatus] = useState("In Stock");
  const [mainImage, setMainImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [ulGpuList, setUlGpuList] = useState([]);
  const [ulCpuList, setUlCpuList] = useState([]);
  const [isBundleOpen, setIsBundleOpen] = useState(true);
  const [isConfigBundleExpire, setIsConfigBundleExpire] = useState(false);
  const [isConfigExpire, setIsConfigExpire] = useState(false);
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);

  const isXL = useMediaQuery("(min-width: 1200px)");
  const [askQuestionShow, setAskQuestionShow] = useState(false);

  const pcRef = useRef();
  const bundlesInfoRef = useRef();
  const [ConfigNo, setConfigNo] = useState(0);
  const [initInfo, setInitInfo] = useState(false);

  useEffect(() => {
    let confNo: any = params?.id;
    console.log("params", params);
    if (confNo !== undefined && confNo.trim().length > 0) {
      if (isNaN(confNo)) {
        try {
          confNo = parseInt(confNo.replace(".", "").replace("aspx", "").trim());
          setConfigNo(confNo);
        } catch (e) {
          /* router.replace("/"); */
          console.log(e);
        }
      } else {
        confNo = parseInt(confNo.replace(".", "").replace("aspx", "").trim());
        setConfigNo(confNo);
      }
    }
  }, [params]);

  const addToCartHandler = async (event: any) => {
    event.preventDefault();
    const totalQty = 1;
    const product: any = pcRef.current;

    let upPrice = 0;
    let upTitle = "";
    let selecetedBundles = bundlesInfoRef.current;
    if (selecetedBundles !== null) {
      upPrice = _.sumBy(selecetedBundles, function (o: any) {
        return parseFloat(o.Price);
      });
      upTitle = _.join(
        _.map(selecetedBundles, (bundle: any) => {
          return " + " + bundle.Title;
        }),
        " "
      );
    }

    let config = `${product.Name}`;
    _.map(selecetedBundles, (items: any) => {
      if (!items.Title.includes("Not Included"))
        config += `<br />${items.BundleTitle} : ${items.Title} ${
          items.Price > 0 ? "[+ R" + items.Price + "]" : ""
        }`;
    });

    let totPrice = Math.round(
      Math.round(product.Price_Vat * 0.95238) + upPrice
    );

    let auth = JSON.parse(localStorage.getItem("user_auth")) || null;
    let cartUrl = "/api/cart/add";
    if (auth !== null && auth.isLoggedIn === true)
      cartUrl = "/api/authcart/add";

    /* const cartAdd = await fetch(cartUrl, {
      method: "POST",
      body: JSON.stringify({
        id: nanoid(8),
        productId: product.ProductID,
        name: product.Name,
        qty: totalQty,
        qtPeCs: totalQty,
        pType: 1,
        addOns: selecetedBundles,
      }),
      headers: {
        Authorization: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json()); */

    let cartAdd: any = null;
    if (auth !== null && auth.isLoggedIn === true)
      cartAdd = await CartAPI.addAuthToCart({
        id: nanoid(8),
        productId: product.ProductID,
        name: product.Name,
        qty: totalQty,
        qtPeCs: 1,
        pType: 2,
        addOns: selecetedBundles,
      });
    else
      cartAdd = await CartAPI.addToCart({
        id: nanoid(8),
        productId: product.ProductID,
        name: product.Name,
        qty: totalQty,
        qtPeCs: 1,
        pType: 2,
        addOns: selecetedBundles,
      });

    if (cartAdd !== null) {
      let addCart = cartAdd.result;

      if (addCart.status === 0) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: addCart.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (addCart.status === -1) {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: addCart.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (addCart.status === 2) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: addCart.message,
          showConfirmButton: false,
          timer: 1500,
        });
        cartCtx.fetchCart();
      } else if (addCart.status === 1) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: addCart.message,
          showConfirmButton: false,
          timer: 1500,
        });
        cartCtx.fetchCart();
      }
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "!Oops, Problem occured try again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  /* getConfigDetails */
  const getConfig = async () => {
    const configData = await ProductAPI.getConfig({ ConfigNo });
    if (
      configData !== null &&
      configData !== undefined &&
      configData.result !== undefined &&
      configData.result !== null &&
      configData.result.length > 0
    ) {
      /* const configData = await fetch(`/api/getConfig/${ConfigNo}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        }).then((res) => res.json()); */
      let conf = configData.result[0];
      setConfig((prevConfig) => {
        prevConfig = conf;
        return prevConfig;
      });

      let today = moment(Date());
      let expiryDate = moment(conf.ExpiryDate);
      var duration = moment.duration(expiryDate.diff(today));
      var seconds = duration.asSeconds();
      if (seconds < 0) setIsConfigExpire(true);
      if (conf.pid !== undefined && conf.pid !== null) getPCData(conf.pid);
    }
  };

  const getBundlesInfo = async (productId: any) => {
    const bundleData = await ProductAPI.getBundlesInfo({ productId });
    if (
      bundleData !== null &&
      bundleData !== undefined &&
      bundleData.result !== undefined
    ) {
      let pcBundleData = bundleData.result;
      setUpgradeBundles((prevBundles) => {
        prevBundles = pcBundleData;
        return prevBundles;
      });

      /* Bundle Options Details Get */
      let optionIds = _.join(_.map(pcBundleData, "OptionId"), ",");

      const getBundleDetails = async () => {
        const optionData = await ProductAPI.getBundleOptionsByIds({
          OptionIds: optionIds,
        });
        /* const optionData = await fetch(`/api/getBundleOptionsByIds`, {
                method: "post",
                headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                },
                body: JSON.stringify({
                OptionIds: optionIds,
                }),
            }).then((res) => res.json()); */
        if (
          optionData !== null &&
          optionData !== undefined &&
          optionData.result !== undefined &&
          optionData.result !== null
        ) {
          let options = optionData.result;
          setOptionDetails((prevOptions) => {
            prevOptions = options;
            return prevOptions;
          });
        }
      };

      if (optionIds.trim().length > 0) getBundleDetails();

      /* Bundle Options Details Get */
    }
  };

  const getPCOtherData = async (productId: any) => {
    const pcDatas = await ProductAPI.getPCData({ productId });
    if (
      pcDatas !== null &&
      pcDatas !== undefined &&
      pcDatas.result !== undefined
    ) {
      let pcData = pcDatas.result[0];

      setMainImage((pervImage) => {
        pervImage = pcData.MainImage;
        return pervImage;
      });

      setBannerImage((pervImage) => {
        pervImage = pcData.BannerImage;
        return pervImage;
      });
    }
  };

  const getPCData = async (productId: any) => {
    const prods = await ProductAPI.getPCById({ productId });
    if (
      prods !== null &&
      prods !== undefined &&
      prods.result !== undefined &&
      prods.result.length > 0
    ) {
      let product = prods.result[0];

      if (product === undefined) router.push("/");

      pcRef.current = product;
      setPc((prevPC) => {
        prevPC = product;
        return prevPC;
      });

      setTotalPrice((prevPrice) => {
        let upPrice: any = 0;
        if (selectedBundleItems !== null) {
          upPrice = _.sumBy(selectedBundleItems, function (o: any) {
            return parseFloat(o.Price);
          });
        }
        return (
          Math.round(parseFloat(product.Price_Vat) * 0.95238) +
          parseFloat(upPrice)
        );
      });

      getPCOtherData(productId);
      getBundlesInfo(productId);

      setStockStatus((prevStat) => {
        let status = product.Availability.toLowerCase();

        if (
          status.includes("out of stock") ||
          status.includes("pre-order") ||
          status.includes("coming soon") ||
          status.includes("notify me") ||
          status.includes("coming soon / pre-order") ||
          status.includes("product discontinued") ||
          status.includes("stock to be confirm")
        ) {
          /* setAdCart(false);
                        setDivNotify(true); */
          /*  setCartElements(
            <Button
                variant="danger"
                className="pt-3 pb-3 fs-6 w-100"
                onClick={notifyMe}
            >
                Notify Me
            </Button>
            ); */
        } else {
          /*  setAdCart(true);
                        setDivNotify(false); */
          /* setCartElements(
            <div
                className={`${styles.BuyButtons} d-grid cols-2 cols-lg-1 gap-1 w100`}
            >
                <Button
                variant="warning"
                className="fs-6 w100"
                onClick={addToCartHandler}
                >
                Add To Cart
                </Button>
                <Button className={`${styles.BuyBtn} fs-6 w100`}>
                <div>Buy Now</div>
                </Button>
            </div>
            ); */
        }

        prevStat = product.Availability;
        return prevStat;
      });
    }
  };

  const getGPUList = async () => {
    const gpuData = await ProductAPI.getGPUList();
    if (
      gpuData !== null &&
      gpuData !== undefined &&
      gpuData.result !== undefined
    ) {
      let gpuList = gpuData.result;

      let deskGpuList = _.filter(gpuList, (gpu: any) => {
        if (gpu.type === "desktop") return gpu;
      });

      setUlGpuList((prevGPUList) => {
        prevGPUList = deskGpuList;
        return prevGPUList;
      });
    }
  };

  const getCPUList = async () => {
    const cpuData = await ProductAPI.getCPUList();
    if (
      cpuData !== null &&
      cpuData !== undefined &&
      cpuData.result !== undefined
    ) {
      let cpuList = cpuData.result;

      setUlCpuList((prevCPUList) => {
        prevCPUList = cpuList;
        return prevCPUList;
      });
    }
  };

  const getConfigBundles = async () => {
    const configData = await ProductAPI.getConfigBundles({ ConfigNo });
    if (
      configData !== null &&
      configData !== undefined &&
      configData.result !== undefined
    ) {
      let conf = configData.result;
      setConfigBundles((prevConfig) => {
        prevConfig = conf;
        return prevConfig;
      });
    }
  };

  useEffect(() => {
    if (!isNaN(ConfigNo) && ConfigNo > 0 && !initInfo) {
      getConfig();
      getConfigBundles();
      setInitInfo(true);
    }
  }, [ConfigNo]);

  const RenderHTML = (props: any) => (
    <div dangerouslySetInnerHTML={{ __html: props.HTML }}></div>
  );

  const currencyFormat = (num: any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  const toggleIsBundleOpen = () => {
    setIsBundleOpen((current) => !current);
    clickScroll("Bundles", 110);
  };

  /* Bundle Item Selection */
  const bundleItemsSeleceted = (bundleItem: any) => {
    setSelecetecBundleItems((prevBundleItems) => {
      let nOptionId = bundleItem.OptionId;
      let nOptionDetailId = bundleItem.OptionDetailId;
      prevBundleItems = _.filter(
        prevBundleItems,
        (item: any) =>
          item.OptionId !== nOptionId && item.OptionDetailId !== nOptionDetailId
      );
      let selecetedBundles = _.orderBy(
        [...prevBundleItems, bundleItem],
        ["Priority"]
      );
      let price = _.sumBy(selecetedBundles, function (o: any) {
        return Math.round(parseFloat(o.Price));
      });

      setTotalPrice(
        Math.round(parseFloat(pc.Price_Vat) * 0.95238) + parseFloat(price)
      );
      bundlesInfoRef.current = selecetedBundles;
      return selecetedBundles;
    });
  };

  const onSetConfigBundleExpire = (isExpire: any) => {
    setIsConfigBundleExpire(isExpire);
  };

  const { clickScroll } = useClickScroll();

  const bundleLink = (section: any) => {
    const sectionArea = section
      .toLowerCase()
      .replace(" ", "-")
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
      .trim()
      .replace(" ", "-")
      .replace(" ", "-");
    clickScroll(sectionArea, 110);
  };

  return (
    <>
      {/*  {config !== undefined ? (
        <Helmet>
          <title itemProp="name" lang="en">
            [Config] {pc !== undefined ? pc.Name : null}
          </title>
        </Helmet>
      ) : null} */}

      <ComponentsHeader showpagetopmsg={showPageTopMsg} />

      {console.log("config", config.pid)}

      {config.pid === undefined ? (
        <div className={darkMode ? `bg-dark` : ``}>
          <Col
            md={{
              span: 10,
              offset: 1,
            }}
            className={`py-3 px-3`}
          >
            <Card
              className={`
              p-2 p-sm-3 text-center shadow-lg rounded border d-flex justify-content-center
              ${
                darkMode
                  ? `bg-black border-secondary border-opacity-50 text-light`
                  : ``
              }
            `}
              style={{ height: "45vh" }}
            >
              <div>
                <h1 className="text-danger">
                  <FaExclamationTriangle /> Error
                </h1>
                <h2 className="mb-3">No Configuration Found</h2>
                <div
                  style={{ height: "250px", width: "250px" }}
                  className="mx-auto"
                >
                  <Image
                    src="https://www.evetech.co.za/repository/ProductImages/no-config-guy.png"
                    alt=""
                    width="250"
                    height="250"
                    className="w-100 h-100 object-fit-contain"
                  />
                </div>
              </div>
            </Card>
          </Col>
        </div>
      ) : (
        <main className={`${darkMode ? `bg-dark text-light` : ``} py-2 pb-1`}>
          <Col
            md={{
              span: isConfigBundleExpire || isConfigExpire ? 10 : null,
              offset: isConfigBundleExpire || isConfigExpire ? 1 : null,
            }}
          >
            {isConfigBundleExpire || isConfigExpire ? null : (
              <div
                className={`${styles.MobiNav} position-sticky bg-secondary bg-opacity-75 d-flex justify-content-center p-2 gap-2 z-index-2 d-lg-none`}
              >
                <Button
                  size="sm"
                  variant="dark"
                  className="text-info"
                  href="#Config"
                >
                  <small>Config</small>
                </Button>
                <Button
                  size="sm"
                  variant="dark"
                  className="text-info"
                  href="#Bundles"
                >
                  <small>Bundles</small>
                </Button>
              </div>
            )}

            <div className="wrapper">
              {isConfigBundleExpire && (
                <Row
                  className={`
                    ${darkMode ? `bg-opacity-50` : ``}
                    bg-danger text-white m-2 m-lg-3 p-2 rounded
                  `}
                >
                  <small>
                    <FaExclamationTriangle /> Error: This is a custom built PC
                    configuration which was saved on{" "}
                    {moment(config.AddedDate).format("MMMM Do YYYY, h:mm:ss a")}{" "}
                    . This Config has now expired due to bundles change.
                  </small>
                </Row>
              )}

              {isConfigExpire && (
                <Row
                  className={`
                  ${darkMode ? `bg-opacity-50` : ``}
                  bg-danger text-white m-2 m-lg-3 p-2 rounded
                `}
                >
                  <small>
                    <FaExclamationTriangle /> Error: This is a custom built PC
                    configuration which was saved on{" "}
                    {moment(config.AddedDate).format("MMMM Do YYYY, h:mm:ss a")}{" "}
                    . This Config has now expired.
                  </small>
                </Row>
              )}
            </div>
            <div className="wrapper px-2 px-lg-3 position-relative">
              <div className="mb-3 d-grid gap-3 cols-lg-10">
                <div
                  className={`${
                    isConfigBundleExpire || isConfigExpire
                      ? "span-lg-10"
                      : "span-lg-3"
                  }`}
                >
                  <div
                    className={`${
                      isConfigBundleExpire || isConfigExpire
                        ? "d-flex flex-wrap"
                        : styles.Config + " position-sticky"
                    }`}
                  >
                    <section
                      className={`${
                        isConfigBundleExpire || (isConfigExpire && isXL)
                          ? "w-25 pe-1"
                          : "w-100"
                      } position-relative`}
                      style={{ height: "fit-content" }}
                    >
                      <Image
                        src={`https://www.evetech.co.za/${pc.ProductImage}`}
                        alt=""
                        className="d-block mx-auto rounded border border-3 border-secondary bg-white"
                        style={{
                          height: "250px",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                      <div
                        className={`
                          ${
                            isConfigBundleExpire || (isConfigExpire && isXL)
                              ? null
                              : `position-absolute end-0 bottom-0`
                          } 
                          ${darkMode ? `bg-dark` : `bg-light`}
                          bg-opacity-50 p-2 rounded p-sm-3 z-index-1 w-100 d-flex justify-content-center flex-wrap gap-2 align-items-center
                        `}
                        id="Config"
                      >
                        <div className="w-100">
                          <div
                            className={`${
                              darkMode ? `bg-dark bg-opacity-75` : `bg-light`
                            } d-flex justify-content-center gap-1 rounded-pill p-1`}
                          >
                            <span className="">Current Price: </span>
                            <span className="fw-2 text-danger">
                              {currencyFormat(totalPrice)}
                            </span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="info"
                          className="rounded-pill d-flex align-items-center gap-1"
                          onClick={() => setAskQuestionShow(true)}
                        >
                          <FaEnvelopeOpenText /> Ask Question
                        </Button>
                        <AskQuestion
                          show={askQuestionShow}
                          onHide={() => setAskQuestionShow(false)}
                          product={{
                            pid: pc.ProductID,
                            name: pc.Name,
                            url: `https://www.evetech.co.za/${_.replace(
                              _.toLower(pc.Title),
                              new RegExp(" ", "g"),
                              "-"
                            ).trim()}/best-pc-deal/${pc.ProductID}.aspx`,
                            price: pc.Price,
                            ptype: 1,
                            page: "config",
                          }}
                        />
                        {isConfigBundleExpire || isConfigExpire ? null : (
                          <Button
                            size="sm"
                            variant="warning"
                            className="rounded-pill d-flex align-items-center gap-1"
                            onClick={(e) => {
                              addToCartHandler(e);
                              router.push("/Cart");
                            }}
                          >
                            <FaCartPlus /> Buy Now
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="success"
                          className="rounded-pill d-flex align-items-center gap-1"
                          onClick={() => setAskQuestionShow(true)}
                        >
                          <FaSmileBeam /> Contact me!
                        </Button>
                        {isConfigBundleExpire || isConfigExpire ? null : (
                          <Button
                            size="sm"
                            variant="danger"
                            className="rounded-pill d-flex align-items-center gap-1"
                            onClick={() => window.location.reload()}
                          >
                            <FaUndo /> Reset Config
                          </Button>
                        )}
                      </div>
                    </section>

                    <section
                      className={`${
                        isConfigBundleExpire || (isConfigExpire && isXL)
                          ? "w-75 ps-1"
                          : "w-100"
                      }`}
                    >
                      <div
                        className={`
                          ${
                            darkMode
                              ? `bg-black border-top border-secondary`
                              : `bg-dark`
                          }
                          text-light rounded-0 rounded-top p-2 px-lg-3 d-flex justify-content-between align-items-center gap-2
                        `}
                      >
                        <span>
                          <h1 className="fs-6">
                            <small className="text-secondary">
                              <small>Saved Config for </small>
                            </small>
                            <small>
                              {pc.Name}
                              <span className="text-info">{` [${ConfigNo}]`}</span>
                            </small>
                          </h1>
                        </span>
                        {/* <span>
                      <FaArrowUp className="fs-3" />
                    </span> */}
                      </div>
                      <div
                        className={`
                          ${styles.List}
                          ${darkMode ? `bg-black bg-opacity-50` : `bg-light`} 
                          border border-dark p-2 px-3 Scrollbar-01 rounded-bottom mb-3
                        `}
                      >
                        {(selectedBundleItems.length === 0 ||
                          isConfigBundleExpire ||
                          isConfigExpire) && (
                          <small>
                            <small>
                              <RenderHTML HTML={config.config} />
                            </small>
                          </small>
                        )}

                        {selectedBundleItems.length > 0 &&
                          !isConfigBundleExpire &&
                          !isConfigExpire && (
                            <small>
                              <small>
                                {_.map(selectedBundleItems, (item) => {
                                  return (
                                    <div>
                                      <Button
                                        onClick={() =>
                                          bundleLink(item.BundleTitle)
                                        }
                                        size="sm"
                                        variant=""
                                        className="text-primary p-0 me-2"
                                      >
                                        <small>
                                          <span className="fw-2">
                                            {item.BundleTitle}
                                          </span>
                                        </small>
                                      </Button>
                                      <span>
                                        {item.Title}{" "}
                                        {item.Price > 0 &&
                                          `[+ R. ${currencyFormat(
                                            item.Price
                                          )}]`}
                                      </span>
                                    </div>
                                  );
                                })}
                              </small>
                            </small>
                          )}
                      </div>
                    </section>

                    <section
                      className={`
                        rounded bg-secondary bg-opacity-25 p-2 lh-1 w-100 text-center d-flex align-items-center justify-content-center
                        ${
                          darkMode ? `border-bottom border-secondary` : `border`
                        }
                      `}
                    >
                      <small>
                        <small>
                          If you have any problems or questions regarding this
                          configuration, you can contact us on 010 786 0044 /
                          012 653 0033 or email us on sales@evetech.co.za.
                        </small>
                      </small>
                    </section>
                  </div>
                </div>
                {isConfigBundleExpire || isConfigExpire ? null : (
                  <div className={`span-lg-7 mt-lg-3`} id="Bundles">
                    <div className="w-100 px-1 pt-1 ps-lg-1">
                      {/* Bundles Option */}
                      {!isConfigBundleExpire && !isConfigExpire && (
                        <div className="d-grid gap-2">
                          <PCConfigBundles
                            ProductId={config.pid}
                            Bundles={upgradeBundles}
                            OptionsDetails={optionDetails}
                            onBundleItemsSeleceted={bundleItemsSeleceted}
                            selecetedItems={selectedBundleItems}
                            ulCPUData={ulCpuList}
                            ulGPUData={ulGpuList}
                            isOpen={isBundleOpen}
                            bindBundles={configBundle}
                            setConfigExpire={onSetConfigBundleExpire}
                          />
                        </div>
                      )}
                      {/* Bundles Option */}
                    </div>
                  </div>
                )}
                {isConfigBundleExpire || isConfigExpire ? null : (
                  <PCConfigFooter
                    product={pc}
                    TotalPrice={totalPrice}
                    onAddToCart={addToCartHandler}
                    toggleIsBundleOpen={toggleIsBundleOpen}
                    collapseText={
                      isBundleOpen === true ? "[Collapse All]" : "[Expand All]"
                    }
                    classes="position-sticky span-full"
                  />
                )}
              </div>
            </div>
          </Col>
        </main>
      )}
    </>
  );
};

export default Config;
