"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Image,
  OverlayTrigger,
  Row,
  Stack,
  Tab,
  Tabs,
  Tooltip,
} from "react-bootstrap";
import QtyBox from "@/components/Product/QtyBox";
import LaptopBundles from "@/components/Product/Laptop/LaptopBundles";
import LaptopLinks from "@/components/Product/Laptop/LaptopLinks";
import LaptopReviews from "@/components/Product/Laptop/LaptopReviews";
import LaptopSpec from "@/components/Product/Laptop/LaptopSpec";
import {
  FcApproval,
  FcComments,
  FcCurrencyExchange,
  FcLike,
  FcQuestions,
  FcShare,
} from "react-icons/fc";
import AskQuestion from "@/components/Modals/AskQuestion";
import TellFriend from "@/components/Modals/TellFriend";
import { customAlphabet } from "nanoid";
import LaptopHeader from "@/components/Laptop/LaptopHeader";
import NCartContext from "@/store/ncart-context";
import styles from "@/styles/LaptopDetail.module.scss";
import {
  FaArrowRight,
  FaCheck,
  FaCopy,
  FaEdit,
  FaExclamationCircle,
  FaPlus,
  FaQuestion,
  FaShareAlt,
  FaShoppingBag,
  FaStar,
  FaWindows,
} from "react-icons/fa";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import LaptopDetailBanners from "@/components/Banners/LaptopDetailBanners";
import BreadCrumbs from "@/components/Product/BreadCrumbs";
import ProductFooter from "@/components/Product/ProductFooter";
import Bundle from "@/components/Product/Laptop/Bundle";
import BackpackUpgrades from "@/components/Product/Laptop/BackpackUpgrades";
import OfficeUpgrades from "@/components/Product/Laptop/OfficeUpgrades";
import FPSModal from "@/components/Modals/FPSModal";
import FPSDescribe from "@/components/Product/Laptop/FPSDescribe";
import { FPSTab } from "@components";
import AuthContext from "@/store/auth-context";
import PriceMatch from "@/components/Modals/PriceMatch";
import CustomeSpinner from "@/components/CustomeSpinner";
import ModalGallery from "@/components/Gallery/ModalGallery";
import OverviewGallery from "@/components/Gallery/OverviewGallery";
import WriteReview from "@/components/Modals/WriteReview";
import PalladiumTable from "@/components/Product/PalladiumTable";
import moment from "moment";
import NotifyMe from "@/components/Modals/NotifyMe";
import WishModal from "@/components/Modals/WishModal";
import HelperContext from "@/store/helper-context";
import { Helmet } from "react-helmet";
import EditProductOverlay from "@/components/Product/EditProductOverlay";
import SpecialTag from "@/components/Main/Controls/SpecialTag";
import FeatureGallery2 from "@/components/Gallery/FeatureGallery2";
import { RiHeartAddLine } from "react-icons/ri";
import ShareLink from "@/components/Product/ShareLink";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Router, useRouter } from "next/navigation";
import { CartAPI, ProductAPI } from "@/custom/utils/actions";
import Script from "next/script";
import { useTheme } from "@/store/ThemeContext";
import { highlightText } from "@/components/Auth/LoginModal";
import FancyPrice from "@/components/FancyPrice";
import Text from "@/components/Text";
import backgrounds from "@/styles/Background.module.scss";
import Heading from "@/components/Heading";
import Head from "next/head";
import UserAPI from "@/custom/utils/actions/user";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");
const Swal = require("sweetalert2");

const Laptop = () => {
  const authCtx: any = useContext(AuthContext);
  const helperCtx: any = useContext(HelperContext);
  const params = useParams();
  const router = useRouter();
  const cartCtx = useContext(NCartContext);
  const laptopRef = useRef();

  /* WishList */
  const [showWish, setShowWish] = useState(false);
  const [reloadWish, setReloadWish] = useState(false);
  function delay(ms: any) {
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
          productId: product.NPID,
          ptype: 3,
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
              productId: product.NPID,
              ptype: 3,
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

  const [laptop, setLaptop] = useState<any>({});
  const [stockBg, setStockBg] = useState<any>("success");
  const [stockStatus, setStockStatus] = useState<any>("In Stock");
  /* const [adCart,setAdCart] = useState(true);
    const [divNotify,setDivNotify] = useState(false); */
  const [cartElements, setCartElements] = useState<any>(null);
  const [similarLinks, setSimilarLinks] = useState<any>([]);
  const [brand, setBrand] = useState<any>("");
  const [urlTitle, setUrlTitle] = useState<any>("");
  const [specification, setSpecification] = useState<any>(null);
  const [reviews, setReviews] = useState<any>(null);
  const [bundles, setBundles] = useState<any>(null);
  const [totalPrice, setTotalPrice] = useState<any>(0);
  const [open, setOpen] = useState<any>(false);
  const isLG = useMediaQuery("(min-width: 992px)");
  const [officeBudles, setOfficeBundles] = useState<any>([]);
  const [attributes, setAttributes] = useState<any>({});
  const [isLowStock, setIsLowStock] = useState<any>();
  const [lowStockText, setLowStockText] = useState<any>("");

  /* Attribute Flags */
  const [showPrice, setShowPrice] = useState<any>(true);
  const [showCart, setShowCart] = useState<any>(true);
  const [showWishlist, setShowWishlist] = useState<any>(true);
  const [showNotify, setShowNotify] = useState<any>(false);
  const [imgNotify, setImgNotify] = useState<any>("");
  const [stockText, setStockText] = useState<any>("");
  const [showSoldOut, setShowSoldOut] = useState<any>(false);
  const [overviewBrand, setOverviewBrand] = useState<any>("");
  const [overviewPartNo, setOverviewPartNo] = useState<any>("");
  const [overviewType, setOverviewType] = useState<any>(0);
  const [showOffice, setShowOffice] = useState<any>(false);
  /* const [showBackPack, setShowBackPack] = useState(false); */
  const [backPackValue, setBackPackValue] = useState<any>("");
  const [backOption, setBackOption] = useState<any[]>([]);
  const [freeStuff, setFreeStuff] = useState<any[]>([]);
  const [flixScript, setFlixScript] = useState<any>("");
  const [flixFlag, setFlixFlag] = useState<any>(false);
  const [cnetFlag, setCnetFlag] = useState<any>(false);
  const [cnetScript, setCnetScript] = useState<any>("");
  const [fpsData, setFpsData]: any = useState<any[]>([]);
  const [initFPSData, setInitFPSData] = useState<any>(false);
  const [gameData, setGameData] = useState<any>([]);
  const [isOnSpecial, setIsOnSpecial] = useState<any>(false);
  const [isOnDeal, setIsOnDeal] = useState<any>(false);
  const [isOnClearance, setIsOnClearance] = useState<any>(false);
  const [showBuyNow, setShowBuyNow] = useState<any>(true);
  const [showAskQuestion, setShowAskQuestionLink] = useState<any>(true);
  const [showTellFriend, setShowTellFriend] = useState<any>(true);
  const [showPriceMatch, setShowPriceMatch] = useState<any>(true);
  const [showWriteReview, setShowWriteReview] = useState<any>(true);
  const [showQtyLimit, setShowQtyLimit] = useState<any>(false);
  const [qtyLimit, setQtyLimit] = useState<any>(0);
  const [qtyBuyLimit, setQtyBuyLimit] = useState<any>(0);
  const [showMaxQtyMsg, setShowMaxQtyMsg] = useState<any>(false);
  /*  const [flixMediaEnable, setFlixMediaEnable] = useState(false); */
  /* const [officeEnable, setOfficeEnable] = useState(false); */
  const [maxQty, setMaxQty] = useState<any>(0);

  /* Modals */
  const [askQuestionShow, setAskQuestionShow] = useState<any>(false);
  const [tellFriendShow, setTellFriendShow] = useState<any>(false);
  const [priceMatchShow, setPriceMatchShow] = useState<any>(false);
  const [writeReviewShow, setWriteReviewShow] = useState<any>(false);
  const [modalGalleryShow, setModalGalleryShow] = useState<any>(false);
  const [selectedBundleItems, setSelecetecBundleItems] = useState<any[]>([]);
  const [selectedBackPack, setSelectedBackPack] = useState<any>({});
  const bundlesInfoRef = useRef<any>();
  const bundlesBackPackInfoRef = useRef<any>();
  const freeStuffInfoRef = useRef<any>();
  const [modalNotifyShow, setModalNotifyShow] = useState<any>(false);

  /* InitState */
  const [initInfo, setInitInfo] = useState<any>(false);
  const [initGallery, setInitGallery] = useState<any>(false);
  const [initLink, setInitLink] = useState<any>(false);
  const [initOverview, setInitOverview] = useState<any>(false);
  const [stockItemType, setStockItemType] = useState<any>(
    "http://schema.org/InStock"
  );

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  /* SiteInfo Flags */
  const [siteInfo, setSiteInfo] = useState<any>({});

  // const [showClearance, setShowClearance] = useState(false);
  // const [showDealIcon, setShowDealIcon] = useState(false);
  // const [dealText, setDealText] = useState(false);

  const [itemInCart, setItemInCart] = useState(false);
  const [gallery, setGallery] = useState<any>({});
  const [galleryData, setGalleryData] = useState<any>([
    {
      original: "",
      thumbnail: "",
    },
  ]);
  const [PageCrumbs, setPageCrumbs] = useState<any>([
    { productID: 0, crumbs: [] },
  ]);
  const [ProductId, setProductId] = useState(0);

  /* if (isNaN(ProductId)) {
    try {
      ProductId = parseInt(
        ProductId.replace(".", "").replace("aspx", "").trim()
      );
    } catch (e) {
      navigate("/", { replace: true });
    }
  } */
  useEffect(() => {
    let ProdId: any = params?.id;
    console.log("params", params);
    if (ProdId !== undefined && ProdId.trim().length > 0) {
      console.log("ProdId", ProdId);
      if (isNaN(ProdId)) {
        try {
          ProdId = parseInt(ProdId.replace(".", "").replace("aspx", "").trim());
          setProductId(ProdId);
        } catch (e) {
          /* router.replace("/"); */
          console.log(e);
        }
      } else {
        ProdId = parseInt(ProdId.replace(".", "").replace("aspx", "").trim());
        setProductId(ProdId);
      }
    }
  }, [params]);

  useEffect(() => {
    setSiteInfo(helperCtx.siteInfo);
  }, [helperCtx.siteInfo]);

  useEffect(() => {
    if (!_.isEmpty(siteInfo)) {
      /* if (siteInfo.backpackEnable === "yes") {
        setShowBackPack(true);
      } else {
        setShowBackPack(false);
      } */
      // if (siteInfo.dealText !== "") {
      //   setDealText(siteInfo.dealText);
      // } else {
      //   setDealText("");
      // }
      /*  if (siteInfo.flixMediaEnable === "yes") {
        setFlixMediaEnable(true);
      } else {
        setFlixMediaEnable(false);
      } */
      //officeEnable
      /*  if (siteInfo.officeEnable === "yes") {
        setOfficeEnable(true);
      } else {
        setOfficeEnable(false);
      } */
      // if (siteInfo.showClearance === "yes") {
      //   setShowClearance(true);
      // } else {
      //   setShowClearance(false);
      // }
      // if (siteInfo.showDealIcon === "yes") {
      //   setShowDealIcon(true);
      // } else {
      //   setShowDealIcon(false);
      // }
    }
  }, [siteInfo]);

  let addedtoCart = _.filter(cartCtx.items, {
    name: laptop.Name,
  });

  useEffect(() => {
    if (addedtoCart.length > 0) {
      setItemInCart(true);
    } else {
      setItemInCart(false);
    }
  }, [cartCtx, addedtoCart.length, itemInCart]);

  useEffect(() => {}, [addedtoCart.length, itemInCart]);

  const qtyInputRef: any = useRef<any>();
  const qtyLimitRef: any = useRef<any>(0);
  const qtyBuyLimitRef: any = useRef<any>(0);
  const showQtyLimitRef: any = useRef<any>(false);

  const checkLimit = (qtyLimit: any, qtyBuyLimit: any) => {
    let max = 20;
    if (Number(qtyLimit) > 0) return (max = Number(qtyLimit));
    if (Number(qtyBuyLimit) > 0) return (max = qtyBuyLimit);
  };

  /* Cart auth based add to cart */
  const addToCartHandler = async (event: any) => {
    event.preventDefault();
    let totalQty = qtyInputRef.current.value;
    const product: any = laptopRef.current;
    const prodBundle: any = bundlesInfoRef.current;
    const prodBundleBackPack: any = bundlesBackPackInfoRef.current;
    const freeStuff: any = freeStuffInfoRef.current;

    let totalPrice = product.Price;
    let backpackPrice = 0;
    let upTitle = "<br>";
    let weight = 0;
    let qtPerCustomer = 0;
    let qtyBuyLimit = 0;
    try {
      qtyBuyLimit = parseInt(qtyBuyLimitRef.current);
      qtPerCustomer = qtyBuyLimit;
    } catch (e) {}

    if (
      showQtyLimitRef.current &&
      !isNaN(qtyLimitRef.current) &&
      parseInt(qtyLimitRef.current) > 0
    ) {
      if (parseInt(totalQty) > parseInt(qtyLimitRef.current)) {
        totalQty = parseInt(qtyLimitRef.current);
        qtPerCustomer = parseInt(qtyLimitRef.current);
        try {
          qtyInputRef.current.value = totalQty;
        } catch (e) {}
      }
    }

    if (qtyBuyLimit > 0 && totalQty > qtyBuyLimit) {
      totalQty = qtyBuyLimit;
      try {
        qtyInputRef.current.value = qtyBuyLimit;
      } catch (e) {}
    }

    try {
      let weightStr =
        product.WeightTitle.trim().length > 0 &&
        product.WeightTitle.trim().includes("-")
          ? product.WeightTitle.trim().split("-")[1]
          : product.WeightTitle.trim();
      weightStr = _.toLower(weightStr).replace("kg", "");
      weight = parseFloat(weightStr);
    } catch (e) {}

    if (helperCtx.showBackPack) {
      try {
        backpackPrice =
          prodBundleBackPack !== null && prodBundleBackPack.price !== undefined
            ? parseFloat(selectedBackPack.price)
            : 0;
        upTitle +=
          prodBundleBackPack !== null && prodBundleBackPack.title !== undefined
            ? "[+]" + prodBundleBackPack.title
            : "";
      } catch (e) {}
    }

    let upPrice = 0;
    if (prodBundle) {
      upPrice += _.sum(
        _.map(prodBundle, (bundle: any) => {
          return bundle.Price;
        })
      );
      _.map(prodBundle, (bundle: any) => {
        upTitle += !_.lowerCase(bundle.Title).includes("not include")
          ? "[+]" +
            (bundle.Title.includes("[ +")
              ? bundle.Title
              : bundle.Title + ` [ + ${currencyFormat(bundle.Price)}]`)
          : "";
      });
    }
    totalPrice += upPrice + (isNaN(backpackPrice) ? 0 : backpackPrice);

    let auth = JSON.parse(localStorage.getItem("user_auth")) || null;
    let cartUrl = "/api/cart/add";
    if (auth !== null && auth.isLoggedIn === true)
      cartUrl = "/api/authcart/add";

    /*  const cartAdd = await fetch(cartUrl, {
      method: "POST",
      body: JSON.stringify({
        id: nanoid(8),
        productId: product.NPID,
        name: product.Name,
        qty: totalQty,
        qtPeCs: qtPerCustomer,
        pType: 3,
        addOns: {
          primary: bundlesInfoRef.current,
          secondary: prodBundleBackPack,
        },
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
        productId: product.NPID,
        name: product.Name,
        qty: totalQty,
        qtPeCs: qtPerCustomer,
        pType: 3,
        addOns: {
          primary: bundlesInfoRef.current,
          secondary: prodBundleBackPack,
        },
      });
    else
      cartAdd = await CartAPI.addToCart({
        id: nanoid(8),
        productId: product.NPID,
        name: product.Name,
        qty: totalQty,
        qtPeCs: qtPerCustomer,
        pType: 3,
        addOns: {
          primary: bundlesInfoRef.current,
          secondary: prodBundleBackPack,
        },
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

  const buyNowHandler = (event: any) => {
    event.preventDefault();

    if (authCtx.isLoggedIn) {
      addToCartHandler(event).then((res) => {
        router.push("/delivery");
      });
    } else {
      addToCartHandler(event).then((res) => {
        router.push("/cart");
      });

      /* authCtx.onShowLogin(true); */
    }
  };

  const onCnetScriptSet = (value: any) => {
    setCnetFlag(value);
  };

  const onFlixScriptSet = (value: any) => {
    setFlixFlag(value);
  };

  /*  Getting Back Packs */

  const getBackPack = async (optionId: any) => {
    const backpackBundle = await ProductAPI.getLaptopBackPacks({ optionId });
    if (
      backpackBundle !== null &&
      backpackBundle !== undefined &&
      backpackBundle.result !== undefined &&
      backpackBundle.result !== null
    ) {
      let backpacks = backpackBundle.result;
      try {
        let activeBackPack = _.find(backpacks, (bundle: any, ind: any) => {
          return ind === 0;
        });
        activeBackPack.isActive = 1;
        setSelectedBackPack((prevBackPack: any) => {
          prevBackPack = activeBackPack;
          return prevBackPack;
        });
        bundlesBackPackInfoRef.current = activeBackPack;
      } catch (e) {}

      setBackOption((prevBackpacks) => {
        prevBackpacks = backpacks;
        return prevBackpacks;
      });
    }
  };

  useEffect(() => {
    try {
      if (helperCtx.showBackPack) {
        let backPackId = parseInt(backPackValue);
        if (backPackId > 0) getBackPack(backPackId);
      }
    } catch (e) {}
  }, [backPackValue, helperCtx.showBackPack]);

  function toTitleCase(str: any) {
    return str.replace(/\w\S*/g, function (txt: any) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  /* Use Effect Loading Part */
  useEffect(() => {
    console.log("Product Id change", ProductId);
    if (!isNaN(ProductId) && ProductId > 0) {
      /* && !initInfo */
      /* Gallery Logic */
      let galleryImages: any = [];

      const getGallery = async (imgUrl: any) => {
        setInitGallery(false);
        const prods = await ProductAPI.getLaptopGallery({ ProductId });
        if (
          prods !== null &&
          prods !== undefined &&
          prods.result !== undefined &&
          prods.result !== null
        ) {
          let gall = prods.result[0];

          /* Set Images to gallery */
          setGallery((prevGallery: any) => {
            prevGallery = gall;
            return prevGallery;
          });

          try {
            let images = gall.ImageGallery.split("|").map((image: any) => {
              return `https://www.evetech.co.za/${image}`;
            });
            /* let imageThumb = gall.ImageGalleryThumb.split("|").map(image => {
                                return `https://www.evetech.co.za/${image}`;
                                });
                            */

            galleryImages.push({
              original: imgUrl,
              thumbnail: imgUrl,
            });

            for (let i = 0; i < images.length; i++) {
              galleryImages.push({
                original: images[i],
                thumbnail: images[i],
              });
            }

            /* Set Images to gallery data */
            setGalleryData(galleryImages);
            setInitGallery(true);
          } catch (e) {}
        }
      };
      /* Gallery Logic */

      const getSimilarLinks = async (linkid: any) => {
        setInitLink(false);
        const linksData = await ProductAPI.getLaptopSimilarLinks({ linkid });
        if (
          linksData !== null &&
          linksData !== undefined &&
          linksData.result !== undefined &&
          linksData.result !== null
        ) {
          let links = linksData.result;
          setSimilarLinks((prevLink: any) => {
            prevLink = links;
            return prevLink;
          });
        }
        setInitLink(true);
      };

      /* Getting Similar Links Mehtods */

      const getSpecification = async (npid: any) => {
        const specs = await ProductAPI.getLaptopSpecification({ npid });
        if (
          specs !== null &&
          specs !== undefined &&
          specs.result !== undefined &&
          specs.result !== null
        ) {
          let specsAll = specs.result;
          setSpecification((prevSpec: any) => {
            prevSpec = specsAll;
            return specsAll;
          });
        }
      };

      /* Getting Specificaitons Method */

      const getReviews = async (npid: any, linkId: any, rstatus: any) => {
        const reviewsData = await ProductAPI.getLaptopReviews({
          npid: npid,
          linkId: linkId,
          rstatus: rstatus,
        });
        if (
          reviewsData !== null &&
          reviewsData !== undefined &&
          reviewsData.result !== undefined &&
          reviewsData.result !== null
        ) {
          let reviewsAll = reviewsData.result;
          setReviews((prevReviews: any) => {
            prevReviews = reviewsAll;
            return prevReviews;
          });
        }
      };

      /*  Getting Reviews Method  */

      const getBundles = async (npid: any) => {
        const bundleData = await ProductAPI.getLaptopBundles({ npid });
        if (
          bundleData !== null &&
          bundleData !== undefined &&
          bundleData.result !== undefined &&
          bundleData.result !== null
        ) {
          let bundlesAll = bundleData.result;
          setBundles((prevBundle: any) => {
            prevBundle = bundlesAll;
            return prevBundle;
          });
        }
      };

      /*  Getting Bundles Method */

      const getAttributesValue = async (productId: any) => {
        const dataAtt = await ProductAPI.getAttributesValue({ productId });
        if (
          dataAtt !== null &&
          dataAtt !== undefined &&
          dataAtt.result !== undefined &&
          dataAtt.result !== null
        ) {
          let prodAttributes = dataAtt.result;

          setAttributes((prevAtttribute: any) => {
            prevAtttribute = prodAttributes;
            return prevAtttribute;
          });
          let backPackId = 0;
          prodAttributes.map((attribute: any) => {
            let attid = attribute.attid;
            let value = attribute.value.trim();
            if (attid === 3 && value === "yes") {
              //hide price
              setShowPrice(false);
            } else if (attid === 4 && value === "yes") {
              // hide add to cart
              setShowCart(false);
              setShowBuyNow(false);
            } else if (attid === 5 && value === "yes") {
              //hide wishlist button
              setShowWishlist(false);
            } else if (attid === 6 && value === "yes") {
              //show notify
              setShowNotify(true);
            } else if (attid === 6 && value === "no") {
              //do not show notify
              setShowNotify(false);
            } else if (attid === 7 && value.length > 0) {
              //notify image ((should we create one))
              setImgNotify(value);
            } else if (attid === 9 && value !== "no" && value.length > 0) {
              //Status
              setStockText(value);
            } else if (attid === 557 && value === "yes") {
              // SOLD OUT ((Helper.SOLD_OUT_LaptopID = 557))
              setStockText("SOLD OUT");
              setShowSoldOut(true);
            } else if (attid === 603 && value.length > 0) {
              // Overview Brand ((laptop_overview_brand = 603))
              setOverviewBrand(value);
            } else if (attid === 604 && value.length > 0) {
              // Overview Part No ((laptop_overview_partno = 604))
              // Must Apply!
              setOverviewPartNo(value);
            } else if (attid === 563 && value.length > 0) {
              // Overview Part No / Overview Type ((Overview_Type_ID_Laptop = 563;))
              setOverviewType(parseInt(value));
            } else if (attid === 611 && value.length > 0) {
              // BackPackOptionFetch ((laptop_backpack_option = 611;))
              /* backpackEnable === "yes" */
              if (helperCtx.showBackPack) {
                setBackPackValue(value);
              }
            } else if (attid === 560 && value.length > 0) {
              //QTY Limit ((QTY_LIMIT_Laptop = 560;))
              setShowQtyLimit(true);
              setQtyLimit(value);
              qtyLimitRef.current = value;
              showQtyLimitRef.current = true;
              setShowMaxQtyMsg(`Limit ${value} per customer`);
            } else if (attid === 588 && value.length > 0) {
              try {
                setQtyBuyLimit(parseInt(value));
                qtyBuyLimitRef.current = parseInt(value);
              } catch (e) {
                setQtyBuyLimit(value);
                qtyBuyLimitRef.current = value;
              }
            } else if (attid === 616 && value.length > 0) {
              if (value.trim() === "yes") setIsOnClearance(true);
            }
          });
          getCnetScriptCode();
        }
      };

      const getCnetScriptCode = () => {
        let script = `
                          var ccs_cc_args = ccs_cc_args || [];
                          ccs_cc_args.push(['cpn', 'CPN']);
                          ccs_cc_args.push(['mf', '###BRAND###']);
                          ccs_cc_args.push(['pn', '###MPN###']);
                          ccs_cc_args.push(['upcean', 'UPC_EAN_CODE']);
                          ccs_cc_args.push(['ccid', 'CATALOG_CODE']);
                          ccs_cc_args.push(['lang', 'LANGUAGE']);
                          ccs_cc_args.push(['market', 'MARKET']);

                          (function () {
                            var o = ccs_cc_args; o.push(['_SKey', 'c05b6e98']); o.push(['_ZoneId','3e55ff0570']);
                            var sc = document.createElement('script'); sc.type = 'text/javascript'; sc.async = true;
                            sc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.cs.1worldsync.com/jsc/h1ws.js';
                            var n = document.getElementsByTagName('script')[0]; n.parentNode.insertBefore(sc, n);
                          })();
        `;

        setCnetScript(script);
      };

      /* Geeting Atttributes */

      const getFlixScriptCode = () => {
        let script = `
                            var product_mpn = "###MPN###";
                            var product_ean = "###EAN###";
                            var product_brand = "###BRAND###";
                            var distributor = "15689";
                            var language = "za";
                            var fallback_language = "";
                            var headID = document.getElementsByTagName("head")[0];
                            var flixScript = document.createElement('script');
                            flixScript.type = 'text/javascript';
                            flixScript.async = true;
                            flixScript.setAttribute('data-flix-distributor', distributor);
                            flixScript.setAttribute('data-flix-language', language);
                            flixScript.setAttribute('data-flix-fallback-language', fallback_language);
                            flixScript.setAttribute('data-flix-brand', product_brand);
                            flixScript.setAttribute('data-flix-ean', product_ean);
                            flixScript.setAttribute('data-flix-mpn', product_mpn);
                            flixScript.setAttribute('data-flix-inpage', 'flix-inpage');
                            flixScript.setAttribute('data-flix-autoload', 'hotspot,inpage');
                            flixScript.setAttribute('data-flix-price', '');
                            headID.appendChild(flixScript);
                            flixScript.src = '//media.flixfacts.com/js/loader.js';
                            if (typeof (flixJsCallbacks) === "object")
                            flixJsCallbacks.loadService('inpage');
                            if (typeof (flixJsCallbacks) === "object")
                            flixJsCallbacks.loadService('minisite');
                            if (typeof (flixJsCallbacks) === "object")
                            flixJsCallbacks.loadService('hotspot');
                    `;
        setFlixScript(script);
      };
      getFlixScriptCode();
      /* Flix Script */

      const getFreeStuff = async (productId: any) => {
        const freeStuffData = await ProductAPI.getLaptopFreeStuff({
          productId,
        });
        if (
          freeStuffData !== null &&
          freeStuffData !== undefined &&
          freeStuffData.result !== undefined &&
          freeStuffData.result !== null
        ) {
          let freeStuffs = freeStuffData.result;

          setFreeStuff((prevFreeStuff) => {
            prevFreeStuff = freeStuffs;
            return prevFreeStuff;
          });
          freeStuffInfoRef.current = freeStuffs;
        }
      };

      const getFPSData = async (linkId: any) => {
        const fpsDatas = await ProductAPI.getLaptopFPSData({ linkId });
        if (
          fpsDatas !== null &&
          fpsDatas !== undefined &&
          fpsDatas.result !== undefined &&
          fpsDatas.result !== null
        ) {
          let fpsData: any = fpsDatas.result[0];

          setFpsData((prevFPSData) => {
            prevFPSData = fpsData;
            return prevFPSData;
          });
          setInitFPSData(true);
        }
      };

      const getLaptopGameData = async () => {
        const gameDatas = await ProductAPI.getLaptopGameData();
        if (
          gameDatas !== null &&
          gameDatas !== undefined &&
          gameDatas.result !== undefined &&
          gameDatas.result !== null
        ) {
          let gamesData = gameDatas.result;
          setGameData(gamesData);
        }
      };

      const getHyperAttText = (r: any) => {
        let att = r.Attributes;
        let isTouch = att.split(",");
        let result = "";
        if (att !== "none") {
          if (isTouch.includes("2")) {
            return "Core i7 Laptops";
          } else if (isTouch.includes("3")) {
            return "Core i5 Laptops";
          } else if (isTouch.includes("14")) {
            return "Core i3 Laptops";
          }
        }
        return result;
      };

      const getHyperAttURL = (r: any) => {
        let att = r.Attributes;
        let isTouch = att.split(",");
        let result = "";
        if (att !== "none") {
          if (isTouch.includes("2")) {
            return "/core-i7-laptops-on-special/l/044.aspx";
          } else if (isTouch.includes("3")) {
            return "/core-i5-laptops.aspx";
          } else if (isTouch.includes("14")) {
            return "/core-i3-laptops.aspx";
          }
        }
        return result;
      };

      const isTouchLaptopLink = (r: any) => {
        let att = r.Attributes;
        let isTouch = att.split(",");

        if (att !== "none") {
          return isTouch.includes("1");
        }
      };

      const getHyperCategoryText = (r: any) => {
        let Text = "";

        if (r.parentid === 1) {
          Text = "Laptops and Notebooks";
        } else if (r.parentid === 2) {
          //Tablet
          Text = r.Category;
        } else if (r.parentid === 3) {
          //ALL in one
          Text = r.Category;
        } else if (r.parentid === 4) {
          // Accessories
          Text = r.Category;
        }

        return Text;
      };

      const getHyperBrandText = (r: any) => {
        let Text = "";

        if (r.parentid === 1) {
          Text = r.BrandURL;

          if (
            (r.BrandID === 4 ||
              r.BrandID === 9 ||
              r.BrandID === 15 ||
              r.BrandID === 14 ||
              r.BrandID === 8) &&
            r.typeid === 3
          ) {
            if (r.BrandID === 4 && r.typeid === 3) {
              Text = "Asus Gaming";
            } else if (r.BrandID === 9 && r.typeid === 3) {
              Text = "MSI Gaming";
            } else if (r.BrandID === 15 && r.typeid === 3) {
              Text = "Gigabyte Gaming";
            } else if (r.BrandID === 14 && r.typeid === 3) {
              Text = "Dell Gaming";
            } else if (r.BrandID === 8 && r.typeid === 3) {
              Text = "Lenovo Gaming";
            }
          }
        }

        return toTitleCase(Text);
      };

      const getHyperCategoryURL = (r: any) => {
        let NavigateUrl = "";

        if (r.parentid === 1) {
          NavigateUrl = "/laptop-specials-for-sale-south-africa.aspx";
        } else if (r.parentid === 2) {
          //Tablet
          NavigateUrl = "/tablets.aspx";
        } else if (r.parentid === 3) {
          //ALL in one
          NavigateUrl = "/all-in-one-pcs.aspx";
        } else if (r.parentid === 4) {
          // Accessories
          NavigateUrl = "/Accessories.aspx";
        }

        return NavigateUrl;
      };

      const getHyperBrandURL = (r: any) => {
        let NavigateUrl = "";

        if (r.parentid === 1) {
          NavigateUrl = "/laptop-specials-for-sale-south-africa.aspx";

          if (
            (r.BrandID === 4 ||
              r.BrandID === 9 ||
              r.BrandID === 15 ||
              r.BrandID === 14 ||
              r.BrandID === 8) &&
            r.typeid === 3
          ) {
            if (r.BrandID === 4 && r.typeid === 3) {
              NavigateUrl = "/asus-laptops-on-special/l/261.aspx";
            } else if (r.BrandID === 9 && r.typeid === 3) {
              NavigateUrl = "/msi-laptops-on-special/l/35.aspx";
            } else if (r.BrandID === 15 && r.typeid === 3) {
              NavigateUrl = "/gigabyte-laptops-on-special/l/340.aspx";
            } else if (r.BrandID === 14 && r.typeid === 3) {
              NavigateUrl = "/dell-laptops-on-special/l/339.aspx";
            } else if (r.BrandID === 8 && r.typeid === 3) {
              NavigateUrl = "/lenovo-legion-gaming-laptop-deals/l/220.aspx";
            } else if (r.BrandID === 8) {
              NavigateUrl = "/lenovo-laptops-on-special/l/262.aspx";
            }
          } else {
            if (r.BrandID === 4) {
              NavigateUrl = "/asus-laptops-on-special/l/261.aspx";
            } else if (r.BrandID === 9) {
              NavigateUrl = "/msi-laptops-on-special/l/35.aspx";
            } else if (r.BrandID === 14) {
              NavigateUrl = "/dell-laptops-on-special/l/339.aspx";
            } else if (r.BrandID === 8) {
              NavigateUrl = "/lenovo-laptops-on-special/l/262.aspx";
            } else if (r.BrandID === 7) {
              NavigateUrl = "/hp-laptops-on-special/l/492.aspx";
            } else {
              let brandURLText = r.BrandURL.replace(/ /g, "-");
              NavigateUrl = `/notebooks/${brandURLText}-${r.BrandID}.aspx`;
            }
          }
        }

        return NavigateUrl;
      };

      const getHyperTypeText = (r: any) => {
        let text = "";
        if (
          r.includes("Laptops") === false &&
          r.includes("laptops") === false
        ) {
          text = r + " Laptops";
        } else {
          text = r;
        }

        return text;
      };

      const getHyperTypeURL = (r: any) => {
        let NavigateUrl = ``;
        if (r.parentid === 1) {
          if (r.typeid !== 2) {
            let typeName = r.typeURL.replace(/ /g, "-");
            NavigateUrl = `/notebooks/${typeName}-${r.typeid}.aspx`;
          }
          if (r.typeid === 3) {
            NavigateUrl = `/gaming-laptops.aspx`;
          }
        }

        return NavigateUrl;
      };

      const fetchData = async () => {
        const prods = await ProductAPI.getLaptopById({ ProductId });
        if (
          prods !== null &&
          prods !== undefined &&
          prods.result !== undefined &&
          prods.result !== null
        ) {
          let productData = prods.result;
          if (productData.length > 0) {
            let product = prods.result[0];
            laptopRef.current = product;
            setLaptop(prods.result[0]);

            if (product.isspecial === 1) {
              setIsOnSpecial(true);
            }

            if (product.Status === 0) {
              setShowCart(false);
              setShowBuyNow(false);
              setShowWishlist(false);
            }

            if (product.IsOnDeal === 1) {
              setIsOnDeal(true);
            }

            if (helperCtx.showDealIcon && isOnDeal) setIsOnSpecial(true);

            if (product.Keywords.length > 0) {
              setIsLowStock(true);
              setLowStockText(stripHtml(product.Keywords));
            } else {
              setIsLowStock(false);
              setLowStockText("");
            }

            let crumbs: any = [];
            let i = 1;

            crumbs.push({
              title: "Home",
              link: "/",
              stage: i,
            });
            i++;

            crumbs.push({
              title: "Laptop Deals",
              link: "/laptop-specials-for-sale-south-africa.aspx",
              stage: i,
            });
            i++;

            if (product !== undefined) {
              crumbs.push({
                title: getHyperCategoryText(product),
                link: getHyperCategoryURL(product),
                stage: i,
              });
              i++;

              crumbs.push({
                title: getHyperTypeText(product.LaptopType),
                link: getHyperTypeURL(product),
                stage: i,
              });
              i++;

              if (getHyperAttText(product) !== "") {
                crumbs.push({
                  title: getHyperAttText(product),
                  link: getHyperAttURL(product),
                  stage: i,
                });
                i++;
              }

              if (isTouchLaptopLink(product)) {
                crumbs.push({
                  title: "Touch Screen Laptops",
                  link: "/touchscreen-laptops/l/842.aspx",
                  stage: i,
                });
                i++;
              }

              crumbs.push({
                title: getHyperBrandText(product),
                link: getHyperBrandURL(product),
                stage: i,
              });
              i++;

              crumbs.push({
                title: product.BrandSeries + " " + product.Code,
                link: "#",
                stage: i,
              });
              i++;
            }

            setPageCrumbs((prevCrumb: any) => {
              let updateCrumb = _.map(prevCrumb, (pcrumb: any) => {
                pcrumb.productID = ProductId;
                pcrumb.crumbs = _.orderBy(crumbs, "stage", "desc");
                return pcrumb;
              });

              return updateCrumb;
            });

            setTotalPrice((prevPrice: any) => {
              let upPrice = 0;
              if (selectedBundleItems !== null) {
                upPrice = _.sumBy(selectedBundleItems, function (o: any) {
                  return o.Price;
                });
              }
              return prods.result[0].Price + upPrice;
            });

            setStockStatus((prevStat: any) => {
              let status = product.StockStatus.toLowerCase();

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
                status.includes("stock to be confirm")
              ) {
                /* setAdCart(false);
                              setDivNotify(true); */
                if (
                  status.includes("out of stock") ||
                  status.includes("pre-order")
                ) {
                  setStockBg("danger");
                }
                if (showNotify) {
                  setCartElements(
                    <Button
                      variant={darkMode ? `dark` : `light`}
                      className="p-0 fs-6 w-100 border-danger shadow-sm overflow-hidden"
                      onClick={() => setModalNotifyShow(true)}
                    >
                      <div className="p-1 fw-2 text-light bg-danger">
                        <FaExclamationCircle /> Notify Me
                      </div>
                      <div
                        className={`
                        ${darkMode ? `text-light` : `text-dark`}
                        bg-danger bg-opacity-25 p-1
                      `}
                      >
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
                    {showCart ? (
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
                        onClick={(event) => {
                          buyNowHandler(event);
                          router.push("/Cart");
                        }}
                      >
                        <div>Buy Now</div>
                      </Button>
                    ) : null}
                  </div>
                );
              }

              prevStat = product.StockStatus;
              return prevStat;
            });

            /* Page Work */
            setBrand(product.Brand);
            setUrlTitle(product.Url);

            /* Page Work */

            /* Methods */
            await getGallery(product.ManuUrl);
            getSimilarLinks(product.IsFeatured);
            getSpecification(ProductId);
            getReviews(ProductId, product.IsFeatured, 4);
            await getBundles(ProductId);
            await getAttributesValue(ProductId);
            getFreeStuff(ProductId);
            getLaptopGameData();
            getFPSData(product.IsFeatured);
            /* Methods */
          } else {
            router.push("/");
          }
        } else {
          router.push("/");
        }
        setInitInfo(true);
      };

      fetchData();
    } else {
      /* router.replace("/"); */
    }
  }, [ProductId]);

  const RenderHTML = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  const RenderHigh = (props: any) => {
    if (props.high)
      return props.high.split("|").map((highlight: any) => (
        <div className={`m-0 ${styles.MainHighlight}`} key={nanoid(10)}>
          <FaCheck className={`me-1 text-success`} />
          {highlight
            .replace(`<span style="font-bold:bold; font-size: 17px;">`, ``)
            .replace(`<span style="font-size: 17px;">`, ``)
            .replace(`<span style="font-size: 15px;">`, ``)
            .replace(`<span style="font-size:17px;">`, ``)
            .replace(`<span style="font-size:16px;font-weight:bold;">`, ``)
            .replace(`</span>`, ``)}
        </div>
      ));
    else return <Col></Col>;
  };

  const currencyFormat = (num: any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  /* Bundle Item Selection */
  const bundleItemsSeleceted = (bundleItem: any) => {
    setSelecetecBundleItems((prevBundleItems) => {
      let nBundleId = bundleItem.BundleId;
      prevBundleItems = _.filter(
        prevBundleItems,
        (item: any) => item.BundleId !== nBundleId
      );
      let selecetedBundles = [...prevBundleItems, bundleItem];
      let price = _.sumBy(selecetedBundles, function (o) {
        return o.Price;
      });
      let backpackPrice = 0;

      try {
        backpackPrice =
          selectedBackPack !== null && selectedBackPack.price !== undefined
            ? parseFloat(selectedBackPack.price)
            : 0;
      } catch (e) {}

      setTotalPrice(laptop.Price + price + backpackPrice);
      bundlesInfoRef.current = selecetedBundles;
      return selecetedBundles;
    });
  };

  const stripHtml = (str: any) => {
    return str.replace(/(<([^>]+)>)/gi, "");
  };

  const bundleOfficeSet = (bundleOffice: any) => {
    let selectedOffice = _.find(selectedBundleItems, (item: any) => {
      return item.BundleId === 1;
    });
    bundleOffice.Bundles.map((bundle: any) => {
      if (selectedOffice != null && selectedOffice !== undefined) {
        if (stripHtml(bundle.Title).trim() === selectedOffice.Title)
          bundle.isSelected = true;
        else bundle.isSelected = false;
      } else {
        if (bundle.IsDefault === 1) bundle.isSelected = true;
        else bundle.isSelected = false;
      }
    });

    setOfficeBundles((prevOffice: any) => {
      if (
        bundleOffice.Bundles !== null &&
        bundleOffice.Bundles !== undefined &&
        !_.isEqual(prevOffice, bundleOffice.Bundles)
      )
        prevOffice = bundleOffice.Bundles;

      return prevOffice;
    });
  };

  const backpackSelect = (backpack: any) => {
    let activeBack = _.find(backOption, (back: any) => {
      return back.isActive === 1;
    });
    let activeTitle = activeBack.title;
    let selectTitle = backpack.title;

    let backFree = freeStuff.map((free) => {
      if (free.des !== undefined && free.des.includes(activeTitle))
        free.des = free.des.replace(activeTitle, selectTitle);

      return free;
    });

    setFreeStuff((prevFreeStuff) => {
      if (backFree !== undefined) prevFreeStuff = backFree;
      return prevFreeStuff;
    });
    freeStuffInfoRef.current = backFree;
    /* update free stuf  backpack */

    backOption.map((option) => {
      option.isActive = 0;
    });

    backOption.map((option) => {
      if (option.id === backpack.id) option.isActive = 1;
    });

    setSelectedBackPack((prevBackPack: any) => {
      prevBackPack = backpack;
      return prevBackPack;
    });
    bundlesBackPackInfoRef.current = backpack;

    let price = _.sumBy(selectedBundleItems, function (o: any) {
      return o.Price;
    });
    let backpackPrice = 0;
    try {
      backpackPrice = parseFloat(backpack.price);
    } catch (e) {}
    setTotalPrice(laptop.Price + price + backpackPrice);

    setBackOption((prevBackPack) => {
      prevBackPack = backOption;
      return prevBackPack;
    });
  };

  {
    /* Pricing Section */
  }
  const Pricing = () => {
    return (
      <>
        {isLowStock ? (
          <div className="p-2 rounded fw-3 text-center bg-danger bg-opacity-10 text-danger mb-2">
            <FaExclamationCircle /> {lowStockText}
          </div>
        ) : null}

        {showPrice ? (
          <div
            className={`
              ${styles.MainPrices} 
              ${darkMode ? `text-light` : ``}
              text-right cols-2 cols-sm-3
            `}
          >
            <div>
              <div className="f-12">List Price</div>
              <div>
                <s> {currencyFormat(laptop.OldPrice)}</s>
              </div>
            </div>

            <div itemProp="offers" itemScope itemType="http://schema.org/Offer">
              <div className="f-12">Discounted Price</div>
              <div className={`${styles.NewPrice} fw-2`}>
                <FancyPrice
                  price={
                    laptop.Price +
                    (selectedBackPack !== null &&
                    selectedBackPack.price !== undefined
                      ? parseFloat(selectedBackPack.price)
                      : 0)
                  }
                />
                {/* {currencyFormat(
                  laptop.Price +
                    (selectedBackPack !== null &&
                    selectedBackPack.price !== undefined
                      ? parseFloat(selectedBackPack.price)
                      : 0)
                )} */}
              </div>
              <Text className="f-12 m-0">Save {laptop.per}%</Text>
              <span className="d-none" itemProp="price">
                {laptop.Price +
                  (selectedBackPack !== null &&
                  selectedBackPack.price !== undefined
                    ? selectedBackPack.price
                    : 0)}
              </span>
              <span
                itemProp="priceCurrency"
                content="ZAR"
                className="d-none"
              ></span>
            </div>
            <div>
              <div className="f-14">Our Price</div>
              <div>
                <p className="f-20 m-0 fw-3">
                  {currencyFormat(
                    Math.round(
                      ((laptop.Price +
                        (selectedBackPack !== null &&
                        selectedBackPack.price !== undefined
                          ? parseFloat(selectedBackPack.price)
                          : 0)) *
                        105) /
                        100
                    )
                  )}
                </p>
              </div>
            </div>
            <div className={`span-full span-sm-1`}>
              <div className="f-12 mt-1 fw-3">
                Note: price include 15% V.A.T
              </div>
              <Text className="f-12 opacity-50 m-0 lh-1">
                Discount only available when paying by Instant EFT or EFT *
              </Text>
            </div>
            <div className="f-12 text-danger">
              <span> {showQtyLimit && qtyLimit > 0 ? showMaxQtyMsg : ""}</span>
            </div>
          </div>
        ) : null}

        <div>
          <Row className={`mt-2`}>
            <Col>
              <Stack
                direction="horizontal"
                className={`
                  ${styles.MainQty} 
                  ${
                    qtyBuyLimitRef.current === 1 ||
                    qtyLimitRef === 1 ||
                    laptop.StockStatus.toLowerCase().includes("out of stock")
                      ? "d-none"
                      : ""
                  }
                  `}
                gap={2}
              >
                <div className={`fw-2`}>Qty:</div>
                <QtyBox
                  ref={qtyInputRef}
                  max={checkLimit(qtyLimitRef.current, qtyBuyLimitRef.current)}
                />
              </Stack>
            </Col>
            <Col className="d-inline-flex justify-content-center">
              {laptop.ShipCost === 0 && (
                <div
                  className={`
                  px-2 ms-auto d-flex align-items-center rounded text-light
                  ${styles.FreeDelivery}
                  ${backgrounds.BloodyMary}
                  ${backgrounds.Angle}
                `}
                >
                  <div className="fw-2">
                    <span className="lh-1">
                      <small>Free Delivery !</small>
                    </span>
                  </div>
                </div>
              )}
            </Col>
          </Row>
          <div
            className="text-center"
            itemProp="offers"
            itemScope
            itemType="http://schema.org/Offer"
          >
            <Badge
              bg={stockBg}
              className={`fs-6 my-2 rounded d-flex align-items-center justify-content-center ${styles.StockStatus}`}
              itemProp="availability"
              itemType={stockItemType}
            >
              <div className="fw-1">
                {stockText !== undefined && stockText !== ""
                  ? stockText
                  : stockStatus}
              </div>
            </Badge>
            <span className="d-none" itemProp="price">
              {laptop.Price +
                (selectedBackPack !== null &&
                selectedBackPack.price !== undefined
                  ? selectedBackPack.price
                  : 0)}
            </span>
            <span
              itemProp="priceCurrency"
              content="ZAR"
              className="d-none"
            ></span>
          </div>
          {cartElements}
          {itemInCart ? (
            <Button
              className="w-100 mt-2"
              variant="success"
              onClick={() => router.push("/Cart")}
            >
              Go To Cart <FaArrowRight />
            </Button>
          ) : null}
          <div className="text-center my-2">
            <Link
              href={specialLink(laptop.Brand.toLowerCase())}
              title={`${laptop.Brand} Laptops on Special`}
              className="text-decoration-none"
            >
              <Card className=" border-primary rounded border shadow-sm">
                <Card.Body>
                  <Image
                    src={`https://www.evetech.co.za/${laptop.BrandImage}`}
                    fluid
                    alt=""
                  />
                  <br></br>
                  <b>{}</b> Laptops on Special
                </Card.Body>
              </Card>
            </Link>
          </div>
        </div>
      </>
    );
  };

  // Title Section

  const TitleSection = () => {
    return (
      <div
        className={`
          ${styles.TitleSection}
          ${darkMode ? `text-light` : `text-dark`}
        `}
      >
        <span itemProp="name" className="d-none">
          {laptop.Name}
        </span>
        <h1
          className={`${styles.MainTitle} ${open ? "extend" : ""} mb-2`}
          itemProp="description"
        >
          <RenderHTML
            HTML={
              (darkMode
                ? laptop.Des.replaceAll(
                    `color:blue;`,
                    `color:#ffcb00;`
                  ).replaceAll(`color:green`, `color: ${highlightText}`)
                : laptop.Des) +
              " [" +
              laptop.Code +
              "] "
            }
          />
          {freeStuff.map((stuff) => {
            return darkMode ? (
              <RenderHTML
                HTML={
                  " / " +
                  (darkMode
                    ? stuff.des
                        .replaceAll(`color:blue;`, `color:${highlightText}`)
                        .replaceAll(`color:#ea0303;`, `color:${highlightText}`)
                        .replaceAll(`font-weight:bold;`, `font-weight:500;`)
                        .replaceAll(`font-weight: bold;`, `font-weight:500;`)
                    : stuff.des)
                }
                key={nanoid(5)}
              />
            ) : (
              <RenderHTML HTML={" / " + stuff.des} key={nanoid(5)} />
            );
          })}
          {laptop.ShipCost === 0 && (
            <span style={{ color: "red", fontWeight: "bold" }}>
              + FREE DELIVERY !
            </span>
          )}
        </h1>
        <Stack direction="horizontal" gap={2}>
          <Badge
            className={`btn ${styles.TitleBtn}`}
            aria-expanded={open === true ? "true" : "false"}
            onClick={() => setOpen(!open)}
          >
            <div className={`fw-2`}>
              {open === true ? "Less Info" : "More Info"}
            </div>
          </Badge>
        </Stack>
      </div>
    );
  };

  /* Bundle Item Selection */

  const specialLink = (brand: any) => {
    switch (brand) {
      case "lenovo":
        return "/lenovo-laptops-on-special/l/262.aspx";
      case "hp":
        return "/hp-laptops-on-special/l/492.aspx";
      case "dell":
        return "/dell-laptops-on-special/l/339.aspx";
      case "asus":
        return "/asus-laptops-on-special/l/261.aspx";
      case "msi":
        return "/msi-laptops-on-special/l/35.aspx";
      default:
        return "/laptop-specials-for-sale-south-africa.aspx/";
    }
  };

  useEffect(() => {
    if (laptop.Name !== undefined && laptop.Name) {
      // "MPN"?

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.innerHTML = `{"
        @context":"http://schema.org",
        "@type":"Product",
        "name":"${laptop.Url}",
        "sku":"${laptop.Code.replace(/ /g, "-").slice(0, 50)}",
        "mpn":"${laptop.Code}", 
        "image":"https://www.evetech.co.za/${laptop.ImageUrl}",
        "brand":"${laptop.Brand.length > 0 ? laptop.Brand : "Evetech"}",
        "description":"${laptop.Name.slice(0, 5000)}",
        "category": "${laptop.Category}",
        "offers":{
            "@type":"Offer",
            "url":"https://www.evetech.co.za/${_.replace(
              _.toLower(laptop.Url),
              new RegExp(" ", "g"),
              "-"
            ).trim()}/laptops-for-sale/${laptop.NPID}.aspx",
            "price":"${
              laptop.Price +
              (selectedBackPack !== null && selectedBackPack.price !== undefined
                ? selectedBackPack.price
                : 0)
            }",
            "priceCurrency":"ZAR",
            "priceValidUntil":"${moment().endOf("month").format("YYYY-MM-DD")}",
            "availability":"${stockItemType}",
            "availableDeliveryMethod":"FreightDelivery",
            "acceptedPaymentMethod":"CreditCardOrPaymentCard",
            "priceSpecification":{
              "@type":"PriceSpecification",
              "price":"${
                laptop.Price +
                (selectedBackPack !== null &&
                selectedBackPack.price !== undefined
                  ? selectedBackPack.price
                  : 0)
              }"
            ,"priceCurrency":"ZAR"
            }
          }
      }`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, [laptop]);

  return (
    <>
      {laptop !== undefined ? (
        <Head>
          <title itemProp="name" lang="en">
            {laptop.BrowserTitle}
          </title>
          <meta name="description" content={laptop.MetaDes}></meta>
          <meta property="og:locale" content="en_US"></meta>
          <meta property="og:type" content="product"></meta>
          <meta property="og:title" content={laptop.BrowserTitle}></meta>
          <meta property="og:description" content={laptop.MetaDes}></meta>
          <meta
            property="og:url"
            content={`https://www.evetech.co.za/${_.replace(
              _.toLower(laptop.Url),
              new RegExp(" ", "g"),
              "-"
            ).trim()}/laptops-for-sale/${laptop.NPID}.aspx`}
          ></meta>
          <meta property="og:site_name" content="Evetech"></meta>
          <meta
            property="article:modified_time"
            content={laptop.AddedDate}
          ></meta>
          <meta property="og:image" content={laptop.ManuUrl}></meta>
          <meta property="og:image:width" content="600"></meta>
          <meta property="og:image:height" content="400"></meta>
          <meta property="og:image:type" content="image/jpeg"></meta>
          <meta property="twitter:label1" content="Price"></meta>
          <meta
            property="twitter:data1"
            content={`${currencyFormat(totalPrice)} inc. VAT`}
          ></meta>
          <meta property="twitter:label2" content="Availibility"></meta>
          <meta property="twitter:data2" content={laptop.StockStatus}></meta>
          <meta property="product:brand" content={laptop.Brand}></meta>
          <meta
            property="product:price:amount"
            content={currencyFormat(totalPrice).replace("R ", "")}
          ></meta>
          <meta property="product:price:currency" content="ZAR"></meta>
          <meta property="og:availability" content={stockItemType}></meta>
          <meta property="product:availability" content={stockItemType}></meta>
          {/* <meta property="product:retailer_item_id:" content=""></meta> */}
          <meta property="product:condition" content="new"></meta>
        </Head>
      ) : null}

      {/* Start of global snippet: Please do not remove Place this snippet between the <head> and </head> tags on every page of your site. */}
      {laptop.Des !== undefined &&
        (_.toLower(laptop.Des).includes("12th") ||
          _.toLower(laptop.Des).includes("gen") ||
          _.toLower(laptop.Des).includes("intel")) && (
          <Helmet>
            <Script
              async
              src="https://www.googletagmanager.com/gtag/js?id=DC-11673132"
            />
            <Script id="gtag-script">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());

                gtag('config', 'DC-11673132');
              `}
            </Script>
          </Helmet>
        )}
      {/* End of global snippet: Please do not remove */}

      {/* Enable Lenovo Analytics */}
      {/* Start of global snippet: Please do not remove. Place this snippet between the <head> and </head> tags on every page of your site. */}
      {laptop.BrandID !== undefined && laptop.BrandID === 8 && (
        <Helmet>
          {/* Global site tag (gtag.js) - Google Marketing Platform */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=DC-9265286"
          />
          <Script id="gtag-script">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag() { dataLayer.push(arguments); }
              gtag('js', new Date());

              gtag('config', 'DC-9265286');
              `}
          </Script>
          {/* End of global snippet: Please do not remove */}

          {/* Google Tag Manager */}
          <Script id="gtm-script">{`(function (w, d, s, l, i) {
            w[l] = w[l] || []; w[l].push({
              'gtm.start':
                new Date().getTime(), event: 'gtm.js'
            }); var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', 'GTM-WHB9DTG');`}</Script>
          {/* End Google Tag Manager */}

          {/* Meta Pixel Code */}
          <Script id="fb-script">
            {`
              !function (f, b, e, v, n, t, s) {
                if (f.fbq) return; n = f.fbq = function () {
                  n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                n.queue = []; t = b.createElement(e); t.async = !0;
                t.src = v; s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s)
              }(window, document, 'script',
                'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '254663386841842');
              fbq('track', 'PageView');
              `}
          </Script>
          <noscript>
            {`
              <img height="1" width="1" alt='' style="display:none"
              src="https://www.facebook.com/tr?id=254663386841842&ev=PageView&noscript=1"
              />`}
          </noscript>
          {/* End Meta Pixel Code */}
        </Helmet>
      )}

      {/* Enable HP Analytics */}
      {laptop.BrandID !== undefined && laptop.BrandID === 7 && (
        <Helmet>
          {/* Global site tag (gtag.js) - Google Ads: 436268681 */}
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=AW-436268681"
          />
          <Script id="hp-analytics">
            {` 
              window.dataLayer = window.dataLayer || []; function gtag() { dataLayer.push(arguments); } gtag('js', new Date()); gtag('config', 'AW-436268681');
              `}
          </Script>
        </Helmet>
      )}

      <LaptopHeader />
      <div className={`${darkMode ? `evetechDark` : ``}`}>
        <BreadCrumbs
          PageCrumbs={PageCrumbs}
          ProductId={ProductId}
          hideMobile={true}
          className={`${darkMode ? `bg-dark` : ``}`}
        />
        <Container
          fluid
          itemType="https://schema.org/Product"
          className={`
          position-relative z-index-1
          ${darkMode ? `bg-dark` : ``}
        `}
        >
          <section className="d-none">
            <span itemProp="brand">
              {laptop !== undefined ? laptop.Brand : null}
            </span>
            <Image
              src={`https://www.evetech.co.za/${
                laptop !== undefined ? laptop.ImageUrl : null
              }`}
              alt={laptop !== undefined ? laptop.Name : ""}
              itemProp="image"
            />
            <span itemProp="name">
              {laptop !== undefined ? laptop.Name : null}
            </span>
            <span itemProp="description">
              {laptop !== undefined ? laptop.MetaDes : null}
            </span>
          </section>
          <div className="wrapper p-2">
            <Row className="pb-3">
              <Col lg={10}>
                {!initInfo && <CustomeSpinner variant="info" />}
                {initInfo && (
                  <Row>
                    <Col
                      lg={12}
                      xl={7}
                      className={`pt-2 pb-2 ${styles.MainGalParent} position-relative`}
                    >
                      <div
                        className={`${styles.MainGallery} position-relative`}
                      >
                        {!initGallery && <CustomeSpinner variant="primary" />}
                        {initGallery && (
                          <FeatureGallery2
                            GalleryData={galleryData}
                            showGalleryModal={(val: any) => {
                              setModalGalleryShow(val);
                            }}
                          />
                        )}
                        <ModalGallery
                          show={modalGalleryShow}
                          onHide={() => setModalGalleryShow(false)}
                          product={{
                            name: laptop.Name,
                            type: 3,
                          }}
                          gallerydata={galleryData}
                        />
                        {showSoldOut ? (
                          <div className="position-absolute top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light bg-opacity-50">
                            <Image
                              src="https://www.evetech.co.za/assets/images/sold-out-600px-v1.png"
                              alt=""
                            />
                          </div>
                        ) : null}

                        <div className="position-absolute d-grid cols-12 gap-2 justify-content-between pe-none w-100 top-0 start-0">
                          <div className="d-none d-sm-block span-sm-2"></div>
                          <div className="span-full span-sm-10 d-flex justify-content-between position-relative z-index-1">
                            <div className="d-grid gap-1">
                              {helperCtx.dealTags !== undefined &&
                                helperCtx.dealTags.length > 0 &&
                                isOnSpecial && (
                                  <SpecialTag type={"On Special"} />
                                )}
                              {(helperCtx.dealTags === undefined ||
                                _.isEmpty(helperCtx.dealTags) ||
                                (helperCtx.dealTags !== undefined &&
                                  helperCtx.dealTags.length === 0)) &&
                              isOnSpecial ? (
                                <Badge bg="danger">
                                  <span className="fw-2">On Special</span>
                                </Badge>
                              ) : null}

                              {helperCtx.dealTags !== undefined &&
                                helperCtx.dealTags.length > 0 &&
                                isOnClearance &&
                                helperCtx.showClearance && (
                                  <SpecialTag type={"Clearance Sale"} />
                                )}
                              {/* <div className="showClearance position-absolute top-0">
                              {helperCtx.showClearance}
                            </div> */}
                              {(helperCtx.dealTags === undefined ||
                                _.isEmpty(helperCtx.dealTags) ||
                                (helperCtx.dealTags !== undefined &&
                                  helperCtx.dealTags.length === 0)) &&
                              isOnClearance &&
                              helperCtx.showClearance ? (
                                <Badge bg="warning">
                                  <span className="fw-2 text-dark">
                                    Clearance
                                  </span>
                                </Badge>
                              ) : null}
                            </div>
                            <div className="d-grid gap-1 align-items-baseline">
                              {helperCtx.dealTags !== undefined &&
                                helperCtx.dealTags.length > 0 &&
                                helperCtx.showDealIcon &&
                                isOnDeal && (
                                  <SpecialTag type={helperCtx.dealText} />
                                )}
                              {(helperCtx.dealTags === undefined ||
                                _.isEmpty(helperCtx.dealTags) ||
                                (helperCtx.dealTags !== undefined &&
                                  helperCtx.dealTags.length === 0)) &&
                              helperCtx.showDealIcon &&
                              isOnDeal ? (
                                <Badge bg="primary">
                                  <span className="fw-2 text-light">
                                    {helperCtx.dealText}
                                  </span>
                                </Badge>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
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
                              onClick={() => AddToWishList(laptop)}
                              style={{ marginTop: `0.45rem` }}
                              variant={darkMode ? `dark` : `light`}
                              className="shadow rounded-circle p-2 px-2 border-secondary pe-auto border-2 border-opacity-50"
                            >
                              <RiHeartAddLine className="d-flex align-items-center justify-content-center" />
                            </Button>
                          </span>

                          <ShareLink
                            class={`position-relative`}
                            style={{ marginTop: `0.45rem` }}
                            btn={{
                              icon: (
                                <FaShareAlt className="d-flex align-items-center justify-content-center" />
                              ),
                              size: ``,
                              variant: `${darkMode ? `dark` : `light`}`,
                              // click: toggleContainerOnTop,
                              class: `
                            border-secondary border-opacity-50 mt-auto rounded-pill d-flex gap-1 justify-content-center align-items-center lh-1 pe-auto mb-5 mb-sm-3 p-2
                          `,
                            }}
                            // direction={`left`}
                            currentURL={`/${_.replace(
                              _.toLower(laptop.Url),
                              new RegExp(" ", "g"),
                              "-"
                            ).trim()}/laptops-for-sale/${laptop.NPID}.aspx`}
                            textToShare={laptop.MetaDes}
                            title={laptop.BrowserTitle}
                            description={laptop.MetaDes}
                            favicon={`https://www.evetech.co.za/icons/ms-icon-144x144.png`}
                          />
                        </div>
                      </div>
                      {/* <Image className="hidden" src={laptop.manuurl}></Image> */}
                    </Col>
                    {!isLG ? (
                      <>
                        <TitleSection />
                        {!initLink && <CustomeSpinner variant="warning" />}
                        {initLink && (
                          <LaptopLinks
                            links={similarLinks}
                            brand={brand}
                            ProductId={ProductId}
                            UrlTitle={urlTitle}
                          />
                        )}
                      </>
                    ) : null}
                    <Col xl={5} className={`pt-2 pb-2 ${styles.MainInfo}`}>
                      {isLG ? <TitleSection /> : null}
                      <Row className="mt-2">
                        <Col md={8} xs={12}>
                          <p
                            className={`p-0 m-0 ${styles.LaptopSlogan} text-success`}
                          >
                            {laptop.SKU}
                          </p>
                          <p
                            className={`p-0 m-0 ${styles.ReviewSlogan}`}
                            onClick={() => setWriteReviewShow(true)}
                          >
                            Be the first to review this product...
                          </p>
                        </Col>
                        <Col
                          md={4}
                          xs={12}
                          className="d-flex gap-1 justify-content-end"
                        >
                          {initFPSData &&
                            fpsData !== null &&
                            fpsData !== undefined &&
                            fpsData.isDisplay !== undefined &&
                            fpsData.isDisplay === 1 && (
                              <FPSModal FPSData={fpsData} GameData={gameData} />
                            )}
                        </Col>
                      </Row>
                      <hr></hr>
                      <Row
                        className={`
                        ${darkMode ? `text-light` : `text-dark`}
                        text-right p-0
                      `}
                      >
                        <span className={`${styles.LaptopCode}`}>
                          Modal No :{" "}
                          <b>{laptop.BrandSeries + ` ` + laptop.Code}</b>
                        </span>
                      </Row>
                      <Row
                        className={`
                        ${darkMode ? `text-light` : `text-dark`}
                      `}
                      >
                        <RenderHigh high={laptop.high} />
                      </Row>
                      <div
                        className={`d-grid cols-1 cols-sm-2 gap-2 mt-xl-2 ${styles.ActionButtons}`}
                      >
                        <span className="d-grid cols-3 gap-2 w-100">
                          {/* {showWishlist ? (
                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip id={`tooltip-addToWishList`}>
                                Add to wishlist
                              </Tooltip>
                            }
                          >
                            <Button
                              className={`
                                btn w-100 bg-gradient
                                ${
                                  darkMode
                                    ? `btn-dark border-secondary`
                                    : `btn-light border-dark`
                                }
                              `}
                              onClick={() => {
                                AddToWishList(laptop);
                              }}
                              title="Add to wishlist"
                            >
                              <FcLike />
                            </Button>
                          </OverlayTrigger>
                        ) : null} */}

                          {showAskQuestion ? (
                            <>
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip id={`tooltip-addToWishList`}>
                                    Ask a question
                                  </Tooltip>
                                }
                              >
                                <Button
                                  className={`
                                  btn w-100 bg-gradient
                                  ${
                                    darkMode
                                      ? `btn-dark border-secondary`
                                      : `btn-light border-dark`
                                  }
                                `}
                                  onClick={() => setAskQuestionShow(true)}
                                  title="Ask a question"
                                >
                                  <FaQuestion />
                                </Button>
                              </OverlayTrigger>

                              <AskQuestion
                                show={askQuestionShow}
                                onHide={() => setAskQuestionShow(false)}
                                product={{
                                  pid: laptop.NPID,
                                  name: laptop.Name,
                                  url: `https://www.evetech.co.za/${_.replace(
                                    _.toLower(laptop.Url),
                                    new RegExp(" ", "g"),
                                    "-"
                                  ).trim()}/laptops-for-sale/${
                                    laptop.NPID
                                  }.aspx`,
                                  price: laptop.Price,
                                  ptype: 3,
                                  page: "laptop",
                                }}
                              />
                            </>
                          ) : null}

                          {/* {showTellFriend ? (
                          <>
                            <OverlayTrigger
                              delay={{ show: 250, hide: 250 }}
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-addToWishList`}>
                                  Tell a friend
                                </Tooltip>
                              }
                            >
                              <Button
                                className={`
                                  btn w-100 bg-gradient
                                  ${
                                    darkMode
                                      ? `btn-dark border-secondary`
                                      : `btn-light border-dark`
                                  }
                                `}
                                onClick={() => setTellFriendShow(true)}
                                title="Tell a friend"
                              >
                                <FcShare />
                              </Button>
                            </OverlayTrigger>

                            <TellFriend
                              show={tellFriendShow}
                              onHide={() => setTellFriendShow(false)}
                              productid={laptop.NPID}
                              producttitle={laptop.Des}
                              productprice={laptop.Price}
                              producturl={`https://www.evetech.co.za/${_.replace(
                                _.toLower(laptop.Url),
                                new RegExp(" ", "g"),
                                "-"
                              ).trim()}/laptops-for-sale/${laptop.NPID}.aspx`}
                            />
                          </>
                        ) : null} */}

                          {showPriceMatch ? (
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-addToWishList`}>
                                  Price match
                                </Tooltip>
                              }
                            >
                              <Button
                                className={`
                                btn w-100 bg-gradient
                                ${
                                  darkMode
                                    ? `btn-dark border-secondary`
                                    : `btn-light border-dark`
                                }
                              `}
                                onClick={() => setPriceMatchShow(true)}
                                title="Price Match"
                              >
                                <FcCurrencyExchange />
                              </Button>
                            </OverlayTrigger>
                          ) : null}

                          {laptop !== null &&
                            laptop !== undefined &&
                            showPriceMatch && (
                              <PriceMatch
                                show={priceMatchShow}
                                onHide={() => setPriceMatchShow(false)}
                                productid={laptop.NPID}
                                producttitle={laptop.Des}
                                productprice={laptop.Price}
                                productmodalno={laptop.ModalNo}
                                producttype="3"
                                producturl={`https://www.evetech.co.za/${_.replace(
                                  _.toLower(laptop.Url),
                                  new RegExp(" ", "g"),
                                  "-"
                                ).trim()}/laptops-for-sale/${laptop.NPID}.aspx`}
                              />
                            )}

                          {showWriteReview ? (
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id={`tooltip-addToWishList`}>
                                  Write a review
                                </Tooltip>
                              }
                            >
                              <Button
                                className={`
                                btn w-100 bg-gradient
                                ${
                                  darkMode
                                    ? `btn-dark border-secondary`
                                    : `btn-light border-dark`
                                }
                              `}
                                title="Write a Review"
                                onClick={() => setWriteReviewShow(true)}
                              >
                                <FcApproval />
                              </Button>
                            </OverlayTrigger>
                          ) : null}

                          {laptop !== null &&
                            laptop !== undefined &&
                            showWriteReview && (
                              <WriteReview
                                show={writeReviewShow}
                                onHide={() => setWriteReviewShow(false)}
                                productid={laptop.NPID}
                                producttitle={laptop.Des}
                                productprice={laptop.Price}
                                productmodalno={laptop.ModalNo}
                                producttype="3"
                                producturl={`https://www.evetech.co.za/${_.replace(
                                  _.toLower(laptop.Url),
                                  new RegExp(" ", "g"),
                                  "-"
                                ).trim()}/laptops-for-sale/${laptop.NPID}.aspx`}
                              />
                            )}
                        </span>

                        <span
                          className={`${
                            backOption.length === 0 || officeBudles.length === 0
                              ? "cols-1"
                              : "cols-2"
                          } d-grid cols-2 gap-2 w-100`}
                        >
                          {helperCtx.showBackPack && backOption.length > 0 && (
                            <BackpackUpgrades
                              BackpackBundles={backOption}
                              onBackpackSelect={backpackSelect}
                              SelectedBackPack={selectedBackPack}
                              items={backOption.length}
                            />
                          )}

                          {helperCtx.officeEnable &&
                            officeBudles.length > 0 && (
                              <OfficeUpgrades
                                OffceBundles={officeBudles}
                                onBundleSelection={bundleItemsSeleceted}
                                selecetedItems={selectedBundleItems}
                                items={officeBudles.length}
                              />
                            )}
                        </span>
                      </div>

                      {/* Palladium Control */}
                      {authCtx.isLoggedIn &&
                      authCtx.isAdmin &&
                      laptop !== undefined &&
                      laptop.WebID !== undefined &&
                      laptop.WebID > 0 ? (
                        <PalladiumTable
                          webId={laptop.WebID}
                          cPrice={laptop.Price}
                        />
                      ) : null}
                    </Col>
                    {initInfo && !isLG ? (
                      <>
                        <Pricing />
                      </>
                    ) : null}
                  </Row>
                )}
                <Row>
                  {/* Product Information Tabs */}
                  <Col lg={12} className="mt-3 mt-lg-0">
                    <Tabs
                      defaultActiveKey="description"
                      id="justify-tab-example"
                      className={`
                      ${styles.Tabs} 
                      ${darkMode ? styles.darkMode : ``}
                      mb-3
                    `}
                      justify
                    >
                      <Tab
                        eventKey="description"
                        title="Description"
                        className={`
                        ${styles.Tab}
                        ${darkMode ? `text-light` : ``}
                      `}
                      >
                        <div className="container-fluid overflow-hidden">
                          {/* Free Stuff Banner */}
                          <div
                            className={`d-md-flex gap-md-3 mt-md-3 justify-content-center`}
                          >
                            {freeStuff.map((stuff: any) => {
                              let link = 0;
                              if (stuff.imageurl.trim().length > 0) {
                                return (
                                  <div key={nanoid(7)}>
                                    {!isNaN(stuff.islink) &&
                                    parseInt(stuff.islink) === 1 ? (
                                      <Link
                                        href={stuff.link}
                                        title={stuff.title}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        <Image
                                          src={stuff.imageurl}
                                          title={stuff.title}
                                          alt={stuff.title}
                                          className="rounded img-fluid"
                                        ></Image>
                                      </Link>
                                    ) : (
                                      <Image
                                        src={stuff.imageurl}
                                        title={stuff.title}
                                        alt={stuff.title}
                                        className="rounded img-fluid"
                                      ></Image>
                                    )}
                                  </div>
                                );
                              }
                            })}
                          </div>
                          {initFPSData &&
                            fpsData !== null &&
                            fpsData !== undefined &&
                            fpsData.isDisplay !== undefined &&
                            fpsData.isDisplay === 1 && (
                              <FPSDescribe
                                FPSData={fpsData}
                                GameData={gameData}
                              />
                            )}
                          <div>
                            {overviewBrand !== undefined && overviewBrand}
                          </div>

                          {laptop !== undefined &&
                          laptop.H1 !== undefined &&
                          laptop.H1.length > 0 ? (
                            <h1
                              className="text-center pt-5"
                              style={{ fontSize: "x-large" }}
                            >
                              {laptop.H1.replace("@@@@END@@@@", "")}
                            </h1>
                          ) : null}

                          <div className={`${darkMode ? `text-light` : ``}`}>
                            <RenderHTML
                              HTML={
                                laptop !== undefined
                                  ? laptop.DynamicOverview !== undefined &&
                                    laptop.DynamicOverview !== null
                                    ? laptop.DynamicOverview.replace(
                                        "@@@@@",
                                        laptop.H1
                                      ).replace("@@@@END@@@@", "")
                                    : laptop.DynamicOverview
                                  : null
                              }
                            />
                          </div>

                          {overviewType === 3 &&
                            laptop &&
                            laptop.Brand &&
                            (laptop.PalladiumPartno !== undefined
                              ? laptop.PalladiumPartno.replace("-SN", "")
                              : laptop.PalladiumPartno) && (
                              <Helmet>
                                <script type="text/javascript">
                                  {cnetScript
                                    .replace("###BRAND###", laptop.Brand)
                                    .replace(
                                      "###MPN###",
                                      (laptop.PalladiumPartno !== undefined
                                        ? laptop.PalladiumPartno.replace(
                                            "-SN",
                                            ""
                                          )
                                        : laptop.PalladiumPartno
                                      ).replace("-SN", "")
                                    )
                                    .replace("###EAN###", "")}
                                </script>
                              </Helmet>
                              /* <ScriptInjector
                            HTML={cnetScript}
                            MPN={
                              laptop.PalladiumPartno !== undefined
                                ? laptop.PalladiumPartno.replace("-SN", "")
                                : laptop.PalladiumPartno
                            }
                            Brand={laptop.Brand}
                            EAN={""}
                            scriptFlag={cnetFlag}
                            onScriptChange={onCnetScriptSet}
                          /> */
                            )}

                          {helperCtx.flixMediaEnable &&
                            laptop &&
                            laptop.Brand &&
                            (laptop.PalladiumPartno !== undefined
                              ? laptop.PalladiumPartno.replace("-SN", "")
                              : laptop.PalladiumPartno) && (
                              <Helmet>
                                <Script type="text/javascript" id="flix-script">
                                  {flixScript
                                    .replace("###BRAND###", laptop.Brand)
                                    .replace(
                                      "###MPN###",
                                      (laptop.PalladiumPartno !== undefined
                                        ? laptop.PalladiumPartno.replace(
                                            "-SN",
                                            ""
                                          )
                                        : laptop.PalladiumPartno
                                      ).replace("-SN", "")
                                    )
                                    .replace("###EAN###", "")}
                                </Script>
                              </Helmet>
                              /* <ScriptInjector
                            HTML={flixScript}
                            MPN={
                              laptop.PalladiumPartno !== undefined
                                ? laptop.PalladiumPartno.replace("-SN", "")
                                : laptop.PalladiumPartno
                            }
                            Brand={laptop.Brand}
                            EAN={""}
                            scriptFlag={flixFlag}
                            onScriptChange={onFlixScriptSet}
                          /> */
                            )}

                          <div id="ccs-inline-content"></div>
                          <div id="flix-in" className="container">
                            <div id="flix-inpage"></div>
                          </div>
                          <div
                            className={`d-grid gap-3 cols-2 cols-md-3 cols-xl-4 mt-4 App`}
                          >
                            {galleryData.map((img: any) => {
                              return (
                                <OverviewGallery
                                  Image={img.original}
                                  key={nanoid(8)}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </Tab>
                      <Tab
                        eventKey="specification"
                        title="Specification"
                        className={`${styles.Tab}`}
                      >
                        <div className="container-fluid overflow-hidden">
                          <LaptopSpec Specs={specification} />
                        </div>
                      </Tab>
                      <Tab
                        eventKey="essential-extras"
                        title="Essential Extras"
                        className={`${styles.Tab}`}
                      >
                        <Row className="pe-1 ps-1">
                          <Col className={`text-left ${styles.ExtrasSlogan}`}>
                            <Heading level={3} className="pe-1 ps-1 fs-5">
                              Buy these items together and save even more!
                            </Heading>
                          </Col>
                          <Col className="text-right">
                            <div
                              className={`
                              ${darkMode ? `text-light` : `text-dark`}
                              pe-1 ps-1 fs-6 d-flex justify-content-end gap-2
                            `}
                            >
                              <span>Current Price:</span>
                              <span>
                                <FancyPrice
                                  price={totalPrice}
                                  className={`fs-6`}
                                />
                              </span>
                            </div>
                          </Col>
                        </Row>

                        <LaptopBundles
                          ProductId={ProductId}
                          Bundles={bundles}
                          onBundleItemsSeleceted={bundleItemsSeleceted}
                          selecetedItems={selectedBundleItems}
                          onOfficeBundleSet={bundleOfficeSet}
                        />
                      </Tab>
                      <Tab
                        eventKey="reviews"
                        title="Reviews"
                        className={`${styles.Tab}`}
                      >
                        <LaptopReviews
                          ProductId={ProductId}
                          Reviews={reviews}
                          Heading={`Customer Reviews of the ${laptop.Brand} ${laptop.Code}`}
                        />
                      </Tab>
                      {fpsData !== null &&
                        fpsData !== undefined &&
                        fpsData.isDisplay !== undefined &&
                        fpsData.isDisplay === 1 && (
                          <Tab
                            eventKey="fps"
                            title="FPS"
                            className={`${styles.Tab}`}
                          >
                            <FPSTab FPSData={fpsData} GameData={gameData} />
                          </Tab>
                        )}
                    </Tabs>
                  </Col>
                  {/* Product Information Tabs */}
                  {!isLG ? <LaptopDetailBanners /> : null}
                </Row>
              </Col>
              <Col lg={2} className={`pt-2 pb-2`}>
                {!initInfo && <CustomeSpinner variant="info" />}
                {initInfo && isLG ? (
                  <>
                    <Pricing />
                    <div className="pt-2">
                      {!initLink && <CustomeSpinner variant="warning" />}
                      {initLink && (
                        <LaptopLinks
                          links={similarLinks}
                          brand={brand}
                          ProductId={ProductId}
                          UrlTitle={urlTitle}
                        />
                      )}
                    </div>
                    <LaptopDetailBanners />
                  </>
                ) : null}
              </Col>
            </Row>
          </div>

          {/* Page Level Analytics Scritps */}
          {laptop.BrandID !== undefined && laptop.BrandID === 8 && (
            <>
              <Helmet>
                <script>
                  {`
            !function (f, b, e, v, n, t, s) {
                if (f.fbq) return; n = f.fbq = function () {
                    n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
                if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                n.queue = []; t = b.createElement(e); t.async = !0;
                t.src = v; s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s)
            }(window, document, 'script',
                'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '254663386841842');
            fbq('track', 'ViewContent');
          `}
                </script>
                <noscript>
                  {`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=254663386841842&ev=PageView&noscript=1"/>`}
                </noscript>
                <script>{`
             
              !function (f, b, e, v, n, t, s) {
                if (f.fbq) return; n = f.fbq = function () {
                    n.callMethod ?
                        n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                };
          
                if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
          
                n.queue = []; t = b.createElement(e); t.async = !0;
          
                t.src = v; s = b.getElementsByTagName(e)[0];
          
                s.parentNode.insertBefore(t, s)
            }(window, document, 'script',
                'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '3178547808922326');
            fbq('track', 'PageView');
            
          `}</script>
                <noscript>{`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=3178547808922326&ev=PageView&noscript=1" />`}</noscript>

                {/* Event snippet for LENOVO_LEGION_FL on https://www.evetech.co.za/Search.aspx?s=legion&cid=za:display:yx7o9p: Please do not remove. Place this snippet on pages with events you’re tracking. 
		      Creation date: 06/09/2020 */}
                <script>{`
         
            window.dataLayer = window.dataLayer || [];
            function gtag() { dataLayer.push(arguments); }
            gtag('event', 'conversion', {
                'allow_custom_scripts': true,
                'send_to': 'DC-9265286/purch0/lenov000+standard'
            });
         
        `}</script>
                <noscript>{`
          <img src="https://ad.doubleclick.net/ddm/activity/src=9265286;type=purch0;cat=lenov000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;ord=[Random Number]?" width="1" height="1" alt=""/>
        `}</noscript>

                {/* Event snippet for Evetech_Lenovo_Audience on https://www.evetech.co.za/: Please do not remove.
          Place this snippet on pages with events you’re tracking.  Creation date: 02/25/2021 */}
                <script>{`
          var currentUrl = window.location.href;

          gtag('event', 'conversion', {
              'allow_custom_scripts': true,
              'u1': '' + currentUrl + '',
              'send_to': 'DC-9265286/audie0/evete0+standard'
          });
          
          $("#lenovoImgTag").attr("src", "https://ad.doubleclick.net/ddm/activity/src=9265286;type=audie0;cat=evete0;u1=${window.location.href};dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=1?");
        `}</script>
                <noscript>{`
          <img src="https://ad.doubleclick.net/ddm/activity/src=9265286;type=audie0;cat=evete0;u1=${window.location.href};dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=1?" id="lenovoImgTag" width="1" height="1" alt=""/>
        `}</noscript>

                <noscript>{`
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WHB9DTG" height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `}</noscript>
              </Helmet>
            </>
          )}

          {laptop.BrandID !== undefined && laptop.BrandID === 7 && (
            <Helmet>
              <script>{`
            gtag('event', 'conversion',
            {
                'send_to': 'AW-436268681/fPKZCNiMjPQBEIndg9AB'
            }); 
          `}</script>
            </Helmet>
          )}

          {laptop.Des !== undefined &&
            (_.toLower(laptop.Des).includes("12th") ||
              _.toLower(laptop.Des).includes("gen") ||
              _.toLower(laptop.Des).includes("intel")) && (
              <Helmet>
                {/* Start of Floodlight Tag: Please do not remove Activity name of this tag: EMEA_SouthAfrica_ZA_Alderlake_Evetech Add to Cart
            URL of the webpage where the tag is expected to be placed: https://www.evetech.co.za/ This tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.
            Creation Date: 05/13/2022 */}
                {/*  <script>{`
              var axel = Math.random() +"";
              var a = axel * 10000000000000;
              document.write('<img src="https://ad.doubleclick.net/ddm/activity/src=9064218;type=za_eve;cat=emea_00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=' + a + '?" width="1" height="1" alt=""/>');
            `}</script>
            <noscript>{`
              <img src="https://ad.doubleclick.net/ddm/activity/src=9064218;type=za_eve;cat=emea_00;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=1?" width="1" height="1" alt=""/>
            `}</noscript>
 */}
                {/* Start of Floodlight Tag: Please do not remove Activity name of this tag: EMEA_SouthAfrica_ZA_Alderlake_Evetech Buy Now URL of the webpage where the tag is expected to be placed: This tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.
              Creation Date: 05/13/2022 */}
                {/* <script>{`
              var axel = Math.random() +"";
              var a = axel * 10000000000000;
              document.write('<img src="https://ad.doubleclick.net/ddm/activity/src=9064218;type=za_eve;cat=emea_000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=' + a + '?" width="1" height="1" alt=""/>');
            `}</script>
            <noscript>{`
              <img src="https://ad.doubleclick.net/ddm/activity/src=9064218;type=za_eve;cat=emea_000;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=1?" width="1" height="1" alt=""/>
            `}</noscript> */}

                {/* Start of Floodlight Tag: Please do not remove Activity name of this tag: EMEA_SouthAfrica_ZA_Alderlake_Evetech Price Match URL of the webpage where the tag is expected to be placed: This tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.
              Creation Date: 05/13/2022 */}
                {/* <script>{`
              var axel = Math.random() +"";
              var a = axel * 10000000000000;
              document.write('<img src="https://ad.doubleclick.net/ddm/activity/src=9064218;type=za_eve;cat=emea_001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=' + a + '?" width="1" height="1" alt=""/>');
            `}</script>
            <noscript>{`
              <img src="https://ad.doubleclick.net/ddm/activity/src=9064218;type=za_eve;cat=emea_001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=;npa=;gdpr=;gdpr_consent=;ord=1?" width="1" height="1" alt=""/>
            `}</noscript> */}
              </Helmet>
            )}

          {/* Page Level Analytics Scritps */}
        </Container>
        <ProductFooter
          showbuynow={showBuyNow}
          showaddcart={showCart}
          showdiscountedprice={showPrice}
          product={laptop}
          stockstatus={stockStatus}
          Ptype={3}
          TotalPrice={totalPrice}
          onAddToCart={addToCartHandler}
          onOpenNotify={() => setModalNotifyShow(true)}
          showNotify={showNotify}
        />

        <NotifyMe
          show={modalNotifyShow}
          onHide={() => setModalNotifyShow(false)}
          productid={laptop.NPID}
          producttitle={laptop.Name}
          productprice={laptop.Price}
          producturl={`https://www.evetech.co.za/${_.replace(
            _.toLower(laptop.Url),
            new RegExp(" ", "g"),
            "-"
          ).trim()}/laptops-for-sale/${laptop.NPID}.aspx`}
        />

        <WishModal
          isShow={showWish}
          isReload={reloadWish}
          onClose={onWishClose}
        />

        {authCtx !== undefined && authCtx.isAdmin ? (
          <EditProductOverlay productId={laptop.NPID} pType={3} />
        ) : null}
      </div>
    </>
  );
};

export default Laptop;
