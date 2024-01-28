import ApiEndpoints from "@apiEndpoints";
import {
  Catched,
  invalidPayload,
  eveTechApi,
} from "@/custom/utils/actions/global";
import * as _ from "lodash";

const CmsAPI: any = {
  getReactInfo: async (payload: any) => {
    try {
      if (payload.id) {
        const response = await eveTechApi.post(
          `${ApiEndpoints.GET_REACT_INFO}`,
          {
            id: payload.id,
          }
        );
        return response;
      } else {
        return invalidPayload("No id provided");
      }
    } catch (error: any) {
      return Catched(error);
    }
  },
  rctwebinfmulti: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.RCT_WEB_INF_MULTI}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  joinUs: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.JOIN_US}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getWebInfo: async (payload: any) => {
    try {
      const options: any = {
        payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_WEB_INFO}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getState: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_STATE}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getCities: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_CITIES}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getSuburbs: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_SUBURBS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  tellFriend: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.TELL_FRIEND}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  pricematch: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.PRICE_MATCH}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  notifyMe: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.NOTIFY_ME}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getFaqs: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_FAQS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getTermsConditions: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_TERMS_CONDITIONS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getOrderInfo: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_ORDER_INFO}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getInfoByColumn: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_INFO_BY_COLUMN}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getDelieveryInfo: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_DELIVERY_INFO}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
};

export default CmsAPI;
