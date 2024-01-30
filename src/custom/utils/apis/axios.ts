import axios from "axios";
import CONFIG from "@/custom/utils/config";
import token from "@/custom/utils/token";

const gotToLogin = () => {
  if(typeof localStorage === 'undefined') {
    window.location.href = "/logout";
    return;
  }
  localStorage?.removeItem("user:token");
  const auth:any = localStorage?.getItem("user_auth");
  if(auth !== undefined && auth !== null && auth.isLoggedIn)
    window.location.href = "/logout";
};
//const tokenString = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYTFjNWY0NmYtODQxNC00ZmNiLWIyYjQtNDJjZjQ0MjRhYWYzIiwiY3JlYXRlZF9hdCI6MTY4MjgyNTk2Ni44OTY5OTA1fQ.vAmosk0hHVcjDjDGPmgVy91iDX9wfQf03Rz0Abxp3x0";
const userToken = () => {
  if(typeof localStorage === 'undefined') return;
  const tokenInStorage = token.get("user:token");
  if (!tokenInStorage) {
    const tokenData = token.get("token"); 
    if (!tokenInStorage) {
      return ""; 
    }
    else{
      return tokenData;
    }
  }
  return tokenInStorage;
};

const axiosInstance = axios.create({
  baseURL: "https://api-dev.evetech.co.za/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    // if (
    //   !config.headers.hasOwnProperty("Content-Type") ||
    //   (config.headers?.["Content-Type"] &&
    //     config.headers["Content-Type"] === null)
    // ) {
    //   config.headers["Content-Type"] = "application/json";
    // }
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${userToken()}`,
    };
   /*  alert(JSON.stringify(config)); */
    // If there is no token, delete if from the header before making a request
    if (!userToken()) {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(undefined, async (error) => {
  // Check if there is a 401 and logout if there is
  if (error?.response?.status === 401) {
    gotToLogin();
    // this.$store.dispatch('');
  }
  return Promise.reject(error);
});

export default axiosInstance;
