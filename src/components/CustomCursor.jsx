"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const OuterCursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  border: 1px solid #1976d2;
  background-color: transparent;
  transform: translate(-50%, -50%);

  @media (pointer: coarse) {
    display: none;
  }
`;

const InnerCursor = styled.div`
  width: 10px;
  height: 10px;
  background-color: #1976d2;
  border-radius: 50%;
  position: fixed;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);
`;

export default function CustomCursor() {
  const outerCursorRef = useRef(null);
  const innerCursorRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Animate cursor with GSAP
  useEffect(() => {
    if (outerCursorRef.current && innerCursorRef.current) {
      gsap.to(outerCursorRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.to(innerCursorRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        duration: 0,
        ease: "none",
      });
    }
  }, [mousePosition]);

  return (
    <>
      <OuterCursor ref={outerCursorRef} />
      <InnerCursor ref={innerCursorRef} />
    </>
  );
}
