export enum ApiEndpoints {
  // Auth Endpoints
  LOGIN = "/userLogin",
  LOGOUT = "/logout",
  REGISTER_USER = "/util/registerUser",

  // Product Endpoints
  GET_PRODUCT_CARDS = "/getProductCards",
  BY_QUERY_ID = "/byQueryId",
  GET_CATEGORY_DETAILS_BRIEF = "/getCategoryDetailsBrief",
  GET_PRODUCT_COMPONENTS = "/getProductComponents",
  GET_CATEGORY_DETAILS = "/getCategoryDetails",
  GET_COMPONENTS_CATEGORY = "/getComponentCategories",
  GET_COMPONENTS_TOP_BANNERS = "/getComponentTopBanners",
  GET_CATEGORIES_BY_CID = "/getCategoriesByCID",
  GET_PRODUCTS_BY_CATEGORYIDS = "/getProductsByCategoryIDS",
  GET_LAPTOP_BY_BRAND = "/laptopByBrand",
  SAVE_CONFIG = "/saveConfig",
  GET_COMPONENT_GALLERY = "/ComponentGallery",
  GET_COMPONENT_SIMILAR_PRODUCTS = "/ComponentSimilarProducts",
  GET_COMPONENT_OVERVIEW = "/ComponentOverview",
  GET_COMPONENT_ATTRIBUTES_VALUES = "/ComponentAttributesValue",
  GET_UPGRADEKIT_ITEMS = "/UpgradeKitItems",
  GET_FREESTUFF_INFO = "/FreeStuffInfo",
  GET_UPGRADEKIT_OVERVIEW = "/UpgradeKitOverview",
  GET_COMPONENT_BY_ID = "/ComponentById",
  GET_PAGES = "/Pages",
  GET_PC_GAME_DATA = "/getPcGameData",
  GET_COMPONENT_BY_QUERY_ID = "/ComponentByQueryId",
  GET_PRODUCT_BY_SEARCH_TERM_CACHE = "/getProductsBySearchTerm_Cache",
  GET_COMPONENT_BY_ATTRIBUTE_ID = "/getComponentByAttributeId",
  GET_PRODUCTS_BY_SEARCH_TERM = "/getProductsBySearchTerm",
  GET_PRODUCTS_BY_DEAL = "/getProductByDeal",
  GET_PC_BY_CONFIG_SEARCH = "/getPCByConfigSearch",
  GET_LAPTOP_BY_ATTRIBUTE_ID = "/getLaptopByAttributeId",
  GET_LAPTOP_DEALS_BY_BRAND_ID = "/getLaptopDealsByBrandId",
  GET_LAPTOP_SPECIAL_BY_ATTRIBUTE_ID = "/getLaptopSpecialByAttributeId",
  GET_LAPTOP_FTS_SEARCH = "/getLaptopByFTSSearch",
  GET_LAPTOP_BY_SEARCH_TERM = "/getLaptopBySearchTerm",
  GET_LAPTOPS_BY_IDS = "/laptopByIds",
  GET_LAPTOP_SPECIFICATIONS_BYIDS = "/laptopSpecificationsByNpids",
  GET_PC_BYID = "/getPCById",
  GET_PC_ATTRIBUTES_VALUE = "/PCAttributesValue",
  GET_FPS_FILTER_DATA = "/getFPSFilterData",
  GET_CPU_LIST = "/getCPUList",
  GET_GPU_LIST = "/getGPUList",
  GET_SPECIAL_COMPONENTS = "/getSpecialComponents",
  GET_LAPTOP_SPECIALS = "/laptopSpecials",
  GET_GAMING_LAPTOPS = "getGamingLaptop",
  GET_PRODUCTS_BY_BRANDID = "getProductsByBrandID",
  GET_ATTRIBUTE_DETAILS_BYID = "getAttributeDetailsByID",
  GET_PC_BUNDLES_INFO = "/getBundlesInfo",
  GET_PC_GAMES_FREE_INFO = "/getPCGamesFreeInfo",
  GET_PC_FREE_STUFF_INFO = "/getPCFreeStuffInfo",
  GET_PC_PRODUCT_CARDS = "/getPCProductCards",
  GET_PC_DATA = "/getPCData",
  GET_BUNDLE_GALLERY = "/getBundleGallery",
  GET_BUNDLE_OPTIONS_BYID = "/getBundleOptionsByIds",
  GET_RECALCULATE_PERFORMANCE = "/getRecalculatePerformance",
  GET_CONFIG_BUNDLES = "/getConfigBundles",
  GET_CONFIG = "/getConfig",
  GET_LAPTOP_BACKPACKS = "/laptopBackPacks",
  GET_LAPTOP_GALLERY_BYID = "/laptopGalleryById",
  GET_LAPTOP_SIMILAR_LINKS = "/laptopSimilarLinks",
  GET_LAPTOP_SPECIFICATIONS = "/laptopSpecifications",
  GET_LAPTOP_REVIEWS = "/laptopReviews",
  GET_LAPTOP_BUNDLES = "/laptopBundles",
  GET_LAPTOP_ATTRIBUTES_VALUES = "/LaptopAttributesValue",
  GET_LAPTOP_FREE_STUFF = "/laptopFreeStuff",
  GET_LAPTOP_FPS_DATA = "/laptopFPSData",
  GET_LAPTOP_BYID = "/laptopById",
  GET_CATEGORY_CID = "/GetCategoryById",
  GET_PRODUCTS_BY_SCREEN = "/getProductsByScreen",
  GET_PRODUCTS_BY_PRICE = "/getProductsByPrice",
  GET_PRODUCTS_BY_ATT_ID = "/getProductsByAttributeID",
  GET_PRODUCTS_BY_SERIES = "/getProductsBySeries",
  GET_BRAND_INFO = "/getBrandInfo",
  GET_PRODUCT_BY_BRAND_ID = "/getProductByBrandId",
  GET_SPECIAL_PCS = "/getSpecialPCs",
  GET_LAPTOP_GAME_DATA = "/getLaptopGameData",
  GET_GAMING_LAPTOPS_BY_FPS = "/gamingLaptopsByFps",
  GET_GAMING_PCS_BY_FPS = "/gamingPCsByFps",
  GET_PC_BY_CATEGORY_ID = "/PCByCategoryID",
  GET_CATEGORY_BY_ID = "/GetCategoryById",
  BY_MULTIPLE_QUERY_IDS = "/bmultiqids",
  GET_NVIDIA_GEFORCE_GAMING_PCS = "/getNvidiaGeforceGamingPCs",
  GET_LAPTOP_BY_MULTIPLE_SEARCH_TERM = "/getLaptopByMultipleSearchTerm",

  // UTIL, GUTIL & CMS Endpoints
  GET_REACT_INFO = "/gutil/getReactInfo",
  GET_WEB_INFO = "/gutil/getWebInfo",
  RCT_WEB_INF_MULTI = "/gutil/rctwebinfmulti",
  GET_STATE = "/util/getState",
  GET_CITIES = "/util/getCities",
  GET_SUBURBS = "/util/getSuburbs",
  GET_FAQS = "/gutil/getFaqs",
  GET_TERMS_CONDITIONS = "/gutil/getTermsConditions",
  GET_ORDER_INFO = "/gutil/getOrderInfo",
  JOIN_US = "/util/joinUs",
  GET_INFO_BY_COLUMN = "/config/getInfoByColumn",
  TELL_FRIEND = "/util/tellFriend",
  PRICE_MATCH = "/util/priceMatch",
  NOTIFY_ME = "/util/notifyMe",
  GET_DELIVERY_INFO = "/gutil/getDelieveryInfo",

  // Cart APIs
  GET_CART = "/cart/getCart",
  GET_CLIENT_SESSION_ID = "/cart/getClientSessionId",
  REMOVE_CART_ITEM = "/cart/removeCartItem",
  UPDATE_CART_ITEM = "/cart/updateCartItem",
  CLEAR_CART = "/cart/clearCart",
  CALCULATE_SHIPPING = "/cart/calculateShipping",
  UPDATE_SHIPPING_ADD = "/authcart/updateShippingAdd",
  UPDATE_INSURANCE = "/authcart/updateInsurance",
  SET_PAYMENT_METHOD = "/authcart/setPaymentMethod",
  CALCULATE_AUTH_SHIPPING = "/authcart/calculateShipping",
  SET_CONFIRMED = "/authcart/setConfirmed",
  SET_ORDER_DETAILS = "/authcart/setOrderDetails",
  APPLY_PROMOCODE = "/authcart/applyPromocode",
  ADD_TO_CART = "/cart/add",
  AUTH_ADD_TO_CART = "/authcart/add",
  SET_QUOTATION = "/authcart/setQuotation",
  CHECK_CLIENT_LICENCE = "/authcart/checkClientLicence",
  GET_CONFIRM_EFT = "/authcart/getConfirmEFT",
  GET_VALIDATE_OZOW_RESP = "/authcart/validateOzowResp",
  GET_VALIDATE_OZOW_RESP_NOTIFY = "/authcart/validateOzowNotifyResp",
  GET_VALIDATE_PAYGATE_RESP = "/authcart/validatePayGateResp",
  GET_VALIDATE_TV_LICENCE = "/authcart/validateTVLicence",

  // User APIs
  USER_GET_VALIDATE = "/user/getValidate",
  USER_GET_ACTIVITY = "/user/getUserActivity",
  USER_GET_SUMMARY = "/user/getUserSummary",
  USER_GET_PROFILE = "/user/getUserProfile",
  USER_UPDATE_PROFILE = "/user/updateProfile",
  USER_GET_ADDRESSES = "/user/getUserAddresses",
  USER_GET_ORDERS = "/user/getUserOrders",
  USER_GET_WISHLIST = "/user/getUserWishlist",
  USER_REMOVE_WISH_ITEM = "/user/removeUserWishItem",
  USER_CHECK_WISHLIST_ITEM = "/user/checkWishlistItem",
  USER_ADD_WISHLIST_ITEM = "/user/addWishlistItem",
  USER_CHANGE_PASSWORD = "/user/changePassword",
  USER_MANAGE_PASSWORD = "/user/manageAddress",
  USER_DELETE_ADDRESS = "/user/deleteAddress",
  USER_SET_PRIMARY_ADDRESS = "/user/setPrimaryAddress",
  USER_GET_ADDRESS_BYID = "/user/getAddressById",
  USER_EXTEND_TOKEN = "/user/extendToken",
  USER_GET_ORDER_DETAILS = "/user/getOrderDetails",
  //HelpeDeskAPI
  HELP_CREATE_TICKET = "/helpdesk/createTicket",

  //JobsAPI
  GET_ACTIVE_JOBS = "/jobs/getActiveJobs",
  GET_JOB = "/jobs/getJob",
  CHECK_JOB_BEFORE = "/jobs/checkJobBefore",
  JOB_APPLY = "/jobs/jobApply",
  USER_OFFLINE_ORDERS = "/eserver/getUserOfflineOrders",
  USER_RMA_FORM_LIST = "/eserver/getRMAFormList",
  USER_MANAGE_ADDRESS = "/user/manageAddress",
  GET_ADDRESS_BY_ID = "/user/getAddressById",
  DELETE_ADDRESS_BY_ID = "/user/deleteAddress",

  //Eserver Endpoints
  FIND_RMA_BY_ID = "/eserver/findRMAById",
  FIND_RMA_ITEM_BYID = "/eserver/findRMAItemsByID",
  ADD_RMA_FORM = "/eserver/addRMAForm",
  FIND_RECEIPT_BY_ID_NO = "/eserver/findRecieptIDNo",
  FIND_DEFAULT_FORM_RMA = "/eserver/findDefaultFormRMA",

  //Palladium Endpoints
  GET_PALLADIUM_DATA = "/palladium/getPalladiumData",
  GET_PURCHASE_HISTORY_DETAIL = "/palladium/getPurchaseHistoryDetail",
  GET_PURCHASE_INVOICE_INFO = "/palladium/getPurchaseInvoiceInfo",
  GET_SALES_HISTORY = "/palladium/getSalesHistory",
  GET_SALES_HISTORY_DETAIL = "/palladium/getSalesHistoryDetail",
  GET_PALLADIUM_PRODUCT_INFO = "/palladium/getProductInfo",
}

export default ApiEndpoints;
