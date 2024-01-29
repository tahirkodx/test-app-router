"use client";
import React, { useReducer } from "react";
import CartContext from "./cart-context";
import _ from "lodash";

const defaultCartState = {
  cartId: "",
  items: [],
  totalCCAmount: 0,
  totalIEFTAmount: 0,
  token: "",
  orderno: "",
  orderid: "",
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
  cartResp: {
    isRes: false,
    message: "",
    actionRes: false,
  },
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let itemAdd = true;
    let itemUpdate = false;

    /* check item exist or not */
    // console.log("state.items", state.items);
    let upItems = _.map(state.items, (item) => {
      if (item.productId === action.item.productId) {
        if (item.ieftPrice === parseFloat(action.item.ieftPrice)) {
          if (item.amount === action.item.amount) {
            itemAdd = false;
          } else {
            // console.log("qtyLimit", action.item.qtyPerCust);
            if (
              action.item.qtyPerCust !== undefined &&
              action.item.qtyPerCust > 0
            ) {
              let nQty = parseInt(action.item.amount);
              if (nQty < action.item.qtyPerCust) {
                item.amount = nQty;
              } else {
                item.amount = action.item.qtyPerCust;
              }
            } else {
              item.amount = parseInt(action.item.amount);
            }
            itemAdd = false;
            itemUpdate = true;
          }
        }
      }
      return item;
    });
    // console.log("upItems", upItems);
    if (itemAdd) {
      let updatedItems = state.items.concat(action.item);
      let updateTotalCCAmount = state.totalCCAmount;

      try {
        updateTotalCCAmount = (
          parseFloat(state.totalCCAmount) +
          action.item.ccPrice * action.item.amount
        ).toFixed(2);
      } catch (e) {
        updateTotalCCAmount = (
          action.item.ccPrice * action.item.amount
        ).toFixed(2);
      }
      let updateTotalIEFTAmount = state.totalIEFTAmount;
      try {
        updateTotalIEFTAmount = (
          parseFloat(state.totalIEFTAmount) +
          action.item.ieftPrice * action.item.amount
        ).toFixed(2);
      } catch (e) {
        updateTotalIEFTAmount = (
          action.item.ieftPrice * action.item.amount
        ).toFixed(2);
      }

      return {
        cartId: state.cartId,
        items: updatedItems,
        totalCCAmount: updateTotalCCAmount,
        totalIEFTAmount: updateTotalIEFTAmount,
        token: state.token,
        orderno: state.orderno,
        orderid: state.orderid,
        isInsured: state.isInsured,
        insAmount: state.insAmount,
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
        cartResp: {
          isRes: true,
          message: "Product added to cart",
          actionRes: true,
        },
      };
    } else {
      let updateTotalCCAmount = 0;
      let updateTotalIEFTAmount = 0;
      _.each(state.items, (item) => {
        updateTotalIEFTAmount += parseFloat(
          item.ieftPrice * item.amount
        ).toFixed(2);
        updateTotalCCAmount += parseFloat(item.ccPrice * item.amount).toFixed(
          2
        );
      });

      return {
        cartId: state.cartId,
        items: state.items,
        totalCCAmount: updateTotalCCAmount,
        totalIEFTAmount: updateTotalIEFTAmount,
        token: state.token,
        orderno: state.orderno,
        orderid: state.orderid,
        isInsured: state.isInsured,
        insAmount: state.insAmount,
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
        cartResp: {
          isRes: true,
          message: itemUpdate
            ? "Product updated to cart"
            : "Product already exist to the cart.",
          actionRes: itemUpdate ? true : false,
        },
      };
    }
  }

  if (action.type === "REMOVE") {
    let deleteItem = _.first(
      _.filter(state.items, (item) => item.id === action.id)
    );
    let updatedItems = _.filter(state.items, (item) => item.id !== action.id);
    let updateTotalCCAmount = state.totalCCAmount;
    try {
      updateTotalCCAmount = (
        parseFloat(state.totalCCAmount) -
        deleteItem.ccPrice * deleteItem.amount
      ).toFixed(2);
    } catch (e) {
      updateTotalCCAmount = (deleteItem.ccPrice * deleteItem.amount).toFixed(2);
    }
    let updateTotalIEFTAmount = state.totalIEFTAmount;
    try {
      updateTotalIEFTAmount = (
        parseFloat(state.totalIEFTAmount) -
        deleteItem.ieftPrice * deleteItem.amount
      ).toFixed(2);
    } catch (e) {
      updateTotalIEFTAmount = (
        deleteItem.ieftPrice * deleteItem.amount
      ).toFixed(2);
    }

    return {
      cartId: state.cartId,
      items: updatedItems,
      totalCCAmount: updateTotalCCAmount,
      totalIEFTAmount: updateTotalIEFTAmount,
      token: state.token,
      orderno: state.orderno,
      orderid: state.orderid,
      isInsured: state.isInsured,
      insAmount: state.insAmount,
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
      cartResp: {
        isRes: true,
        message: "Product removed from cart",
        actionRes: true,
      },
    };
  }

  if (action.type === "UPDATEID") {
    return {
      cartId: action.id,
    };
  }

  if (action.type === "EMPTY") {
    return {
      cartId: "",
      items: [],
      totalCCAmount: 0,
      totalIEFTAmount: 0,
    };
  }

  if (action.type === "UPDATEITEM") {
    /* let oldItem = _.filter(state.items, (item) => {
      return item.productId === action.item.productId;
    }); */
    let updateItems = _.map(state.items, (item) => {
      if (item.id === action.item.id) {
        item = action.item;
      }
      return item;
    });

    let updateTotalCCAmount = state.totalCCAmount;
    try {
      updateTotalCCAmount = _.sum(
        _.map(updateItems, (item) => {
          return parseFloat(item.ccPrice * item.amount);
        })
      ).toFixed(2);
    } catch (e) {}

    let updateTotalIEFTAmount = state.totalIEFTAmount;
    try {
      updateTotalIEFTAmount = _.sum(
        _.map(updateItems, (item) => {
          return parseFloat(item.ieftPrice * item.amount);
        })
      ).toFixed(2);
    } catch (e) {}

    return {
      cartId: state.cartId,
      items: updateItems,
      totalCCAmount: updateTotalCCAmount,
      totalIEFTAmount: updateTotalIEFTAmount,
      token: state.token,
      orderno: state.orderno,
      orderid: state.orderid,
      isInsured: state.isInsured,
      insAmount: state.insAmount,
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
      cartResp: {
        isRes: true,
        message: "Product updated to the cart",
        actionRes: true,
      },
    };
  }

  if (action.type === "SETADDRESS") {
    return {
      cartId: state.cartId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      token: state.token,
      orderno: state.orderno,
      orderid: state.orderid,
      isInsured: state.isInsured,
      insAmount: state.insAmount,
      shippingAddress: action.address,
      paymentMode: state.paymentMode,
      ordernote: action.ordernote,
      status: state.status,
      discountPer: state.discountPer,
      discountAmt: state.discountAmt,
      shippingCharge: state.shippingCharge,
      shippingCharge2: state.shippingCharge2,
      shippingChargesAddOn: state.shippingChargesAddOn,
      isConfirmed: state.isConfirmed,
      cartResp: {
        isRes: true,
        message: "Address set sucessfully.",
        actionRes: true,
      },
    };
  }

  if (action.type === "SETINSURANCE") {
    return {
      cartId: state.cartId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      token: state.token,
      orderno: state.orderno,
      orderid: state.orderid,
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
      cartResp: {
        isRes: true,
        message: "Product removed from cart",
        actionRes: true,
      },
    };
  }

  if (action.type === "SETORDERDETAILS") {
    return {
      cartId: state.cartId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      token: state.token,
      orderno: action.orderno,
      orderid: action.orderid,
      isInsured: state.isInsured,
      insAmount: state.insAmount,
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
      cartResp: {
        isRes: true,
        message: "Order details updated",
        actionRes: true,
      },
    };
  }

  if (action.type === "SETPAYMODE") {
    return {
      cartId: state.cartId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      token: state.token,
      orderno: state.orderno,
      orderid: state.orderid,
      isInsured: state.isInsured,
      insAmount: state.insAmount,
      shippingAddress: state.shippingAddress,
      paymentMode: action.paymode,
      ordernote: state.ordernote,
      status: state.status,
      discountPer: state.discountPer,
      discountAmt: state.discountAmt,
      shippingCharge: state.shippingCharge,
      shippingCharge2: state.shippingCharge2,
      shippingChargesAddOn: state.shippingChargesAddOn,
      isConfirmed: state.isConfirmed,
      cartResp: {
        isRes: true,
        message: "Pay mode updated",
        actionRes: true,
      },
    };
  }

  if (action.type === "SETDISCOUNT") {
    return {
      cartId: state.cartId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      token: state.token,
      orderno: state.orderno,
      orderid: state.orderid,
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
      cartResp: {
        isRes: true,
        message: "",
        actionRes: true,
      },
    };
  }

  if (action.type === "SETSHIPPINGCHARGE") {
    return {
      cartId: state.cartId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      token: state.token,
      orderno: state.orderno,
      orderid: state.orderid,
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
      cartResp: {
        isRes: true,
        message: "",
        actionRes: true,
      },
    };
  }

  if (action.type === "SETSTATUS") {
    return {
      cartId: state.cartId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      token: state.token,
      orderno: state.orderno,
      orderid: state.orderid,
      isInsured: state.isInsured,
      insAmount: state.insAmount,
      shippingAddress: state.shippingAddress,
      paymentMode: state.paymentMode,
      ordernote: state.ordernote,
      status: action.status,
      discountPer: state.discountPer,
      discountAmt: state.discountAmt,
      shippingCharge: state.shippingCharge,
      shippingCharge2: state.shippingCharge2,
      shippingChargesAddOn: state.shippingChargesAddOn,
      isConfirmed: state.isConfirmed,
      cartResp: {
        isRes: true,
        message: "Status updated",
        actionRes: true,
      },
    };
  }

  if (action.type === "SETCONFIRMED") {
    return {
      cartId: state.cartId,
      items: state.items,
      totalCCAmount: state.totalCCAmount,
      totalIEFTAmount: state.totalIEFTAmount,
      token: state.token,
      orderno: state.orderno,
      orderid: state.orderid,
      isInsured: state.isInsured,
      insAmount: state.insAmount,
      shippingAddress: state.shippingAddress,
      paymentMode: state.paymentMode,
      ordernote: state.ordernote,
      status: state.status,
      discountPer: state.discountPer,
      discountAmt: state.discountAmt,
      shippingCharge: state.shippingCharge,
      shippingCharge2: state.shippingCharge2,
      shippingChargesAddOn: state.shippingChargesAddOn,
      isConfirmed: action.confirmed,
      cartResp: {
        isRes: true,
        message: "Order set confirmed",
        actionRes: true,
      },
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemToCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const updateCartIdHandler = (id) => {
    dispatchCartAction({ type: "UPDATEID", id: id });
  };

  const updateCartItemHandler = (item) => {
    dispatchCartAction({ type: "UPDATEITEM", item: item });
  };

  const emptyCartHandler = () => {
    dispatchCartAction({ type: "EMPTY" });
  };

  const setShippingAddressHandler = (address, ordernote) => {
    dispatchCartAction({
      type: "SETADDRESS",
      address: address,
      ordernote: ordernote,
    });
  };

  const setInsuranceHandler = (isInsured, insuredAmt) => {
    dispatchCartAction({
      type: "SETINSURANCE",
      isInsured: isInsured,
      insuredAmt: insuredAmt,
    });
  };

  const setOrderDetailsHandler = (orderid, orderno) => {
    dispatchCartAction({
      type: "SETORDERDETAILS",
      orderid: orderid,
      orderno: orderno,
    });
  };

  const setPaymentModeHandler = (paymode) => {
    dispatchCartAction({
      type: "SETPAYMODE",
      paymode: paymode,
    });
  };

  const setDiscountHandler = (discountAmt, discountPer) => {
    dispatchCartAction({
      type: "SETDISCOUNT",
      discountAmt: discountAmt,
      discountPer: discountPer,
    });
  };

  const setShippingChargesHandler = (
    shipCharge,
    shipCharge2,
    shipChargeAddOn
  ) => {
    dispatchCartAction({
      type: "SETSHIPPINGCHARGE",
      shipCharge: shipCharge,
      shipCharge2: shipCharge2,
      shipChargeAddOn: shipChargeAddOn,
    });
  };

  const setStatusHandler = (status) => {
    dispatchCartAction({
      type: "SETSTATUS",
      status: status,
    });
  };

  const setConfirmedHandler = (confirmed) => {
    dispatchCartAction({
      type: "SETCONFIRMED",
      confirmed: confirmed,
    });
  };

  const cartContext = {
    cartId: cartState.cartId,
    items: cartState.items,
    totalCCAmount: cartState.totalCCAmount,
    totalIEFTAmount: cartState.totalIEFTAmount,
    token: cartState.token,
    orderno: cartState.orderno,
    orderid: cartState.orderid,
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
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler,
    updateCartId: updateCartIdHandler,
    updateItem: updateCartItemHandler,
    setShippingAddress: setShippingAddressHandler,
    setInsurance: setInsuranceHandler,
    setOrderDetails: setOrderDetailsHandler,
    setPaymentMode: setPaymentModeHandler,
    setDiscount: setDiscountHandler,
    setShippingCharges: setShippingChargesHandler,
    emptyCart: emptyCartHandler,
    setStatus: setStatusHandler,
    setConfirmed: setConfirmedHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
