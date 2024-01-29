"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  FcCurrencyExchange,
  FcLike,
  FcQuestions,
  FcShare,
} from "react-icons/fc";
import styles from "@/styles/LaptopDetail.module.scss";
import PCFeatureList from "@/components/Product/PC/PCFeatureList";
import QtyBox from "@/components/Product/QtyBox";
import { customAlphabet } from "nanoid";
import PCBundles from "@/components/Product/PC/PCBundles";
import { FPSSlider } from "@components";
import ProductFooter from "@/components/Product/ProductFooter";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import AskQuestion from "@/components/Modals/AskQuestion";
import CustomQuoteRequest from "@/components/Modals/CustomQuoteRequest";
import AuthContext from "@/store/auth-context";
import PCBanners from "@/components/Banners/PCBanners";
import CustomeSpinner from "@/components/CustomeSpinner";
import { Carousel } from "react-bootstrap";
import useClickScroll from "@/custom/hooks/useClickScroll";
import moment from "moment";
import { FaArrowRight, FaExclamationCircle, FaShareAlt } from "react-icons/fa";
import NotifyMe from "@/components/Modals/NotifyMe";
import WishModal from "@/components/Modals/WishModal";
import HelperContext from "@/store/helper-context";
import { Helmet } from "react-helmet";
import EditProductOverlay from "@/components/Product/EditProductOverlay";
import SpecialTag from "@/components/Main/Controls/SpecialTag";
import ShareLink from "@/components/Product/ShareLink";
import { RiHeartAddLine } from "react-icons/ri";
import { useParams } from "next/navigation";
import NCartContext from "@/store/ncart-context";
import { useRouter } from "next/navigation";
import { CartAPI, ProductAPI } from "@/custom/utils/actions";
import Link from "next/link";
import { ComponentsHeader } from "@/components/Home";
import { useTheme } from "@/store/ThemeContext";
import Text from "@/components/Text";
import Heading from "@/components/Heading";
import TellFriend from "@/components/Modals/TellFriend";
import FancyPrice from "@/components/FancyPrice";
import Head from "next/head";
import UserAPI from "@/custom/utils/actions/user";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");
const Swal = require("sweetalert2");

// This gets called on every request
// export async function getServerSideProps(context) {
//   // Fetch data from external API
//   // const res = await fetch(`https://.../data`)
  
//   const { params } = context;
//   let urlId: any = params?.id;
//   let ProductId;
  
//   if (urlId !== undefined && urlId.trim().length > 0) {
//     if (isNaN(urlId)) {
//       try {
//         urlId = parseInt(urlId.replace(".", "").replace("aspx", "").trim());
//         ProductId = urlId;
//       } catch (e) {
//         /* router.replace("/"); */
//         console.log(e);
//       }
//     } else {
//       urlId = parseInt(urlId.replace(".", "").replace("aspx", "").trim());
//       ProductId = urlId;
//     }
//   }
//   let data = {};
//   const prods = await ProductAPI.getPCById({ ProductId });
//         if (
//           prods !== null &&
//           prods !== undefined &&
//           prods?.result !== undefined &&
//           prods?.result?.length > 0
//         ) {
//           data = prods.result[0];
//         }
//   // const data = "Tahir Amjad"; // await res.json()
 
//   // Pass data to the page via props
//   return { props: { product: data } }
// }

const PC = (props: any) => {
  const helperCtx = useContext(HelperContext);
  const authCtx = useContext(AuthContext);
  const params = useParams();
  const router = useRouter();
  const cartCtx = useContext(NCartContext);
  const isXXL = useMediaQuery("(min-width: 1400px)");

  const [itemInCart, setItemInCart] = useState(false);
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  /* WishList */
  const [showWish, setShowWish] = useState(false);
  const [reloadWish, setReloadWish] = useState(false);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function hideWish() {
    return new Promise<void>((resolve, reject) => {
      setShowWish(false);
      resolve();
    });
  }

  function removeStyleBody() {
    return delay(500).then(() => {
      document.body.style.paddingRight = "0";
    });
  }

  const onWishClose = () => {
    hideWish().then(removeStyleBody);
  };

  const AddToWishList = (product: any) => {
    if (authCtx.isLoggedIn) {
      /* Check First Product Exist or not */

      const chekWishList = async () => {
        const wishList = await UserAPI.checkWishlistItem({
          productId: product.ProductID,
          ptype: 1,
          uid: authCtx.user.id,
        });

        if (
          wishList !== undefined &&
          wishList.result !== undefined &&
          wishList.result.length > 0 &&
          wishList.result[0].total !== undefined &&
          wishList.result[0].total > 0
        ) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Item already exist to your wishlist",
            showConfirmButton: false,
            timer: 1500,
          });
          setShowWish(true);
        } else {
          const wishItemAdd = async () => {
            const wishAddResp = await UserAPI.addWishlistItem({
              productId: product.ProductID,
              ptype: 1,
              uid: authCtx.user.id,
            });

            if (
              wishAddResp !== undefined &&
              wishAddResp !== null &&
              wishAddResp.result !== undefined
            ) {
              let addWish = wishAddResp.result;

              if (addWish.affectedRows !== undefined && addWish.affectedRows) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Item Added To Wishlist.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setReloadWish(true);
                setShowWish(true);
              } else {
                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: "Item not able add to Wishlist. Try again!",
                  showConfirmButton: false,
                  timer: 1500,
                });
                setShowWish(true);
              }
            }
          };
          wishItemAdd();
        }
      };

      chekWishList();
    } else {
      authCtx.onShowLogin(true);
    }
  };
  /* WishList */

  const [ProductId, setProductId] = useState(0);

  useEffect(() => {
    let ProdId: any = params?.id;
    // console.log("params", params);
    if (ProdId !== undefined && ProdId.trim().length > 0) {
      // console.log("ProdId", ProdId);
      if (isNaN(ProdId)) {
        try {
          ProdId = parseInt(ProdId.replace(".", "").replace("aspx", "").trim());
          setProductId(ProdId);
        } catch (e) {
          /* router.replace("/"); */
          console.log(e.message);
        }
      } else {
        ProdId = parseInt(ProdId.replace(".", "").replace("aspx", "").trim());
        setProductId(ProdId);
      }
    }
  }, [params]);

  /* Modals */
  const [askQuestionShow, setAskQuestionShow] = useState(false);
  const [tellFriendShow, setTellFriendShow] = useState(false);
  const [customQuoteShow, setCustomQuoteShow] = useState(false);
  const [modalNotifyShow, setModalNotifyShow] = useState(false);

  /* useRefrences */
  const pcRef = useRef<any>();
  const qtyInputRef = useRef<any>();
  const bundlesInfoRef = useRef<any>();
  const freeStuffRef = useRef<any>();
  const freeGamesRef = useRef<any>();

  /* useStats */
  const [pc, setPc] = useState<any>({});
  const [stockBg, setStockBg] = useState("success");
  const [stockStatus, setStockStatus] = useState("In Stock");
  const [cartElements, setCartElements] = useState<any>(null);
  const [isFps, setIsFps] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [performance, setPerformance] = useState({});
  const [gameData, setGameData] = useState([]);
  const [freeStuffBanner, setFreeStuffBanner] = useState([]);
  const [productCards, setProductCards] = useState([]);
  const [initProductCards, setInitProductCards] = useState(false);
  const [freeStuffs, setFreeStuffs] = useState<any[]>([]);
  const [freeGames, setFreeGames] = useState([]);
  const [upgradeBundles, setUpgradeBundles] = useState<any>(null);
  const [optionDetails, setOptionDetails] = useState([]);
  const [selectedBundleItems, setSelecetecBundleItems] = useState([]);
  const [totalPrice, setTotalPrice]: any = useState(0);
  const [showFPS, setShowFPS] = useState(false);
  const handleCloseFPS = () => setShowFPS(false);
  const handleShowFPS = () => setShowFPS(true);
  const [pcFreeGamesInfo, setPcFreeGamesInfo] = useState<any[]>([]);
  const [isBundleOpen, setIsBundleOpen] = useState<any>(true);
  const [isSetFreeGame, setIsSetFreeGame] = useState<any>(false);
  const [isFreeGamesFetched, setIsFreeGamesFetched] = useState<any>(false);
  const [stockItemType, setStockItemType] = useState(
    "http://schema.org/InStock"
  );
  const [showQtyLimit, setShowQtyLimit] = useState<any>(false);
  const [qtyLimit, setQtyLimit] = useState<any>(0);
  const [showMaxQtyMsg, setShowMaxQtyMsg] = useState<any>(false);

  const toggleIsBundleOpen = () => {
    setIsBundleOpen((current: any) => !current);
    clickScroll("pc-case", 125);
  };

  /* ULBenchmark */
  const [ulFilterData, setUlFilterData] = useState({});
  const [ulGpuList, setUlGpuList] = useState([]);
  const [ulCpuList, setUlCpuList] = useState([]);
  const [ulGameList, setUlGameList] = useState([]);
  const [ulCPU, setUlCPU] = useState("");
  const [ulGPU, setUlGPU] = useState("");
  const [ulRam, setUlRam] = useState("");
  const [reloadFPS, setReloadFPS] = useState(false);

  /* Attributes */
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const [attributes, setAttributes] = useState({});
  const [skin, setSkin] = useState("");
  const [hidePrice, setHidePrice] = useState(false);
  const [hideAddToCart, setHideAddToCart] = useState(false);
  const [hideWishList, setHideWishList] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [notifyImg, setNotifyImg] = useState("");
  const [soldOut, setSoldOut] = useState(false);
  const [secondaryImg, setSecondaryImg] = useState("");
  const [enableImgOnPc, setEnableImgOnPc] = useState(false);
  const [urlLinkOnPcImg, setUrlLinkOnPcImg] = useState<any>("");
  const [showBuyNow, setShowBuyNow] = useState(true);
  const [showSaveConfigLink, setShowSaveConfigLink] = useState(true);
  const [showLoadConfigLink, setShowLoadConfigLink] = useState(true);

  /* SiteInfo Flags */
  const [siteInfo, setSiteInfo]: any = useState({});
  // const [showClearance, setShowClearance] = useState(false);
  // const [showDealIcon, setShowDealIcon] = useState(false);
  // const [dealText, setDealText] = useState("");
  const [showBackPack, setShowBackPack] = useState(false);
  const [initInfo, setInitInfo] = useState(false);
  const [initBundles, setInitBundles] = useState(false);

  const { clickScroll } = useClickScroll();

  const addToCartHandler = async (event: any) => {
    event.preventDefault();
    const totalQty = qtyInputRef.current.value;
    const product = pcRef.current;

    let upPrice = 0;
    let upTitle = "";
    let selecetedBundles = bundlesInfoRef.current;
    let pcfreeStuffs = freeStuffRef.current;
    let pcfreeGames = freeGamesRef.current;
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

    _.map(pcfreeStuffs, (stuff: any) => {
      if (stuff.des.length > 0) config += `<br /> ${stuff.des}`;
    });

    _.map(pcfreeGames, (stuff: any) => {
      if (stuff.htext.length > 0) config += `<br /> ${stuff.htext}`;
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
        qtPeCs: qtyLimit,
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
        qtPeCs: qtyLimit,
        pType: 1,
        addOns: selecetedBundles,
      });
    else
      cartAdd = await CartAPI.addToCart({
        id: nanoid(8),
        productId: product.ProductID,
        name: product.Name,
        qty: totalQty,
        qtPeCs: qtyLimit,
        pType: 1,
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

  const currencyFormat = (num: any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  const priceFormat = (num: any) => {
    try {
      return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
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
      let price: any = _.sumBy(selecetedBundles, function (o: any) {
        return Math.round(parseFloat(o.Price));
      });

      setTotalPrice(parseFloat(pc.Price_Vat) * 0.95238 + parseFloat(price));
      bundlesInfoRef.current = selecetedBundles;
      let bTitle = bundleItem.Title;

      /* BundleItem Change */
      if (bundleItem.CategoryId.includes(164)) {
        /* CPU */
        let matchedCpu = "";
        let cpuName = bTitle
          .replace(/(NVIDIA|AMD|Intel|INTEL)/g, "")
          .replace("- Included", " ")
          .replace("Included")
          .trim();
        try {
          matchedCpu = _.first(
            _.filter(ulCpuList, (cpu: any) => {
              if (MatchExactString(cpu.toLowerCase().trim(), cpuName))
                return cpu;
            })
          );
        } catch (e) {}

        setUlCPU(matchedCpu);
      }

      if (bundleItem.CategoryId.includes(20)) {
        /* Memory (RAM)*/
        let ar = bTitle
          .replace("- Included", " ")
          .replace("Included")
          .trim()
          .split(" ");
        let frequency = "";
        ar.map((txtEl: any, ind: any) => {
          if (txtEl.toLowerCase().trim().includes("mhz")) {
            try {
              frequency =
                "" + parseFloat(txtEl.toLowerCase().trim().replace("mhz", ""));
            } catch (e) {
              frequency = "";
            }
          }
        });

        if (frequency.trim().length > 0) setUlRam(frequency.trim());
      }

      if (bundleItem.CategoryId.includes(21)) {
        /* GPU */
        let matchedGpu = "";
        let gpuName = bTitle
          .replace(/(NVIDIA|AMD)/g, "")
          .replace("- Included", " ")
          .replace("Included")
          .toLowerCase()
          .trim();
        try {
          matchedGpu = _.first(
            _.filter(ulGpuList, (gpu: any) => {
              if (
                MatchExactString(
                  gpuName,
                  gpu.name
                    .replace(/(NVIDIA|AMD)/g, "")
                    .toLowerCase()
                    .trim()
                )
              )
                return gpu;
            })
          ).name;
        } catch (e) {}

        setUlGPU(matchedGpu);
      }

      return selecetedBundles;
    });
  };

  const MatchExactString = (strToCmp: any, cmpStr: any) => {
    let exactMatch = false;
    let cmpStrAr = cmpStr.toLowerCase().trim().split(" ");
    let cmpStrArLn = cmpStrAr.length;
    let strToCmpAr = strToCmp.toLowerCase().trim().split(" ");
    let matchCnt = 0;
    cmpStrAr.map((ar: any, ind: any) => {
      if (isNaN(ar)) {
        if (strToCmp.includes(ar)) matchCnt++;
      } else {
        strToCmpAr.map((strAr: any, inr: any) => {
          if (strAr === ar) matchCnt++;
        });
      }
    });

    if (cmpStrArLn > 0 && cmpStrArLn === matchCnt) exactMatch = true;

    return exactMatch;
  };

  useEffect(() => {
    const recalculatePerformance = async (filters: any) => {
      const performData = await ProductAPI.getRecalculatePerformance({
        estimator: filters,
      });

      if (
        performData !== undefined &&
        performData !== null &&
        performData.result
      ) {
        let perData = performData.result;

        if (
          perData !== undefined &&
          perData.timeSpyOverallScore !== undefined
        ) {
          /* Restructure FPS Object */
          let newPerData = perData;
          newPerData.gameTitles = _.map(
            newPerData.gameTitles,
            (obj: any, title: any) => {
              return {
                titles: title.replace("'", ""),
                fullHdFps: obj.fullHdFps,
                quadHdFps: obj.quadHdFps,
                ultra4k: obj.medium4k,
              };
            }
          );
          setPerformance((prevPerformance) => {
            prevPerformance = newPerData;
            return prevPerformance;
          });
          setReloadFPS(true);
        }
      }

      /* const performData = await fetch(`/api/getRecalculatePerformance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          estimator: filters,
        }),
      }).then((res) => {
        res.json().then((dataAtt) => {
          
        });
      }); */
    };

    try {
      if (
        ulCPU.trim().length > 0 ||
        ulGPU.trim().length > 0 ||
        ulRam.trim().length > 0
      ) {
        let filters: any = ulFilterData;

        if (ulCPU.trim().length > 0) filters.cpuName = ulCPU;
        if (ulGPU.trim().length > 0) filters.gpuName = ulGPU;
        if (ulRam.trim().length > 0) filters.memfrequency = ulRam;

        setUlFilterData((prevFilter) => {
          prevFilter = filters;
          return prevFilter;
        });

        recalculatePerformance(filters);
      }
    } catch (e) {}
  }, [ulCPU, ulGPU, ulRam]);

  useEffect(() => {
    // console.log("Product Id change", ProductId);
    if (!isNaN(ProductId) && ProductId > 0 && !initInfo) {
      const getPCData = async () => {
        const pcDatas = await ProductAPI.getPCData({ ProductId });
        if (
          pcDatas !== null &&
          pcDatas !== undefined &&
          pcDatas.result !== undefined &&
          pcDatas.result.length > 0
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

          setPerformance((fpsData) => {
            try {
              fpsData = JSON.parse(pcData.Performance);
            } catch (e) {}
            return fpsData;
          });

          setIsFps((prevFlag) => {
            prevFlag = pcData.IsFPS === 1 ? true : false;
            return prevFlag;
          });
        }
      };

      const getProductCards = async () => {
        const prods = await ProductAPI.getPCProductCards({ ProductId });
        if (
          prods !== null &&
          prods !== undefined &&
          prods.result !== undefined
        ) {
          let pcards = prods.result;

          setProductCards((prevCards) => {
            prevCards = pcards;
            return prevCards;
          });
          setInitProductCards(true);
        }
      };

      const getFreeStuffInfo = async () => {
        const prods = await ProductAPI.getPCFreeStuffInfo({ ProductId });
        if (
          prods !== null &&
          prods !== undefined &&
          prods.result !== undefined &&
          prods.result !== null
        ) {
          let pcfreeStuff = prods.result;

          setFreeStuffs((prevStuff) => {
            prevStuff = pcfreeStuff;
            return prevStuff;
          });
          setFreeStuffBanner((prevBanners): any => {
            let imageUrls = _.map(pcfreeStuff, (stuff: any) => {
              return stuff.imageurl;
            });
            return [...prevBanners, imageUrls];
          });
          freeStuffRef.current = pcfreeStuff;
        }
      };

      const getPCFreeGamesInfo = async () => {
        const freeGamesInfo = await ProductAPI.getPCGamesFreeInfo();
        if (
          freeGamesInfo !== null &&
          freeGamesInfo !== undefined &&
          freeGamesInfo.result !== undefined
        ) {
          let gameInfo = freeGamesInfo.result;
          setPcFreeGamesInfo(gameInfo);
          setIsFreeGamesFetched(true);
        }
      };

      const getBundlesInfo = async () => {
        const bundleData = await ProductAPI.getBundlesInfo({ ProductId });
        if (
          bundleData !== null &&
          bundleData !== undefined &&
          bundleData.result !== undefined
        ) {
          let pcBundleData = bundleData.result;

          setUpgradeBundles((prevBundles: any) => {
            prevBundles = pcBundleData;
            return prevBundles;
          });

          /* Bundle Options Details Get */
          let optionIds = _.join(_.map(pcBundleData, "OptionId"), ",");

          const getBundleDetails = async () => {
            const optionData = await ProductAPI.getBundleOptionsByIds({
              OptionIds: optionIds,
            });
            /*  const optionData = await fetch(`/api/getBundleOptionsByIds`, {
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
        }
        /* Bundle Options Details Get */
      };

      const getGameData = async () => {
        const gameDatas = await ProductAPI.getPcGameData();
        if (
          gameDatas !== null &&
          gameDatas !== undefined &&
          gameDatas.result !== undefined
        ) {
          let gamesData = gameDatas.result;
          setGameData(gamesData);
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

      const getFPSFilterData = async () => {
        const filters = await ProductAPI.getFPSFilterData({ ProductId });
        if (
          filters !== null &&
          filters !== undefined &&
          filters.result !== undefined &&
          filters.result !== null &&
          filters.result.length > 0
        ) {
          let filterData = filters.result[0];
          setUlFilterData((prevFilterData) => {
            try {
              if (filterData.prodFilters !== undefined)
                prevFilterData = JSON.parse(filterData.prodFilters);
            } catch (e) {}
            return prevFilterData;
          });

          try {
            if (
              filterData.prodFilters !== undefined &&
              filterData.prodFilters.length > 0
            ) {
              let filterObj = JSON.parse(filterData.prodFilters);
              setUlCPU(filterObj.cpuName);
              setUlGPU(filterObj.gpuName);
              setUlRam(filterObj.memfrequency);
            }
          } catch (e) {}
        }
      };

      const getAttributesValue = async (ProductId: any) => {
        const attributesData = await ProductAPI.getFPSFilterData({ ProductId });
        if (
          attributesData !== null &&
          attributesData !== undefined &&
          attributesData.result !== undefined
        ) {
          let prodAttributes: any = attributesData.result;
          setAttributes((prevAtttribute) => {
            prevAtttribute = prodAttributes;
            return prevAtttribute;
          });

          prodAttributes?.forEach((attribute: any) => {
            let attid = attribute.attid;
            let value = attribute.value?.trim();
            if (attid === 2 && value.length > 0) {
              //skin
              setSkin(value); // No applied
            } else if (attid === 3 && value === "yes") {
              /* Hide Price */
              setHidePrice(true);
            } else if (attid === 4 && value === "yes") {
              /* Hide Add to cart */
              setHideAddToCart(true);
              setShowBuyNow(false);
              setShowSaveConfigLink(false);
            } else if (attid === 5 && value === "yes") {
              /* Hide Wishlist */
              setHideWishList(true);
            } else if (attid === 6 && value === "yes") {
              /* Show Notify */
              setShowNotify(true);
            } else if (attid === 7 && value.length > 0) {
              /* Notify Img */
              setNotifyImg(value);
            } else if (attid === 556 && value === "yes") {
              /* Sold Out ((SOLD_OUT_DesktopPCID = 556;)) */
              setSoldOut(true);
            } else if (attid === 581 && value.length > 0) {
              // Secondary image ((desktopPC_secondary_image_id = 581;))
              setSecondaryImg(value);
            } else if (attid === 597 && value === "1") {
              // Enable link on main PC Image ((desktopPC_link_on_pc_image = 597;))
              setUrlLinkOnPcImg(true);
            } else if (attid === 598 && value.length > 0) {
              // Url link on main PC Image (( desktopPC_url_on_pc_image = 598;))
              setEnableImgOnPc(value);
            } else if (attid === 559 && value.length > 0) {
              // QTY_LIMIT_DesktopPC = 559;
              setShowQtyLimit(true);
              setQtyLimit(value);
              setShowMaxQtyMsg(`Limit ${value} per customer`);
            }
          });
        }
        //let prodAttributes = attributesData.result;
      };

      /* const getGameList = async()=>{
                const gameData = await fetch(`/api/getGameList`,{
                    method:'GET',
                    headers:{
                        'Content-Type':'application/json',
                        'Accept' : 'application/json'
                    }
                })
                .then(res=>res.json());
                let gameList = gameData.result;
                
                setUlGameList(prevGameList=>{
                    prevGameList = gameList;
                    return prevGameList;
                });
                
            } */

      const fetchData = async () => {
        // console.log("props.product", props);
        const prods = await ProductAPI.getPCById({ ProductId });
        if (
          prods !== null &&
          prods !== undefined &&
          prods?.result !== undefined &&
          prods?.result?.length > 0
        ) {
          let product = prods.result[0];
          console.log("Product Data", product);
          if (product === undefined) router.replace("/");

          if (product !== undefined) {
            if (
              product.Availability.toLowerCase() === "out of stock" ||
              product.Status === 0 ||
              product.Status === 2
            ) {
              setHideAddToCart(true);
              setShowBuyNow(true);
              setShowSaveConfigLink(false);
              setShowLoadConfigLink(false);
            }
          }

          pcRef.current = product;
          setPc((prevPC: any) => {
            prevPC = product;
            return prevPC;
          });

          setTotalPrice((prevPrice) => {
            let upPrice: any = 0;
            try {
              if (selectedBundleItems !== null) {
                upPrice = _.sumBy(selectedBundleItems, function (o: any) {
                  return parseFloat(o.Price);
                });
              }
            } catch (e) {}
            return (
              parseFloat(product.Price_Vat) * 0.95238 + parseFloat(upPrice)
            );
          });

          getAttributesValue(ProductId);
          getPCData();
          getProductCards();
          getBundlesInfo();
          getGameData();
          getFreeStuffInfo();
          getPCFreeGamesInfo();
          getGPUList();
          getCPUList();
          getFPSFilterData();
        }
        /* getGameList(); */

        setInitInfo(true);
      };

      fetchData();
    } else {
      /* router.replace("/"); */
    }
  }, [ProductId]);

  useEffect(() => {
    if (pc && !_.isEmpty(pc) && initInfo && initBundles) {
      setStockStatus((prevStat) => {
        let status = pc.Availability.toLowerCase();
        let Status2 = pc.Status;

        if (status.includes("out of stock")) {
          setStockItemType("http://schema.org/OutOfStock");
        }

        if (
          status.includes("pre-order") ||
          status.includes("coming soon / pre-order")
        ) {
          setStockItemType("http://schema.org/PreOrder");
        }

        if (
          status.includes("out of stock") ||
          status.includes("pre-order") ||
          status.includes("coming soon") ||
          status.includes("notify me") ||
          status.includes("coming soon / pre-order") ||
          status.includes("product discontinued") ||
          status.includes("stock to be confirm") ||
          Status2 === 0 ||
          Status2 === 2
        ) {
          /* setAdCart(false);
                      setDivNotify(true); */
          if (status.includes("out of stock") || status.includes("pre-order")) {
            setStockBg("danger");
          }

          if (showNotify) {
            setCartElements(
              <Button
                variant="light"
                className="p-0 fs-6 w-100 border-danger shadow-sm overflow-hidden"
                onClick={() => setModalNotifyShow(true)}
              >
                <div className="p-1 fw-2 text-light bg-danger">
                  <FaExclamationCircle /> Notify Me
                </div>
                <div className="bg-danger bg-opacity-25 text-dark p-1">
                  <small>As soon as this product is available</small>
                </div>
              </Button>
            );
          }
        } else {
          /*  setAdCart(true);
                      setDivNotify(false); */
          setCartElements(
            <div
              className={`${styles.BuyButtons} d-grid cols-2 cols-lg-1 gap-1 w100`}
            >
              {!hideAddToCart ? (
                <Button
                  variant="warning"
                  className="fs-6 w100"
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              ) : null}

              {showBuyNow ? (
                <Button
                  className={`${styles.BuyBtn} fs-6 w100`}
                  onClick={(e) => {
                    addToCartHandler(e);
                    router.replace("/Cart");
                  }}
                >
                  <div>Buy Now</div>
                </Button>
              ) : null}
            </div>
          );
        }

        prevStat = pc.Availability;
        return prevStat;
      });
    }
  }, [pc, initInfo, initBundles]);

  useEffect(() => {
    if (
      upgradeBundles != null &&
      selectedBundleItems.length === upgradeBundles.length &&
      !isSetFreeGame
    ) {
      try {
        setPCFreeGames();
      } catch (e) {}
    }
  }, [selectedBundleItems]);

  const setPCFreeGames = () => {
    if (pcFreeGamesInfo !== undefined && pcFreeGamesInfo.length > 0) {
      let freeGame = _.filter(pcFreeGamesInfo, (gameInfo: any) => {
        let ptype = gameInfo.ptype;
        let matched = false;
        if (ptype === 1) {
          /* GPU */
          _.map(gameInfo.tags.split(","), (gpuStr: any) => {
            let bundGpuStr = _.first(
              _.filter(selectedBundleItems, (item: any) => {
                return item.CategoryId === "21";
              })
            ).Title;

            if (_.includes(bundGpuStr.toLowerCase(), gpuStr.toLowerCase())) {
              matched = true;
            }
          });
        }
        if (ptype === 2) {
          /* CPU */
          _.map(gameInfo.tags.split(","), (cpuStr: any) => {
            let bundCpuStr = _.first(
              _.filter(selectedBundleItems, (item: any) => {
                return item.CategoryId === "164";
              })
            ).Title;

            if (_.includes(bundCpuStr.toLowerCase(), cpuStr.toLowerCase())) {
              matched = true;
            }
          });
        }
        if (ptype === 3) {
          /* Motherboard */
          _.map(gameInfo.tags.split(","), (moStr: any) => {
            let motherBoardStr = _.first(
              _.filter(selectedBundleItems, (item: any) => {
                return item.CategoryId === "19";
              })
            ).Title;

            if (_.includes(motherBoardStr.toLowerCase(), moStr.toLowerCase())) {
              matched = true;
            }
          });
        }
        if (ptype === 4) {
          /* Monitor */
          _.map(gameInfo.tags.split(","), (lcdStr: any) => {
            let monitorStr = _.first(
              _.filter(selectedBundleItems, (item: any) => {
                return item.CategoryId === "87";
              })
            ).Title;

            if (_.includes(monitorStr.toLowerCase(), lcdStr.toLowerCase())) {
              matched = true;
            }
          });
        }
        if (ptype === 5) {
          /* CPU & GPU */
          _.map(gameInfo.tags.split(","), (cpugpuStr: any) => {
            let bundCpuStr = _.first(
              _.filter(selectedBundleItems, (item: any) => {
                return item.CategoryId === "164";
              })
            ).Title;
            let bundGpuStr = _.first(
              _.filter(selectedBundleItems, (item: any) => {
                return item.CategoryId === "21";
              })
            ).Title;

            if (
              _.includes(bundCpuStr.toLowerCase(), cpugpuStr.toLowerCase()) &&
              _.includes(bundGpuStr.toLowerCase(), cpugpuStr.toLowerCase())
            ) {
              matched = true;
            }
          });
        }

        if (matched) return gameInfo;
      });
      setFreeGames(freeGame);
      freeGamesRef.current = freeGame;
      setIsSetFreeGame(true);
    } else if (isFreeGamesFetched && pcFreeGamesInfo.length === 0) {
      setIsSetFreeGame(true);
    }
  };

  const RenderHTML = (props: any) => (
    <div dangerouslySetInnerHTML={{ __html: props.HTML }}></div>
  );
  const RenderTitle = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  useEffect(() => {}, [secondaryImg]);

  useEffect(() => {
    if (pc.Title !== undefined && pc.Title) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.innerHTML = `{"
        @context":"http://schema.org",
        "@type":"Product",
        "name":"${pc.Title}",
        "sku":"${pc.ProductSku.replace(/ /g, "-").slice(0, 50)}",
        "mpn":"${""}",
        "image":"https://www.evetech.co.za/${pc.ProductImage}",
        "brand":"Evetech",
        "description":"${pc.Name.slice(0, 5000)}",
        "category": "${pc.cname}",
        "offers":{
            "@type":"Offer",
            "url":"${`https://www.evetech.co.za/${_.replace(
              _.toLower(pc.Title),
              new RegExp(" ", "g"),
              "-"
            ).trim()}/best-pc-deal/${pc.ProductID}.aspx`}",
            "price":"${Math.round(Math.round(pc.Price_Vat * 0.95238))}",
            "priceCurrency":"ZAR",
            "priceValidUntil":"${moment().endOf("month").format("YYYY-MM-DD")}",
            "availability":"${stockItemType}",
            "availableDeliveryMethod":"FreightDelivery",
            "acceptedPaymentMethod":"CreditCardOrPaymentCard",
            "priceSpecification":{
              "@type":"PriceSpecification",
              "price":"${Math.round(Math.round(pc.Price_Vat * 0.95238))}",
              "priceCurrency":"ZAR"}
          }
      }`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, [pc]);

  useEffect(() => {
    if (helperCtx.siteInfo !== undefined) setSiteInfo(helperCtx.siteInfo);
  }, [helperCtx.siteInfo]);

  useEffect(() => {
    if (!_.isEmpty(siteInfo)) {
      if (siteInfo.backpackEnable === "yes") {
        setShowBackPack(true);
      }

      // if (siteInfo.dealText !== "") {
      //   setDealText(siteInfo.dealText);
      // }

      // if (siteInfo.showClearance === "yes") {
      //   setShowClearance(true);
      // }

      // if (siteInfo.showDealIcon === "yes") {
      //   setShowDealIcon(true);
      // }
    }
  }, [siteInfo]);

  let addedtoCart = _.filter(cartCtx.items, {
    alt: pc.Title,
  });

  const bundlesSet = () => {
    setInitBundles(true);
  };

  useEffect(() => {
    if (addedtoCart.length > 0) {
      setItemInCart(true);
    } else {
      setItemInCart(false);
    }
  }, [cartCtx, addedtoCart.length, itemInCart]);

  useEffect(() => {}, [addedtoCart.length, itemInCart]);

  return (
    <>
      {pc !== undefined && (
        <Head>
          <title itemProp="name" lang="en">
            {pc.Title}
          </title>
          <meta name="description" content={pc.ProductMetaDescription}></meta>
          <meta property="og:locale" content="en_US"></meta>
          <meta property="og:type" content="product"></meta>
          <meta property="og:site_name" content="Evetech" key="ogsitename" />
          <meta property="og:title" content={pc.Title} key="ogtitle"></meta>
          <meta
            property="og:description"
            content={pc.ProductMetaDescription}
          ></meta>
          <meta
            property="og:url"
            content={`https://www.evetech.co.za/${_.replace(
              _.toLower(pc.Title),
              new RegExp(" ", "g"),
              "-"
            ).trim()}/best-pc-deal/${pc.ProductID}.aspx`}
          ></meta>
          <meta property="og:site_name" content="Evetech"></meta>
          {/* <meta property="article:modified_time" content={component.AddedDate}></meta> */}
          <meta
            property="og:image"
            content={`https://www.evetech.co.za/${pc.ProductImage}`}
            key="ogimage"
          ></meta>
          <meta property="og:image:width" content="600"></meta>
          <meta property="og:image:height" content="400"></meta>
          <meta property="og:image:type" content="image/jpeg"></meta>
          <meta property="twitter:label1" content="Price"></meta>
          <meta
            property="twitter:data1"
            content={`${currencyFormat(
              Math.round(Number(pc.Price_Vat) * 0.95238)
            )} inc. VAT`}
          ></meta>
          <meta property="twitter:label2" content="Availibility"></meta>
          <meta property="twitter:data2" content={pc.Availability}></meta>
          <meta property="product:brand" content="Evetech"></meta>
          <meta
            property="product:price:amount"
            content={priceFormat(Math.round(Number(pc.Price_Vat) * 0.95238))}
          ></meta>
          <meta property="product:price:currency" content="ZAR"></meta>
          <meta property="og:availability" content={stockItemType}></meta>
          <meta property="product:availability" content={stockItemType}></meta>
          {/* <meta property="product:retailer_item_id:" content=""></meta> */}
          <meta property="product:condition" content="new"></meta>
        </Head>
      )}
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />

      {initInfo && (
        <>
          <Container
            fluid
            itemScope
            itemType="https://schema.org/Product"
            className={`${
              darkMode ? `bg-dark evetechDark` : ``
            } position-relative z-index-1`}
          >
            <section className="d-none">
              <span itemProp="brand">Evetech</span>
              <Image
                src={`https://www.evetech.co.za/${
                  secondaryImg !== undefined && secondaryImg.length > 0
                    ? secondaryImg.replace("https://www.evetech.co.za", "")
                    : pc.ProductImage
                }`}
                alt={`` + pc.Title}
                itemProp="image"
              />
              {/* <img
                  src={`https://www.evetech.co.za/${secondaryImg !== undefined && secondaryImg.length > 0 ? secondaryImg.replace("https://www.evetech.co.za","") : pc.ProductImage}`}
                  alt={pc.Title}
                  itemProp="image"
                /> */}
              <span itemProp="name">{pc.Title}</span>
              <span itemProp="description">
                {pc.Name !== undefined && pc.Name.slice(0, 5000)}
              </span>
              <span itemProp="sku">
                {pc.ProductSku !== undefined &&
                  pc.ProductSku.replace(/ /g, "-").slice(0, 50)}
              </span>
            </section>
            <div className="wrapper p-2">
              <Row className="pb-3">
                <Col lg={10}>
                  <Row>
                    {/* {gameData.length === 0 ? (
                        <CustomeSpinner variant="primary" />
                      ) : null} */}
                    {isFps
                      ? gameData !== undefined &&
                        gameData.length > 0 && (
                          <FPSSlider
                            Performance={performance}
                            GameData={gameData}
                            IsLoader={true}
                            IsShowFPS={isFps}
                            IsXXL={isXXL}
                            FilterData={ulFilterData}
                            IsReload={reloadFPS}
                            name={pc.Name}
                          />
                        )
                      : null}
                    <Col xxl={isFps ? 10 : 12} className="pt-2">
                      <Row>
                        <Col lg={6}>
                          <div
                            className={`${
                              darkMode
                                ? `bg-white rounded border border-2 border-secondary p-2 border-opacity-50`
                                : ``
                            } text-center position-relative`}
                          >
                            <Image
                              alt=""
                              fluid={true}
                              src={
                                secondaryImg.length > 0
                                  ? secondaryImg.replace(
                                      "https://www.evetech.co.za",
                                      "https://www.evetech.co.za"
                                    )
                                  : mainImage
                              }
                            />
                            {enableImgOnPc && (
                              <Link
                                href={`${urlLinkOnPcImg}`}
                                target="_blank"
                                className="position-absolute w-100 h-100 top-0 start-0"
                              ></Link>
                            )}
                            {helperCtx.dealTags !== undefined &&
                            helperCtx.dealTags.length > 0 &&
                            pc.IsAvailable ? (
                              <div className="position-absolute w-100 top-0 start-0 text-start">
                                <SpecialTag type={"On Special"} />
                              </div>
                            ) : null}
                            {(helperCtx.dealTags === undefined ||
                              _.isEmpty(helperCtx.dealTags) ||
                              (helperCtx.dealTags !== undefined &&
                                helperCtx.dealTags.length === 0)) &&
                            pc.IsAvailable ? (
                              <div className="position-absolute top-0 start-0">
                                <Badge bg="danger">
                                  <span className="fw-2">On Special</span>
                                </Badge>
                              </div>
                            ) : null}
                            {soldOut ? (
                              <div
                                className={`${
                                  darkMode ? `bg-dark` : `bg-light`
                                } h-100 bg-opacity-50`}
                              >
                                <Image
                                  src="https://www.evetech.co.za/assets/images/sold-out-600px-v1.png"
                                  alt=""
                                  className="img-contain w-100 h-100"
                                />
                              </div>
                            ) : null}
                            <div className="position-absolute z-index-2 top-0 end-0 pe-none h-100 w-100">
                              <div
                                className={`position-absolute bottom-0 end-0 pe-3 pb-3 pb-sm-0 d-grid cols-2 gap-2`}
                              >
                                <div
                                  className={`
                                    ${darkMode ? `bg-dark` : `bg-white`}
                                    bg-opacity-75 p-2 rounded-pill position-absolute top-0 end-0 w-100 p-4 me-2 mb-5
                                  `}
                                ></div>
                                <span className="position-relative">
                                  <Button
                                    onClick={() => AddToWishList(pc)}
                                    style={{ marginTop: `0.40rem` }}
                                    variant={`${darkMode ? `dark` : `light`}`}
                                    className="shadow rounded-circle p-2 px-2 border-secondary pe-auto border-2 border-opacity-50"
                                  >
                                    <RiHeartAddLine className="d-flex align-items-center justify-content-center" />
                                  </Button>
                                </span>

                                <ShareLink
                                  class={`position-relative`}
                                  style={{ marginTop: `0.40rem` }}
                                  btn={{
                                    icon: (
                                      <FaShareAlt className="d-flex align-items-center justify-content-center" />
                                    ),
                                    size: ``,
                                    variant: darkMode ? `dark` : `light`,
                                    // click: toggleContainerOnTop,
                                    class: `
                                  border-secondary border-opacity-50 mt-auto rounded-pill d-flex gap-1 justify-content-center align-items-center lh-1 pe-auto mb-5 mb-sm-3 p-2
                                `,
                                  }}
                                  // direction={`left`}
                                  currentURL={`/${_.replace(
                                    _.toLower(pc.Title),
                                    new RegExp(" ", "g"),
                                    "-"
                                  ).trim()}/best-pc-deal/${pc.ProductID}.aspx`}
                                  textToShare={pc.ProductMetaDescription}
                                  title={pc.Title}
                                  description={pc.ProductMetaDescription}
                                  favicon={`https://www.evetech.co.za/repository/ProductImages/evetech-onyx-tempered-glass-atx-gaming-case-with-monitor-600px-v01.jpg`}
                                />
                              </div>
                            </div>
                            {/* <div className="position-absolute z-index-2 top-0 end-0 pe-none h-100 w-100">
                                <div
                                  className={`position-absolute bottom-0 end-0 pe-3 pb-3 pb-sm-0`}
                                >
                                  <div className="bg-white bg-opacity-75 p-2 rounded-pill position-absolute top-0 end-0 w-100 p-4 me-2 mb-5">
                                    <ShareLink
                                      class={`position-relative mt-1`}
                                      btn={{
                                        icon: (
                                          <FaShareAlt className="d-flex align-items-center justify-content-center" />
                                        ),
                                        size: ``,
                                        variant: `warning`,
                                        // click: toggleContainerOnTop,
                                        class: `
                                          border border-3 border-light border-opacity-50 mt-auto rounded-pill d-flex gap-1 justify-content-center align-items-center lh-1 fw-3 pe-auto p-2
                                        `,
                                      }}
                                      direction={`left`}
                                      currentURL={`https://www.evetech.co.za/${_.replace(
                                        _.toLower(pc.Title),
                                        new RegExp(" ", "g"),
                                        "-"
                                      ).trim()}/best-pc-deal/${pc.ProductID}.aspx`}
                                    />
                                  </div>
                                </div>
                              </div> */}
                          </div>
                        </Col>
                        <Col lg={6}>
                          <span itemProp="name" className="d-none">
                            {pc.Title}
                          </span>
                          <Heading level={1} className={`fs-3 ps-4 ps-sm-0`}>
                            <RenderTitle HTML={pc.Name} />
                          </Heading>
                          <Heading
                            level={2}
                            className={`fs-6 fw-2 ps-4 ps-sm-0`}
                          >
                            Standard Features Include:
                          </Heading>
                          <Text>
                            <RenderHTML
                              HTML={
                                darkMode
                                  ? _.replace(
                                      pc.LongDescription,
                                      new RegExp("<p>&nbsp;</p>", "g"),
                                      ""
                                    )
                                      .replaceAll(`<b>`, `<span>`)
                                      .replaceAll(`</b>`, `</span>`)
                                      .replaceAll(`<strong>`, `<span>`)
                                      .replaceAll(`</strong>`, `</span>`)
                                      .replaceAll(`font-size: large;`, ``)
                                  : _.replace(
                                      pc.LongDescription,
                                      new RegExp("<p>&nbsp;</p>", "g"),
                                      ""
                                    ).replaceAll(`font-size: large;`, ``)
                              }
                            />
                          </Text>

                          {_.map(freeStuffs, (stuff: any) => {
                            if (stuff.des.length > 0)
                              return (
                                <RenderTitle
                                  HTML={`<br /> ${stuff.des}`}
                                  key={nanoid(7)}
                                ></RenderTitle>
                              );
                          })}
                          {_.map(freeGames, (stuff: any) => {
                            if (stuff.htext.length > 0)
                              return (
                                <RenderTitle
                                  HTML={`<br /> ${stuff.htext}`}
                                  key={nanoid(8)}
                                ></RenderTitle>
                              );
                          })}
                          {/* Free Stuff */}
                          <div
                            className={`d-grid cols-2 gap-2 cols-sm-4 cols-lg-2 cols-xxl-4 mt-xl-2 ${styles.ActionButtons}`}
                          >
                            {!hideWishList ? (
                              <Button
                                className={`
                                    ${
                                      darkMode
                                        ? `btn-dark border-secondary`
                                        : `btn-light border-dark`
                                    } 
                                    w-100 btn bg-gradient
                                `}
                                onClick={() => {
                                  AddToWishList(pc);
                                }}
                              >
                                <FcLike />{" "}
                                <small>
                                  <small>Add To Wishlist</small>
                                </small>
                              </Button>
                            ) : null}

                            <Button
                              className={`
                                  ${
                                    darkMode
                                      ? `btn-dark border-secondary`
                                      : `btn-light border-dark`
                                  } 
                                  w-100 btn bg-gradient
                              `}
                              onClick={() => setAskQuestionShow(true)}
                            >
                              <FcQuestions />
                              <small>
                                <small>Ask a Question?</small>
                              </small>
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
                                page: "pc",
                              }}
                            />

                            <Button
                              className={`
                                  ${
                                    darkMode
                                      ? `btn-dark border-secondary`
                                      : `btn-light border-dark`
                                  } 
                                  w-100 btn bg-gradient
                              `}
                              onClick={() => setTellFriendShow(true)}
                            >
                              <FcShare />
                              <small>
                                <small>Tell a Friend</small>
                              </small>
                            </Button>
                            <TellFriend
                              show={tellFriendShow}
                              onHide={() => setTellFriendShow(false)}
                              productid={pc.ProductID}
                              producttitle={pc.Name}
                              productprice={pc.Price}
                              producturl={`https://www.evetech.co.za/${_.replace(
                                _.toLower(pc.Title),
                                new RegExp(" ", "g"),
                                "-"
                              ).trim()}/best-pc-deal/${pc.ProductID}.aspx`}
                            />

                            <Button
                              className={`
                                  ${
                                    darkMode
                                      ? `btn-dark border-secondary`
                                      : `btn-light border-dark`
                                  } 
                                  w-100 btn bg-gradient
                              `}
                              onClick={() => setCustomQuoteShow(true)}
                            >
                              <FcCurrencyExchange />
                              <small>
                                <small>Quote Request</small>
                              </small>
                            </Button>

                            <CustomQuoteRequest
                              show={customQuoteShow}
                              onHide={() => setCustomQuoteShow(false)}
                              product={{
                                name: pc.Name,
                                url: `https://www.evetech.co.za/${_.replace(
                                  _.toLower(pc.Title),
                                  new RegExp(" ", "g"),
                                  "-"
                                ).trim()}/best-pc-deal/${pc.ProductID}.aspx`,
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col
                          lg={
                            freeStuffs.length > 0 || freeGames.length > 0
                              ? 6
                              : { span: 8, offset: 2 }
                          }
                        >
                          {!initProductCards ? (
                            <CustomeSpinner variant="primary" />
                          ) : null}
                          {initProductCards &&
                          freeStuffs.length === 0 &&
                          freeGames.length === 0 ? (
                            <PCFeatureList
                              slides={3}
                              slidesBig={3}
                              slidesXXL={2}
                              slidesXL={2}
                              slidesLG={3}
                              slidesMD={2}
                              slidesSM={1}
                              Features={productCards}
                            />
                          ) : null}
                          {initProductCards &&
                          (freeStuffs.length > 0 || freeGames.length > 0) ? (
                            <PCFeatureList
                              slides={3}
                              slidesBig={2}
                              slidesXXL={2}
                              slidesXL={1}
                              slidesLG={3}
                              slidesMD={2}
                              slidesSM={1}
                              Features={productCards}
                            />
                          ) : null}
                        </Col>
                        {freeStuffs.length > 0 || freeGames.length > 0 ? (
                          <Col
                            lg={productCards.length > 0 ? 6 : { span: 12 }}
                            className="d-flex align-items-center"
                          >
                            {!isSetFreeGame && !freeStuffs && (
                              <CustomeSpinner variant="primary" />
                            )}
                            {(freeStuffs.length > 0 ||
                              (isSetFreeGame && freeGames.length > 0)) && (
                              <Carousel className={`${styles.MainSlideshow}`}>
                                {_.map(freeStuffs, (stuff: any) => {
                                  return (
                                    <Carousel.Item
                                      className={`${styles.FreeStuff}`}
                                      key={nanoid(5)}
                                    >
                                      <picture>
                                        <Image
                                          src={`${stuff.imageurl}`}
                                          alt={`${stuff.alttag}`}
                                          className="d-block w-100"
                                        />
                                      </picture>
                                    </Carousel.Item>
                                  );
                                })}
                                {_.map(freeGames, (games: any) => {
                                  return (
                                    <Carousel.Item
                                      className={`${styles.FreeGame}`}
                                      key={nanoid(6)}
                                    >
                                      <RenderHTML HTML={games.htmlImg} />
                                    </Carousel.Item>
                                  );
                                })}
                              </Carousel>
                            )}
                          </Col>
                        ) : null}
                      </Row>
                      {/* Bundles Option */}
                      <Row id="Bundles">
                        <div
                          className={`${
                            darkMode ? `text-light` : `text-dark`
                          } d-flex gap-2 justify-content-end p-2 fs-4 d-none`}
                        >
                          <span className="">
                            Current Price :
                            <span className="fw-bold text-danger">
                              {currencyFormat(totalPrice)}
                            </span>
                          </span>
                        </div>

                        <PCBundles
                          ProductId={ProductId}
                          Bundles={upgradeBundles}
                          OptionsDetails={optionDetails}
                          onBundleItemsSeleceted={bundleItemsSeleceted}
                          selecetedItems={selectedBundleItems}
                          ulCPUData={ulCpuList}
                          ulGPUData={ulGpuList}
                          isOpen={isBundleOpen}
                          onBundleSet={bundlesSet}
                        />
                      </Row>
                      {/* Bundles Option */}
                    </Col>
                  </Row>
                </Col>
                <Col lg={2} className={`pt-2 pb-2`}>
                  {/* Pricing Section */}
                  <Col lg={12}>
                    {!hidePrice ? (
                      <div
                        className={`${styles.MainPrices} ${
                          darkMode ? `text-light` : `text-dark`
                        } text-right cols-2 cols-sm-3`}
                      >
                        <div>
                          <div className="f-12">Discounted Price</div>
                          <div
                            className={`${styles.NewPrice}`}
                            itemProp="offers"
                            itemScope
                            itemType="http://schema.org/Offer"
                          >
                            {pc.Price_Vat !== undefined &&
                            pc.Price_Vat !== "NaN" ? (
                              <FancyPrice
                                price={Math.round(
                                  Number(pc.Price_Vat) * 0.95238
                                )}
                              />
                            ) : null}

                            <span className="d-none" itemProp="price">
                              {Math.round(Number(pc.Price_Vat) * 0.95238)}
                            </span>
                            <span
                              itemProp="priceCurrency"
                              content="ZAR"
                              className="d-none"
                            ></span>
                          </div>
                        </div>
                        <div>
                          <div className="f-12">List Price</div>
                          <div>
                            <s>
                              {pc.Price_Vat !== undefined &&
                              pc.Price_Vat !== "NaN"
                                ? currencyFormat(
                                    Math.round(Number(pc.Price_Vat))
                                  )
                                : null}
                            </s>
                          </div>
                        </div>
                        <div className={`span-full span-sm-1`}>
                          <div className="f-12 mt-1 fw-3">
                            Note: price include 15% V.A.T
                          </div>
                          <Text className={`opacity-50 f-12 lh-1`}>
                            Discount only available when paying by Instant EFT
                            or EFT *
                          </Text>
                        </div>
                        <div className="f-12 text-danger">
                          <span>
                            {showQtyLimit && qtyLimit > 0 ? showMaxQtyMsg : ""}
                          </span>
                        </div>
                      </div>
                    ) : null}

                    <div>
                      <div>
                        {pc.Status !== undefined && pc.Status === 1 && (
                          <Stack
                            direction="horizontal"
                            className={`
                                ${styles.MainQty}
                                ${
                                  showQtyLimit && qtyLimit === "1"
                                    ? "d-none"
                                    : ""
                                }
                              `}
                            gap={2}
                          >
                            <div className={`fw-2`}>Qty:</div>
                            <QtyBox
                              ref={qtyInputRef}
                              max={
                                showQtyLimit && Number(qtyLimit) > 0
                                  ? Number(qtyLimit)
                                  : 20
                              }
                            />
                          </Stack>
                        )}
                      </div>
                      <div
                        className="text-center mb-2"
                        itemProp="offers"
                        itemScope={true}
                        itemType="http://schema.org/Offer"
                      >
                        {pc.Status !== undefined && pc.Status === 1 && (
                          <Badge
                            bg={stockBg}
                            className={`fs-6 my-2 rounded d-flex align-items-center justify-content-center ${styles.StockStatus}`}
                            itemProp="availability"
                            itemType={stockItemType}
                          >
                            <div className="fw-1">{stockStatus}</div>
                          </Badge>
                        )}

                        <span className="d-none" itemProp="price">
                          {Math.round(Math.round(pc.Price_Vat * 0.95238))}
                        </span>
                        <span
                          itemProp="priceCurrency"
                          content="ZAR"
                          className="d-none"
                        ></span>
                      </div>
                      {selectedBundleItems !== undefined &&
                        selectedBundleItems.length === 0 && (
                          <CustomeSpinner variant="primary" />
                        )}
                      {selectedBundleItems !== undefined &&
                        selectedBundleItems.length > 0 &&
                        cartElements}
                      {itemInCart ? (
                        <Button
                          className="w-100 mt-2"
                          variant="success"
                          onClick={() => router.replace("/Cart")}
                        >
                          Go To Cart <FaArrowRight />
                        </Button>
                      ) : null}
                    </div>
                  </Col>
                  <Col lg={12}>{initInfo && <PCBanners />}</Col>
                </Col>
              </Row>
            </div>
          </Container>

          <ProductFooter
            showloadconfiglink={showLoadConfigLink}
            showsaveconfiglink={showSaveConfigLink}
            showaddcart={!hideAddToCart}
            product={pc}
            Ptype={1}
            stockstatus={stockStatus}
            TotalPrice={totalPrice}
            onAddToCart={addToCartHandler}
            toggleIsBundleOpen={toggleIsBundleOpen}
            showdiscountedprice={!hidePrice}
            selecetedItems={selectedBundleItems}
            collapseText={
              isBundleOpen === true ? "[Collapse All]" : "[Expand All]"
            }
            classes={isFps ? `${styles.PCGamingFooter}` : ""}
            onOpenNotify={() => setModalNotifyShow(true)}
            showNotify={showNotify}
          />

          <NotifyMe
            show={modalNotifyShow}
            onHide={() => setModalNotifyShow(false)}
            productid={pc.NPID}
            producttitle={pc.Name}
            productprice={pc.Price}
            producturl={`https://www.evetech.co.za/${_.replace(
              _.toLower(pc.Title),
              new RegExp(" ", "g"),
              "-"
            ).trim()}/best-pc-deal/${pc.ProductID}.aspx`}
          />

          <WishModal
            isShow={showWish}
            isReload={reloadWish}
            onClose={onWishClose}
          />
        </>
      )}
      {!initInfo && <CustomeSpinner variant="info" />}
      {authCtx !== undefined && authCtx.isAdmin ? (
        <EditProductOverlay productId={pc.ProductID} pType={1} />
      ) : null}
    </>
  );
};

export default PC;
