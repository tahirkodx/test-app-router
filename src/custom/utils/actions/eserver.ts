"use client";
import ApiEndpoints from "@apiEndpoints";
import {
  Catched,
  invalidPayload,
  eveTechApi,
} from "@/custom/utils/actions/global";
import * as _ from "lodash";

const EserverAPI: any = {
  findRMAByID: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.FIND_RMA_BY_ID}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  findRMAItemsByID: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.FIND_RMA_ITEM_BYID}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  addRMAForm: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.ADD_RMA_FORM}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  findRecieptIDNo: async (payload: any) => {
    try {
      const response = await eveTechApi.post(
        `${ApiEndpoints.FIND_RECEIPT_BY_ID_NO}`,
        payload
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  findDefaultFormRMA: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.FIND_DEFAULT_FORM_RMA}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
};

export default EserverAPI;
