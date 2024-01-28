import React from "react";
import { MdOutlineSpeed } from "react-icons/md";

const FpsButton = ({ styles }: any) => {
  return (
    <>
      <div className={`${styles.FPSButton} d-flex cursor-pointer`}>
        <div
          className={`${styles.FPSButton__Content} d-flex align-items-center text-light`}
        >
          <div className={`${styles.FPSButton__Icon} lh-0`}>
            <div className="bg-dark bg-gradient">
              <MdOutlineSpeed className="fs-4 " />
            </div>
          </div>
          <div className={`${styles.FPSButton__TextContainer}`}>
            <div className="bg-dark bg-gradient">
              <div className={`${styles.FPSButton__Text} fw-3 fst-italic`}>
                FPS
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FpsButton;
