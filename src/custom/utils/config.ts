"use client";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig() || {};

const CONFIG = {
  BASE_URL: publicRuntimeConfig?.BASE_URL,
};

export default CONFIG;
