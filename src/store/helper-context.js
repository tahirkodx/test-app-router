import React from "react";

const HelperContext = React.createContext({
  siteInfo: {},
  fetchedDt: "",
  showClearance:false,
  showDealIcon:false,
  dealText:"",
  flixMediaEnable:false,
  officeEnable:false,
  showBackPack:false,
  showInstantEFT:false,
  updateSoldOut:false,
  ConnectPalladium:false,
  showMsgOnCheckout:false,
  msgOnCheckout:"",
  enableTokenisation:false,
  enableEft:false,
  switchMandrill:false,
  dealTags:[],
  isSet: false,
  onReset: () => {},
  onFetch: () => {},
});

export default HelperContext;
