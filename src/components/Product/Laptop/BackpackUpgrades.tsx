import React, { useState, useEffect } from "react";
import {
  Accordion,
  Button,
  ButtonGroup,
  Card,
  Image,
  Modal,
} from "react-bootstrap";
import {
  FaCheckCircle,
  FaPlus,
  FaSearchPlus,
  FaShoppingBag,
} from "react-icons/fa";
import styles from "@/styles/Upgrades.module.scss";
import { customAlphabet } from "nanoid";
import ComponentOverview from "@/components/Product/ComponentOverview";
import OverviewGallery from "@/components/Gallery/OverviewGallery";
import { useTheme } from "@/store/ThemeContext";
import { ProductAPI } from "@/custom/utils/actions";
import { isBodyDark, isDarkHeaderFooter } from "@/components/Auth/LoginModal";
import darkModalStyles from "@/styles/DarkModal.module.scss";

const nanoid = customAlphabet("1234567890abcdef", 10);
var _ = require("lodash");

const BackpackUpgrades = (props: any) => {
  let backpackBundles = props.BackpackBundles;
  let cards = null;
  let cardsSet = false;
  const [show, setShow] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);
  const [popUpAnimate, setPopUpAnimate] = useState(false);
  const [productTitle, setProductTitle] = useState("");
  const [gallery, setGallery] = useState({});
  const [overview, setOverview] = useState<any>({});
  const [backPackShow, setBackPackShow] = useState(false);
  const [galleryData, setGalleryData] = useState([
    {
      original: "",
      thumbnail: "",
    },
  ]);
  const items = props.items;

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const currencyFormat = (num: any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  const stripHtml = (str: any) => {
    return str.replace(/(<([^>]+)>)/gi, "");
  };

  const getOverview = async (productId: any) => {
    const overviewData = await ProductAPI.getComponentOverview({
      productId: productId,
    });

    if (
      overviewData !== undefined &&
      overviewData !== null &&
      overviewData.result !== null &&
      overviewData.result !== undefined &&
      overviewData.result.length > 0
    ) {
      let prodOverview = overviewData.result[0];
      setOverview((prevOverview: any) => {
        prevOverview = prodOverview;
        return prevOverview;
      });
    }
  };

  const getGallery = async (ProductId: any) => {
    let galleryImages: any = [];

    const galleryData = await ProductAPI.getComponentGallery({
      productId: ProductId,
    });

    if (
      galleryData !== undefined &&
      galleryData !== null &&
      galleryData.result !== null &&
      galleryData.result !== undefined &&
      galleryData.result.length > 0
    ) {
      let gallery = galleryData.result[0];
      console.log("galleryData", galleryData.result[0]);
      setGallery((prevGallery) => {
        prevGallery = gallery;
        try {
          let images = gallery.ImageGallery.split("|").map((image: any) => {
            return `https://www.evetech.co.za/${image}`;
          });

          for (let i = 0; i < images.length; i++) {
            galleryImages.push({
              original: images[i],
              thumbnail: images[i],
            });
          }

          /* Set Images to gallery data */
          setGalleryData((prevGalleryData: any) => {
            prevGalleryData = galleryImages;
            return galleryImages;
          });
        } catch (e) {}
        return prevGallery;
      });
    }
  };

  const quickView = (pid: any, title: any) => {
    setShow(true);
    getOverview(pid);
    getGallery(pid);
    setProductTitle(title);
  };

  const backpackSelect = (bundle: any) => {
    props.onBackpackSelect(bundle);
  };

  if (
    backpackBundles != null &&
    backpackBundles !== undefined &&
    backpackBundles.length > 0 &&
    !cardsSet
  ) {
    cards = backpackBundles.map((bundle: any) => {
      const SelectedElements = () => {
        return (
          <div
            className={`
              ${styles.BundleCheckMark}
              position-absolute top-0 end-0
            `}
            key={nanoid(8)}
          >
            <div
              className={`bg-info pt-2 pb-3 position-absolute end-0 w-50`}
            ></div>
            <div
              className={`p-2 rounded-circle fs-3 text-white bg-info position-relative`}
            >
              <FaCheckCircle />
            </div>
          </div>
        );
      };

      return (
        <Card
          className={` 
            ${bundle.isActive ? "border-info" : ""} 
            ${bundle.isActive ? `${styles.Selected}` : ``}
            ${styles.Card}
            ${darkMode ? `bg-dark text-light border-opacity-50` : ``}
            shadow lh-1 p-2 gap-1 overflow-hidden position-relative flex-grow-1
         `}
          key={nanoid(7)}
        >
          <div className={`overflow-hidden bg-light rounded position-relative`}>
            <Image
              src={`https://www.evetech.co.za/${bundle.ProductImage}`}
              alt={bundle.pTitle}
              className={`img-fluid w-100 h-100 object-fit-contain p-2 position-absolute top-0 start-0`}
            />
          </div>
          <small className={`text-break`}>{bundle.pTitle}</small>
          <p className={`fw-2 text-success m-0`}>
            {currencyFormat(bundle.price)}
          </p>
          {bundle.isActive ? <SelectedElements /> : null}
          <div
            className={`${styles.HoverOverlay} position-absolute w-100 h-100 start-0 top-0`}
          >
            <div
              className={`position-absolute w-100 h-100 bg-secondary opacity-25`}
            ></div>
            <div
              className={`position-relative d-flex align-items-center justify-content-center w-100 h-100 rounded border border-dark`}
            >
              <ButtonGroup vertical>
                <Button
                  variant="primary"
                  onClick={() => {
                    quickView(bundle.pid, bundle.pTitle);
                  }}
                >
                  <FaSearchPlus className={`me-1`} />
                  View
                </Button>
                {!bundle.isActive ? (
                  <Button
                    variant="info"
                    onClick={() => {
                      setIsAnimate(false);
                      backpackSelect(bundle);
                    }}
                  >
                    <FaPlus className={`me-1`} />
                    Add
                  </Button>
                ) : null}
              </ButtonGroup>
            </div>
          </div>
        </Card>
      );
    });
    cardsSet = true;
  }

  useEffect(() => {
    setIsAnimate(true);
  }, []);

  const getLayout = (amount: any) => {
    switch (amount) {
      case 1:
        return styles.PopUp_1;
      case 2:
        return styles.PopUp_2;
      case 3:
        return styles.PopUp_3;
      case 4:
        return styles.PopUp_4;
      case 5:
        return styles.PopUp_3;
      case 6:
        return styles.PopUp_3;
      case 7:
        return styles.PopUp_4;
      case 8:
        return styles.PopUp_4;
      case 9:
        return styles.PopUp_3;
      case 10:
        return styles.PopUp_4;
      default:
        return styles.PopUp_4;
    }
  };

  return (
    <div className={`${styles.BackPackUpgrades}`}>
      <span className="w-100 h-100 position-relative">
        <Button
          className={`
            ${darkMode ? `btn-dark border-secondary` : `btn-light border-dark`}
            btn bg-gradient gap-2 w-100 h-100
          `}
          title="Backpack Upgrades"
          onClick={() => {
            setPopUpAnimate(true);
            setBackPackShow(true);
          }}
        >
          <small>
            <FaShoppingBag className="text-primary" />{" "}
            <small>Backpack Upgrades</small>
          </small>
        </Button>
        <span>
          <div
            className={`position-relative d-flex justify-content-start justify-content-sm-end z-index-3`}
          >
            <div
              className={`
                ${styles.Overlay} 
                ${backPackShow ? styles.Show : "pe-none"}
                position-fixed start-0 top-0 vw-100 vh-100
              `}
              onClick={() => setBackPackShow(false)}
            ></div>
            <div
              className={`
                ${styles.PopUp} 
                ${getLayout(items)} 
                ${backPackShow ? styles.Show : ""}
                ${popUpAnimate && !backPackShow ? styles.Hide : ""}
                ${!popUpAnimate && !backPackShow ? styles.DefaultHide : ""}
                ${
                  darkMode
                    ? `${styles.darkMode} border-secondary bg-black`
                    : `border-dark bg-light`
                }
                position-absolute border border-1 rounded z-index-2 py-2 pb-3 mx-auto shadow shadow-3
              `}
            >
              <div
                className={`d-flex gap-2 justify-content-center flex-wrap px-3 pt-3 pb-4`}
              >
                {cards}
              </div>
              <span
                className={`position-absolute end-0 bottom-0 rounded-top-start-2 overflow-hidden`}
              >
                <Button
                  variant="danger"
                  className={`rounded-0`}
                  size="sm"
                  onClick={() => setBackPackShow(false)}
                >
                  Close
                </Button>
              </span>
            </div>
          </div>

          <Modal
            size="lg"
            show={show}
            onHide={() => {
              setShow(false);
            }}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header
              closeButton
              className={`
                ${darkMode ? darkModalStyles.darkHeader : ``}
                ${isDarkHeaderFooter(darkMode)}
              `}
            >
              <Modal.Title id="example-modal-sizes-title-lg">
                {productTitle}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={`${isBodyDark(darkMode)}`}>
              <div
                className={`d-grid gap-3 cols-2 cols-md-3 cols-xl-4 mt-4 App`}
              >
                {galleryData.map((img) => {
                  return (
                    <OverviewGallery Image={img.original} key={nanoid(9)} />
                  );
                })}
              </div>
              <div className="container-fluid overflow-hidden">
                <ComponentOverview HTML={overview.Overview} />
              </div>
            </Modal.Body>
          </Modal>
        </span>
      </span>
    </div>
  );
};
export default BackpackUpgrades;
