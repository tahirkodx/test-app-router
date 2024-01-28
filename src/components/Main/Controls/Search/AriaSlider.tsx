import React from "react";
import { useSliderState } from "react-stately";

import {
  mergeProps,
  useFocusRing,
  useNumberFormatter,
  useSlider,
  useSliderThumb,
  VisuallyHidden,
} from "react-aria";

import "@/styles/Search/AriaSlider.css";

export default function AriaSlider(props: any) {
  let trackRef = React.useRef(null);

  let numberFormatter = useNumberFormatter(props.formatOptions);
  let state = useSliderState({ ...props, numberFormatter });
  let { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef
  );

  return (
    <div {...groupProps} className={`slider ${state.orientation}`}>
      {props.label && (
        <div className="label-container">
          <label {...labelProps}>{props.label}</label>
          <output {...outputProps}>
            {`${state.getThumbValueLabel(0)} - ${state.getThumbValueLabel(1)}`}
          </output>
        </div>
      )}
      <div
        {...trackProps}
        ref={trackRef}
        className={`track ${state.isDisabled ? "disabled" : ""}`}
      >
        <Thumb index={0} state={state} trackRef={trackRef} />
        <Thumb index={1} state={state} trackRef={trackRef} />
      </div>
    </div>
  );
}

function Thumb(props: any) {
  let { state, trackRef, index } = props;
  let inputRef = React.useRef(null);
  let { thumbProps, inputProps, isDragging } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
    },
    state
  );

  let { focusProps, isFocusVisible } = useFocusRing();
  return (
    <div
      {...thumbProps}
      className={`thumb ${isFocusVisible ? "focus" : ""} ${
        isDragging ? "dragging" : ""
      }`}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </div>
  );
}
