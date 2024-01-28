import React from "react";
import LoadingSpinner from "@/components/Spinner";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import NoPageData from "@/components/NoPageData";
import _ from "lodash";
import { nanoid } from "nanoid";
import { Form } from "react-bootstrap";
import { useTheme } from "@/store/ThemeContext";

const CardsWrapper = ({
  children,
  initInfo,
  products,
  onUpdateProductCount,
  filterRange,
  activeGames,
  gamingPCs,
  filteredGame,
  setFilteredGame,
  findPerformance,
  styles,
}: any) => {
  const isHD = useMediaQuery("(min-width: 1921px)");
  const { isDarkMode } = useTheme();

  return (
    <>
      {initInfo &&
      activeGames !== undefined &&
      activeGames.length > 1 &&
      gamingPCs !== undefined &&
      gamingPCs.length > 0 &&
      findPerformance() ? (
        <div
          className={`${styles.FpsSelector} d-grid position-sticky z-index-1 pe-none`}
        >
          <div className="d-flex bg-danger rounded">
            <div className="text-light fst-italic px-2 d-flex align-items-center fw-2">
              FPS
            </div>
            <Form.Select
              onChange={(e) => setFilteredGame(e.target.value)}
              value={filteredGame}
              size="sm"
              className={`
                pe-auto
                ${isDarkMode ? `bg-black text-light border-danger` : ``}
              `}
            >
              {activeGames.map((Select: any) => {
                return (
                  <option value={Select.gameTitle} key={nanoid(7)}>
                    {Select.gameTitle}
                  </option>
                );
              })}
            </Form.Select>
          </div>
        </div>
      ) : null}
      <div
        className={`
                    ${isHD ? `cols-xxl-5` : `cols-xxl-4`}
                    d-grid cols-2 cols-md-3 cols-lg-4 gap-xxl-5 gap-2 gap-sm-3 py-4
                `}
        id="productCards"
      >
        {!initInfo && (
          <>
            <LoadingSpinner isEve={false} className="w-100 h-100" />
            <LoadingSpinner isEve={false} className="w-100 h-100" />
            <LoadingSpinner isEve={false} className="w-100 h-100" />
            <LoadingSpinner isEve={false} className="w-100 h-100" />
            <LoadingSpinner isEve={false} className="w-100 h-100" />
            <LoadingSpinner isEve={false} className="w-100 h-100" />
            <LoadingSpinner isEve={false} className="w-100 h-100" />
            <LoadingSpinner isEve={false} className="w-100 h-100" />
            <LoadingSpinner isEve={false} className="w-100 h-100" />
            <LoadingSpinner isEve={false} className="w-100 h-100" />
          </>
        )}

        <svg width="0" height="0" className="position-absolute">
          <linearGradient id="purpleGradient1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#AF40FF" />
            <stop offset="50%" stopColor="#5B42F3" />
            <stop offset="100%" stopColor="#00DDEB" />
          </linearGradient>
          {/* Level up  */}
          <linearGradient id="LevelUp" x1={"0"} x2={"1"} y1={"0"} y2={"1"}>
            <stop offset="0%" stopColor={"#5757D9"} />
            <stop offset="100%" stopColor={"#21D9F7"} />
          </linearGradient>
          {/* Clearance  */}
          <linearGradient id="Clearance" x1={"1"} x2={"0"} y1={"1"} y2={"0"}>
            <stop offset="0%" stopColor={"#f25025"} />
            <stop offset="100%" stopColor={"#ff8e41"} />
          </linearGradient>
        </svg>

        {children}

        {onUpdateProductCount(
          filterRange !== null &&
            filterRange.min !== undefined &&
            filterRange.max !== undefined
            ? _.filter(products, (product: any) => {
                if (
                  product.price >= filterRange.min &&
                  product.price <= filterRange.max
                )
                  return product;
              }).length
            : products.length
        )}

        {initInfo && products.length < 1 ? (
          <div className="span-full">
            <NoPageData />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default CardsWrapper;
