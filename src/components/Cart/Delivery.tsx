"use client";
import React from "react";
/* import LaptopHeader from "../../../../Layouts/LaptopHeader"; */
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import styles from "@/styles/Cart/Cart.module.scss";
import { FaTrash, FaTruck, FaPlus, FaEdit } from "react-icons/fa";
import Summary from "./Summary";
import { useContext } from "react";
import AuthContext from "@/store/auth-context";
import { useState } from "react";
import { useEffect } from "react";
import { nanoid } from "nanoid";
import AddressModal from "@/components/Cart/AddressModal";
import CartContext from "@/store/ncart-context";
import { Helmet } from "react-helmet";
import ComponentsHeader from "@/components/Home/ComponentsHeader";
import { Spinner } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CmsAPI, ProductAPI } from "@/custom/utils/actions";
import UserAPI from "@/custom/utils/actions/user";
import { Image } from "react-bootstrap";
import { useTheme } from "@/store/ThemeContext";

const _ = require("lodash");
const formStateData = {
  id: 0,
  UserID: 0,
  PersonName: "",
  Address1: "",
  Address2: "",
  Suburb: "",
  PostCode: "",
  City: "",
  State: "",
  Country: "",
  IsPrimary: 0,
  AddedDate: "",
  Status: 0,
  ModifiedDate: "",
};
const Delivery = () => {
  const cartCtx: any = useContext(CartContext);
  const authCtx: any = useContext(AuthContext);
  const router = useRouter();

  const [showPageTopMsg, setShowPageTopMsg] = useState<any>(true);
  const [address, setAddress] = useState<any[]>([]);
  const [addAddress, setAddAddress] = useState<any>(false);
  const [formState, setFormState] = useState<any>(formStateData);
  const [addId, setAddId] = useState<any>(0);
  const [chkAddress, setChkAddress] = useState<any>(null);
  const [checked, setChecked] = useState<any>(false);
  const [insAmt, setInsAmt] = useState<any>(0);
  const [orderNote, setOrderNote] = useState<any>(" ");
  const [initSet, setInitSet] = useState<any>(false);
  const [preAddressCheck, setPreAddressCheck] = useState<any>(false);

  /* Deleivery Helper */
  const [delHelper, setDelHelper] = useState<any>({});

  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  useEffect(() => {
    const siteinfo = async () => {
      const siteDatas = await CmsAPI.getDelieveryInfo();
      /*  const siteDatas = await fetch(`/api/gutil/getDelieveryInfo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((res) => res.json()); */
      if (
        siteDatas !== undefined &&
        siteDatas !== null &&
        siteDatas.result !== undefined &&
        siteDatas.result !== null
      ) {
        let siteData = siteDatas.result;
        setDelHelper(siteData);
        return siteData;
      }
    };
    siteinfo();
  }, []);
  /* Deleivery Helper */

  const Swal = require("sweetalert2");

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      denyButton: "btn btn-danger ms-2",
    },
    buttonsStyling: false,
  });

  function toggle(value: any) {
    return !value;
  }

  const openAddAddress = () => {
    setAddAddress(true);
  };
  const closeAddAddress = () => {
    setAddAddress(false);
    /* Compare current address with cart if not match than set */
  };

  /* useEffect(() => {
    if (cartCtx.ordernote !== orderNote) {
      if (chkAddress !== null && chkAddress !== undefined) {
        cartCtx.setShippingAddress(chkAddress, orderNote);
      }
    }
  }, [orderNote]); */

  /*   useEffect(() => {
    localStorage.setItem("eve_cart", JSON.stringify(cartCtx));
  }, [
    cartCtx.shippingAddress,
    cartCtx.ordernote,
    cartCtx.isInsured,
    cartCtx.insAmount,
  ]); */

  useEffect(() => {
    if (!initSet && cartCtx.sessId.trim().length > 0) {
      if (
        _.isEmpty(cartCtx.shippingAddress) ||
        cartCtx.shippingAddress !== null
      )
        setChkAddress(cartCtx.shippingAddress);

      setChecked(cartCtx.isInsured);
      /* setOrderNote(cartCtx.ordernote); */

      if (cartCtx.items.length === 0) router.push("/cart");

      setInitSet(true);
    }
  }, [cartCtx.sessId]);

  useEffect(() => {
    if (
      cartCtx.ordernote !== undefined &&
      cartCtx.ordernote.trim().length > 0
    ) {
      setOrderNote(cartCtx.ordernote);
    }
  }, [cartCtx.ordernote]);

  useEffect(() => {}, [cartCtx.shippingAddress, cartCtx.isInsured]);

  const getUserAddresses = async () => {
    const summary = await UserAPI.getUserAddresses();
    /* const summary = await fetch(`/api/user/getUserAddresses`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json()); */
    if (
      summary !== undefined &&
      summary !== null &&
      summary.result !== undefined &&
      summary.result !== null
    ) {
      let stateSumm = summary.result;
      if (stateSumm && _.isEmpty(cartCtx.shippingAddress)) {
        _.map(stateSumm, (address: any) => {
          if (
            cartCtx.shippingAddress.id === null ||
            cartCtx.shippingAddress.id === undefined ||
            cartCtx.shippingAddress.id === "0"
          ) {
            if (address.IsPrimary === 1) {
              setChkAddress(address);
              console.log("address", address);
              cartCtx.setShippingAddress(address, orderNote);
            }
          } else {
            if (cartCtx.shippingAddress.id === address.id) {
              setChkAddress(address);
              try {
                let shipUp = cartCtx.shippingAddress;
                let findAdd = _.find(stateSumm, (add: any) => {
                  if (shipUp.id === add.id) return add;
                });
                if (
                  findAdd !== undefined &&
                  (shipUp.PostCode !== findAdd.PostCode ||
                    shipUp.Suburb !== findAdd.Suburb ||
                    shipUp.City !== findAdd.City ||
                    shipUp.Address1 !== findAdd.Address1)
                )
                  cartCtx.setShippingAddress(findAdd, orderNote);
              } catch (ex) {}
            }
          }
        });
      } else {
        // validate cart address has not been deleted
        let validate = _.find(address, (add: any) => {
          if (cartCtx.shippingAddress.id === add.id) {
            if (stateSumm) {
              try {
                let shipUp = cartCtx.shippingAddress;
                let findAdd = _.find(stateSumm, (add: any) => {
                  if (shipUp.id === add.id) return add;
                });
                if (
                  findAdd !== undefined &&
                  (shipUp.PostCode !== findAdd.PostCode ||
                    shipUp.Suburb !== findAdd.Suburb ||
                    shipUp.City !== findAdd.City ||
                    shipUp.Address1 !== findAdd.Address1)
                )
                  cartCtx.setShippingAddress(findAdd, orderNote);
              } catch (ex) {}
            }
            return add;
          }
        });

        if (validate === undefined) {
          _.map(address, (add: any) => {
            if (add.IsPrimary === 1) {
              setChkAddress(add);
              cartCtx.setShippingAddress(add, orderNote);
            }
          });
        }
      }
      setAddress(stateSumm);
    }
    setPreAddressCheck(true);
  };

  useEffect(() => {
    if (preAddressCheck && address.length > 0) {
      if (chkAddress === null || _.isEmpty(chkAddress)) {
        _.map(address, (add: any) => {
          if (add.IsPrimary === 1) {
            setChkAddress(add);
            cartCtx.setShippingAddress(add, orderNote);
          }
        });
      }
    }
  }, [preAddressCheck, address]);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      if (initSet) getUserAddresses();
    } else {
      router.push("/");
    }
    CalculateInsurance();
  }, [initSet]);

  useEffect(() => {}, [address]);

  const getAddress = async (id: any) => {
    const getAddress = async (id: any) => {
      const summary = await UserAPI.getAddressById({
        userid: authCtx.user.id,
        addressId: id,
      });
      /* const summary = await fetch(`/api/user/getAddressById`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          userid: authCtx.user.id,
          addressId: id,
        }),
      }).then((res) => res.json());
 */
      if (
        summary !== undefined &&
        summary !== null &&
        summary.result !== undefined &&
        summary.result !== null
      ) {
        try {
          let address = summary.result[0];
          setFormState(address);
          /* modal will react according to set state */
          setAddId(id);
          openAddAddress();
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
      } else {
        Swal.fire("Oops!", "Problem occured try again!", "error");
      }
    };

    getAddress(id);
  };

  const resetFormState = () => {
    setFormState(formStateData);
    setAddId(0);
  };

  const removeAddress = async (id: any) => {
    let isPrimary = false;
    _.map(address, (add: any) => {
      if (add.id === id && add.IsPrimary === 1) {
        isPrimary = true;
      }
    });
    let isCheckedOne = false;
    if (
      !_.isEmpty(chkAddress) &&
      chkAddress.id !== undefined &&
      chkAddress.id === id
    )
      isCheckedOne = true;

    const deleteSummary = await UserAPI.deleteAddress({
      userid: authCtx.user.id,
      addressId: id,
    });

    /* await fetch(`/api/user/deleteAddress`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        userid: authCtx.user.id,
        addressId: id,
      }),
    }).then((res) => res.json()); */
    let deleted = deleteSummary.result;
    if (deleted !== undefined && deleted !== null && deleted === true) {
      if (deleted === "1" || deleted === "0") {
        /* address.removeItem(id); */
        /* let updatedAddress = _.filter(address, (add) => {
          return add.id !== id;
        });
        setAddress((prevAddress) => {
          prevAddress = updatedAddress;
          return prevAddress;
        }); */
        if (isCheckedOne) setChkAddress(null);

        setPreAddressCheck(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Address Removed. ${
            deleted === "1" ? `& Primary address updated.` : ``
          }`,
          showConfirmButton: false,
          timer: 1500,
        });

        getUserAddresses().then((res) => {
          if (isCheckedOne) {
            _.map(address, (add: any) => {
              if (add.IsPrimary === 1) {
                setChkAddress(add);
                cartCtx.setShippingAddress(add, orderNote);
              }
            });
          }
        });
      } else if (deleted === "-1") {
        Swal.fire(
          "Oops!",
          "At Least one primary address required! Please add another primary address and try again.",
          "error"
        );
      } else {
        Swal.fire("Oops!", "Problem occured try again!", "error");
      }
    }
  };

  const checkInsurance = () => {
    let validAddress = false;

    if (chkAddress !== null && !_.isEmpty(chkAddress)) {
      validAddress = true;
      if (
        cartCtx.shippingAddress !== undefined &&
        cartCtx.shippingAddress.id !== chkAddress.id
      ) {
        cartCtx.setShippingAddress(
          chkAddress,
          orderNote === "" ? cartCtx.ordernote : orderNote
        );
      }
    }

    if (validAddress) {
      if (checked || insAmt === 0) {
        if (authCtx.isLoggedIn) router.push("/cart/payment");
        else {
          authCtx.onShowLogin(true);
          return false;
        }
      } else {
        swalWithBootstrapButtons
          .fire({
            title: "Add Delivery Insurance?",
            text: `This ensures a quick replacement should anything go wrong during delivery. It will only cost R${insAmt}!`,
            showDenyButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No",
            icon: "question",
          })
          .then((result: any) => {
            if (result.isConfirmed) {
              setChecked(true);
              cartCtx.setInsurance(true, insAmt);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Delivery Insurance Added",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                if (authCtx.isLoggedIn) router.push("/cart/payment");
                else {
                  authCtx.onShowLogin(true);
                  return false;
                }
              });
            } else if (result.isDenied) {
              if (authCtx.isLoggedIn) router.push("/cart/payment");
              else {
                authCtx.onShowLogin(true);
                return false;
              }
            }
          });
      }
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please prvoide valid address to continue.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    if (checked) cartCtx.setInsurance(true, insAmt);
    else if (cartCtx.insAmount > 0 && cartCtx.isInsured) {
      cartCtx.setInsurance(false, 0);
    }
  }, [checked]);

  /* Disable due to combine method set shipp and calculate ship */
  /*  useEffect(() => {    
    if (
      cartCtx.shippingAddress !== null && cartCtx.shippingAddress !== undefined &&
      !_.isEmpty(cartCtx.shippingAddress)
    ) {
      cartCtx.setShippingCharges(cartCtx.shippingAddress);
    }
  }, [cartCtx.shippingAddress]); */

  const CalculateInsurance = () => {
    let insurance = 0.99; /* Helper.Insurance; */ //0.99;
    let tot = 0;
    if (cartCtx.totalIEFTAmount > 0) {
      tot = (cartCtx.totalIEFTAmount * insurance) / 100;
      tot = Math.round(tot);
      setInsAmt(tot);
    }
  };

  useEffect(() => {
    if (
      cartCtx.orderno !== null &&
      cartCtx.orderno.length > 0 &&
      cartCtx.isConfirmed
    ) {
      router.push("/checkout");
    }
  }, [cartCtx]);

  return (
    <>
      <Helmet>
        <title itemProp="name" lang="en">
          Delivery
        </title>
      </Helmet>
      <ComponentsHeader showpagetopmsg={showPageTopMsg} />
      <div
        className={`
          py-3 py-xxl-4
          ${darkMode ? `bg-dark text-light` : ``}
        `}
      >
        <Stack className="gap-2 gap-sm-3">
          <section className="px-2">
            <Col md={{ span: 10, offset: 1 }}>
              <main
                className={`
                  ${styles.Main}
                  ${darkMode ? `bg-dark` : ``} 
                  p-2 p-sm-3
                `}
              >
                <div className="d-grid gap-2 gap-sm-3 cols-xxl-10">
                  <Stack
                    direction="horizontal"
                    className="gap-2 gap-sm-3 justify-content-between order-xxl-1 span-full"
                  >
                    <div
                      className={`${styles.Breadcrumbs} d-grid gap-1 text-uppercase w-100 cols-4 cols-sm-7 text-center`}
                    >
                      <Link
                        href="/cart"
                        className="text-primary text-decoration-none"
                        replace={true}
                      >
                        <div>
                          {" "}
                          <span>Cart</span>{" "}
                        </div>
                      </Link>
                      <div> &gt; </div>
                      <div className="fw-2 d-flex align-items-center gap-1">
                        <FaTruck />
                        <span>Delivery</span>
                      </div>
                      <div> &gt; </div>
                      <div className="text-secondary">
                        <span>Payment</span>
                      </div>
                      <div> &gt; </div>
                      <div className="text-secondary">
                        <span>Confirmation</span>
                      </div>
                    </div>
                  </Stack>

                  <Card
                    className={`
                      p-2 p-sm-3 shadow order-xxl-1 span-xxl-8
                      ${darkMode ? `bg-black bg-opacity-50` : ``}
                    `}
                  >
                    <Stack gap={4} className="pb-2">
                      <Stack
                        direction="horizontal"
                        className={`
                          gap-2 gap-sm-3 border-bottom pb-2 justify-content-between
                          ${
                            darkMode ? `border-secondary border-opacity-50` : ``
                          }
                        `}
                      >
                        <h2 className="text-uppercase text-secondary fs-6 mb-0">
                          Shipping Address
                        </h2>
                        <div>
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => {
                              setAddId(0);
                              setFormState(formStateData);
                              openAddAddress();
                            }}
                          >
                            <FaPlus /> Add Address
                          </Button>
                        </div>
                      </Stack>
                      <Form>
                        <Stack gap={2}>
                          <Form.Group>
                            <div className="d-grid gap-2 gap-sm-3 cols-sm-2 cols-lg-3">
                              {!preAddressCheck ? (
                                <section className="w-100 p-5 text-center span-full">
                                  <Spinner animation="border" variant="info" />
                                  <div className={darkMode ? `text-light` : ``}>
                                    Loading Addresses
                                  </div>
                                </section>
                              ) : null}
                              {preAddressCheck &&
                                address !== undefined &&
                                address.map((Book, index) => {
                                  return (
                                    <div
                                      className={`
                                        p-2 p-sm-3 border-bottom
                                        ${
                                          darkMode
                                            ? `border-secondary border-opacity-50 text-light`
                                            : ``
                                        }
                                      `}
                                      key={index + `` + nanoid(4)}
                                    >
                                      <Stack className="position-relative">
                                        <Form.Check
                                          type="radio"
                                          key={index}
                                          id={`address-${index}`}
                                        >
                                          <Form.Check.Input
                                            type="radio"
                                            name="address"
                                            defaultChecked={
                                              chkAddress !== null &&
                                              chkAddress !== undefined &&
                                              chkAddress.id === Book.id
                                                ? true
                                                : false
                                            }
                                            radioGroup="addressGrp"
                                            onChange={(event) => {
                                              if (event.target.value === "on") {
                                                setChkAddress(Book);
                                                cartCtx.setShippingAddress(
                                                  Book,
                                                  orderNote
                                                );
                                              }
                                            }}
                                          />
                                          <Form.Check.Label>
                                            <div
                                              className={`${styles.ShippingName} fw-2`}
                                            >
                                              {Book.PersonName}
                                            </div>
                                            <div className="pt-4 lh-1">
                                              <small className="d-grid gap-1 cols-10">
                                                <div className="span-full">
                                                  {Book.Address1}
                                                  {Book.Address2}
                                                </div>
                                                <div className="span-full span-sm-5">
                                                  <b className="fw-3">
                                                    Suburb:
                                                  </b>{" "}
                                                  {Book.Suburb}
                                                </div>
                                                <div className="span-full span-sm-5">
                                                  <b className="fw-3">
                                                    PostCode:
                                                  </b>{" "}
                                                  {Book.PostCode}
                                                </div>
                                                <div className="span-full span-sm-5">
                                                  <b className="fw-3">City:</b>{" "}
                                                  {Book.City}
                                                </div>
                                                <div className="span-full span-sm-5">
                                                  <b className="fw-3">
                                                    State:{" "}
                                                  </b>{" "}
                                                  {Book.State}
                                                </div>
                                                <div className="span-full span-sm-5">
                                                  <b className="fw-3">
                                                    Country:{" "}
                                                  </b>{" "}
                                                  {Book.Country}
                                                </div>
                                              </small>
                                            </div>
                                          </Form.Check.Label>
                                        </Form.Check>
                                        <Stack
                                          direction="horizontal"
                                          gap={1}
                                          className="ms-auto position-absolute top-0 end-0"
                                        >
                                          <Button
                                            size="sm"
                                            className="shadow"
                                            variant=""
                                            onClick={() =>
                                              removeAddress(Book.id)
                                            }
                                          >
                                            <FaTrash className="text-danger" />
                                          </Button>
                                          <Button
                                            size="sm"
                                            className="shadow"
                                            variant=""
                                            onClick={() => {
                                              getAddress(Book.id);
                                            }}
                                          >
                                            <FaEdit className="text-primary" />
                                          </Button>
                                        </Stack>
                                      </Stack>
                                    </div>
                                  );
                                })}
                            </div>
                            <AddressModal
                              isOpen={addAddress}
                              formStateData={formState}
                              closeAddAddress={closeAddAddress}
                              resetFormState={resetFormState}
                              getAddress={getUserAddresses}
                              formState={formStateData}
                              id={addId}
                            />
                          </Form.Group>
                          <Form.Group
                            className={`
                              text-end
                            `}
                            controlId="DeliveryInfo"
                          >
                            <Form.Text
                              className={`
                                ${darkMode ? `text-light` : ``}
                                fw-2
                              `}
                            >
                              Delivery:{" "}
                            </Form.Text>
                            <Form.Text
                              className={`
                                ${darkMode ? `text-light` : ``}
                                fw-2
                              `}
                            >
                              Courier delivery to your door
                            </Form.Text>
                          </Form.Group>
                          <Form.Group className="text-end" controlId="Comment">
                            <Form.Label
                              className={`
                                ${darkMode ? `text-light` : ``}
                                fw-2
                              `}
                            >
                              Add Comments About Your Order (Optional)
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              onChange={(e) => {
                                setOrderNote(e.currentTarget.value);
                              }}
                              onBlur={(e) => {
                                if (cartCtx.ordernote !== orderNote) {
                                  if (
                                    chkAddress !== null &&
                                    chkAddress !== undefined
                                  ) {
                                    cartCtx.setShippingAddress(
                                      chkAddress,
                                      orderNote
                                    );
                                  }
                                }
                              }}
                              defaultValue={cartCtx.ordernote}
                              className={`${
                                darkMode
                                  ? `bg-black border-secondary text-light`
                                  : ``
                              }`}
                            />
                          </Form.Group>
                          {insAmt > 0 && (
                            <Form.Group
                              className={`
                                ${darkMode ? `text-light` : ``}
                                text-end bg-warning bg-opacity-50 py-1 fw-2 rounded
                              `}
                              controlId="Insurance"
                            >
                              <Form.Check
                                inline
                                label={`Would You Like Shipping Insurance? R ${insAmt.toFixed(
                                  2
                                )}`}
                                name="insurance"
                                type="checkbox"
                                id="insurance"
                                checked={checked}
                                onChange={() => setChecked(toggle)}
                                value={cartCtx.isInsured}
                              />
                            </Form.Group>
                          )}
                        </Stack>
                      </Form>
                    </Stack>
                  </Card>

                  <p className="m-0 lh-1 order-xxl-2 span-full">
                    <b>Please Note:</b>{" "}
                    <span style={{ color: "Red" }}>
                      <b>FREE DELIVERY</b>
                    </span>{" "}
                    only available to main centers. (Calculated based on your
                    post code.) <br />
                    <small>
                      Placing an item in your shopping cart does not reserve
                      that item or price. We only reserve stock for your order
                      once payment is received.
                    </small>
                  </p>

                  <Card
                    className={`
                      shadow order-xxl-1 span-xxl-2 overflow-hidden position-relative
                      ${darkMode ? `bg-black` : ``}
                    `}
                  >
                    <div className="position-absolute start-0 bottom-0">
                      <Image
                        src="https://www.evetech.co.za/repository/ProductImages/Delivery-Icons-300x300px-v3.png"
                        alt=""
                      />
                    </div>
                    <Stack gap={3} className="position-relative">
                      <div
                        className={`
                          d-grid gap-2 pb-3 bg-opacity-75
                          ${darkMode ? `bg-black` : `bg-light`}
                        `}
                      >
                        <Summary cartCtx={cartCtx} isShowShipping={true} />

                        <div className="ms-auto px-2 px-sm-3">
                          <Link
                            href="#"
                            title="Proceed to Payment"
                            onClick={(e) => {
                              e.preventDefault();
                              checkInsurance();
                            }}
                          >
                            <Button
                              variant="success"
                              className={`bg-gradient shadow`}
                            >
                              Proceed to Payment
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Stack>
                  </Card>
                </div>
              </main>
            </Col>
          </section>
        </Stack>
      </div>
    </>
  );
};

export default Delivery;
