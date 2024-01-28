import React, { useEffect, useRef, useState } from "react";
import { Accordion, Button, ButtonGroup, Card, Image } from "react-bootstrap";
import { FaCheckCircle, FaPlus, FaWindows } from "react-icons/fa";
import styles from "@/styles/Upgrades.module.scss";
import { customAlphabet } from "nanoid";
import { useTheme } from "@/store/ThemeContext";

const nanoid = customAlphabet("1234567890abcdef", 10);

var _ = require("lodash");

const OfficeUpgrades = (props: any) => {
  const usePrevious = (value: any) => {
    const ref = useRef(value);

    useEffect(() => {
      ref.current = value;
    });

    return ref.current;
  };

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const [officeBundles, setOfficeBundles] = useState(
    props.OffceBundles !== undefined ? props.OffceBundles : []
  );
  let cards = null;
  let cardsSet = false;
  const [officeShow, setOfficeShow] = useState(false);
  const [isAnimate, setIsAnimate] = useState(false);
  const [popUpAnimate, setPopUpAnimate] = useState(false);
  const items = props.items;

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

  const cardClick = (
    title: any,
    price: any,
    bundleId: any,
    id: any,
    pid: any
  ) => {
    setIsAnimate(false);
    props.onBundleSelection({
      BundleId: bundleId,
      Title: title,
      Price: price,
      Id: id,
      pid: pid,
    });
  };

  useEffect(() => {
    setIsAnimate(true);
    setOfficeBundles(props.OffceBundles);
  }, [props.OffceBundles]);

  useEffect(() => {}, [officeBundles]);

  if (
    officeBundles != null &&
    officeBundles !== undefined &&
    officeBundles.length > 0 &&
    !cardsSet
  ) {
    cards = officeBundles.map((bundle: any) => {
      const HoverOverlay = () => {
        return (
          <div
            className={`${styles.HoverOverlay} position-absolute w-100 h-100 start-0 top-0 cursor-pointer`}
            onClick={() => {
              cardClick(
                stripHtml(bundle.Title),
                bundle.Price,
                bundle.BundleID,
                bundle.OptionId,
                bundle.ProductId
              );
            }}
          >
            <div
              className={`position-absolute w-100 h-100 bg-secondary opacity-25`}
            ></div>
            <div
              className={`position-relative d-flex align-items-center justify-content-center w-100 h-100 rounded border border-secondary border-opacity-50`}
            >
              <ButtonGroup vertical>
                <Button variant="info">
                  <FaPlus className={`me-1`} />
                  Add
                </Button>
              </ButtonGroup>
            </div>
          </div>
        );
      };

      const SelectedElements = () => {
        return (
          <div
            className={`${
              isAnimate && styles.BundleCheckMark
            } position-absolute top-0 end-0`}
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
          className={
            (bundle.isSelected ? `border-info` : ``) +
            (isAnimate && bundle.isSelected ? ` ${styles.Selected}` : ``) +
            `
            ${styles.Card}
            ${darkMode ? `bg-dark text-light border-opacity-50` : ``} 
            shadow lh-1 p-2 gap-1 overflow-hidden position-relative flex-grow-1
          `
          }
          // inClick={() => setSelectedBundle(bundle.ImageId)}
          key={nanoid(7)}
        >
          <div className={`overflow-hidden bg-light rounded position-relative`}>
            <Image
              src={bundle.ImageUrl}
              alt={bundle.Title}
              className={`img-fluid w-100 h-100 object-fit-contain p-2 position-absolute top-0 start-0`}
            />
          </div>
          <small className={`text-break`}>{bundle.Title.split("[")[0]}</small>
          <p className={`fw-2 text-success m-0`}>
            {currencyFormat(bundle.Price)}
          </p>
          {bundle.isSelected ? <SelectedElements /> : <HoverOverlay />}
        </Card>
      );
    });
    cardsSet = true;
  }

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
    <div className={`${styles.OfficeUpgrades}`}>
      <span className="w-100 h-100 position-relative">
        <Button
          className={`
          ${darkMode ? `btn-dark border-secondary` : `btn-light border-dark`}
          btn bg-gradient gap-2 w-100 h-100
        `}
          title="Office Upgrades"
          onClick={() => {
            setPopUpAnimate(true);
            setOfficeShow(true);
          }}
        >
          <small>
            <FaWindows className="text-danger" /> <small>Office Upgrades</small>
          </small>
        </Button>

        <span>
          <div
            className={`position-relative d-flex justify-content-end z-index-3`}
          >
            <div
              className={`${styles.Overlay} ${
                officeShow ? styles.Show : "pe-none"
              } position-fixed start-0 top-0 vw-100 vh-100`}
              onClick={() => setOfficeShow(false)}
            ></div>
            <div
              className={`
                ${styles.PopUp} 
                ${getLayout(items)} 
                ${officeShow ? styles.Show : ""}
                ${popUpAnimate && !officeShow ? styles.Hide : ""}
                ${!popUpAnimate && !officeShow ? styles.DefaultHide : ""}
                ${
                  darkMode
                    ? `${styles.darkMode} border-secondary bg-black`
                    : `border-dark bg-light`
                }
                position-absolute border border-1 border-dark rounded z-index-2 bg-light py-2 pb-3 mx-auto shadow shadow-3
              `}
            >
              <div
                className={`${styles.Cards} overflow-auto Scrollbar-01 d-flex gap-2 justify-content-center flex-wrap px-3 pt-3 pb-4`}
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
                  onClick={() => setOfficeShow(false)}
                >
                  Close
                </Button>
              </span>
            </div>
          </div>
        </span>
      </span>
    </div>
  );
};

export default OfficeUpgrades;
