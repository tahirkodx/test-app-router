"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "@/styles/laptop/MultiRangeSlider.css";

const MultiRangeSlider = ({
  min,
  max,
  onChange,
  onMouseUp,
  onTouchEnd,
}: any) => {
  const [minVal, setMinVal] = useState<any>(min);
  const [maxVal, setMaxVal] = useState<any>(max);
  const [upMinVal, setUpMinVal] = useState<any>(min);
  const [upMaxVal, setUpMaxVal] = useState<any>(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: any) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
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

  useEffect(() => {
    console.log("min", min);
  }, [min]);

  useEffect(() => {
    console.log("max", max);
  }, [max]);

  return (
    <div style={{ height: "40px", display: "flex", alignItems: "center" }}>
      <div className="MultiRangeSlider" style={{ marginTop: "-12px" }}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
          }}
          onMouseUp={() => setUpMinVal(minVal)}
          onTouchEnd={() => setUpMinVal(minVal)}
          className="thumb thumb--left"
          style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          onMouseUp={() => setUpMaxVal(maxVal)}
          onTouchEnd={() => setUpMaxVal(maxVal)}
          className="thumb thumb--right"
        />

        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          <div className="slider__left-value">{minVal}</div>
          <div className="slider__right-value">{maxVal}</div>
        </div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
};

export default MultiRangeSlider;
