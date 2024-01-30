import ApiEndpoints from "@apiEndpoints";
import { Catched, eveTechApi } from "@/custom/utils/actions/global";
import * as _ from "lodash";

const ProductAPI: any = {
  getProductCards: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_PRODUCT_CARDS}`,
        {}
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  byQueryId: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.BY_QUERY_ID}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },

  PCByCategoryID: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_PC_BY_CATEGORY_ID}`,

        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },

  getCategoryDetailsBrief: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_CATEGORY_DETAILS_BRIEF}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getProductComponents: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PRODUCT_COMPONENTS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getCategoryDetails: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_CATEGORY_DETAILS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getComponentCategories: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_COMPONENTS_CATEGORY}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getComponentTopBanners: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_COMPONENTS_TOP_BANNERS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getCategoriesByCID: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_CATEGORIES_BY_CID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getProductsByCategoryIDS: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PRODUCTS_BY_CATEGORYIDS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getPcGameData: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PC_GAME_DATA}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getNvidiaGeforceGamingPCs: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_NVIDIA_GEFORCE_GAMING_PCS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getSpecialComponents: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_SPECIAL_COMPONENTS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopSpecials: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_SPECIALS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getGamingLaptops: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_GAMING_LAPTOPS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getProductsByBrandID: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PRODUCTS_BY_BRANDID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getAttributeDetailsByID: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_ATTRIBUTE_DETAILS_BYID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  saveConfig: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.SAVE_CONFIG}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getComponentGallery: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      console.log("options", options);
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_COMPONENT_GALLERY}`,
        options
      );
      console.log("response", response);
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getComponentSimilarProducts: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_COMPONENT_SIMILAR_PRODUCTS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getComponentOverview: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_COMPONENT_OVERVIEW}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getComponentAttributesValue: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_COMPONENT_ATTRIBUTES_VALUES}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getUpgradeKitItems: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_UPGRADEKIT_ITEMS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getFreeStuffInfo: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_FREESTUFF_INFO}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopByMultipleSearchTerm: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_LAPTOP_BY_MULTIPLE_SEARCH_TERM}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getUpgradeKitOverview: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_UPGRADEKIT_OVERVIEW}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getComponentById: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_COMPONENT_BY_ID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopByBrand: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_LAPTOP_BY_BRAND}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getPages: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PAGES}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getComponentByQueryID: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_COMPONENT_BY_QUERY_ID}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getProductsBySearchTerm_Cache: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_PRODUCT_BY_SEARCH_TERM_CACHE}`,
        payload
      );
      console.log("response", response);
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getComponentByAttributeId: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_COMPONENT_BY_ATTRIBUTE_ID}`,
        payload
      );
      console.log("response", response);
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getProductsBySearchTerm: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_PRODUCTS_BY_SEARCH_TERM}`,
        payload
      );
      console.log("response", response);
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getProductByDeal: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_PRODUCTS_BY_DEAL}`,
        payload
      );
      console.log("response", response);
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getPCByConfigSearch: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_PC_BY_CONFIG_SEARCH}`,
        payload
      );
      console.log("response", response);
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopByAttributeId: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_BY_ATTRIBUTE_ID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopDealsByBrandId: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_DEALS_BY_BRAND_ID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  // getLaptopSpecialByAttributeId
  getLaptopSpecialByAttributeId: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_SPECIAL_BY_ATTRIBUTE_ID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  // getLaptopByFTSSearch
  getLaptopByFTSSearch: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_LAPTOP_FTS_SEARCH}`,
        payload
      );
      console.log("response", response);
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  //getLaptopBySearchTerm
  getLaptopBySearchTerm: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_LAPTOP_BY_SEARCH_TERM}`,
        payload
      );
      console.log("response", response);
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  // laptopByIds
  getLaptopByIds: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOPS_BY_IDS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  //getLaptopSpecifications
  getLaptopSpecifications: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_SPECIFICATIONS_BYIDS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getPCById: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PC_BYID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getPCAttributesValue: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PC_ATTRIBUTES_VALUE}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getFPSFilterData: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_FPS_FILTER_DATA}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getCPUList: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_CPU_LIST}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getGPUList: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_GPU_LIST}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getBundlesInfo: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PC_BUNDLES_INFO}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getPCGamesFreeInfo: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PC_GAMES_FREE_INFO}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getPCFreeStuffInfo: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PC_FREE_STUFF_INFO}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getPCProductCards: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PC_PRODUCT_CARDS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getPCData: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PC_DATA}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getBundleGallery: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_BUNDLE_GALLERY}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getBundleOptionsByIds: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_BUNDLE_OPTIONS_BYID}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getRecalculatePerformance: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_RECALCULATE_PERFORMANCE}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getConfigBundles: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_CONFIG_BUNDLES}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getConfig: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_CONFIG}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopBackPacks: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_BACKPACKS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopGallery: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_GALLERY_BYID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopSimilarLinks: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_SIMILAR_LINKS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopSpecification: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_SPECIFICATIONS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopReviews: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_REVIEWS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopBundles: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_BUNDLES}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getAttributesValue: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_ATTRIBUTES_VALUES}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopFreeStuff: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_FREE_STUFF}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopFPSData: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_FPS_DATA}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopGameData: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_GAME_DATA}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getLaptopById: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_BYID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getPCByCategoryID: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_PC_BY_CATEGORY_ID}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getCategoryById: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_CATEGORY_CID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getProductsByScreen: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PRODUCTS_BY_SCREEN}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getProductsByPrice: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_PRODUCTS_BY_PRICE}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getProductsByAttributeID: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PRODUCTS_BY_ATT_ID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getProductsBySeries: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PRODUCTS_BY_SERIES}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getBrandInfo: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_BRAND_INFO}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getProductByBrandId: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_PRODUCT_BY_BRAND_ID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },

  getSpecialPCs: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_SPECIAL_PCS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },

  laptopSpecials: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_LAPTOP_SPECIALS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  gamingLaptopsByFps: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_GAMING_LAPTOPS_BY_FPS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  gamingPCsByFps: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_GAMING_PCS_BY_FPS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },

  GetCategoryById: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_CATEGORY_BY_ID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },

  bmultiqids: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.BY_MULTIPLE_QUERY_IDS}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
};

export default ProductAPI;
