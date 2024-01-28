import React, { useContext } from "react";
// import CommonContext from "../../../Store/common-context";
import styles from "@/styles/Price.module.scss";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { useTheme } from "@/store/ThemeContext";

const FancyPrice = ({ price, className, style }: any) => {
  const isLG = useMediaQuery("(min-width: 1200px)");
  const { isDarkMode } = useTheme();

  const currencyFormat = (num: any) => {
    try {
      return "R " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  return (
    <>
      <div
        className={`
          ${className}
          ${styles.Price}
          ${isDarkMode ? styles.darkMode : ``}
          fw-2
        `}
        style={style}
      >
        {currencyFormat(price)}
      </div>
    </>
  );
};

export default FancyPrice;
