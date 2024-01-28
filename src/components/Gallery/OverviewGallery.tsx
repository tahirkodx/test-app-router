"use client";
import React from "react";
import { useRef, useState } from "react";
import styled from "styled-components";
import "@/styles/Overview.css";

const Container = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #00adb7;
  border-radius: 8px;
  transition: 250ms ease-in-out all;
  background-color: white;
  cursor: zoom-in;
  :hover {
    box-shadow: 1px 4px 5px 0px rgba(125, 125, 125, 0.75);
  }
`;

const Image = styled.img.attrs((props: any) => ({
  src: props.source,
}))``;

const Target = styled(Image)`
  position: absolute;
  left: ${(props: any) => props.offset?.left}px;
  top: ${(props: any) => props.offset?.top}px;
  opacity: ${(props: any) => props.opacity};
`;

const OverviewGallery = (props: any) => {
  const img: any = props.Image;
  const sourceRef: any = useRef(null);
  const targetRef: any = useRef(null);
  const containerRef: any = useRef(null);

  const [opacity, setOpacity] = useState(0);
  const [offset, setOffset] = useState({ left: 0, top: 0 });

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleMouseMove = (e: any) => {
    const targetRect = targetRef.current.getBoundingClientRect();
    const sourceRect = sourceRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const xRatio = (targetRect.width - containerRect.width) / sourceRect.width;
    const yRatio =
      (targetRect.height - containerRect.height) / sourceRect.height;

    const left = Math.max(
      Math.min(e.pageX - sourceRect.left, sourceRect.width),
      0
    );

    const top = Math.max(
      Math.min(e.clientY - sourceRect.top, sourceRect.height),
      0
    );

    setOffset({
      left: left * -xRatio,
      top: top * -yRatio,
    });
  };

  return (
    <Container
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="h-100"
    >
      {/* opacity={opacity}  offset={offset} source={img} */}
      <Image ref={sourceRef} alt="source" source={img} className="w-100" />
      <Target
        ref={targetRef}
        alt="target"
        opacity={opacity}
        offset={offset}
        source={img}
      />
    </Container>
  );
};

export default OverviewGallery;
