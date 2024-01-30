import axios from "@axios";
import * as _ from "lodash";
import qs from "query-string";

export const invalidPayload = (message: string) => {
  return {
    success: false,
    message:
      message ||
      "Invalid parameters. Please try again with correct parameters.",
    result: [],
  };
};

export const Catched = (error: any) => {
  try {
    return {
      success: false,
      errorMessage: error?.message || "",
      message:
        error?.response?.data?.error?.[0] ||
        "Something went wrong. Please try again later.",
      errorData: error,
    };
  } catch (e: any) {
    return {
      success: false,
      errorMessage: e?.message || "",
      message: "Something went wrong. Please try again later.",
      errorData: e,
    };
  }
};

const convertValuesToUrl = (values: string) => {
  return Object.values(values)
    .map((value) => encodeURIComponent(value))
    .join("/");
};

export const eveTechApi = {
  get: async (
    url: string,
    options: any = {
      params: {},
      useQueryString: false,
    }
  ) => {
    try {
      const { params, useQueryString } = options;
      let payload = params;
      let updateUrl = url;
      if (params) {
        if (!useQueryString) {
          payload = convertValuesToUrl(params);
          updateUrl = `${url}/${payload}`;
        } else {
          payload = qs.stringify(params, { arrayFormat: "bracket" });
        }
      } else {
        payload = {};
      }
      
      const { data } = await axios.get(
        // API URL
        updateUrl,
        // API Params and Query string handling
        _.isEmpty(params) ? {} : payload
      );
      if (_.isEmpty(data.result)) {
        throw new Error("Empty GET response received");
      }
      return { result: data.result };
    } catch (error: any) {
      console.log(error.message);
      handleApiError(error);
      return { result: null };
    }
  },

  post: async (url: string, body = {}, config = {}) => {
    try {
      const { data } = await axios.post(url, body, config);
      if (_.isEmpty(data.result)) {
        throw new Error("Empty POST response received");
      }
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  put: async (url: string, body = {}, config = {}) => {
    try {
      const { data } = await axios.put(url, body, config);
      if (_.isEmpty(data.result)) {
        throw new Error("Empty PUT response received");
      }
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  patch: async (url: string, body = {}, config = {}) => {
    try {
      const { data } = await axios.patch(url, body, config);
      if (_.isEmpty(data.result)) {
        throw new Error("Empty PATCH response received");
      }
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },

  delete: async (url: string, config = {}) => {
    try {
      const { data } = await axios.delete(url, config);
      if (_.isEmpty(data.result)) {
        throw new Error("Empty DELETE response received");
      }
      return data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

const handleApiError = (error: any) => {
  return Catched(error);
};
