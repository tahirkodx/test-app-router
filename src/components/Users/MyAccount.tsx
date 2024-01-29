import React from "react";

import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { FaIconDynamic as Icon } from "@ui-layouts";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/store/auth-context";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import styles from "@/styles/User.module.scss";
import UserAPI from "@/custom/utils/actions/user";
import { useTheme } from "@/store/ThemeContext";

const MyAccount = ({ clickOrders, clickRequests, clickWish }: any) => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalWish, setTotalWish] = useState(0);
  const [totalErma, setTotalErma] = useState(0);
  const [initInfo, setInitInfo] = useState(false);
  const [userSumm, setUserSumm] = useState("");
  const [userServerSumm, setUserServerSumm] = useState("");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      /* get token validate token */

      const userSummary = async () => {
        const summary = await UserAPI.getUserSummary();

        try {
          let userSumm = summary.result[0];
          setUserServerSumm(userSumm);
          setTotalOrders(userSumm.TotalOrders);
          setTotalWish(userSumm.TotalWish);
        } catch (e) {
          if (
            summary.message !== undefined &&
            summary.message === "Not authenticated."
          ) {
            authCtx.onLogout();
          }
        }
      };

      const userEserverSummary = async () => {
        const summary = await UserAPI.getUserSummary();

        try {
          let userSumm = summary.result;
          setUserSumm(userSumm);
          setTotalErma(userSumm.TotalRMA);
        } catch (e) {
          if (
            summary.message !== undefined &&
            summary.message === "Not authenticated."
          ) {
            authCtx.onLogout();
          }
        }
        setInitInfo(true);
      };

      if (!userSumm && !userServerSumm) {
        userSummary();
        userEserverSummary();
      }
    } else {
      router.push("/");
    }
  }, []);

  return (
    initInfo && (
      <>
        <div
          className={`
            d-flex justify-content-between align-items-center flex-wrap gap-1 border-bottom pb-3
            ${
              darkMode
                ? `border-secondary border-opacity-50 text-light`
                : `border-dark`
            }
          `}
        >
          <h2 className="m-0">
            <Icon type="FaUserCircle" /> My Account
          </h2>
        </div>
        <div className="d-grid gap-2 gap-sm-3 cols-3">
          <Card
            key="card-orders"
            className={`
              shadow overflow-hidden p-2 p-sm-3 cursor-pointer hover-grow-2 position-relative 
              ${styles.MyAccountCard}
              ${
                darkMode
                  ? `bg-black border-secondary border-opacity-75 text-light`
                  : ``
              }
            `}
            onClick={clickOrders}
          >
            <Stack gap={1}>
              <div className="d-flex justify-content-between align-items-center fs-3">
                <span className="text-secondary">
                  <Icon type={"FaShoppingCart"} />
                </span>
                <div className="fs-3 fw-2">{totalOrders}</div>
              </div>
              <h3 className="fs-5 fw-1">Total Orders</h3>
            </Stack>
            <div className="position-absolute top-0 start-0 w-100 h-100 border border-primary rounded"></div>
          </Card>
          <Card
            key="card-warranty"
            className={`
              shadow overflow-hidden p-2 p-sm-3 cursor-pointer hover-grow-2 position-relative 
              ${styles.MyAccountCard}
              ${
                darkMode
                  ? `bg-black border-secondary border-opacity-75 text-light`
                  : ``
              }
            `}
            onClick={clickRequests}
          >
            <Stack gap={1}>
              <div className="d-flex justify-content-between align-items-center fs-3">
                <span className="text-secondary">
                  <Icon type={"FaUndoAlt"} />
                </span>
                <div className="fs-3 fw-2">{totalErma}</div>
              </div>
              <h3 className="fs-5 fw-1">Warranty</h3>
            </Stack>
            <div className="position-absolute top-0 start-0 w-100 h-100 border border-primary rounded"></div>
          </Card>
          <Card
            key="card-wish"
            className={`
              shadow overflow-hidden p-2 p-sm-3 cursor-pointer hover-grow-2 position-relative 
              ${styles.MyAccountCard}
              ${
                darkMode
                  ? `bg-black border-secondary border-opacity-75 text-light`
                  : ``
              }
            `}
            onClick={clickWish}
          >
            <Stack gap={1}>
              <div className="d-flex justify-content-between align-items-center fs-3">
                <span className="text-secondary">
                  <Icon type={"FaHeart"} />
                </span>
                <div className="fs-3 fw-2">{totalWish}</div>
              </div>
              <h3 className="fs-5 fw-1">My Wishlist</h3>
            </Stack>
            <div className="position-absolute top-0 start-0 w-100 h-100 border border-primary rounded"></div>
          </Card>
        </div>
      </>
    )
  );
};

export default MyAccount;
