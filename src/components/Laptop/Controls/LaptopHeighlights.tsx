import { nanoid } from "nanoid";
import React from "react";

const LaptopHeighlights = (props: any) => {
  let high = props.high;
  //   const { commonState } = useContext(CommonContext);
  //   const darkMode = commonState.darkMode;
  const darkMode = false;

  return (
    <>
      <div className="overflow-hidden" style={{ maxHeight: "250px" }}>
        <ul
          className={`
          ${darkMode ? `text-light` : ``}
          ps-3 pb-1 m-0
        `}
        >
          {high.split("|").map((highlight: any) => (
            <li
              style={{ listStyleType: "disclosure-closed" }}
              className={`cardListText m-0`}
              key={nanoid(10)}
            >
              {highlight
                .replaceAll(
                  `<span style="font-bold:bold; font-size: 17px;">`,
                  ``
                )
                .replaceAll(`<span style="font-size: 17px;">`, ``)
                .replaceAll(`<span style="font-size:17px;">`, ``)
                .replaceAll(
                  `<span style="font-bold:bold; font-size: 16px;">`,
                  ``
                )
                .replaceAll(
                  `<span style="font-size: 16px;font-weight:bold; ">`,
                  ``
                )
                .replaceAll(
                  `<span style="font-size: 16px; font-weight:bold; ">`,
                  ``
                )
                .replaceAll(
                  `<span style="font-size:16px;font-weight:bold;">`,
                  ``
                )
                .replaceAll(`<span style="font-size: 15px;">`, ``)
                .replaceAll(`</span>`, ``)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default LaptopHeighlights;
