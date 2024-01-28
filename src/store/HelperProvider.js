"use client";
import React, { useReducer } from "react";
import HelperContext from "@/store/helper-context";
import { useEffect } from "react";
import moment from "moment";
import _ from "lodash";
import { CmsAPI } from "@actions";

const defultHelperState = {
  siteInfo: {},
  fetchedDt: "",
  showClearance: false,
  showDealIcon: false,
  dealText: "",
  flixMediaEnable: false,
  officeEnable: false,
  showBackPack: false,
  showInstantEFT: false,
  updateSoldOut: false,
  ConnectPalladium: false,
  showMsgOnCheckout: false,
  msgOnCheckout: "",
  enableTokenisation: false,
  enableEft: false,
  switchMandrill: false,
  dealTags: [],
  isSet: false,
};

const helperReducer = (state, action) => {
  if (action.type === "FETCH") {
    const siteinfo = async () => {
      const siteDatas = await CmsAPI.getWebInfo();
      let siteData = siteDatas?.result;
      return siteData;
    };
    // const data = await CmsAPI.getWebInfo();
    // let siteinfo = null;

    // console.log("data", data);
    // if (menuData.result !== undefined) {
    //   siteinfo = data.result;
    // }
    // let siteData = siteDatas?.result;
    // return siteData;

    return {
      siteInfo: siteinfo,
      showClearance:
        siteinfo.showClearance !== undefined
          ? siteinfo.showClearance === "yes"
            ? true
            : false
          : false,
      showDealIcon:
        siteinfo.showDealIcon !== undefined
          ? siteinfo.showDealIcon === "yes"
            ? true
            : false
          : false,
      dealText: siteinfo.dealText !== undefined ? siteinfo.dealText : "",
      flixMediaEnable:
        siteinfo.flixMediaEnable !== undefined
          ? siteinfo.flixMediaEnable === "yes"
            ? true
            : false
          : false,
      officeEnable:
        siteinfo.officeEnable !== undefined
          ? siteinfo.officeEnable === "yes"
            ? true
            : false
          : state.officeEnable,
      showBackPack:
        siteinfo.backpackEnable !== undefined
          ? siteinfo.backpackEnable === "yes"
            ? true
            : false
          : state.showBackPack,
      showInstantEFT:
        siteinfo.ShowInstantEFT !== undefined
          ? siteinfo.ShowInstantEFT === "yes"
            ? true
            : false
          : state.showInstantEFT,
      updateSoldOut:
        siteinfo.updateSoldOut !== undefined
          ? siteinfo.updateSoldOut === "yes"
            ? true
            : false
          : state.updateSoldOut,
      ConnectPalladium:
        siteinfo.ConnectPalladium !== undefined
          ? siteinfo.ConnectPalladium === "yes"
            ? true
            : false
          : state.ConnectPalladium,
      showMsgOnCheckout:
        siteinfo.showMsgOnCheckout !== undefined
          ? siteinfo.showMsgOnCheckout === "yes"
            ? true
            : false
          : state.showMsgOnCheckout,
      msgOnCheckout: siteinfo.MsgOnCheckout,
      enableTokenisation:
        siteinfo.enableTokenisation !== undefined
          ? siteinfo.enableTokenisation === "yes"
            ? true
            : false
          : state.enableTokenisation,
      enableEft:
        siteinfo.enableEft !== undefined
          ? siteinfo.enableEft === "yes"
            ? true
            : false
          : state.enableEft,
      switchMandrill:
        siteinfo.switchMandrill !== undefined
          ? siteinfo.switchMandrill === "yes"
            ? true
            : false
          : state.switchMandrill,
      fetchedDt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      dealTags:
        siteinfo.dealTags !== undefined && typeof siteinfo.dealTags === "object"
          ? siteinfo.dealTags
          : state.dealTags,
      isSet: !_.isEmpty(siteinfo) ? true : false,
    };
  }

  if (action.type === "REFETCH") {
    return {
      siteInfo: state.siteInfo,
      fetchedDt: state.fetchedDt,
      showClearance: state.showClearance,
      showDealIcon: state.showDealIcon,
      dealText: state.dealText,
      flixMediaEnable: state.flixMediaEnable,
      officeEnable: state.officeEnable,
      showBackPack: state.showBackPack,
      showInstantEFT: state.ShowInstantEFT,
      updateSoldOut: state.updateSoldOut,
      ConnectPalladium: state.ConnectPalladium,
      showMsgOnCheckout: state.showMsgOnCheckout,
      msgOnCheckout: state.MsgOnCheckout,
      enableTokenisation: state.enableTokenisation,
      enableEft: state.enableEft,
      switchMandrill: state.switchMandrill,
      dealTags: state.dealTags,
      isSet: false,
    };
  }

  if (action.type === "SETSITE") {
    return {
      siteInfo: action.siteInfo,
      fetchedDt: action.fetchedDt,
      showClearance:
        action.siteInfo?.showClearance !== undefined
          ? action.siteInfo?.showClearance === "yes"
            ? true
            : false
          : state.showClearance,
      showDealIcon:
        action.siteInfo?.showDealIcon !== undefined
          ? action.siteInfo?.showDealIcon === "yes"
            ? true
            : false
          : state.showDealIcon,
      dealText:
        action.siteInfo?.dealText !== undefined
          ? action.siteInfo?.dealText
          : state.dealText,
      flixMediaEnable:
        action.siteInfo?.flixMediaEnable !== undefined
          ? action.siteInfo?.flixMediaEnable === "yes"
            ? true
            : false
          : state.flixMediaEnable,
      officeEnable:
        action.siteInfo?.officeEnable !== undefined
          ? action.siteInfo?.officeEnable === "yes"
            ? true
            : false
          : state.officeEnable,
      showBackPack:
        action.siteInfo?.backpackEnable !== undefined
          ? action.siteInfo?.backpackEnable === "yes"
            ? true
            : false
          : state.showBackPack,
      showInstantEFT:
        action.siteInfo?.ShowInstantEFT !== undefined
          ? action.siteInfo?.ShowInstantEFT === "yes"
            ? true
            : false
          : state.showInstantEFT,
      updateSoldOut:
        action.siteInfo?.updateSoldOut !== undefined
          ? action.siteInfo?.updateSoldOut === "yes"
            ? true
            : false
          : state.updateSoldOut,
      ConnectPalladium:
        action.siteInfo?.ConnectPalladium !== undefined
          ? action.siteInfo?.ConnectPalladium === "yes"
            ? true
            : false
          : state.ConnectPalladium,
      showMsgOnCheckout:
        action.siteInfo?.showMsgOnCheckout !== undefined
          ? action.siteInfo?.showMsgOnCheckout === "yes"
            ? true
            : false
          : state.showMsgOnCheckout,
      msgOnCheckout: action.siteInfo?.MsgOnCheckout,
      enableTokenisation:
        action.siteInfo?.enableTokenisation !== undefined
          ? action.siteInfo?.enableTokenisation === "yes"
            ? true
            : false
          : state.enableTokenisation,
      enableEft:
        action.siteInfo?.enableEft !== undefined
          ? action.siteInfo?.enableEft === "yes"
            ? true
            : false
          : state.enableEft,
      switchMandrill:
        action.siteInfo?.switchMandrill !== undefined
          ? action.siteInfo?.switchMandrill === "yes"
            ? true
            : false
          : state.switchMandrill,
      dealTags:
        action.siteInfo?.dealTags !== undefined &&
        typeof action.siteInfo?.dealTags === "object"
          ? action.siteInfo?.dealTags
          : state.dealTags,
      isSet: true,
    };
  }

  return defultHelperState;
};

const HelperProvider = (props) => {
  const [helperState, dispatchHelperAction] = useReducer(
    helperReducer,
    defultHelperState
  );

  const FetchHandler = () => {
    dispatchHelperAction({ type: "FETCH" });
  };

  const ResetHandler = () => {
    dispatchHelperAction({ type: "REFETCH" });
  };

  useEffect(() => {
    const siteinfo = async () => {
      const siteDatas = await CmsAPI.getWebInfo();
      let siteData = siteDatas?.result;

      dispatchHelperAction({
        type: "SETSITE",
        siteInfo: siteData,
        fetchedDt: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      });
    };

    siteinfo();
  }, []);

  const helperContext = {
    siteInfo: helperState.siteInfo,
    fetchedDt: helperState.fetchedDt,
    showClearance: helperState.showClearance,
    showDealIcon: helperState.showDealIcon,
    dealText: helperState.dealText,
    flixMediaEnable: helperState.flixMediaEnable,
    officeEnable: helperState.officeEnable,
    showBackPack: helperState.showBackPack,
    showInstantEFT: helperState.showInstantEFT,
    updateSoldOut: helperState.updateSoldOut,
    ConnectPalladium: helperState.ConnectPalladium,
    showMsgOnCheckout: helperState.showMsgOnCheckout,
    msgOnCheckout: helperState.msgOnCheckout,
    enableTokenisation: helperState.enableTokenisation,
    enableEft: helperState.enableEft,
    switchMandrill: helperState.switchMandrill,
    dealTags: helperState.dealTags,
    isSet: helperState.isSet,
    onReset: ResetHandler,
    onFetch: FetchHandler,
  };

  return (
    <HelperContext.Provider value={helperContext}>
      {props.children}
    </HelperContext.Provider>
  );
};

export default HelperProvider;
