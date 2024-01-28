import axios from "@axios";
import _ from "lodash";

export const FetchReactInfo = (
  url: string,
  columnId: any,
  retries = 2,
  delay = 1000
) => {
  return axios;
  // return fetch(url, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     id: columnId,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  // })
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     if (_.isEmpty(data.result)) {
  //       throw new Error("Empty response received");
  //     }
  //     return data;
  //   })
  //   .catch((error) => {
  //     if (retries > 0) {
  //       return new Promise((resolve) => {
  //         setTimeout(
  //           () => resolve(FetchReactInfo(url, columnId, retries - 1, delay)),
  //           delay
  //         );
  //       });
  //     } else {
  //       throw new Error("Max retries reached");
  //     }
  //   });
};
