import React from "react";
import { useSpring, animated } from "react-spring";
import { useGesture } from "react-use-gesture";
import styles from "@/styles/ProductDeals.module.scss";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { nanoid } from "nanoid";
import Heading from "@/components/Heading";

const sideScroll = (element: any, speed: any, distance: any, step: any) => {
  let scrollAmount = 0;
  const slideTimer = setInterval(() => {
    element.scrollLeft += step;
    scrollAmount += Math.abs(step);
    if (scrollAmount >= distance) {
      clearInterval(slideTimer);
    }
  }, speed);
};

const HorizontalScrollView = (props: any) => {
  const ref: any = React.useRef();
  const isDragging = React.useRef(false);
  const [{ x }, set, stop]: any = useSpring(() => ({
    x: 0,
  }));

  const bind = useGesture(
    {
      onDrag({ down, movement: [x], first, last, vxvy: [vx] }) {
        if (first) isDragging.current = true;
        if (last) setTimeout(() => (isDragging.current = false), 0);
        set({ x: -x, immediate: down });
      },
      onClickCapture(ev: any) {
        if (isDragging.current) {
          try {
            ev.stopPropagation();
          } catch (e) {}
        }
        if (ref.current) {
          try {
            ev.stopPropagation();
          } catch (e) {}
        }
      },
      onWheelStart() {
        // Stop any user-land scroll animation from confcliting with the browser
        try {
          stop();
        } catch (e) {}
      },
    },
    {
      drag: {
        axis: "x",
        filterTaps: true,
        initial() {
          return [-ref.current.scrollLeft, 0];
        },
      },
    }
  );

  return (
    <Card key={nanoid(10)} className={`${styles.ParentCard} p-0`}>
      <Card.Header className={`${styles.Header}`}>
        <div className="d-flex justify-content-between align-items-center flex-wrap px-2">
          <Heading level={2} className={`m-0 fs-4`}>
            {props.dealtitle}
          </Heading>
          <div className="rounded overflow-hidden d-flex">
            <Link href={props.pagelink} title={props.dealtitle}>
              <Button className="rounded-0" size="sm">
                View All
              </Button>
            </Link>
            <Button
              onClick={() => sideScroll(ref.current, 25, 275, -27)}
              className="rounded-0 d-block"
              size="sm"
            >
              <FaCaretLeft className="d-flex align-items-center" />
            </Button>
            <Button
              onClick={() => sideScroll(ref.current, 25, 275, 27)}
              className="rounded-0 d-block"
              size="sm"
            >
              <FaCaretRight className="d-flex align-items-center" />
            </Button>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="p-0 m-0">
        <animated.div
          ref={ref}
          scrollLeft={x}
          className={props.className}
          {...bind()}
        >
          {props.children}
        </animated.div>
      </Card.Body>
    </Card>
  );
};

export default HorizontalScrollView;
