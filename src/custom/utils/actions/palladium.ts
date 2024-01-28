"use client";
import ApiEndpoints from "@apiEndpoints";
import {
  Catched,
  invalidPayload,
  eveTechApi,
} from "@/custom/utils/actions/global";
import * as _ from "lodash";

const PalladiumAPI: any = { 
      getPalladiumData: async (payload: any) => {
        try {
          const response = await eveTechApi.post(
            `${ApiEndpoints.GET_PALLADIUM_DATA}`,
            payload
          );
          return response;
        } catch (error: any) {
          return Catched(error);
        }
      },
      getPurchaseHistoryDetail: async (payload: any) => {
        try {
          const response = await eveTechApi.post(
            `${ApiEndpoints.GET_PURCHASE_HISTORY_DETAIL}`,
            payload
          );
          return response;
        } catch (error: any) {
          return Catched(error);
        }
      },
      getPurchaseInvoiceInfo: async (payload: any) => {
        try {
          const response = await eveTechApi.post(
            `${ApiEndpoints.GET_PURCHASE_INVOICE_INFO}`,
            payload
          );
          return response;
        } catch (error: any) {
          return Catched(error);
        }
      },
      getSalesHistory: async (payload: any) => {
        try {
          const response = await eveTechApi.post(
            `${ApiEndpoints.GET_SALES_HISTORY}`,
            payload
          );
          return response;
        } catch (error: any) {
          return Catched(error);
        }
      },
      getSalesHistoryDetail: async (payload: any) => {
        try {
          const response = await eveTechApi.post(
            `${ApiEndpoints.GET_SALES_HISTORY_DETAIL}`,
            payload
          );
          return response;
        } catch (error: any) {
          return Catched(error);
        }
      },
      getProductInfo: async (payload: any) => {
        try {
          const response = await eveTechApi.post(
            `${ApiEndpoints.GET_PALLADIUM_PRODUCT_INFO}`,
            payload
          );
          return response;
        } catch (error: any) {
          return Catched(error);
        }
      },
};

export default PalladiumAPI;    