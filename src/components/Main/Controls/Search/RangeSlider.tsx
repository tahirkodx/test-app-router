"use client";
import React, { useEffect, useState } from "react";
import { useConnector } from "react-instantsearch-hooks-web";
import connectRange from "instantsearch.js/es/connectors/range/connectRange";

import AriaSlider from "./AriaSlider";

function useRangeSlider(props: any) {
  return useConnector(connectRange, props);
}

export default function RangeSlider(props: any) {
  const { start, range, canRefine, refine } = useRangeSlider(props) as {
    start: [number, number];
    range: { min: number; max: number };
    canRefine: boolean;
    refine: () => void;
  };
  const [values, setValues] = useState([range.min, range.max]);

  const { min: minRange, max: maxRange } = range;

  useEffect(() => {
    const [minStart, maxStart] = start;
    const minFinite = minStart === -Infinity ? minRange : minStart;
    const maxFinite = maxStart === Infinity ? maxRange : maxStart;
    setValues([Math.min(minFinite, maxRange), Math.max(minRange, maxFinite)]);
  }, [start, minRange, maxRange]);

  return (
    <AriaSlider
      label={props.title}
      step={1}
      value={values}
      onChange={setValues}
      onChangeEnd={refine}
      minValue={minRange}
      maxValue={maxRange}
      isDisabled={!canRefine}
    />
  );
}
