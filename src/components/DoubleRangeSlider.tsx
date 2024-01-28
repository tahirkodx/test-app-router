"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import "@/styles/DoubleRangeSlider.css";
import { FaUndoAlt } from "react-icons/fa";
import useMediaQuery from "@/custom/hooks/useMediaQuery";
import { AnyNsRecord } from "dns";

const DoubleRangeSlider = ({
  min,
  max,
  onChange,
  title,
  onMouseUp,
  onTouchEnd,
  onResetFilters,
}: any) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [upMinVal, setUpMinVal] = useState(min);
  const [upMaxVal, setUpMaxVal] = useState(max);
  const minValRef = useRef<any>(null);
  const maxValRef = useRef<any>(null);
  const range = useRef<any>(null);
  const [label, setLabel] = useState(title !== undefined ? title : "R");

  // Convert to percentage
  const getPercent = useCallback(
    (value: any) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  useEffect(() => {
    onMouseUp({ min: upMinVal, max: upMaxVal });
  }, [upMinVal, upMaxVal, onMouseUp]);

  useEffect(() => {
    onTouchEnd({ min: upMinVal, max: upMaxVal });
  }, [upMinVal, upMaxVal, onTouchEnd]);

  useEffect(() => {}, [upMinVal]);
  useEffect(() => {}, [upMaxVal]);

  const isXXL = useMediaQuery("(min-width: 1400px)");
  const isXL = useMediaQuery("(min-width: 1200px)");
  const isLG = useMediaQuery("(min-width: 992px");
  const isSM = useMediaQuery("(min-width: 576px)");

  return (
    <div
      className={`d-grid gap-2`}
      style={{
        gridTemplateColumns: isXL
          ? `200px auto`
          : isLG
          ? `90px auto`
          : `100px auto`,
      }}
    >
      <div className="container-slider w-100">
        <input
          type="range"
          id="minRange"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          onMouseUp={() => setUpMinVal(minVal)}
          onTouchEnd={() => setUpMinVal(minVal)}
          className={classnames("thumb thumb--zindex-3", {
            "thumb--zindex-5": minVal > max - 100,
          })}
        />
        <input
          type="range"
          id="maxRange"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          onMouseUp={() => setUpMaxVal(maxVal)}
          onTouchEnd={() => setUpMaxVal(maxVal)}
          className="thumb thumb--zindex-4"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          <label
            htmlFor="minRange"
            className="slider__left-value bg-primary text-light"
          >
            {label} {minVal}
          </label>
          <label
            htmlFor="maxRange"
            className="slider__right-value bg-primary text-light"
          >
            {label} {maxVal}
          </label>
        </div>
      </div>

      <span
        className="BtnReset"
        style={{ cursor: "pointer" }}
        onClick={() => {
          minValRef.current.value = min;
          setUpMinVal(min);
          setMinVal(min);
          maxValRef.current.value = max;
          setUpMaxVal(max);
          setMaxVal(max);
          onResetFilters();
        }}
      >
        <FaUndoAlt />
      </span>
    </div>
  );
};

DoubleRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
};

export default DoubleRangeSlider;
