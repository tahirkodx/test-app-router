import { useTheme } from "@/store/ThemeContext";
import React, { useState } from "react";
import { Button, FormControl, Row } from "react-bootstrap";

interface QtyBoxProps {
  max: number;
  // Include other props as needed
}
const QtyBox = React.forwardRef<HTMLInputElement, QtyBoxProps>((props, ref) => {
  // const QtyBox = React.forwardRef<HTMLInputElement>((props:any,ref:any)=>{
  const [qty, setQty] = useState(1);
  const max = props.max;
  const { isDarkMode } = useTheme();
  const darkMode = isDarkMode;

  const buttonDark = darkMode
    ? `btn-dark border-secondary border-opacity-50 bg-gradient`
    : ``;

  const qtyIncrease = () => {
    setQty((prevQty) => {
      return prevQty + 1 < 21 && prevQty < max ? prevQty + 1 : prevQty;
    });
  };

  const qtyDecrease = () => {
    setQty((prevQty) => {
      return prevQty - 1 > 0 ? prevQty - 1 : prevQty;
    });
  };

  const qtyChange = () => {};

  return (
    <Row>
      <div className="d-inline-flex">
        <Button
          type="button"
          className={`${buttonDark} qty__minus`}
          onClick={qtyDecrease}
        >
          -
        </Button>
        <FormControl
          type="number"
          ref={ref}
          className={`${
            darkMode
              ? `bg-black border-dark border-top border-bottom text-white`
              : ``
          } qty__text`}
          min={1}
          max={max}
          value={qty}
          onChange={qtyChange}
        />
        <Button
          type="button"
          className={`${buttonDark} qty__plus`}
          onClick={qtyIncrease}
        >
          +
        </Button>
      </div>
    </Row>
  );
});

QtyBox.displayName = "QtyBox";

export default QtyBox;
