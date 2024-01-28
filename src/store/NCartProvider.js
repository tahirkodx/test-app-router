"use client";
import React, { useReducer, useEffect, useState } from "react";
import NCartContext from "@/store/ncart-context";
import { CartAPI } from "@actions";
import _ from "lodash";

const defaultCartState = {
  sessId: "",
  items: [],
  totalCCAmount: 0,
  totalIEFTAmount: 0,
  orderno: "",
  isInsured: false,
  insAmount: 0,
  shippingAddress: {},
  paymentMode: "",
  ordernote: "",
  status: 0,
  discountPer: 0,
  discountAmt: 0,
  shippingCharge: 0,
  shippingCharge2: 0,
  shippingChargesAddOn: 0,
  isConfirmed: false,
  isTVLicence: false,
  isValidLicence: false,
  tvLicenceNo: "",
  tvLicenceType: "",
  tvLicenceResp: null,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    return {
      sessId: state.sessId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      orderno: state.orderno,
      isInsured: state.isInsured,
      insAmount: state.insAmount,
      shippingAddress: state.shippingAddress,
      paymentMode: state.paymentMode,
      ordernote: state.ordernote,
      status: state.status,
      discountAmt: action.discountAmt,
      discountPer: action.discountPer,
      shippingCharge: state.shippingCharge,
      shippingCharge2: state.shippingCharge2,
      shippingChargesAddOn: state.shippingChargesAddOn,
      isConfirmed: state.isConfirmed,
      isTVLicence: state.isTVLicence,
      isValidLicence: state.isValidLicence,
      tvLicenceNo: state.tvLicenceNo,
      tvLicenceType: state.tvLicenceType,
      tvLicenceResp: state.tvLicenceResp,
    };
  }

  if (action.type === "FETCH") {
    let cart = action?.cartData?.cart;
    let cartItems = action.cartData?.cartItems;
    let totalCCAmount = 0;
    let totalIEFTAmount = 0;
    let isTVLicence = false;
    let items = _.map(cartItems, (item) => {
      totalCCAmount +=
        (((parseFloat(item.UnitPrice) + parseFloat(item.UpgradeValue)) * 105) /
          100) *
          parseInt(item.Quantity) -
        parseFloat(item.PromocodePrice * 1.05);
      totalIEFTAmount +=
        (parseFloat(item.UnitPrice) + parseFloat(item.UpgradeValue)) *
          parseInt(item.Quantity) -
        parseFloat(item.PromocodePrice);

      if (item.isRequiredLicence === 1) isTVLicence = true;

      return {
        id: item.CartDetailId,
        itemId: item.CartId,
        productId: item.ProductId,
        name: item.ProductName,
        desc: item.SysConfiguration + ` ` + item.PromocodeInfo,
        code: item.PalladiumPartNo,
        price: (
          ((parseFloat(item.UnitPrice) + parseFloat(item.UpgradeValue)) * 105) /
          100
        ).toFixed(2),
        unitPrice: item.UnitPrice,
        ccPrice: parseFloat(
          ((parseFloat(item.UnitPrice) + parseFloat(item.UpgradeValue)) * 105) /
            100
        ).toFixed(2),
        ieftPrice: (
          parseFloat(item.UnitPrice) + parseFloat(item.UpgradeValue)
        ).toFixed(2),
        upgradeValue: item.UpgradeValue,
        addOns: JSON.parse(item.UpgradeInfo),
        amount: item.Quantity,
        url:
          item.pType === 2
            ? `/${_.replace(
                _.toLower(item.Url),
                new RegExp(" ", "g"),
                "-"
              ).trim()}/best-deal/${item.ProductId}.aspx`
            : item.pType === 3
            ? `/${_.replace(
                _.toLower(item.Url),
                new RegExp(" ", "g"),
                "-"
              ).trim()}/laptops-for-sale/${item.ProductId}.aspx`
            : `/${_.replace(
                _.toLower(item.Url),
                new RegExp(" ", "g"),
                "-"
              ).trim()}/best-pc-deal/${item.ProductId}.aspx`,
        imageUrl: `https://www.evetech.co.za/${item.ImageUrl}`,
        ptype: item.pType,
        alt: item.Url,
        freeStuff: JSON.parse(item.FreeStuff),
        weight: item.Weight,
        shippingCharges: item.Shipping,
        shippingCharges2: item.Shipping2,
        shippingComponent: item.ComponentShipping,
        qtyPerCust: item.QtyLimit,
        isRequiredLicence: item.isRequiredLicence === 1 ? true : false,
        Promocode: item.Promocode,
        PromocodePrice: item.PromocodePrice,
        PromocodeInfo: item.PromocodeInfo,
      };
    });

    if(cart?.isTVLicence)
      cart.isTVLicence = isTVLicence ? 1 : 0;

    if (cart?.CartID && cart.CartID !== undefined) {
      return {
        sessId: cart.sessionId,
        items: items,
        totalCCAmount: totalCCAmount,
        totalIEFTAmount: totalIEFTAmount,
        orderno: cart.OrderNumber,
        isInsured: cart.IsInsure === 0 ? false : true,
        insAmount: cart.InsuranceCharges,
        shippingAddress:
          cart.AddressId === 0
            ? {}
            : {
                Address1: cart.Add1,
                Address2: cart.Add2,
                City: cart.City,
                Country: cart.Country,
                PersonName: cart.PersonName,
                PostCode: cart.PostCode,
                State: cart.State,
                Suburb: cart.Suburb,
                UserID: cart.UserId,
                id: cart.AddressId,
              },
        paymentMode: cart.PaymentType,
        ordernote: cart.OrderNote,
        status: cart.Status,
        discountAmt: cart.Discount,
        discountPer: cart.DiscountPer,
        shippingCharge: cart.ShippingChrages,
        shippingCharge2: cart.ShippingCharges2,
        shippingChargesAddOn: cart.ShippingChargesAddOn,
        isConfirmed: cart.isConfirmed === 0 ? false : true,
        isTVLicence: cart.isTVLicence === 0 ? false : true,
        isValidLicence: cart.isValidLicence === 0 ? false : true,
        tvLicenceNo: cart.tvLicenceNo,
        tvLicenceType: cart.tvLicenceType,
        tvLicenceResp: cart.tvLicenceResp,
      };
    } else {
      return {
        sessId: state.sessId,
        items: [],
        totalCCAmount: 0,
        totalIEFTAmount: 0,
        orderno: "",
        isInsured: false,
        insAmount: 0,
        shippingAddress: {},
        paymentMode: "",
        ordernote: "",
        status: 0,
        discountPer: 0,
        discountAmt: 0,
        shippingCharge: 0,
        shippingCharge2: 0,
        shippingChargesAddOn: 0,
        isConfirmed: false,
        isTVLicence: false,
        isValidLicence: false,
        tvLicenceNo: "",
        tvLicenceType: "",
        tvLicenceResp: null,
      };
    }
  }

  if (action.type === "SETADDRESS") {
    let cart = action.cart;
    let address = action.address;
    return {
      sessId: state.sessId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      orderno: state.orderno,
      isInsured: state.isInsured,
      insAmount: state.insAmount,
      shippingAddress: address,
      paymentMode: state.paymentMode,
      ordernote: cart.OrderNote,
      status: state.status,
      discountAmt: cart.Discount,
      discountPer: cart.DiscountPer,
      shippingCharge: cart.ShippingChrages,
      shippingCharge2: cart.ShippingCharges2,
      shippingChargesAddOn: cart.ShippingChargesAddOn,
      isConfirmed: state.isConfirmed,
      isTVLicence: state.isTVLicence,
      isValidLicence: state.isValidLicence,
      tvLicenceNo: state.tvLicenceNo,
      tvLicenceType: state.tvLicenceType,
      tvLicenceResp: state.tvLicenceResp,
    };
  }

  if (action.type === "SETPAYMODE") {
    let cart = action.cart;
    let paymode = action.paymode;
    return {
      sessId: state.sessId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      orderno: state.orderno,
      isInsured: state.isInsured,
      insAmount: state.insAmount,
      shippingAddress: state.shippingAddress,
      paymentMode: paymode,
      ordernote: state.OrderNote,
      status: state.status,
      discountAmt: state.discountAmt,
      discountPer: state.discountPer,
      shippingCharge: state.shippingCharge,
      shippingCharge2: state.shippingCharge2,
      shippingChargesAddOn: state.shippingChargesAddOn,
      isConfirmed: state.isConfirmed,
      isTVLicence: state.isTVLicence,
      isValidLicence: state.isValidLicence,
      tvLicenceNo: state.tvLicenceNo,
      tvLicenceType: state.tvLicenceType,
      tvLicenceResp: state.tvLicenceResp,
    };
  }

  if (action.type === "SETCONFIRMED") {
    let cart = action.cart;
    let confirmed = action.confirmed;
    return {
      sessId: state.sessId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      orderno: state.orderno,
      isInsured: state.isInsured,
      insAmount: state.insAmount,
      shippingAddress: state.shippingAddress,
      paymentMode: state.paymentMode,
      ordernote: state.OrderNote,
      status: state.status,
      discountAmt: state.discountAmt,
      discountPer: state.discountPer,
      shippingCharge: state.shippingCharge,
      shippingCharge2: state.shippingCharge2,
      shippingChargesAddOn: state.shippingChargesAddOn,
      isConfirmed: confirmed,
      isTVLicence: state.isTVLicence,
      isValidLicence: state.isValidLicence,
      tvLicenceNo: state.tvLicenceNo,
      tvLicenceType: state.tvLicenceType,
      tvLicenceResp: state.tvLicenceResp,
    };
  }

  if (action.type === "SETORDERDETAILS") {
    let cart = action.cart;
    return {
      sessId: state.sessId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      orderno: cart.orderno,
      isInsured: state.isInsured,
      insAmount: state.insAmount,
      shippingAddress: state.shippingAddress,
      paymentMode: state.paymentMode,
      ordernote: state.OrderNote,
      status: state.status,
      discountAmt: state.discountAmt,
      discountPer: state.discountPer,
      shippingCharge: state.shippingCharge,
      shippingCharge2: state.shippingCharge2,
      shippingChargesAddOn: state.shippingChargesAddOn,
      isConfirmed: state.confirmed,
      isTVLicence: state.isTVLicence,
      isValidLicence: state.isValidLicence,
      tvLicenceNo: state.tvLicenceNo,
      tvLicenceType: state.tvLicenceType,
      tvLicenceResp: state.tvLicenceResp,
    };
  }

  if (action.type === "SETDISCOUNT") {
    return {
      sessId: state.sessId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      orderno: state.orderno,
      isInsured: state.isInsured,
      insAmount: state.insAmount,
      shippingAddress: state.shippingAddress,
      paymentMode: state.paymentMode,
      ordernote: state.ordernote,
      status: state.status,
      discountAmt: action.discountAmt,
      discountPer: action.discountPer,
      shippingCharge: state.shippingCharge,
      shippingCharge2: state.shippingCharge2,
      shippingChargesAddOn: state.shippingChargesAddOn,
      isConfirmed: state.isConfirmed,
      isTVLicence: state.isTVLicence,
      isValidLicence: state.isValidLicence,
      tvLicenceNo: state.tvLicenceNo,
      tvLicenceType: state.tvLicenceType,
      tvLicenceResp: state.tvLicenceResp,
    };
  }

  if (action.type === "SETSHIPPINGCHARGE") {
    return {
      sessId: state.sessId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      orderno: state.orderno,
      isInsured: state.isInsured,
      insAmount: state.insAmount,
      shippingAddress: state.shippingAddress,
      paymentMode: state.paymentMode,
      ordernote: state.ordernote,
      status: state.status,
      discountPer: state.discountPer,
      discountAmt: state.discountAmt,
      shipCharge: action.shipCharge,
      shipCharge2: action.shipCharge2,
      shipChargeAddOn: action.shipChargeAddOn,
      isConfirmed: state.isConfirmed,
      isTVLicence: state.isTVLicence,
      isValidLicence: state.isValidLicence,
      tvLicenceNo: state.tvLicenceNo,
      tvLicenceType: state.tvLicenceType,
      tvLicenceResp: state.tvLicenceResp,
    };
  }

  if (action.type === "SETINSURANCE") {
    let cart = action.cart;
    return {
      sessId: state.sessId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      orderno: state.orderno,
      isInsured: action.isInsured,
      insAmount: action.insuredAmt,
      shippingAddress: state.shippingAddress,
      paymentMode: state.paymentMode,
      ordernote: state.ordernote,
      status: state.status,
      discountPer: state.discountPer,
      discountAmt: state.discountAmt,
      shippingCharge: state.shippingCharge,
      shippingCharge2: state.shippingCharge2,
      shippingChargesAddOn: state.shippingChargesAddOn,
      isConfirmed: state.isConfirmed,
      isTVLicence: state.isTVLicence,
      isValidLicence: state.isValidLicence,
      tvLicenceNo: state.tvLicenceNo,
      tvLicenceType: state.tvLicenceType,
      tvLicenceResp: state.tvLicenceResp,
    };
  }

  if (action.type === "EMPTY") {
    return {
      sessId: state.sessId,
      items: [],
      totalCCAmount: 0,
      totalIEFTAmount: 0,
      orderno: "",
      isInsured: false,
      insAmount: 0,
      shippingAddress: {},
      paymentMode: "",
      ordernote: "",
      status: 0,
      discountPer: 0,
      discountAmt: 0,
      shippingCharge: 0,
      shippingCharge2: 0,
      shippingChargesAddOn: 0,
      isConfirmed: false,
      isTVLicence: false,
      isValidLicence: false,
      tvLicenceNo: "",
      tvLicenceType: "",
      tvLicenceResp: null,
    };
  }

  return defaultCartState;
};

const NCartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemToCartHandler = (id) => {
    const removeCartItem = async () => {
      const cartData = await CartAPI.removeCartItem({ itemid: id });
      fetchCartHandler();
    };

    removeCartItem();
    /* dispatchCartAction({ type: "REMOVE", id: id }); */
  };

  const updateCartItemHandler = (item) => {
    const updateCartItem = async () => {
      const cartData = await CartAPI.updateCartItem({
        itemid: item.id,
        qty: item.amount,
        qtPec: item.qtyPerCust,
      });
      fetchCartHandler();
    };
    updateCartItem();

    /* dispatchCartAction({ type: "UPDATEITEM", item: item }); */
  };

  const emptyCartHandler = () => {
    const clearCart = async () => {
      const cartData = await CartAPI.clearCart();
      dispatchCartAction({ type: "EMPTY" });
    };
    clearCart();
  };

  const fetchCartHandler = () => {
    const updatedState = async () => {
      const cartData = await CartAPI.getCart();
      dispatchCartAction({ type: "FETCH", cartData: cartData.result });
    };

    updatedState();
  };

  const setShippingAddressHandler = (address, ordernote) => {
    if (address !== null && !_.isEmpty(address)) {
      const updateCartItem = async () => {
        const addData = await CartAPI.updateShippingAdd({
          address: address,
          odnote: ordernote !== null ? ordernote : " ",
        });
        let addResult = addData.result;

        dispatchCartAction({
          type: "SETADDRESS",
          cart: addResult.cart,
          address: address,
        });
      };
      updateCartItem();
    }
  };

  const setInsuranceHandler = (isInsured, insuredAmt) => {
    const updateInsurance = async () => {
      const addData = await CartAPI.updateInsurance({
        isInsured: isInsured,
        insuredAmt: insuredAmt,
      });
      let addResult = addData.result;

      dispatchCartAction({
        type: "SETINSURANCE",
        isInsured: isInsured,
        insuredAmt: insuredAmt,
        cart: addResult.cart,
      });
    };
    updateInsurance();
  };

  const setPaymentModeHandler = (paymode) => {
    const updatePaymentMethod = async () => {
      const addData = await CartAPI.setPaymentMethod({
        PaymentMode: paymode,
      });

      let addResult = addData.result;

      dispatchCartAction({
        type: "SETPAYMODE",
        cart: addResult.cart,
        paymode: paymode,
      });
    };
    updatePaymentMethod();
  };

  const setDiscountHandler = (discountAmt, discountPer) => {
    dispatchCartAction({
      type: "SETDISCOUNT",
      discountAmt: discountAmt,
      discountPer: discountPer,
    });
  };

  const setShippingChargesHandler = (shippingAddress) => {
    if (
      shippingAddress.PostCode !== undefined &&
      shippingAddress.PostCode.length > 0
    ) {
      const updateShippingCharge = async () => {
        let shipCharge2 = 0;
        let shipChargeAddOn = 0;
        const addData = await CartAPI.calculateShipping({
          City: shippingAddress.City,
          PostCode: shippingAddress.PostCode,
        });
        let addResult = addData.result;

        dispatchCartAction({
          type: "SETSHIPPINGCHARGE",
          shipCharge: addResult.shippingCharge,
          shipCharge2: shipCharge2,
          shipChargeAddOn: shipChargeAddOn,
        });
      };
      updateShippingCharge();
    }
  };

  const setStatusHandler = (status) => {
    dispatchCartAction({
      type: "SETSTATUS",
      status: status,
    });
  };

  const setConfirmedHandler = (confirmed) => {
    const updateConfirm = async () => {
      const addData = await CartAPI.setConfirmed({
        confirmed: confirmed ? 1 : 0,
      });
      let addResult = addData.result;

      dispatchCartAction({
        type: "SETCONFIRMED",
        cart: addResult.cart,
        confirmed: confirmed,
      });
    };
    updateConfirm();
  };

  const setOrderDetailsHandler = (orderid, orderno) => {
    const setCartOrderDetails = async () => {
      const addData = await CartAPI.setOrderDetails({
        cart: cartState,
      });
      let addResult = addData.result;

      dispatchCartAction({
        type: "SETORDERDETAILS",
        cart: addResult.cart,
      });
    };
    setCartOrderDetails();
  };

  const setPromoCodeHandler = (promocode) => {
    const setPromocodeDetails = async () => {
      const addData = await CartAPI.applyPromocode({
        cart: cartState,
        code: promocode,
      });
      let addResult = addData.result;

      dispatchCartAction({
        type: "SETPROMOCODE",
        cart: addResult.cart,
      });
    };
    setPromocodeDetails();
  };

  /* useEffect(() => {
    const updatedState = async () => {
      const cartData = await CartAPI.getCart();
      dispatchCartAction({ type: "FETCH", cartData: cartData.result });
    };

    updatedState();
  }, []); */

  const ncartContext = {
    sessId: cartState.sessId,
    items: cartState.items,
    totalCCAmount: cartState.totalCCAmount,
    totalIEFTAmount: cartState.totalIEFTAmount,
    orderno: cartState.orderno,
    isInsured: cartState.isInsured,
    insAmount: cartState.insAmount,
    shippingAddress: cartState.shippingAddress,
    paymentMode: cartState.paymentMode,
    ordernote: cartState.ordernote,
    status: cartState.status,
    discountPer: cartState.discountPer,
    discountAmt: cartState.discountAmt,
    shippingCharge: cartState.shippingCharge,
    shippingCharge2: cartState.shippingCharge2,
    shippingChargesAddOn: cartState.shippingChargesAddOn,
    isConfirmed: cartState.isConfirmed,
    isTVLicence: cartState.isTVLicence,
    isValidLicence: cartState.isValidLicence,
    tvLicenceNo: cartState.tvLicenceNo,
    tvLicenceType: cartState.tvLicenceType,
    tvLicenceResp: cartState.tvLicenceResp,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    updateItem: updateCartItemHandler,
    setShippingAddress: setShippingAddressHandler,
    setInsurance: setInsuranceHandler,
    setPaymentMode: setPaymentModeHandler,
    setDiscount: setDiscountHandler,
    setShippingCharges: setShippingChargesHandler,
    fetchCart: fetchCartHandler,
    emptyCart: emptyCartHandler,
    setStatus: setStatusHandler,
    setConfirmed: setConfirmedHandler,
    setOrderDetails: setOrderDetailsHandler,
    setPromoCode: setPromoCodeHandler,
  };

  return (
    <NCartContext.Provider value={ncartContext}>
      {props.children}
    </NCartContext.Provider>
  );
};

export default NCartProvider;
