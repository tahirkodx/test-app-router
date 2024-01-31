"use client";
import React, { useEffect, useContext, useState, useRef, use } from "react";
import AuthContext from "@/store/auth-context";
import HelperContext from "@/store/helper-context";
import NCartContext from "@/store/ncart-context";
import { useParams } from "next/navigation";
import {
  FaArrowRight,
  FaExclamation,
  FaExclamationCircle,
  FaSearchPlus,
  FaShare,
  FaShareAlt,
  FaShareSquare,
} from "react-icons/fa";
import {
  Badge,
  Button,
  Col,
  Container,
  Row,
  Stack,
  Tab,
  Tabs,
} from "react-bootstrap";
import QtyBox from "@/components/Product/QtyBox";
import { ComponentsHeader } from "@/components/Home";
import CartContext from "@/store/ncart-context";
import { customAlphabet } from "nanoid";
/* CSS */
import styles from "@/styles/LaptopDetail.module.scss";
import Background from "@/styles/Background.module.scss";
import ComponentDetailBanners from "@/components/Banners/ComponentDetailBanners";
import {
  FcAbout,
  FcCurrencyExchange,
  FcLike,
  FcQuestions,
  FcShare,
} from "react-icons/fc";
import SimilarProductList from "@/components/Product/SimilarProductList";
import ComponentOverview from "@/components/Product/ComponentOverview";
import UpgradeBundles from "@/components/Product/UpgradeBundles";
import BreadCrumbs from "@/components/Product/BreadCrumbs";
import BrandCard from "@/components/Product/BrandCard";
import ProductFooter from "@/components/Product/ProductFooter";
import CustomQuoteRequest from "@/components/Modals/CustomQuoteRequest";
import AskQuestion from "@/components/Modals/AskQuestion";
import TellFriend from "@/components/Modals/TellFriend";
import PriceMatch from "@/components/Modals/PriceMatch";
import ModalGallery from "@/components/Gallery/ModalGallery";
import CustomeSpinner from "@/components/CustomeSpinner";
import OverviewGallery from "@/components/Gallery/OverviewGallery";
import NotifyMe from "@/components/Modals/NotifyMe";
import PalladiumTable from "@/components/Product/PalladiumTable";
import moment from "moment";
import WishModal from "@/components/Modals/WishModal";
import { Helmet } from "react-helmet";
import EditProductOverlay from "@/components/Product/EditProductOverlay";
import parse from "html-react-parser";
import {
  LazyLoadComponent,
  LazyLoadImage,
} from "react-lazy-load-image-component";
import ShareLink from "@/components/Product/ShareLink";

import SpecialTag from "@/components/Main/Controls/SpecialTag";
import FeatureGallery2 from "@/components/Gallery/FeatureGallery2";
import { RiHeartAddLine } from "react-icons/ri";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import UserAPI from "@/custom/utils/actions/user";
import { CartAPI, ProductAPI } from "@/custom/utils/actions";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { useTheme } from "@/store/ThemeContext";
import Heading from "@/components/Heading";
import FancyPrice from "@/components/FancyPrice";
import Text from "@/components/Text";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");
const Swal = require("sweetalert2");

const ViewProduct = () => {
  const helperCtx = useContext(HelperContext);
  const params = useParams();
  const router = useRouter();
  const authCtx = useContext<any>(AuthContext);
  /* Cart */
  const cartCtx = useContext(NCartContext);

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const [itemInCart, setItemInCart] = useState(false);

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

  const isSM = useMediaQuery("(min-width: 576px)");
  const isMD = useMediaQuery("(min-width: 768px)");

  const maxListHeight = (overview: any) => {
    if (
      overview !== undefined &&
      overview.aboutPro !== undefined &&
      overview.aboutPro.length > 0
    ) {
      let height = 59;
      if (isSM) {
        height = 100;
      }
      console.log(height);
      return height;
    }
  };

  const AddToWishList = (product: any) => {
    if (authCtx.isLoggedIn) {
      /* Check First Product Exist or not */
      const chekWishList = async () => {
        const wishList = await UserAPI.checkWishlistItem({
          productId: product.ProductID,
          ptype: 2,
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
              ptype: 2,
              uid: authCtx.user.id,
            });
            console.log("Wish Add Response", wishAddResp);
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

  /* Refs */
  const componentRef = useRef<any>();
  const AboutList = useRef<any>(null);
  const qtyInputRef = useRef<any>();
  const qtyLimitRef = useRef<any>(0);
  const showQtyLimitRef = useRef<any>(false);

  /* Stats */
  const [component, setComponent] = useState<any>({});
  const [stockBg, setStockBg] = useState("success");
  const [stockStatus, setStockStatus] = useState("In Stock");
  const [cartElements, setCartElements] = useState<any>(null);
  const [overview, setOverview] = useState<any>({});
  const [similarProducts, setSimilarProducts] = useState({});
  const [similarCnt, setSimilarCnt] = useState(0);
  /* const [brand, setBrand] = useState('');
    const [urlTitle, setUrlTitle] = useState('');*/
  const [totalPrice, setTotalPrice] = useState(0);
  const [special, setSpecial] = useState(false);
  const [isDeal, setIsDeal] = useState(false);
  const [attributes, setAttributes] = useState({});
  const [open, setOpen] = useState(false);
  const [openTitle, setOpenTitle] = useState(false);

  /* Modals */
  const [askQuestionShow, setAskQuestionShow] = useState(false);
  const [tellFriendShow, setTellFriendShow] = useState(false);
  const [customQuoteShow, setCustomQuoteShow] = useState(false);
  const [priceMatchShow, setPriceMatchShow] = useState(false);
  const [modalGalleryShow, setModalGalleryShow] = useState(false);
  const [modalNotifyShow, setModalNotifyShow] = useState(false);

  /* Attribute flags */
  const [showPriceMatchLink, setShowPriceMatchLink] = useState(false);
  const [showWarranty, setShowWarranty] = useState(true);
  const [showAskQuestionLink, setShowAskQuestionLink] = useState(true);
  const [showTellFriendLink, setShowTellFriendLink] = useState(true);
  const [showPageTopMsg, setShowPageTopMsg] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [showListPrice, setShowListPrice] = useState(true);
  const [showDiscountedPrice, setShowDiscountedPrice] = useState(true);
  const [showAddCart, setShowAddCart] = useState(true);
  const [showWishlist, setShowWishlist] = useState(true);
  const [showBuyNow, setShowBuyNow] = useState(true);
  const [showNotify, setShowNotify] = useState(false);
  const [showNotifyImg, setShowNotifyImg] = useState("");
  const [showOverviewGallery, setShowOverviewGallery] = useState(false);
  const [showStatusText, setShowStatusText] = useState("");
  const [showSoldout, setShowSoldout] = useState(false);
  const [showQtyLimit, setShowQtyLimit] = useState(false);
  const [qtyLimit, setQtyLimit] = useState<any>(0);
  const [showMaxQtyMsg, setShowMaxQtyMsg] = useState("");
  const [showSecondaryImg, setShowSecondaryImg] = useState("");
  const [showImportantInfo, setShowImportantInfo] = useState(false);
  const [showImportantInfoText, setShowImportantInfoText] = useState("");
  const [showUpgradeKitOrverviewID, setShowUpgradeKitOrverviewID] =
    useState("");
  const [showCustomQuoteLink, setShowCustomQuoteLink] = useState(true);
  const [showOverviewPartNo, setShowOverviewPartNo] = useState("");
  const [showOverviewBrand, setShowOverviewBrand] = useState("");
  const [showOverviewUPC, setShowOverviewUPC] = useState("");
  const [showOnClearance, setShowOnClearance] = useState(false);
  const [showOverviewType, setShowOverviewType] =
    useState(0); /* Cnet : 2 / Flix : 3 / Inline : 1 */
  const [upgradeKitOverview, setUpgradeKitOverview] = useState("");
  const [cnetFlag, setCnetFlag] = useState(false);
  const [cnetScript, setCnetScript] = useState("");
  const [flixFlag, setFlixFlag] = useState(false);
  const [flixScript, setFlixScript] = useState("");
  const [listHeight, setHeight] = useState(0);
  const [upgradeBundleItems, setUpgradeBundleItems] = useState([]);
  const [seletedUpgradeItems, setSeletedUpgradeItems] = useState([]);
  const [freeStuffInfo, setFreeStuffInfo] = useState<any>([]);
  const [freeStuff, setFreeStuff] = useState([]);
  const [tabActive, setTabActive] = useState("description");
  const [videoUrls, setVideoUrls] = useState([]);
  const [initInfo, setInitInfo] = useState(false);
  const [initGallery, setInitGallery] = useState(false);
  const [initOverview, setInitOverview] = useState(false);
  const [stockItemType, setStockItemType] = useState(
    "http://schema.org/InStock"
  );
  const bundlesInfoRef = useRef<any>();
  const [gotToCart, setGoToCart] = useState<any>(null);
  const [productFound, setProductFound] = useState<any>(false);
  const [gallery, setGallery] = useState<any>({});
  const [galleryData, setGalleryData] = useState<any>([
    {
      original: "",
      thumbnail: "",
    },
  ]);
  const [PageCrumbs, setPageCrumbs] = useState([{ productID: 0, crumbs: [] }]);
  const [containerOnTop, setContainerOnTop] = useState(false);

  /* Bredcrumbs */
  const [parentCatId, setParentCatId] = useState(0);
  const [parentCategory, setParentCategory] = useState("");
  const [parentCategoryText, setParentCategoryText] = useState("");
  const [parentCategoryURL, setParentCategoryURL] = useState("");

  const [categoryId, setCategoryId] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const [categoryURL, setCategoryURL] = useState("");
  const [ogImage, setOgImage] = useState("");
  /* Bredcrumbs */

  /* SiteInfo Flags */
  const [siteInfo, setSiteInfo] = useState({});
  /*
  const [showClearance, setShowClearance] = useState(false);
  const [showDealIcon, setShowDealIcon] = useState(false);
  const [dealText, setDealText] = useState(false);
  const [flixMediaEnable, setFlixMediaEnable] = useState(false); */

  const toggleContainerOnTop = () => {
    !containerOnTop ? setContainerOnTop(true) : setContainerOnTop(false);
  };

  const [ProductId, setProductId] = useState(0);

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

  /* Add To Cart DB */
  const addToCartHandler = async (event: any) => {
    event.preventDefault();
    let totalQty = qtyInputRef.current.value;
    const product = componentRef.current;
    let upPrice = 0;
    let upTitle = "";
    let selecetedBundles = bundlesInfoRef.current;

    if (selecetedBundles !== null) {
      upPrice = _.sumBy(selecetedBundles, function (o: any) {
        return o.Price;
      });
      upTitle = _.join(
        _.map(selecetedBundles, (bundle: any) => {
          return " + " + bundle.Title;
        }),
        " "
      );
    }
    let totPrice = product.Price_Vat + upPrice;
    if (
      showQtyLimitRef.current &&
      !isNaN(qtyLimitRef.current) &&
      parseInt(qtyLimitRef.current) > 0
    ) {
      if (parseInt(totalQty) > parseInt(qtyLimitRef.current)) {
        totalQty = parseInt(qtyLimitRef.current);
        try {
          qtyInputRef.current.value = totalQty;
        } catch (e) {}
      }
    }

    let auth = JSON.parse(localStorage.getItem("user_auth")) || null;
    let cartUrl = "/api/cart/add";
    if (auth !== null && auth.isLoggedIn === true)
      cartUrl = "/api/authcart/add";

    /*  const cartAdd = await fetch(cartUrl, {
      method: "POST",
      body: JSON.stringify({
        id: nanoid(8),
        productId: product.ProductID,
        name: product.Name,
        qty: totalQty,
        qtPeCs: qtyLimitRef.current,
        pType: 2,
        addOns: selecetedBundles,
      }),
      headers: {
        Authorization:
          auth !== null && auth.token.length > 0
            ? "Bearer " + auth.token
            : "Bearer " + authCtx.token,
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
        qtPeCs: qtyLimitRef.current,
        pType: 2,
        addOns: selecetedBundles,
      });
    else
      cartAdd = await CartAPI.addToCart({
        id: nanoid(8),
        productId: product.ProductID,
        name: product.Name,
        qty: totalQty,
        qtPeCs: qtyLimitRef.current,
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

  const upgradeItemSelected = (upgradeItem: any) => {
    setSeletedUpgradeItems((prevSelected): any => {
      let items: any = [];
      let selecetedBundles = [...items, upgradeItem];
      setTotalPrice(component.Price_Vat + upgradeItem.Price);
      bundlesInfoRef.current = selecetedBundles;
      return selecetedBundles;
    });
  };

  const generateURLComponent = (title: any, catId: any) => {
    let url = "";
    if (!isNaN(catId)) {
      url = title.trim();
      url = url.replace(/-+$/, "");
      url = url.replace(".", "-");
      url = url.replace(/[$%#@!*?;:~`+=()[\]{}|\'<>,\/^&]/g, "");

      url = url.replace(" ", "-");
      url = url.replace("--", "-");
      url = url.replace("---", "-");
      url = url.replace("----", "-");
      url = url.replace("-----", "-");
      url = url.replace("----", "-");
      url = url.replace("---", "-");
      url = url.replace("--", "-");

      url = url.trim();
      /* url = url.trim("-"); */
      url = "/components/" + url + "-" + catId + ".aspx";
    }
    return url;
  };

  const generateURLComponentProduct = (title: any, catId: any) => {
    let url = "";
    if (!isNaN(catId)) {
      url = title.trim();
      url = url.replace(/-+$/, "");
      url = url.replace(".", "-");
      url = url.replace(/[$%#@!*?;:~`+=()[\]{}|\'<>,\/^&]/g, "");

      url = url.replace(" ", "-");
      url = url.replace("--", "-");
      url = url.replace("---", "-");
      url = url.replace("----", "-");
      url = url.replace("-----", "-");
      url = url.replace("----", "-");
      url = url.replace("---", "-");
      url = url.replace("--", "-");

      url = url.trim();
      /* url = url.trim("-"); */
      url = "/PC-Components/" + url + "-" + catId + ".aspx";
    }
    return url;
  };

  useEffect(() => {
    console.log("Product Id change", ProductId);
    if (!isNaN(ProductId) && ProductId > 0 && !initInfo) {
      let galleryImages: any = [];

      const getGallery = async (proImage: any, product: any) => {
        setInitGallery(false);
        let gallery: any = {};
        if (
          product !== undefined &&
          product.ImageGallery !== undefined &&
          product.ImageGalleryThumb !== undefined &&
          (product.ImageGallery.length > 0 ||
            product.ImageGalleryThumb.length > 0)
        ) {
          gallery = {
            ImageGallery: product.ImageGallery,
            ImageGalleryThumb: product.ImageGalleryThumb,
          };

          setOgImage((prevImage) => {
            let image = _.first(gallery.ImageGalleryThumb.split("|"));
            prevImage = `https://www.evetech.co.za/${
              image !== undefined && image.trim().length > 0
                ? image
                : product.ImageGalleryThumb
            }`;
            return prevImage;
          });
        } else {
          /* const galleryData = await fetch(
            `/api/ComponentGallery/${ProductId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          ).then((res) => res.json()); */
          const galleryData = await ProductAPI.getComponentGallery({
            ProductId,
          });
          if (
            galleryData !== null &&
            galleryData.result !== undefined &&
            galleryData.result.length > 0
          )
            gallery = galleryData.result[0];
        }

        setGallery((prevGallery: any) => {
          prevGallery = gallery;
          try {
            let images = _.filter(
              gallery.ImageGallery.split("|").map((image: any) => {
                return image.trim().length > 0 && image !== "none"
                  ? `https://www.evetech.co.za/${image}`
                  : "";
              }),
              (img: any) => {
                return img.trim().length > 0 && img;
              }
            );

            galleryImages.push({
              original: proImage.includes("evetech.co.za")
                ? proImage
                : `https://www.evetech.co.za/${proImage}`,
              thumbnail: proImage.includes("evetech.co.za")
                ? proImage
                : `https://www.evetech.co.za/${proImage}`,
            });

            for (let i = 0; i < images.length; i++) {
              galleryImages.push({
                original: images[i],
                thumbnail: images[i],
              });
            }
          } catch (e) {}

          return prevGallery;
        });

        /* Set Images to gallery data */
        setGalleryData((prevGalleryData: any) => {
          prevGalleryData = galleryImages;
          return galleryImages;
        });

        setInitGallery(true);
      };

      const getSimilarProducts = async (ProductId: any) => {
        const similarData = await ProductAPI.getComponentSimilarProducts({
          ProductId,
        });
        if (
          similarData !== null &&
          similarData !== undefined &&
          similarData.result !== undefined &&
          similarData.result !== null
        ) {
          let prodSimilar = similarData.result;
          setSimilarProducts((prevSimilarProducts) => {
            prevSimilarProducts = prodSimilar;
            setSimilarCnt(prodSimilar.length);
            return prevSimilarProducts;
          });
        }
      };

      const getOverview = async (productId: any) => {
        setInitOverview(false);
        const overviewData = await ProductAPI.getComponentOverview({
          ProductId,
        });
        if (
          overviewData !== null &&
          overviewData !== undefined &&
          overviewData.result !== undefined &&
          overviewData.result !== null &&
          overviewData.result.length > 0
        ) {
          let prodOverview = overviewData.result[0];
          setOverview((prevOverview: any) => {
            prevOverview = prodOverview;
            return prevOverview;
          });
          setInitOverview(true);
        }
      };

      const getAttributesValue = async (productId: any) => {
        const attributesData = await ProductAPI.getComponentAttributesValue({
          ProductId,
        });
        if (
          attributesData !== null &&
          attributesData !== undefined &&
          attributesData.result !== undefined &&
          attributesData.result !== null &&
          attributesData.result.length > 0
        ) {
          let prodAttributes = attributesData.result;
          setAttributes((prevAtttribute) => {
            prevAtttribute = prodAttributes;
            return prevAtttribute;
          });

          prodAttributes.forEach((attribute: any) => {
            let attid = attribute.attid;
            let value = attribute.value.trim();

            if (attid === 587 && value === "yes") {
              // Hide top Universal Message ((component_Hide_Top_Message = 587))
              setShowPageTopMsg(false);
            } else if (attid === 3 && value === "yes") {
              /* Hide Price */
              setShowPrice(false);
              setShowListPrice(false);
              setShowDiscountedPrice(false);
            } else if (attid === 4 && value === "yes") {
              /* Hide Add to cart */
              setShowAddCart(false);
              setShowWishlist(false);
              setShowBuyNow(false);
            } else if (attid === 5 && value === "yes") {
              /* Hide Wishlisht */
              setShowWishlist(false);
            } else if (attid === 6 && value === "yes") {
              /* Show Notify */
              setShowNotify(true);
            } else if (attid === 6 && value === "no") {
              /* Do Not Show Notify */
              setShowNotify(false);
            } else if (attid === 7 && value.length > 0) {
              /* Notify Image ((Do We need to add this?)) */
              setShowNotifyImg(value);
            } else if (attid === 561 && value === "yes") {
              /* Show Gallery in Overview ((Component_Show_Galley_ID = 561;)) */
              setShowOverviewGallery(true);
            } else if (attid === 8 && value !== "no" && value.Length > 0) {
              //Status
              setShowStatusText(value);
            } else if (attid === 555 && value === "yes") {
              // Sold out ((SOLD_OUT_ComponentID = 555;))
              setShowSoldout(true);
              setShowStatusText("SOLD OUT");
            } else if (attid === 558 && value !== "0") {
              // Qty Limit ((QTY_LIMIT_Component = 558;))
              setShowQtyLimit(true);
              setQtyLimit(value);
              qtyLimitRef.current = value;
              showQtyLimitRef.current = true;
              setShowMaxQtyMsg(`Limit ${value} per customer`);
            } else if (attid === 565 && value.length > 0) {
              // Secondary Image ((component_secondary_image_id = 565;))
              setShowSecondaryImg(value);
            } else if (attid === 575 && value === "yes") {
              // Important Info / Show ETA ((Component_SHOW_ETA_ID = 575;))
              setShowImportantInfo(true);
            } else if (attid === 576 && value.length > 0) {
              // Important Info Text / ETA Message ((Component_ETA_MSG_ID = 576;))
              setShowImportantInfoText(value);
            } else if (attid === 583 && value.length > 0) {
              // Upgrade Kit Overview ID ((component_upgrade_kit_overview_ids = 583;))
              // referance - UpdateUpgradeKitOverview(value, captionTags);
              setShowUpgradeKitOrverviewID(value); // Not Applied
              setShowOverviewGallery(true);
              getUpgradeKitOverviewById(value);
            } else if (attid === 600 && value.length > 0) {
              // Overview Part Number ((component_overview_partno = 600;))
              setShowOverviewPartNo(value);
            } else if (attid === 599 && value.length > 0) {
              // Overview Brand ((component_overview_brand = 599;))
              setShowOverviewBrand(value);
            } else if (attid === 601 && value.length > 0) {
              // Overview UPC ((component_overview_upc = 601;))
              setShowOverviewUPC(value); // Not Applied
            } else if (attid === 596 && value.length > 0) {
              /* No Longer User Lock Price Change With Clearance Show - ((component_lock_price = 596;)) */
              if (value === "yes") setShowOnClearance(true);
            } else if (attid === 602 && value.length > 0) {
              // Overview Part No ((component_overview_type = 602;))
              setShowOverviewType(parseInt(value));
            } else if (attid === 619 && value.length > 0) {
              // component_tv_licence = 619;
              if (value.trim() === "1") {
                /* setTVLicenc True */
              }
            }
          });
        }

        /*  const attributesData = await fetch(
          `/api/ComponentAttributesValue/${productId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        ).then((res) => {
          res.json().then((dataAtt) => {
            
          });
        }); */
        //let prodAttributes = attributesData.result;
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
                                var o = ccs_cc_args; o.push(['_SKey', '45fbdc77']); o.push(['_ZoneId', 'acb8cb24a1']);
                                var sc = document.createElement('script'); sc.type = 'text/javascript'; sc.async = true;
                                sc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.cs.1worldsync.com/jsc/h1ws.js';
                                var n = document.getElementsByTagName('script')[0]; n.parentNode.insertBefore(sc, n);
                            })();   
                    `;
        setCnetScript(script);
      };
      getCnetScriptCode();

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

      const getUpgradeItems = async () => {
        const upgradeItemsData = await ProductAPI.getUpgradeKitItems({
          ProductId,
        });
        if (
          upgradeItemsData !== null &&
          upgradeItemsData !== undefined &&
          upgradeItemsData.result !== undefined &&
          upgradeItemsData.result !== null
        ) {
          let upgradeItems = upgradeItemsData.result;

          setUpgradeBundleItems((prevItems) => {
            prevItems = upgradeItems;
            return prevItems;
          });
        }
      };

      const getFreeStuffInfo = async () => {
        /* const freeStuffData = await fetch(`/api/FreeStuffInfo`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ProductId: ProductId,
            atype: 1,
          }),
        }).then((res) => res.json()); */
        const freeStuffData = await ProductAPI.getFreeStuffInfo({
          ProductId: ProductId,
          atype: 1,
        });
        if (
          freeStuffData !== null &&
          freeStuffData !== undefined &&
          freeStuffData.result !== undefined
        ) {
          let freeStuff = freeStuffData.result;
          setFreeStuffInfo((prevFreeStuff: any) => {
            prevFreeStuff = freeStuff;
            return prevFreeStuff;
          });
          setFreeStuff((prevStuff): any => {
            prevStuff = freeStuff.map((stuff: any, ind: any) => {
              return {
                stuffId: stuff.id,
                galleryId: stuff.GalleryID,
                alttag: stuff.alttag,
                link: stuff.link,
                title: stuff.title,
                tooltip: stuff.tooltip,
                des: stuff.des,
              };
            });
          });
        }
      };

      const getUpgradeKitOverviewById = async (OverviewIds: any) => {
        const overviewData = await ProductAPI.getUpgradeKitOverview({
          OverviewIds: OverviewIds,
        });
        if (
          overviewData !== null &&
          overviewData !== undefined &&
          overviewData.result !== undefined &&
          overviewData.result !== null
        ) {
          let prodOverview = overviewData.result;
          let overviewHtmls = ``;
          let imageGalleryStr = ``;

          if (prodOverview.length > 0) {
            console.log("OverviewIds :", OverviewIds.split(","));
            try {
              _.map(OverviewIds.split(","), (ovIds: any) => {
                let ovFind = _.find(prodOverview, (ovd: any) => {
                  if (ovd.id === parseInt(ovIds)) return ovd;
                });

                if (ovFind) {
                  overviewHtmls += ovFind.Html.replace("col-1", "").replace(
                    "col-2",
                    ""
                  );
                  imageGalleryStr +=
                    (imageGalleryStr.trim().length > 0 ? "|" : "") +
                    ovFind.ImageGallery;
                }
              });
            } catch (ex) {
              prodOverview.map((ovd: any) => {
                overviewHtmls += ovd.Html.replace("col-1", "").replace(
                  "col-2",
                  ""
                );
                imageGalleryStr +=
                  (imageGalleryStr.trim().length > 0 ? "|" : "") +
                  ovd.ImageGallery;
              });
            }
          }

          setGallery((prevGalleryStr: any) => {
            prevGalleryStr.ImageGallery =
              (prevGalleryStr.ImageGallery.trim().length > 0
                ? prevGalleryStr.ImageGallery + "|"
                : "") + imageGalleryStr;
            return prevGalleryStr;
          });

          setGalleryData((prevGalleryData: any) => {
            let images = _.filter(
              imageGalleryStr.split("|").map((image) => {
                return image !== "none"
                  ? `https://www.evetech.co.za/${image}`
                  : "";
              }),
              (img: any) => {
                return img.trim().length > 0 && img;
              }
            );
            for (let i = 0; i < images.length; i++) {
              prevGalleryData.push({
                original: images[i],
                thumbnail: images[i],
              });
            }

            return prevGalleryData;
          });

          setUpgradeKitOverview((prevOverview) => {
            prevOverview = overviewHtmls;
            return prevOverview;
          });
          setInitGallery(true);
          setInitOverview(true);
        }
      };

      const fetchData = async () => {
        setInitInfo(false);
        console.log("Inside fetch", ProductId);
        const prods = await ProductAPI.getComponentById({ ProductId });
        if (
          prods !== undefined &&
          prods !== null &&
          prods.result !== undefined &&
          prods.result !== null &&
          prods.result.length > 0
        ) {
          setProductFound(true);
          let product = prods.result[0];
          setComponent(prods.result[0]);
          componentRef.current = product;

          if (product.IsOnDeal === 1) setIsDeal(true);
          if (product.isavailable === 1) setSpecial(true);
          if (helperCtx.showDealIcon && isDeal) setSpecial(false);
          if (product.warrantyinfo === 9) setShowWarranty(false);
          if (product.ShippingEstimate === "2") setShowPriceMatchLink(true);

          if (product.Status === 0) {
            setShowAddCart(false);
            setShowBuyNow(false);
          }

          setCategory(product.URLTextCat1);
          setCategoryText(product.URLTextCat1_Name);
          setCategoryId(product.CategoryID);
          let childUrl = generateURLComponentProduct(
            product.URLTextCat1,
            product.CategoryID
          );
          setCategoryURL(childUrl);

          setParentCatId(product.URLCat2ID);
          setParentCategory(product.URLTextCat2);
          setParentCategoryText(product.URLTextCat2_Name);
          let ParentUrl = generateURLComponent(
            product.URLTextCat2,
            product.URLCat2ID
          );
          setParentCategoryURL(ParentUrl);

          let crumbs: any = [];
          let i = 1;
          crumbs.push({
            title: "Home",
            link: "/",
            stage: i,
          });
          i++;
          crumbs.push({
            title: "Components",
            link: "/Components.aspx",
            stage: i,
          });
          i++;

          if (ParentUrl.trim().length > 0) {
            crumbs.push({
              title: product.URLTextCat2,
              link: ParentUrl.replace(/ /g, "-"),
              stage: i,
            });
            i++;
          }

          if (childUrl.trim().length > 0) {
            crumbs.push({
              title: product.URLTextCat1,
              link: childUrl.replace(/ /g, "-"),
              stage: i,
            });
            i++;
          }

          crumbs.push({
            title: "Item#: " + product.ItemCode,
            link: "#",
            stage: i,
          });
          i++;

          setPageCrumbs((prevCrumb) => {
            let updateCrumb = _.map(prevCrumb, (pcrumb: any) => {
              pcrumb.productID = ProductId;
              pcrumb.crumbs = _.orderBy(crumbs, "stage", "desc");
              return pcrumb;
            });

            return updateCrumb;
          });

          getOverview(ProductId);
          getSimilarProducts(ProductId);
          getAttributesValue(ProductId);
          getUpgradeItems();
          getFreeStuffInfo();
          getGallery(
            showSecondaryImg !== "" && product.MainImage.trim().length === 0
              ? showSecondaryImg
              : product.MainImage
              ? product.MainImage
              : product.ProductImage,
            product
          );
          setTotalPrice((prevPrice) => {
            let upPrice = 0;
            if (seletedUpgradeItems !== null) {
              upPrice = _.sumBy(seletedUpgradeItems, function (o: any) {
                return o.Price;
              });
            }
            return prods.result[0].Price_Vat + upPrice;
          });

          setStockStatus((prevStat) => {
            prevStat = product.Availability;
            return prevStat;
          });

          /* videoUrls */
          if (product.VideoUrls !== null)
            setVideoUrls((prevUrls) => {
              try {
                prevUrls = JSON.parse(product.VideoUrls);
              } catch (e) {}
              return prevUrls;
            });
        } else {
          router.replace("/");
        }
        setInitInfo(true);
      };

      fetchData();
    } else {
      /* router.replace("/"); */
    }
  }, [ProductId]);

  /* add to cart set only once initInfo set to true and stock status set */
  useEffect(() => {
    let status = stockStatus.toLowerCase();

    if (initInfo && stockStatus.trim().length > 0) {
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
        if (status.includes("out of stock") || status.includes("pre-order")) {
          setStockBg("danger");
        }
        if (showNotify) {
          setCartElements(
            <>
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
            </>
          );
        }
      } else {
        /*  setAdCart(true);
                    setDivNotify(false); */

        setCartElements(
          <div
            className={`${styles.BuyButtons} d-grid cols-2 cols-lg-1 gap-1 w100`}
          >
            {showAddCart ? (
              <Button
                variant="warning"
                className="fs-6 w100"
                onClick={(e) => {
                  addToCartHandler(e);
                }}
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

            {gotToCart !== null && gotToCart}
          </div>
        );
      }
    }
  }, [stockStatus]);

  let addedtoCart = _.filter(cartCtx.items, {
    alt: component.Title,
  });

  useEffect(() => {
    if (addedtoCart.length > 0) {
      setItemInCart(true);
    } else {
      setItemInCart(false);
    }
  }, [cartCtx, addedtoCart.length, itemInCart]);

  useEffect(() => {}, [addedtoCart.length, itemInCart]);

  const onBrandCardUpdate = (brandInfo: any) => {
    if (brandInfo.link !== undefined && brandInfo.link.trim().length > 0) {
      setPageCrumbs((prevCrumb) => {
        prevCrumb = _.map(prevCrumb, (pcrumbs: any) => {
          if (pcrumbs.crumbs.length > 0) {
            pcrumbs.crumbs = _.map(pcrumbs.crumbs, (crumb: any) => {
              if (parseInt(crumb.stage) > 3) {
                crumb.stage = parseInt(crumb.stage) + 1;
              }
              return crumb;
            });
            pcrumbs.crumbs.push({
              title: brandInfo.vendor
                .split(" ")
                .map(
                  (w: any) => w[0].toUpperCase() + w.substring(1).toLowerCase()
                )
                .join(" ")
                .trim(),
              link: brandInfo.link,
              stage: 4,
            });
            pcrumbs.crumbs = _.orderBy(pcrumbs.crumbs, "stage", "desc");
            return pcrumbs;
          }
        });
        return prevCrumb;
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      AboutList.current && setHeight(AboutList.current.clientHeight);
    }, 1500);
  }, []);

  const onCnetScriptSet = (value: any) => {
    setCnetFlag(value);
  };

  const onFlixScriptSet = (value: any) => {
    setFlixFlag(value);
  };

  const priceNumberFormat = (num: any) => {
    try {
      return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  const RenderHTML = (props: any) => (
    <div dangerouslySetInnerHTML={{ __html: props.HTML }} key={nanoid(6)}></div>
  );

  const RenderTitle = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  const formatOverview = (overview: any) => {
    /* overview = overview.replace(/col-/gi, "w-100 col-"); */
    try {
      let parser = new DOMParser();
      let doc: any = parser.parseFromString(overview, "text/html");

      let images = doc.firstChild.getElementsByTagName("img");

      for (let i = 0; i < images.length; i++) {
        images[i].classList.add("img-fluid");
      }
      return doc.documentElement.innerHTML;
    } catch (ex) {
      return overview;
    }
  };

  useEffect(() => {
    if (component.Title !== undefined && component.Title) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.innerHTML = `{"
        @context":"http://schema.org",
        "@type":"Product",
        "name":"${component.Title}",
        "sku":"${component.ProductSku.replace(/ /g, "-").slice(0, 50)}",
        "mpn":"${component.PartNo}",
        "image":"https://www.evetech.co.za/${component.ProductImage}",
        "brand":"${component.Brand}",
        "description":"${component.Name.slice(0, 5000)}",
        "category": "${component.URLTextCat1_Name}",
        "offers":{
            "@type":"Offer",
            "url":"${`https://www.evetech.co.za/${_.replace(
              _.toLower(component.Title),
              new RegExp(" ", "g"),
              "-"
            ).trim()}/best-deal/${component.ProductID}`}.aspx",
            "price":"${component.Price_Vat}",
            "priceCurrency":"ZAR",
            "priceValidUntil":"${moment().endOf("month").format("YYYY-MM-DD")}",
            "availability":"${stockItemType}",
            "availableDeliveryMethod":"FreightDelivery",
            "acceptedPaymentMethod":"CreditCardOrPaymentCard",
            "priceSpecification":{"@type":"PriceSpecification","price":"${
              component.Price_Vat
            }","priceCurrency":"ZAR"}
          }
      }`;
      script.async = true;
      document.head.appendChild(script);
    }
  }, [component]);

  /* code trash */
  useEffect(() => {
    if (cartCtx.items.length > 0) {
      _.each(cartCtx.items, (item: any) => {
        if (item.productId === component.ProductID) {
          setGoToCart(
            <Button
              variant="success"
              className="fs-6 w100"
              onClick={(e) => {
                router.replace("/Cart");
              }}
            >
              Go To Cart <FaArrowRight />
            </Button>
          );
        }
      });
    }
  }, [cartCtx.items]);

  useEffect(() => {
    setSiteInfo(helperCtx.siteInfo);
  }, [helperCtx.siteInfo]);

  useEffect(() => {}, [listHeight]);

  /*  useEffect(() => {
    if (!_.isEmpty(siteInfo)) {
      if (siteInfo.dealText !== "") {
        setDealText(siteInfo.dealText);
      }

      if (siteInfo.flixMediaEnable === "yes") {
        setFlixMediaEnable(true);
      }

      if (siteInfo.showClearance === "yes") {
        setShowClearance(true);
      }

      if (siteInfo.showDealIcon === "yes") {
        setShowDealIcon(true);
      }
    }
  }, [siteInfo]); */

  const TitleSection = () => {
    const titleRef = useRef(null);
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
      const divElement: any = titleRef.current;
      if (divElement) {
        const hasOverflow = divElement.scrollHeight > divElement.clientHeight;
        if (hasOverflow) {
          setIsOverflow(true);
        }
      }
    }, []);

    return (
      <div className={`${styles.TitleSection} position-relative`}>
        <span itemProp="name" className="d-none">
          {component.Title}
        </span>
        <Heading
          level={1}
          className={`
            ${styles.MainTitle} 
            ${openTitle ? "extend" : ""} 
            mb-2
          `}
          itemProp="description"
          ref={titleRef}
        >
          <span className={`${component.ShippingCharges <= 0 ? `` : `pe-5`}`}>
            {parse(component.Name)}
          </span>
          {component.ShippingCharges <= 0 && (
            <RenderTitle
              HTML={`<span style='color:red; font-weight: 500;' class="pe-5"> + FREE DELIVERY !</span>`}
            />
          )}
          {freeStuffInfo.map((info: any) => {
            return (
              <RenderTitle HTML={`&nbsp;&nbsp;` + info.des} key={nanoid(3)} />
            );
          })}
        </Heading>

        {isOverflow && (
          <div
            className={`btn ${styles.TitleBtn} position-absolute end-0 bottom-0 rounded-0 d-flex p-0`}
            aria-expanded={openTitle === true ? "true" : "false"}
            onClick={() => setOpenTitle(!openTitle)}
          >
            <div
              className={
                darkMode ? Background.DarkFadeLeft : Background.whiteFadeToLeft
              }
              style={{ width: "75px" }}
            ></div>
            <div
              className={`
                ${darkMode ? `text-info bg-dark` : `text-primary bg-light`}
                fw-2 p-0 text-decoration-underline
              `}
            >
              {isMD ? (
                <small>
                  <small>
                    {openTitle === true ? "Less Info" : "More Info"}
                  </small>
                </small>
              ) : (
                <small>{openTitle === true ? "Less Info" : "More Info"}</small>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {}, [initInfo]);

  return (
    <>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      {initInfo && (
        <div className={`${darkMode ? `evetechDark` : ``}`}>
          <BreadCrumbs
            PageCrumbs={PageCrumbs}
            ProductId={component.ProductID}
            hideMobile={true}
            className={darkMode ? `bg-dark` : ``}
          />
          <Container
            fluid
            itemScope={true}
            itemType="https://schema.org/Product"
            className={`
              position-relative overflow-hidden 
              ${!containerOnTop ? `z-index-1` : ``}
              ${darkMode ? `bg-dark` : ``}
            `}
          >
            <section className="d-none">
              <span itemProp="brand">{component.Brand}</span>
              <LazyLoadImage
                src={`https://www.evetech.co.za/${component.ProductImage}`}
                alt={`` + component.Title}
                itemProp="image"
                width={600}
                height={400}
              />
              <span itemProp="name">{component.Title}</span>
              <span itemProp="description">
                {component.Name !== undefined && component.Name.slice(0, 5000)}
              </span>
            </section>

            <div className="wrapper p-2">
              <Row className="pb-3">
                <Col lg={10}>
                  <Row>
                    <Col
                      lg={12}
                      xl={7}
                      className={`pt-2 pb-2 ${styles.MainGalParent} position-relative`}
                    >
                      <div
                        className={`${styles.MainGallery} position-relative z-index-1`}
                      >
                        <div className={`z-index-1`}>
                          {!initGallery && <CustomeSpinner variant="primary" />}
                          {initGallery && (
                            <FeatureGallery2
                              GalleryData={galleryData}
                              showGalleryModal={(val: any) => {
                                setModalGalleryShow(val);
                              }}
                            />
                          )}
                        </div>

                        <ModalGallery
                          show={modalGalleryShow}
                          onHide={() => setModalGalleryShow(false)}
                          product={{
                            name: component.Name,
                            type: 2,
                          }}
                          gallerydata={galleryData}
                          videourls={videoUrls}
                        />
                        {showSoldout ? (
                          <div className="position-absolute top-0 left-0 w-100 h-100 d-flex align-items-center justify-content-center bg-light bg-opacity-50 z-index-2">
                            <LazyLoadImage
                              src="https://www.evetech.co.za/repository/product/sold-out-600px-v1.png"
                              alt=""
                              className="img-contain w-100 h-100"
                              width={600}
                              height={400}
                              placeholderSrc="https://www.evetech.co.za/repository/ProductImages/image-placeholder.png"
                            />
                            {/* <img
                                    src="https://www.evetech.co.za/repository/product/sold-out-600px-v1.png"
                                    alt=""
                                    className="img-contain w-100 h-100"
                                    /> */}
                          </div>
                        ) : null}

                        <div className="position-absolute d-grid cols-12 gap-2 justify-content-between pe-none w-100 top-0 start-0 z-index-2">
                          <div className="d-none d-sm-block span-sm-2"></div>
                          <div className="span-full span-sm-10 d-flex justify-content-between position-relative w-100">
                            <div className="d-grid gap-1">
                              {helperCtx.dealTags !== undefined &&
                                helperCtx.dealTags.length > 0 &&
                                special && <SpecialTag type={"On Special"} />}
                              {(helperCtx.dealTags === undefined ||
                                _.isEmpty(helperCtx.dealTags) ||
                                (helperCtx.dealTags !== undefined &&
                                  helperCtx.dealTags.length === 0)) &&
                              special ? (
                                <Badge bg="danger">
                                  <span className="fw-2">On Special</span>
                                </Badge>
                              ) : null}

                              {helperCtx.dealTags !== undefined &&
                                helperCtx.dealTags.length > 0 &&
                                showOnClearance &&
                                helperCtx.showClearance && (
                                  <SpecialTag type={"Clearance Sale"} />
                                )}

                              {(helperCtx.dealTags === undefined ||
                                _.isEmpty(helperCtx.dealTags) ||
                                (helperCtx.dealTags !== undefined &&
                                  helperCtx.dealTags.length === 0)) &&
                              showOnClearance &&
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
                                isDeal && (
                                  <SpecialTag type={helperCtx.dealText} />
                                )}
                              {(helperCtx.dealTags === undefined ||
                                _.isEmpty(helperCtx.dealTags) ||
                                (helperCtx.dealTags !== undefined &&
                                  helperCtx.dealTags.length === 0)) &&
                              helperCtx.showDealIcon &&
                              isDeal ? (
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
                              onClick={() => AddToWishList(component)}
                              variant={darkMode ? `dark` : `light`}
                              style={{ marginTop: `0.45rem` }}
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
                              _.toLower(component.Title),
                              new RegExp(" ", "g"),
                              "-"
                            ).trim()}/best-deal/${component.ProductID}.aspx`}
                            textToShare={component.description}
                            title={component.Title}
                            description={component.description}
                            favicon={`https://www.evetech.co.za/icons/ms-icon-144x144.png`}
                          />
                        </div>
                      </div>
                      {/* <Image className="hidden" src={laptop.manuurl}></Image> */}
                    </Col>
                    {!initInfo && <CustomeSpinner variant="info" />}
                    <Col xl={5} className={`pt-2 pb-2 ${styles.MainInfo}`}>
                      {initInfo && (
                        <div>
                          <TitleSection />
                          <Row className="mt-2 lh-1">
                            {similarCnt > 0 && (
                              <Col md={3} xs={6} className="text-center">
                                <Link
                                  href="#similar-products"
                                  onClick={() => {
                                    setTabActive("similarProduct");
                                  }}
                                  className={`${
                                    darkMode ? `text-info` : ``
                                  } f-12`}
                                  title="Similar Products"
                                >
                                  ({similarCnt}) Similar Products
                                </Link>
                              </Col>
                            )}
                            {/* {component.warrantyinfo !== undefined &&
                              component.warrantyinfo !== 9 && (
                                <Col md={3} xs={6} className="text-center">
                                  <span
                                    className={`
                                        p-0 m-0 f-12 d-flex align-items-center rounded border-secondary border-bottom border-opacity-50 px-2
                                        ${
                                          darkMode ? `text-light` : `text-dark`
                                        } 
                                      `}
                                  >
                                    {component.Warranty}
                                  </span>
                                </Col>
                              )} */}
                            <Col md={3} xs={6} className="text-center">
                              <span className={`p-0 m-0 f-12 text-success`}>
                                {component.PartNo}
                              </span>
                            </Col>
                            {/* {showCustomQuoteLink ? (
                              <Col md={3} xs={6} className="text-center">
                                <Link
                                  href="#customQuote"
                                  className={`f-12 ${
                                    darkMode ? `text-info` : ``
                                  }`}
                                  title="Request for a custom quote"
                                  onClick={() => setCustomQuoteShow(true)}
                                >
                                  Custom Quote Request
                                </Link>
                                <CustomQuoteRequest
                                  show={customQuoteShow}
                                  onHide={() => setCustomQuoteShow(false)}
                                  product={{
                                    name: component.Name,
                                    url: `https://www.evetech.co.za/${_.replace(
                                      _.toLower(component.Title),
                                      new RegExp(" ", "g"),
                                      "-"
                                    ).trim()}/best-deal/${
                                      component.ProductID
                                    }.aspx`,
                                  }}
                                />
                              </Col>
                            ) : null} */}
                          </Row>
                          <div className="position-relative">
                            <hr />
                          </div>
                          <div
                            className={`
                              ${open === true ? "open" : "closed"} 
                              ${styles.AboutList}
                              ${darkMode ? `text-light` : `text-dark`}
                              position-relative w-100 mb-3 text-opacity-75
                            `}
                          >
                            {overview !== undefined &&
                            overview.aboutPro !== undefined &&
                            overview.aboutPro.trim().length > 0 ? (
                              <h6>About this item :</h6>
                            ) : (
                              ``
                            )}

                            {overview !== undefined &&
                              overview.aboutPro !== undefined &&
                              overview.aboutPro.length > 0 && (
                                <div>
                                  <div
                                    className={`${styles.List}`}
                                    ref={AboutList}
                                  >
                                    <RenderHTML HTML={overview.aboutPro} />
                                  </div>

                                  {listHeight > 59 ? (
                                    <div
                                      className={`position-absolute bottom-0 end-0 d-flex`}
                                    >
                                      <div
                                        className={
                                          darkMode
                                            ? Background.DarkFadeLeft
                                            : Background.whiteFadeToLeft
                                        }
                                        style={{ width: "75px" }}
                                      ></div>
                                      <div
                                        className={`
                                          ${
                                            darkMode
                                              ? `bg-dark text-info`
                                              : `bg-white text-primary`
                                          } 
                                          p-0 text-decoration-underline cursor-pointer
                                        `}
                                        aria-expanded={
                                          open === true ? "true" : "false"
                                        }
                                        onClick={() => setOpen(!open)}
                                      >
                                        <div className={`fw-2`}>
                                          <small>
                                            <small>
                                              {open === true
                                                ? "Less Info"
                                                : "More Info"}
                                            </small>
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              )}
                          </div>
                          <div
                            className={`d-grid cols-2 gap-2 cols-sm-4 mt-xl-2 ${styles.ActionButtons}`}
                          >
                            {/* {showWishlist ? (
                              <Button
                                className={`
                              ${
                                darkMode
                                  ? `btn-dark border-secondary border-opacity-50`
                                  : `btn-light border-dark`
                              }
                              btn w-100 bg-gradient
                          `}
                                onClick={() => {
                                  AddToWishList(component);
                                }}
                              >
                                <small>
                                  <FcLike /> <span>Add To Wishlist</span>
                                </small>
                              </Button>
                            ) : null} */}

                            {component.warrantyinfo !== undefined &&
                              component.warrantyinfo !== 9 && (
                                <span
                                  className={`
                                  p-0 m-0 f-12 d-flex align-items-center rounded border-secondary border-bottom border-opacity-50 px-2
                                  ${darkMode ? `text-light` : `text-dark`} 
                                `}
                                >
                                  {component.Warranty}
                                </span>
                              )}

                            {showAskQuestionLink ? (
                              <>
                                <Button
                                  className={`
                                    ${
                                      darkMode
                                        ? `btn-dark border-secondary border-opacity-50`
                                        : `btn-light border-dark`
                                    }
                                    btn w-100 bg-gradient
                                `}
                                  onClick={() => setAskQuestionShow(true)}
                                >
                                  <small>
                                    <FcQuestions /> <span>Ask a Question?</span>
                                  </small>
                                </Button>

                                <AskQuestion
                                  show={askQuestionShow}
                                  onHide={() => setAskQuestionShow(false)}
                                  product={{
                                    pid: component.ProductID,
                                    name: component.Name,
                                    url: `https://www.evetech.co.za/${_.replace(
                                      _.toLower(component.Title),
                                      new RegExp(" ", "g"),
                                      "-"
                                    ).trim()}/best-deal/${
                                      component.ProductID
                                    }.aspx`,
                                    price: component.Price,
                                    ptype: 2,
                                    page: "viewProduct",
                                  }}
                                />
                              </>
                            ) : null}

                            {/* {showTellFriendLink ? (
                              <>
                                <Button
                                  className={`
                                  ${
                                    darkMode
                                      ? `btn-dark border-secondary border-opacity-50`
                                      : `btn-light border-dark`
                                  }
                                  btn w-100 bg-gradient
                                `}
                                  onClick={() => setTellFriendShow(true)}
                                >
                                  <small>
                                    <FcShare /> <span>Tell a Friend</span>
                                  </small>
                                </Button>
                                <TellFriend
                                  show={tellFriendShow}
                                  onHide={() => setTellFriendShow(false)}
                                  productid={component.ProductID}
                                  producttitle={component.Name}
                                  productprice={component.Price}
                                  producturl={`https://www.evetech.co.za/${_.replace(
                                    _.toLower(component.Title),
                                    new RegExp(" ", "g"),
                                    "-"
                                  ).trim()}/best-deal/${
                                    component.ProductID
                                  }.aspx`}
                                />
                              </>
                            ) : null} */}

                            {component !== undefined && showPriceMatchLink && (
                              <Button
                                className={`
                              ${
                                darkMode
                                  ? `btn-dark border-secondary border-opacity-50`
                                  : `btn-light border-dark`
                              }
                              btn w-100 bg-gradient
                            `}
                                onClick={() => setPriceMatchShow(true)}
                              >
                                <small>
                                  <FcCurrencyExchange />{" "}
                                  <span>Price Match</span>
                                </small>
                              </Button>
                            )}

                            {component !== null &&
                              component !== undefined &&
                              showPriceMatchLink && (
                                <PriceMatch
                                  show={priceMatchShow}
                                  onHide={() => setPriceMatchShow(false)}
                                  productid={component.ProductID}
                                  producttitle={component.Name}
                                  productprice={component.Price}
                                  productmodalno={component.ProductSku}
                                  producttype="2"
                                  producturl={`https://www.evetech.co.za/${_.replace(
                                    _.toLower(component.Title),
                                    new RegExp(" ", "g"),
                                    "-"
                                  ).trim()}/best-deal/${
                                    component.ProductID
                                  }.aspx`}
                                />
                              )}

                            {showCustomQuoteLink ? (
                              <>
                                <Button
                                  className={`
                                    ${
                                      darkMode
                                        ? `btn-dark border-secondary border-opacity-50`
                                        : `btn-light border-dark`
                                    }
                                      btn w-100 bg-gradient
                                  `}
                                  title="Request for a custom quote"
                                  onClick={() => setCustomQuoteShow(true)}
                                >
                                  <small>
                                    <FcAbout /> <span>Custom Quote</span>
                                  </small>
                                </Button>

                                <CustomQuoteRequest
                                  show={customQuoteShow}
                                  onHide={() => setCustomQuoteShow(false)}
                                  product={{
                                    name: component.Name,
                                    url: `https://www.evetech.co.za/${_.replace(
                                      _.toLower(component.Title),
                                      new RegExp(" ", "g"),
                                      "-"
                                    ).trim()}/best-deal/${
                                      component.ProductID
                                    }.aspx`,
                                  }}
                                />
                              </>
                            ) : null}
                          </div>

                          {/* Bundle Options */}
                          <UpgradeBundles
                            Items={upgradeBundleItems}
                            Price={component.Price_Vat}
                            onUpgradeItemSeleceted={upgradeItemSelected}
                          />

                          {authCtx.isLoggedIn &&
                          authCtx.isAdmin &&
                          component !== undefined &&
                          component.WEBID !== undefined &&
                          component.WEBID > 0 ? (
                            <PalladiumTable
                              webId={component.WEBID}
                              cPrice={component.Price_Vat}
                            />
                          ) : null}
                        </div>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col lg={2} className={`pt-2 pb-2`}>
                  {/* Pricing Section */}
                  {!initInfo && <CustomeSpinner variant="info" />}
                  {initInfo && (
                    <div
                      className={`
                        ${styles.MainPrices} 
                        ${darkMode ? `text-light` : ``}
                        text-right cols-2 cols-sm-3
                      `}
                    >
                      {showImportantInfo !== undefined &&
                      showImportantInfo &&
                      showImportantInfoText !== undefined &&
                      showImportantInfoText !== "" ? (
                        <div className="fw-3 text-danger p-2 rounded bg-danger bg-opacity-10 mb-2">
                          <FaExclamation /> {showImportantInfoText}
                        </div>
                      ) : null}

                      {showListPrice ? (
                        <div>
                          <div className="f-12">List Price</div>
                          <div>
                            <s> {currencyFormat(component.Price)}</s>
                          </div>
                        </div>
                      ) : null}

                      <div>
                        {showDiscountedPrice ? (
                          <>
                            <div className="f-12">Discounted Price</div>
                            <div
                              className={`${styles.NewPrice} fw-2`}
                              itemProp="offers"
                              itemScope
                              itemType="http://schema.org/Offer"
                            >
                              <FancyPrice price={component.Price_Vat} />

                              <span className="d-none" itemProp="price">
                                {component.Price_Vat}
                              </span>
                              <span
                                itemProp="priceCurrency"
                                content="ZAR"
                                className="d-none"
                              ></span>
                            </div>
                            <Text className="f-12 text-secondary m-0">
                              Save{" "}
                              {currencyFormat(
                                component.Price - component.Price_Vat
                              )}{" "}
                              (
                              {(
                                ((component.Price - component.Price_Vat) /
                                  component.Price) *
                                100
                              ).toFixed(2)}
                              %)
                            </Text>
                          </>
                        ) : null}

                        <div className={`f-14 fw-2`}>
                          {showPrice ? (
                            <>
                              <span>Our Price </span>
                              <span
                                className={`${
                                  darkMode ? `text-dark` : ``
                                } bg-warning px-2 rounded-pill`}
                              >
                                {currencyFormat(
                                  (component.Price_Vat * 105) / 100
                                )}
                              </span>
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className={`span-full span-sm-1`}>
                        <div className="f-12 mt-1 fw-3">
                          Note: price include 15% V.A.T
                        </div>
                        <Text className="f-12 text-secondary lh-1">
                          Discount only available when paying by Instant EFT or
                          EFT *
                        </Text>
                      </div>

                      <div className="f-12 text-danger">
                        <span>{showQtyLimit ? showMaxQtyMsg : ""}</span>
                      </div>
                    </div>
                  )}
                  <div>
                    <Row className={`mt-2`}>
                      <Col>
                        <Stack
                          direction="horizontal"
                          className={`
                                    ${styles.MainQty}
                                    ${
                                      showQtyLimit && qtyLimit === "1"
                                        ? "d-none"
                                        : ""
                                    }
                                    ${
                                      showStatusText !== undefined &&
                                      showStatusText.trim().length > 0 &&
                                      showStatusText
                                        .toLowerCase()
                                        .includes("out of stock")
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
                      </Col>
                      {component.ShippingCharges === 0 && (
                        <Col className="d-inline-flex justify-content-center">
                          <Badge
                            bg="dark"
                            className={`pt-2 pb-2 pe-3 ps-3 ms-auto d-flex align-items-center ${styles.FreeDelivery}`}
                          >
                            <div className="fw-2">Free Delievery !</div>
                          </Badge>
                        </Col>
                      )}
                    </Row>
                    <div
                      className="text-center"
                      itemProp="offers"
                      itemScope={true}
                      itemType="http://schema.org/Offer"
                    >
                      <Badge
                        bg={stockBg}
                        className={`fs-6 my-2 rounded d-flex align-items-center justify-content-center ${styles.StockStatus}`}
                        itemProp="availability"
                        itemType={stockItemType}
                      >
                        <div className="fw-1">
                          {showStatusText !== undefined &&
                          showStatusText.trim().length > 0
                            ? showStatusText
                            : stockStatus}
                        </div>
                      </Badge>

                      <span className="d-none" itemProp="price">
                        {component.Price_Vat}
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
                        onClick={() => router.replace("/Cart")}
                      >
                        Go To Cart <FaArrowRight />
                      </Button>
                    ) : null}
                  </div>

                  {/* Pricing Section */}
                </Col>
              </Row>
              <Row>
                {/* Product Information Tabs */}
                <Col lg={10}>
                  <Tabs
                    defaultActiveKey={tabActive}
                    activeKey={tabActive}
                    id="justify-tab-example"
                    onSelect={(key: any) => setTabActive(key)}
                    className={`
                      ${styles.Tabs}
                      ${darkMode ? styles.darkMode : ``} 
                      mb-3
                    `}
                    justify
                  >
                    <Tab
                      eventKey="description"
                      className={`${styles.Tab}`}
                      title={`Description`}
                    >
                      <div
                        className={`${
                          darkMode ? `text-light` : ``
                        } container-fluid overflow-hidden Description`}
                      >
                        {!initOverview && <CustomeSpinner variant="warning" />}
                        <Row>
                          {initOverview &&
                            freeStuffInfo.length > 0 &&
                            freeStuffInfo.map((info: any) => {
                              return (
                                <Col
                                  key={info.imageUrl}
                                  lg={
                                    freeStuffInfo.length > 1
                                      ? 6
                                      : { span: 8, offset: 2 }
                                  }
                                >
                                  <LazyLoadImage
                                    src={`${info.imageurl}`}
                                    alt={`` + info.alt}
                                    itemProp="image"
                                    className="rounded img-fluid"
                                  />
                                </Col>
                              );
                            })}
                        </Row>
                        {initOverview && overview !== undefined && (
                          <ComponentOverview
                            HTML={
                              formatOverview(overview.Overview) +
                              formatOverview(upgradeKitOverview)
                            }
                          />
                        )}
                        {/* Flix-Media Overview */}
                        <div id="ccs-inline-content"></div>
                        <div id="flix-in">
                          <div id="flix-inpage"></div>
                        </div>

                        {showOverviewBrand &&
                          showOverviewPartNo &&
                          showOverviewType !== undefined &&
                          showOverviewType !== null &&
                          showOverviewType === 2 && (
                            <Helmet>
                              <script type="text/javascript">
                                {cnetScript
                                  .replace("###BRAND###", showOverviewBrand)
                                  .replace("###MPN###", showOverviewPartNo)
                                  .replace("###EAN", "")}
                              </script>
                            </Helmet>
                          )}

                        {/* {showOverviewType === 2 && (
                                <ScriptInjector
                                    HTML={cnetScript}
                                    MPN={showOverviewPartNo}
                                    Brand={showOverviewBrand}
                                    scriptFlag={cnetFlag}
                                    EAN={""}
                                    onScriptChange={onCnetScriptSet}
                                />
                                )} */}

                        {component !== undefined &&
                          component !== null &&
                          (showOverviewType === 3 ||
                            component.Brand === "Logitech") &&
                          helperCtx.flixMediaEnable && (
                            <Helmet>
                              <script type="text/javascript">
                                {flixScript
                                  .replace("###BRAND###", component.Brand)
                                  .replace(
                                    "###MPN###",
                                    showOverviewPartNo /* component.PalladiumPartno */
                                  )
                                  .replace("###EAN###", "")}
                              </script>
                            </Helmet>
                          )}

                        {/* {(showOverviewType === 3 ||
                                component.Brand === "Logitech") &&
                                flixMediaEnable && (
                                    <ScriptInjector
                                    HTML={flixScript}
                                    MPN={component.PalladiumPartno}
                                    Brand={component.Brand}
                                    EAN={""}
                                    scriptFlag={flixFlag}
                                    onScriptChange={onFlixScriptSet}
                                    />
                                )} */}
                      </div>
                    </Tab>

                    {showOverviewGallery ? (
                      <Tab
                        eventKey="gallery"
                        className={`${styles.Tab}`}
                        title="Gallery"
                      >
                        <LazyLoadComponent>
                          <div
                            className={`d-grid gap-3 cols-2 cols-md-3 cols-xl-4 mt-4 App`}
                          >
                            {_.filter(galleryData, (gall: any, ind: any) => {
                              return ind !== 0 && gall;
                            }).map((img: any) => {
                              return (
                                <OverviewGallery
                                  Image={img.original}
                                  key={nanoid(7)}
                                />
                              );
                            })}
                          </div>
                        </LazyLoadComponent>
                      </Tab>
                    ) : null}

                    <Tab
                      eventKey="similarProduct"
                      className={`${styles.Tab}`}
                      title={"Similar Products (" + similarCnt + ")"}
                    >
                      {/* Similar Products */}
                      <div className="wrapper" id="similar-products">
                        <SimilarProductList Products={similarProducts} />
                      </div>
                      {/* Similar Products */}
                    </Tab>
                  </Tabs>

                  {/* Contact Card */}
                  <div
                    className={`
                  border p-3 pb-0 rounded mt-4
                  ${
                    darkMode
                      ? `bg-black text-light border-secondary border-opacity-50`
                      : `bg-light`
                  }
                `}
                  >
                    <p>
                      If there is a particular component or spec that you are
                      looking for which is not available on our website, please
                      call us on 010 786 0044 / 012 653 0033 or Email us and we
                      will do our best to meet your requirements.
                    </p>
                    <p>
                      <span className={`fw-3`}>Please Note: </span>Product
                      images are for illustrative purposes only and may differ
                      from the actual product.
                    </p>
                  </div>

                  {/* Brand Card */}
                  <BrandCard
                    product={component}
                    onBrandCardUpdate={onBrandCardUpdate}
                  />
                </Col>
                {/* Product Information Tabs */}
                <Col lg={2}>
                  {/* <PCBanners /> */}
                  <ComponentDetailBanners />
                </Col>
              </Row>
            </div>
          </Container>

          <ProductFooter
            showbuynow={showBuyNow}
            showaddcart={showAddCart}
            product={component}
            stockstatus={stockStatus}
            showdiscountedprice={showDiscountedPrice}
            Ptype={2}
            TotalPrice={totalPrice}
            onAddToCart={(e: any) => {
              addToCartHandler(e);
            }}
            onOpenNotify={() => setModalNotifyShow(true)}
            showNotify={showNotify}
          />
          <NotifyMe
            show={modalNotifyShow}
            onHide={() => setModalNotifyShow(false)}
            productid={component.ProductID}
            producttitle={component.Name}
            productprice={component.Price}
            producturl={`https://www.evetech.co.za/${_.replace(
              _.toLower(component.Title),
              new RegExp(" ", "g"),
              "-"
            ).trim()}/best-deal/${component.ProductID}.aspx`}
          />
          <WishModal
            isShow={showWish}
            isReload={reloadWish}
            onClose={onWishClose}
          />

          {authCtx !== undefined && authCtx.isAdmin ? (
            <EditProductOverlay productId={component.ProductID} pType={2} />
          ) : null}
        </div>
      )}

      {!initInfo && <CustomeSpinner variant="info" />}
    </>
  );
};

export default ViewProduct;
