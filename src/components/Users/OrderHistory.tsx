import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import styles from "@/styles/User.module.scss";
import { FaIconDynamic as Icon } from "@ui-layouts";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/store/auth-context";
import { useState } from "react";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import Paginator from "@/components/Paginator/Paginator";
import useClickScroll from "@/custom/hooks/useClickScroll";
import OrderDetail from "@/components/Main/Controls/User/OrderDetail";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import UserAPI from "@/custom/utils/actions/user";
import { useTheme } from "@/store/ThemeContext";
import Heading from "@/components/Heading";
const _ = require("lodash");

const OrderHistory = () => {
  const { clickScroll } = useClickScroll();
  const authCtx = useContext<any>(AuthContext);
  const router = useRouter();
  const [onlineOrders, setOnlineOrders] = useState<any>([]);
  const [offlineOrders, setOfflineOrders] = useState<any>([]);

  const [totalPage, setTotalPage] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const [refreshPages, setRefereshPages] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);

  const [offTotalPage, setOffTotalPage] = useState(1);
  const [offActivePage, setOffActivePage] = useState(1);
  const [offRefreshPages, setOffRefereshPages] = useState(false);
  const [offlineCount, setOfflineCount] = useState(0);
  const isLG = useMediaQuery("(min-width: 992px)");
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const scrollTopOrders = () => {
    clickScroll("OrdersTabs", 110);
  };

  const pageProds = 10;

  const onActivePageSet = (active: any) => {
    setActivePage(active);
  };

  const setPagination = (count: any) => {
    setTotalPage(count > pageProds ? Math.ceil(count / pageProds) : 1);
    setRefereshPages(false);
  };

  const onOffActivePageSet = (active: any) => {
    setOffActivePage(active);
  };

  const setOffPagination = (count: any) => {
    setOffTotalPage(count > pageProds ? Math.ceil(count / pageProds) : 1);
    setOffRefereshPages(false);
  };

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      /* get token validate token */
      const getUserOnlineOrders = async () => {
        const summary = await UserAPI.getUserOrders({
          userid: authCtx.user.id,
        });

        if (summary.result !== undefined && summary.result.length > 0) {
          try {
            let orderSumm = summary.result;
            if (orderSumm) {
              setOnlineOrders(orderSumm);

              if (orderSumm !== undefined && orderSumm.length > 0) {
                setOnlineCount(orderSumm.length);
                setPagination(orderSumm.length);
              }
            }
          } catch (e) {
            if (
              summary.message !== undefined &&
              summary.message === "Not authenticated."
            ) {
              if (authCtx.token === undefined) authCtx.onLogout();
              /* Show Login */
              /* once extend remove below code */
              authCtx.onLogout();
            }
          }
        }
      };

      const getUserOfflineOrders = async () => {
        const summary = await UserAPI.getUserOfflineOrders({
          cid: authCtx.user.CID,
        });
        if (
          summary !== undefined &&
          summary.result !== undefined &&
          summary.result.length > 0
        ) {
          let orderSumm = summary.result;
          if (orderSumm !== undefined && orderSumm.length > 0)
            setOfflineOrders(orderSumm);
          setOfflineCount(orderSumm.length);
          setOffPagination(orderSumm.length);
        }
      };

      getUserOnlineOrders();
      getUserOfflineOrders();
    } else {
      router.push("/");
    }
  }, []);

  const getPayImage = (pay: any) => {
    switch (pay) {
      case "Eft":
        return (
          <Image
            fluid
            src="https://www.evetech.co.za/user/images/eft.jpg"
            alt=""
            className={`${isLG ? "" : "h-100"} img-contain`}
          />
        );
      case "EFT/Bank Deposit":
        return (
          <Image
            fluid
            alt=""
            src="https://www.evetech.co.za/user/images/eft.jpg"
            className={`${isLG ? "" : "h-100"} img-contain`}
          />
        );
      case "Credit Card":
        return (
          <Image
            fluid
            alt=""
            src="https://www.evetech.co.za/user/images/credit-card.jpg"
            className={`${isLG ? "" : "h-100"} img-contain`}
          />
        );
      case "Instant EFT":
        return (
          <Image
            fluid
            alt=""
            src="https://www.evetech.co.za/images/instanteft-149px-v1.jpg"
            className={`${isLG ? "" : "h-100"} img-contain`}
          />
        );
      case "Instant Eft":
        return (
          <Image
            fluid
            src="https://www.evetech.co.za/images/instanteft-149px-v1.jpg"
            alt=""
            className={`${isLG ? "" : "h-100"} img-contain`}
          />
        );
      case "Ozow":
        return (
          <Image
            fluid
            alt=""
            src="https://www.evetech.co.za/images/instanteft-149px-v1.jpg"
            className={`${isLG ? "" : "h-100"} img-contain`}
          />
        );
      case "Cash":
        return (
          <Image
            fluid
            alt=""
            src="https://www.evetech.co.za/user/images/cash.jpg"
            className={`${isLG ? "" : "h-100"} img-contain`}
          />
        );
      default:
        return pay;
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-1 border-bottom border-dark pb-3 position-relative z-index-1">
        <Heading level={2} className="m-0">
          <Icon type="FaShoppingCart" /> Order History
        </Heading>
      </div>
      <div id="OrdersTabs">
        <Tabs
          id="OrderHistoryTabs"
          className={`
            ${styles.OrderHistoryTabs} 
            ${darkMode ? styles.darkMode : ``} 
            border-bottom-0
          `}
        >
          {onlineOrders !== undefined && onlineOrders.length > 0 && (
            <Tab
              key={`Order1`}
              eventKey={`Order1`}
              title={"Online Orders"}
              className={`
                shadow border-top-0 rounded-bottom rounded-end overflow-hidden
                ${
                  darkMode
                    ? `bg-black text-light bg-opacity-25 border-dark`
                    : ``
                }
              `}
            >
              <div className={`${styles.Orders__Content} `}>
                {onlineOrders.map(
                  (Order: any, index: any) =>
                    index >= pageProds * activePage - pageProds &&
                    index < pageProds * activePage && (
                      <div
                        className={`${styles.Orders__Columns} ${styles.Orders__Order} d-grid cols-10`}
                        key={nanoid(4)}
                      >
                        <div
                          className={`${styles.Orders__Columns} ${styles.Orders__Headings} bg-dark text-light d-grid cols-1 cols-sm-10 span-5 span-sm-full`}
                        >
                          <small className="p-1 p-md-2">#</small>
                          <small className="p-1 p-md-2">Pay Via</small>
                          <small className="p-1 p-md-2">Order No</small>
                          <small className="p-1 p-md-2">Shipping Method</small>
                          <small className="p-1 p-md-2">Date</small>
                          <small className="p-1 p-md-2">Waybill No.</small>
                          <small className="p-1 p-md-2">Status</small>
                        </div>
                        <div
                          className={`${styles.Orders__Columns} ${styles.Orders__ContentColumns} d-grid d-grid cols-1 cols-sm-10 span-5 span-sm-full`}
                        >
                          <small className="p-1 p-md-2">{index + 1}</small>
                          <small className="p-1 p-md-2">
                            {getPayImage(Order.paymentType)}
                          </small>
                          <small className="p-1 p-md-2">
                            <span className="text-break">
                              <OrderDetail
                                OrderNumber={Order.OrderNumber}
                                OrderId={Order.OrderID}
                              />
                            </span>
                          </small>
                          <small className="p-1 p-md-2">
                            <span className="text-break">
                              {Order.PaymentMethod}
                            </span>
                          </small>
                          <small className="p-1 p-md-2">
                            <span className="text-break">
                              {new Date(Order.AddedDate).toUTCString()}
                            </span>
                          </small>
                          <small className="p-1 p-md-2">
                            <span className="text-break">
                              {Order.WaybillNo === undefined
                                ? Order.waybillStr !== undefined
                                  ? Order.waybillStr !== null &&
                                    Order.waybillStr.includes("waybilno")
                                    ? JSON.parse(Order.waybillStr).waybilno
                                    : Order.WaybillNo
                                  : Order.WaybillNo
                                : Order.WaybillNo}
                            </span>
                          </small>
                          <small className="p-1 p-md-2 d-flex align-items-center">
                            <Badge
                              bg={
                                Order.OrderStatus === "Order Confirm" ||
                                Order.OrderStatus === "Waiting for Payment"
                                  ? "primary"
                                  : Order.OrderStatus === "Payment Received" ||
                                    Order.OrderStatus ===
                                      "Order Being Processed" ||
                                    Order.OrderStatus === "Product Dispatched"
                                  ? "warning"
                                  : Order.OrderStatus === "Delivered"
                                  ? "success"
                                  : Order.OrderStatus === "Canceled"
                                  ? "danger"
                                  : "secondary"
                              }
                              className={`${
                                Order.OrderStatus === "Payment Received" ||
                                Order.OrderStatus === "Order Being Processed" ||
                                Order.OrderStatus === "Product Dispatched"
                                  ? "text-dark"
                                  : null
                              } rounded-pill text-wrap`}
                            >
                              <span className="fw-1">
                                {Order.OrderStatus === "Canceled"
                                  ? "Cancelled"
                                  : Order.OrderStatus}
                              </span>
                            </Badge>
                          </small>
                        </div>
                      </div>
                    )
                )}

                {onlineCount === 0 ? null : (
                  <div
                    className={`
                      ${styles.Pagination} 
                      ${darkMode ? `bg-dark` : ``}
                      py-2 d-flex justify-content-center
                    `}
                  >
                    <span onClick={scrollTopOrders}>
                      <Paginator
                        TotalPage={totalPage}
                        ActivePage={activePage}
                        onSetActivePage={onActivePageSet}
                        isReset={refreshPages}
                        CSS={`mb-0 d-inline-flex`}
                      />
                    </span>
                  </div>
                )}
              </div>
            </Tab>
          )}

          {offlineOrders !== undefined && offlineOrders.length > 0 && (
            <Tab
              key={`Order2`}
              eventKey={`Order2`}
              title={"Offline Orders"}
              className="shadow border-top-0 border rounded-bottom rounded-end overflow-hidden"
            >
              <div className={`${styles.Orders__Content}`}>
                {offlineOrders.map(
                  (Order: any, index: any) =>
                    index >= pageProds * offActivePage - pageProds &&
                    index < pageProds * offActivePage && (
                      <div
                        className={`
                          ${styles.Orders__Columns} 
                          ${styles.Orders__Order} 
                          ${darkMode ? `bg-black bg-opacity-25` : ``}
                          d-grid cols-10
                      `}
                        key={nanoid(4)}
                      >
                        <div
                          className={`${styles.Orders__Columns} ${styles.Offline} ${styles.Orders__Headings} bg-dark text-light d-grid cols-1 cols-sm-10 span-5 span-sm-full`}
                        >
                          <small className="p-1 p-md-2">#</small>
                          <small className="p-1 p-md-2">Invoice No</small>
                          <small className="p-1 p-md-2">Contact Person</small>
                          <small className="p-1 p-md-2">Shipping Add</small>
                          <small className="p-1 p-md-2">Date</small>
                          <small className="p-1 p-md-2">Waybill No.</small>
                        </div>
                        <div
                          className={`${styles.Orders__Columns} ${styles.Offline} ${styles.Orders__ContentColumns} d-grid d-grid cols-1 cols-sm-10 span-5 span-sm-full`}
                        >
                          <small className="p-1 p-md-2">{index + 1}</small>
                          <small className="p-1 p-md-2">
                            <span className="text-break">
                              {Order.ReceiptID}
                            </span>
                          </small>
                          <small className="p-1 p-md-2">
                            <span className="text-break">
                              {Order.contactPerson}
                            </span>
                          </small>
                          <small className="p-1 p-md-2">
                            <span className="text-break">
                              {Order.add1 +
                                ` ` +
                                Order.add2 +
                                `, ` +
                                Order.suburb +
                                `-` +
                                Order.postcode}
                            </span>
                          </small>
                          <small className="p-1 p-md-2">
                            <span className="text-break">
                              {new Date(Order.ReceiptDate).toUTCString()}
                            </span>
                          </small>
                          <small className="p-1 p-md-2">
                            <span className="text-break">
                              {Order.waybillNo}
                            </span>
                          </small>
                        </div>
                      </div>
                    )
                )}
                {offlineCount === 0 ? null : (
                  <div
                    className={`
                      ${styles.Pagination} 
                      ${darkMode ? `bg-dark` : ``}
                      py-2 d-flex justify-content-center
                    `}
                  >
                    <span onClick={scrollTopOrders}>
                      <Paginator
                        TotalPage={offTotalPage}
                        ActivePage={offActivePage}
                        onSetActivePage={onOffActivePageSet}
                        isReset={offRefreshPages}
                        CSS={`mb-0 d-inline-flex`}
                      />
                    </span>
                  </div>
                )}
              </div>
            </Tab>
          )}
        </Tabs>
      </div>
    </>
  );
};

export default OrderHistory;
