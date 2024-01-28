import ApiEndpoints from "@apiEndpoints";
import { Catched, eveTechApi } from "@/custom/utils/actions/global";
import * as _ from "lodash";
import token from "@/custom/utils/token";

const AuthAPI: any = {
  userLogin: async (payload: any) => {
    try {
      const response = await eveTechApi.post(`${ApiEndpoints.LOGIN}`, payload);
      // Save token in local storage if found
      // token.set("user:token", response.result.token);
      if(response !== null && response !== undefined && response.result !== undefined)
      {
          token.set("user:token", response.result.authToken);
      }
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  logout: async (payload: any) => {
    try {
      const response = await eveTechApi.get(`${ApiEndpoints.LOGOUT}`);
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
};

export default AuthAPI;
