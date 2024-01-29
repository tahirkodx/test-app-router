"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/store/auth-context";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaDochub, FaRegEye, FaTimes } from "react-icons/fa";
import LoaderSpinner from "@/components/LoaderSpinner/LoaderSpinner";
import { Button, Image, ListGroup, Modal, Table } from "react-bootstrap";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import UserAPI from "@/custom/utils/actions/user";
import { useTheme } from "@/store/ThemeContext";
import { isBodyDark, isDarkHeaderFooter } from "@/components/Auth/LoginModal";
import darkModalStyles from "@/styles/DarkModal.module.scss";
const moment = require("moment");
const _ = require("lodash");

const OrderDetail = (props: any) => {
  const isMD = useMediaQuery("(min-width: 768px)");
  const router = useRouter();
  const authCtx = useContext<any>(AuthContext);
  const [OrderId, setOrderId] = useState(props.OrderId);
  const [OrderNumber, setOrderNumber] = useState(props.OrderNumber);
  const [Order, setOrder] = useState<any>({});
  const [OrderDetails, setOrderDetails] = useState<any>([]);
  const [initSet, setInitSet] = useState(false);
  const [showView, setShowView] = useState(false);

  const getOrderDetails = async (OrderId: any, OrderNumber: any) => {
    const summary = await UserAPI.getOrderDetails({
      orderId: OrderId,
      orderNumber: OrderNumber,
    });
    // const summary = await fetch(`/api/user/getOrderDetails`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer " + authCtx.token,
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify({
    //     orderId: OrderId,
    //     orderNumber: OrderNumber,
    //   }),
    // }).then((res) => res.json());

    try {
      let OrderData = summary.result;
      if (!_.isEmpty(OrderData.order)) {
        setOrder(OrderData.order);
        setOrderDetails(OrderData.orderDetails);
      } else {
        Swal.fire("Oops!", "Problem occured try again!", "error");
        console.log(OrderData.message);
      }
    } catch (e) {
      if (
        summary.message !== undefined &&
        summary.message === "Not authenticated."
      ) {
        authCtx.onLogout();
      } else {
        Swal.fire("Oops!", "Problem occured try again!", "error");
      }
    }
    setInitSet(true);
  };

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const listItemClasses = `
    ${darkMode ? `bg-black text-light border-secondary border-opacity-50` : ``} 
    d-grid cols-10 px-0`;

  const currencyFormat = (num: any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  const getPayImage = (pay: any) => {
    switch (pay) {
      case "Eft":
        return (
          <Image
            fluid
            src="https://www.evetech.co.za/user/images/eft.jpg"
            className="h-100 img-contain"
            alt={""}
          />
        );
      case "EFT/Bank Deposit":
        return (
          <Image
            fluid
            src="https://www.evetech.co.za/user/images/eft.jpg"
            className="h-100 img-contain"
            alt={""}
          />
        );
      case "Credit Card":
        return (
          <Image
            fluid
            src="https://www.evetech.co.za/user/images/credit-card.jpg"
            className="h-100 img-contain"
            alt={""}
          />
        );
      case "Instant EFT":
        return (
          <Image
            fluid
            src="https://www.evetech.co.za/user/images/instanteft-149px-v1.jpg"
            className="h-100 img-contain"
            alt={""}
          />
        );
      case "Instant Eft":
        return (
          <Image
            fluid
            src="https://www.evetech.co.za/user/images/instanteft-149px-v1.jpg"
            className="h-100 img-contain"
            alt={""}
          />
        );
      case "Ozow":
        return (
          <Image
            fluid
            src="https://www.evetech.co.za/repository/ProductImages/instanteft-149px-v1.jpg"
            className="h-100 img-contain"
            alt={""}
          />
        );
      case "Cash":
        return (
          <Image
            fluid
            src="https://www.evetech.co.za/repository/ProductImages/cash.jpg"
            className="h-100 img-contain"
            alt={""}
          />
        );
      default:
        return pay;
    }
  };

  const RenderDescription = (props: any) => (
    <span dangerouslySetInnerHTML={{ __html: props.HTML }}></span>
  );

  /*  */
  return (
    <>
      <Button
        size="sm"
        variant="info"
        className="lh-1"
        onClick={() => {
          getOrderDetails(OrderId, OrderNumber);
          setShowView(true);
        }}
      >
        <FaRegEye /> {OrderNumber}
      </Button>
      <Modal show={showView} onHide={() => setShowView(false)} size="lg">
        <Modal.Header
          closeButton
          className={`
          ${darkMode ? darkModalStyles.darkHeader : ``}
          ${isDarkHeaderFooter(darkMode)}
        `}
        >
          <Modal.Title>
            <FaDochub className="fs-4" /> Order Info
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={`${isBodyDark(darkMode)}`}>
          {initSet && !_.isEmpty(Order) && (
            <small>
              <ListGroup variant="flush">
                <ListGroup.Item className={`${listItemClasses}`}>
                  <span className="span-3">Order Number:</span>
                  <span className="span-7">{Order?.OrderNumber}</span>
                </ListGroup.Item>
                <ListGroup.Item className={`${listItemClasses}`}>
                  <span className="span-3">Payable Amount:</span>
                  <span className="span-7">
                    {currencyFormat(
                      Order.PaymentType !== "Credit Card"
                        ? Order.OrderTotal +
                            Order.ShippingAmount +
                            Order.InsuranceCharges -
                            Order.Discount
                        : Order.OrderTotal +
                            Order.ShippingAmount +
                            Order.InsuranceCharges
                    )}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className={`${listItemClasses}`}>
                  <span className="span-3">Payment Method:</span>
                  <span className="span-7">
                    {getPayImage(Order.PaymentType)}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className={`${listItemClasses}`}>
                  <span className="span-3">Shipping Method:</span>
                  <span className="span-7">{Order.PaymentMethod}</span>
                </ListGroup.Item>
                <ListGroup.Item className={`${listItemClasses}`}>
                  <span className="span-3">Name:</span>
                  <span className="span-7">
                    {authCtx !== undefined && authCtx.user.FirstName}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className={`${listItemClasses}`}>
                  <span className="span-3">Address:</span>
                  <span className="span-7">{Order.ShipToAddress}</span>
                </ListGroup.Item>
                <ListGroup.Item className={`${listItemClasses}`}>
                  <span className="span-3">Telephone No:</span>
                  <span className="span-7">
                    {authCtx !== undefined && authCtx.user.Tel}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className={`${listItemClasses}`}>
                  <span className="span-3">Shipping Charges:</span>
                  <span className="span-7">
                    {currencyFormat(Order.ShippingAmount)}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className={`${listItemClasses}`}>
                  <span className="span-3">Insurance:</span>
                  <span className="span-7">
                    {currencyFormat(Order.InsuranceCharges)}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className={`${listItemClasses}`}>
                  <span className="span-3">Total:</span>
                  <span className="span-7">
                    {Order.PaymentType !== "Credit Card"
                      ? currencyFormat(Order.OrderTotal - Order.Discount)
                      : currencyFormat(Order.OrderTotal)}{" "}
                    (Excluding Delivery & Shipping Insurance)
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className={`${listItemClasses}`}>
                  <span className="span-3">Order Date:</span>
                  <span className="span-7">
                    {Order !== undefined &&
                      moment(Order.AddedDate).format("MMMM Do YYYY, h:mm:ss a")}
                  </span>
                </ListGroup.Item>
                <ListGroup.Item className={`${listItemClasses}`}>
                  <span className="span-3">Status:</span>
                  <span className="span-7">{Order.OrderStatus}</span>
                </ListGroup.Item>
                <ListGroup.Item className={`${listItemClasses}`}>
                  <span className="span-3">Order Note:</span>
                  <span className="span-7">{Order.OrderNote}</span>
                </ListGroup.Item>
              </ListGroup>
            </small>
          )}

          {initSet && !_.isEmpty(OrderDetails) && !isMD && (
            <div>
              {OrderDetails.map((OrderItem: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="bg-secondary bg-opacity-10 overflow-hidden rounded"
                  >
                    <small>
                      <small>
                        <div className="p-3 border-bottom border-secondary border-opacity-50">
                          <div className="fw-3">SKU</div>
                          <div>{OrderItem.ProductName}</div>
                          <div className="fw-3">Product Details</div>
                          <div>{OrderItem.ProductDescription}</div>
                          <div className="fw-3">QTY</div>
                          <div>{OrderItem.Quantity}</div>
                          <div className="fw-3">Price</div>
                          <div>{currencyFormat(OrderItem.UnitPrice)}</div>
                          <div className="fw-3">Total</div>
                          <div>{currencyFormat(OrderItem.ItemTotal)}</div>
                        </div>
                      </small>
                    </small>
                  </div>
                );
              })}
            </div>
          )}

          {initSet && !_.isEmpty(OrderDetails) && isMD && (
            <Table
              striped
              bordered
              hover
              className={`${darkMode ? `table-dark` : ``} lh-1`}
            >
              <thead>
                <tr>
                  <th className="fw-3">
                    <small>SKU</small>
                  </th>
                  <th className="fw-3">
                    <small>Product Details</small>
                  </th>
                  <th className="fw-3">
                    <small>Qty</small>
                  </th>
                  <th className="fw-3">
                    <small>Price</small>
                  </th>
                  <th className="fw-3">
                    <small>Total</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {OrderDetails.map((OrderItem: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td>
                        <small>
                          <RenderDescription HTML={OrderItem.ProductName} />
                        </small>
                      </td>
                      <td>
                        <small>
                          <RenderDescription
                            HTML={OrderItem.ProductDescription}
                          />
                        </small>
                      </td>
                      <td>
                        <small>{OrderItem.Quantity}</small>
                      </td>
                      <td>
                        <small>
                          {currencyFormat(
                            Order.PaymentType !== "Credit Card"
                              ? (OrderItem.UnitPrice / 105) * 100
                              : OrderItem.UnitPrice
                          )}
                        </small>
                      </td>
                      <td>
                        <small>
                          {currencyFormat(
                            Order.PaymentType !== "Credit Card"
                              ? (OrderItem.ItemTotal / 105) * 100
                              : OrderItem.ItemTotal
                          )}
                        </small>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}

          {!initSet && (
            <div className="w-100 h-100">
              <LoaderSpinner />
            </div>
          )}

          {initSet && _.isEmpty(Order) && (
            <section className="p-2 rounded border span-full text-center">
              <FaDochub size={"80px"} />
              <br></br>
              <span className="text-danger p-3">
                <small>
                  {" "}
                  Order Details Not Found for Order Number : {OrderNumber}! Try
                  again.
                </small>
              </span>
            </section>
          )}
        </Modal.Body>
        <Modal.Footer
          className={`
            ${darkMode ? darkModalStyles.darkHeader : ``}
            ${isDarkHeaderFooter(darkMode)}
          `}
        >
          <Button variant="secondary" onClick={() => setShowView(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderDetail;
