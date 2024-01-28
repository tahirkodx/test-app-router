import { TAPIParams } from "../types";

export const transformAPIParams = (json: any): TAPIParams => {
  return {
    id: json?.id || 0,
  };
};
