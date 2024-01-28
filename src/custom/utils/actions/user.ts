import ApiEndpoints from "@apiEndpoints";
import { Catched, eveTechApi } from "@/custom/utils/actions/global";
import * as _ from "lodash";

const UserAPI: any = {
  getValidate: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_GET_VALIDATE}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getUserActivity: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      console.log(options);
      const response = await eveTechApi.get(
        `${ApiEndpoints.USER_GET_ACTIVITY}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getUserSummary: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_GET_SUMMARY}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getOrderDetails: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_GET_ORDER_DETAILS}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getUserProfile: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_GET_PROFILE}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  updateProfile: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_UPDATE_PROFILE}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getUserAddresses: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_GET_ADDRESSES}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getUserOrders: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_GET_ORDERS}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getUserWishList: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_GET_WISHLIST}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  removeUserWishItem: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_REMOVE_WISH_ITEM}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  checkWishlistItem: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_CHECK_WISHLIST_ITEM}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  addWishlistItem: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_ADD_WISHLIST_ITEM}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getUserOfflineOrders: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_OFFLINE_ORDERS}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getRMAFormList: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_RMA_FORM_LIST}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  changePassword: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_CHANGE_PASSWORD}`,
        {
          id: payload.id,
        }
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  manageAddress: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.USER_MANAGE_ADDRESS}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getAddressById: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.GET_ADDRESS_BY_ID}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  deleteAddress: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.DELETE_ADDRESS_BY_ID}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  registerUser: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.REGISTER_USER}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
};

export default UserAPI;
