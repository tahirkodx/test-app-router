import ApiEndpoints from "@apiEndpoints";
import {
  Catched,
  invalidPayload,
  eveTechApi,
} from "@/custom/utils/actions/global";
import * as _ from "lodash";

const CartAPI: any = {
  getCart: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_CART}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getClientSessionId: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_CLIENT_SESSION_ID}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  updateCartItem: async (payload: any) => {
    try {
      if (payload?.itemid) {
        const response = await eveTechApi.post(
          `${ApiEndpoints.UPDATE_CART_ITEM}`,
          payload
        );
        return response;
      } else {
        return invalidPayload("No itemid provided");
      }
    } catch (error: any) {
      return Catched(error);
    }
  },
  removeCartItem: async (payload: any) => {
    try {
      if (payload?.itemid) {
        const response = await eveTechApi.post(
          `${ApiEndpoints.REMOVE_CART_ITEM}`,
          payload
        );
        return response;
      } else {
        return invalidPayload("No itemid provided");
      }
    } catch (error: any) {
      return Catched(error);
    }
  },
  clearCart: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.CLEAR_CART}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  updateShippingAdd: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.UPDATE_SHIPPING_ADD}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  updateInsurance: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.UPDATE_INSURANCE}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  setPaymentMethod: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.SET_PAYMENT_METHOD}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  calculateShipping: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.CALCULATE_SHIPPING}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  calculateAuthShipping: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.CALCULATE_AUTH_SHIPPING}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  setConfirmed: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.SET_CONFIRMED}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  setOrderDetails: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.SET_ORDER_DETAILS}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  applyPromocode: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.APPLY_PROMOCODE}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  addToCart: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.ADD_TO_CART}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  addAuthToCart: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.AUTH_ADD_TO_CART}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  setQuotation: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.SET_QUOTATION}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  checkClientLicence: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.CHECK_CLIENT_LICENCE}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getConfirmEFT: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_CONFIRM_EFT}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  validateOzowResp: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_VALIDATE_OZOW_RESP}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  validateOzowNotifyResp: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_VALIDATE_OZOW_RESP_NOTIFY}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  validatePayGateResp: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_VALIDATE_PAYGATE_RESP}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  validateTVLicence: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_VALIDATE_TV_LICENCE}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
};

export default CartAPI;
