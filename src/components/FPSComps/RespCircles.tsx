import React from "react";
import HorizontalScrollView from "@/components/Main/Controls/HorizontalScrollView";
import Circles from "./Circles";
import useMediaQuery from "@/custom/hooks/useMediaQuery";

const RespCircles = ({
  styles,
  hdPer,
  hdFPS,
  fhdFPS,
  fhdPer,
  fourkPer,
  fourkFPS,
  showHD,
  showFHD,
  showFourK,
}: any) => {
  const isXL = useMediaQuery("(min-width: 1200px)");
  return isXL ? (
    <Circles
      styles={styles}
      hdPer={hdPer}
      hdFPS={hdFPS}
      fhdFPS={fhdFPS}
      fhdPer={fhdPer}
      fourkFPS={fourkFPS}
      fourkPer={fourkPer}
      showHD={showHD}
      showFHD={showFHD}
      showFourK={showFourK}
    />
  ) : (
    <HorizontalScrollView
      className="hide-scrollbar w-100 cursor-grab"
      hideHeading={true}
      hideButtons={true}
    >
      <Circles
        styles={styles}
        hdPer={hdPer}
        hdFPS={hdFPS}
        fhdFPS={fhdFPS}
        fhdPer={fhdPer}
        fourkFPS={fourkFPS}
        fourkPer={fourkPer}
        showHD={showHD}
        showFHD={showFHD}
        showFourK={showFourK}
      />
    </HorizontalScrollView>
  );
};

export default RespCircles;
