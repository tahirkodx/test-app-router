import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import CompLink from "@/components/Specials/CompSpecials/CompCard/CompLink";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { FaEye } from "react-icons/fa";
import { RiHeartAddLine } from "react-icons/ri";
import WishModal from "@/components/Modals/WishModal";
import Swal from "sweetalert2";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import StockStatus from "@/components/Specials/CompSpecials/CompCard/StockStatus";
import SpecialTags from "@/components/Specials/CompSpecials/CompCard/SpecialTags";
import { useTheme } from "@/store/ThemeContext";
import FancyPrice from "@/components/FancyPrice";
import UserAPI from "@/custom/utils/actions/user";
import WishlistButton from "@/components/WishlistButton";

const CompCard = ({ styles, component, helperCtx }: any) => {
  const isSM = useMediaQuery("(min-width: 576px)");

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  return (
    <>
      <Card
        className={`
          ${styles.ListCard} 
          ${styles.HoverGrow}
          ${darkMode ? `border-primary border-opacity-50 bg-dark` : ``} 
          p-0 shadow d-grid gap-1 h-100 position-relative pb-2 pb-sm-3 overflow-hidden
        `}
      >
        <div className="d-flex-row align-items-center justify-content-center text-center p-3 shadow position-relative bg-white">
          <CompLink component={component}>
            <Image
              fluid
              src={`https://www.evetech.co.za/${component.imageurl}`}
              alt={component.url}
              className={styles.ListCard__Image}
            />
          </CompLink>
          <div className="position-absolute bottom-0 end-0 p-2 p-lg-3">
            <WishlistButton component={component} />
          </div>
          <SpecialTags component={component} helperCtx={helperCtx} />
        </div>

        <div className={`${styles.LoveCard__Info} d-grid gap-2`}>
          <CompLink
            component={component}
            className="overflow-hidden text-decoration-none"
          >
            <h3
              className={`
                    ${isSM ? `` : `lh-1`}
                    ${darkMode ? `text-light` : `text-dark`} 
                    text-center p-2 pb-0 mb-0 px-2 px-sm-3 pt-1 pt-sm-2 fs-6
                `}
            >
              {isSM ? <>{component.pName}</> : <small>{component.pName}</small>}
            </h3>
          </CompLink>

          <div
            className={`
              lh-1 d-grid cols-sm-2 gap-1 align-content-center align-items-center px-2 px-sm-3
            `}
          >
            <div
              className={`
                ${isSM ? `text-start` : `text-center`} 
              `}
            >
              <FancyPrice price={component.price} />
            </div>
            <StockStatus component={component} />
          </div>
        </div>
      </Card>
    </>
  );
};

export default CompCard;
