import { currencyFormat } from "@/components/DynamicCard/FpsFunctions";
import { useTheme } from "@/store/ThemeContext";
import React from "react";

const OldPrice = ({ Product, styles }: any) => {
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;
  return (
    <>
      <div
        className={`${styles.Products__Heading} text-danger lh-1 text-xl-end text-center overflow-hidden`}
      >
        <div
          className={`
                    ${darkMode ? `` : `text-danger`}
                  `}
          style={{
            color: darkMode ? `rgb(231, 219, 29)` : ``,
          }}
        >
          <span className="fs-6">
            <span className="fw-3">Save:</span>{" "}
            {(
              100 -
              (parseFloat(Product.price) * 100) / parseFloat(Product.oldprice)
            ).toFixed(2)}
            %
          </span>
          <small>
            <small>
              &nbsp;({currencyFormat(Product.oldprice - Product.price)})
            </small>
          </small>
        </div>
      </div>
    </>
  );
};

export default OldPrice;
