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

export const MetaDefault = () => {
  return {
    title:
      "Evetech Custom Computer Systems, Gaming Computers, Desktops Gaming PCs",
    description:
      "Gaming Pc's, Custom Built Cheap Gaming Computer Systems, The lastest Gaming PC Systems, Intel i7 PC Gaming Desktops. Configure your own Gaming Pc Here!",
    keywords:
      "gaming pc,gaming computers,cheap gaming pc,intel core i7,custom gaming computers,custom gaming pc",
    alternates: {
      canonical: "https://www.evetech.co.za/",
    },
    image:
      "https://www.evetech.co.za/repository/productImages/Evetech-Logo-Icon.png",
  };
};
