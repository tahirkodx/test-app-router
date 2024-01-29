"use client";
import ApiEndpoints from "@apiEndpoints";
import { Catched, eveTechApi } from "@/custom/utils/actions/global";
import * as _ from "lodash";

const JobsAPI: any = {
  getActiveJobs: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      const response = await eveTechApi.get(
        `${ApiEndpoints.GET_ACTIVE_JOBS}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  getJob: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      console.log(options);
      const response = await eveTechApi.get(`${ApiEndpoints.GET_JOB}`, options);
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  checkJobBefore: async (payload: any) => {
    try {
      const options: any = {
        params: payload,
      };
      console.log(options);
      const response = await eveTechApi.get(
        `${ApiEndpoints.CHECK_JOB_BEFORE}`,
        options
      );
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
  jobApply: async (payload: any) => {
    try {
      const response = await eveTechApi.post(`${ApiEndpoints.JOB_APPLY}`, {
        body: payload.formData,
      });
      return response;
    } catch (error: any) {
      return Catched(error);
    }
  },
};

export default JobsAPI;
