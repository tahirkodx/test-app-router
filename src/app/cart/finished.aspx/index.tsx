import React from "react";
/* import LaptopHeader from "@/components/Home/LaptopHeader"; */
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Spinner,
  Stack,
} from "react-bootstrap";
import styles from "@/styles/Cart/Cart.module.scss";
import { FaThumbsUp } from "react-icons/fa";
import Summary from "@/components/Cart/Summary";
import { useContext } from "react";
import CartContext from "@/store/ncart-context";
import AuthContext from "@/store/auth-context";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { CartAPI } from "@/custom/utils/actions";

const _ = require("lodash");
const Finished = () => {
  const [showPageTopMsg, setShowPageTopMsg] = useState<any>(true);
  const searchParams:any = useSearchParams();
  const [initFinish, setInitFinish] = useState<any>(false);
  const authCtx:any = useContext(AuthContext);
  const cartCtx:any = useContext(CartContext);

  let orderType = searchParams.get("orderType");
  let on = searchParams.get("on");
  let payable = searchParams.get("payable");

  const navigate = useRouter();

  const confirmEFT = async () => {
    let auth = JSON.parse(localStorage.getItem("user_auth") as string) || null;
    const eftDatat= await CartAPI.getConfirmEFT({
        cart: cartCtx,
        on: on,
        payable: payable,
    });
    /* const eftData = await fetch(`/api/authcart/getConfirmEFT`, {
      method: "POST",
      headers: {
        Authorization:
          auth !== null && auth.token.length > 0
            ? "Bearer " + auth.token
            : "Bearer ",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        cart: cartCtx,
        on: on,
        payable: payable,
      }),
    }).then((res) => res.json()); */
    setInitFinish(true);
  };

  useEffect(() => {
    confirmEFT();
  }, []);

  useEffect(() => {
    if (initFinish) cartCtx.fetchCart();
  }, [initFinish]);

  const currencyFormat = (num:any) => {
    try {
      return "R " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } catch (e) {
      return num;
    }
  };

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Cart - Finished
        </title>
      </Helmet>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <div className="my-3 my-xxl-4">
        <Stack className="gap-2 gap-sm-3">
          <section className="px-2">
            <Col md={{ span: 10, offset: 1 }}>
              <main className={`${styles.Main} p-2 p-sm-3`}>
                {!initFinish ? (
                  <section className="w-100 d-flex justify-content-center align-items-center gap-3 p-5 flex-wrap">
                    <Spinner animation="border" variant="primary" /> Loading...
                  </section>
                ) : null}
                {initFinish ? (
                  <Card className="w-100 p-2 p-sm-3 shadow span-full">
                    <section>
                      <h1>Order Confirmed. Waiting for payment.</h1>
                      <h2 className="fs-2">Thank you.</h2>
                      <p>
                        Your order has been placed, and is currently set to
                        &quot;Pending&quot; status.
                      </p>
                      <p>
                        We will begin processing your order once a sales
                        representative approves your payment information.
                      </p>
                      <p>
                        <span>Order Number: </span>
                        <span className="fw-2">{on}</span>
                      </p>
                      <p>
                        <span>Amount Payable: </span>
                        <span className="fw-2">
                          {currencyFormat(parseFloat(payable))}
                        </span>
                      </p>
                      <p>
                        <span>Beneficiary Reference: </span>
                        <span className="fw-2">{on}</span>
                      </p>
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        <h2 className="w-100 fs-5">
                          Here are our banking details:
                        </h2>
                        <div className="bg-secondary bg-opacity-25 rounded flex-grow-1">
                          <h3 className="fs-6 p-1 bg-light bg-opacity-50 p-2 p-sm-3 m-0">
                            <Image
                              src="https://www.evetech.co.za/repository/ProductImages/FNB-First-National-Bank-Logo-2022-25w.png"
                              alt="FNB Bank"
                            />{" "}
                            FNB (International)
                          </h3>
                          <div className="p-2 p-sm-3">
                            <p className="m-0">
                              <span className="fw-2">Account Name: </span>
                              <span>Evetech</span>
                            </p>
                            <p className="m-0">
                              <span className="fw-2">Account No: </span>
                              <span>62089323704</span>
                            </p>
                            <p className="m-0">
                              <span className="fw-2">Account Type: </span>
                              <span>Cheque</span>
                            </p>
                            <p className="m-0">
                              <span className="fw-2">Branch: </span>
                              <span>Centurion</span>
                            </p>
                            <p className="m-0">
                              <span className="fw-2">Branch Code: </span>
                              <span>250130</span>
                            </p>
                            <p className="m-0">
                              <span className="fw-2">Swift Code: </span>
                              <span>FIRNZAJJ</span>
                            </p>
                          </div>
                        </div>
                        <div className="bg-secondary bg-opacity-25 rounded flex-grow-1">
                          <h3 className="fs-6 p-1 bg-light bg-opacity-50 p-2 p-sm-3 m-0">
                            <Image
                              src="https://www.evetech.co.za/repository/ProductImages/Nedbank-logo-25w.png"
                              alt="Nedbank"
                            />{" "}
                            NEDBANK
                          </h3>
                          <div className="p-2 p-sm-3">
                            <p className="m-0">
                              <span className="fw-2">Account Name: </span>
                              <span>Evetech</span>
                            </p>
                            <p className="m-0">
                              <span className="fw-2">Account No: </span>
                              <span>1169691226</span>
                            </p>
                            <p className="m-0">
                              <span className="fw-2">Account Type: </span>
                              <span>Business</span>
                            </p>
                            <p className="m-0">
                              <span className="fw-2">Branch: </span>
                              <span>Centurion</span>
                            </p>
                            <p className="m-0">
                              <span className="fw-2">Branch Code: </span>
                              <span>198765</span>
                            </p>
                          </div>
                        </div>
                        <div className="bg-secondary bg-opacity-25 rounded flex-grow-1">
                          <h3 className="fs-6 p-1 bg-light bg-opacity-50 p-2 p-sm-3 m-0">
                            <Image
                              src="https://www.evetech.co.za/repository/ProductImages/Standard-bank-logo-25h.png"
                              alt="Standard Bank"
                            />{" "}
                            STANDARD BANK
                          </h3>
                          <div className="p-2 p-sm-3">
                            <p className="m-0">
                              <span className="fw-2">Account Name: </span>
                              <span>Evetech</span>
                            </p>
                            <p className="m-0">
                              <span className="fw-2">Account No: </span>
                              <span>032526717</span>
                            </p>
                            <p className="m-0">
                              <span className="fw-2">Account Type: </span>
                              <span>Cheque</span>
                            </p>
                            <p className="m-0">
                              <span className="fw-2">Branch: </span>
                              <span>Centurion</span>
                            </p>
                            <p className="m-0">
                              <span className="fw-2">Branch Code: </span>
                              <span>01-2645</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <p>
                        Please Use Order No:{" "}
                        <span className="fw-2">{cartCtx.orderno}</span> as
                        referance and send Proof of Payment (POP) to
                        pay@evetech.co.za directly out of the bank
                      </p>
                      <p className="fw-2">Thank you for your business</p>
                      <p>We look forward to your next purchase</p>
                    </section>
                  </Card>
                ) : null}
              </main>
            </Col>
          </section>
        </Stack>
      </div>
    </>
  );
};

export default Finished;
