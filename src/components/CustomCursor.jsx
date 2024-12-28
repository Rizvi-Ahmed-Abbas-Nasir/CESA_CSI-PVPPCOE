"use client";
import React, { useEffect, useRef } from "react";

const App = () => {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 }); // Initial pointer position
  const trail = useRef([]);
  const params = {
    pointsNumber: 40,
    widthFactor: 0.2, // Adjust the width factor to make the trail thicker
    spring: 0.4,
    friction: 0.5,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize trail points
    for (let i = 0; i < params.pointsNumber; i++) {
      trail.current.push({ x: 0, y: 0, dx: 0, dy: 0 });
    }

    const updateMousePosition = (x, y) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = x - rect.left;
      pointer.current.y = y - rect.top;
    };

    const handleMouseMove = (e) => {
      updateMousePosition(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.current.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer.current : trail.current[pIdx - 1];
        const spring = params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(trail.current[0].x, trail.current[0].y);

      // Create gradient
      const gradient = ctx.createLinearGradient(
        trail.current[0].x,
        trail.current[0].y,
        trail.current[trail.current.length - 1].x,
        trail.current[trail.current.length - 1].y
      );
      gradient.addColorStop(0, "rgba(102, 126, 234, 1)"); // from-purple-700
      gradient.addColorStop(1, "rgba(67, 56, 202, 1)"); // to-blue-900

      for (let i = 1; i < trail.current.length - 1; i++) {
        const xc = 0.5 * (trail.current[i].x + trail.current[i + 1].x);
        const yc = 0.5 * (trail.current[i].y + trail.current[i + 1].y);
        ctx.quadraticCurveTo(trail.current[i].x, trail.current[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * (params.pointsNumber - i); // Adjust width dynamically
        ctx.strokeStyle = gradient; // Gradient trail
        ctx.stroke();
      }

      ctx.lineTo(
        trail.current[trail.current.length - 1].x,
        trail.current[trail.current.length - 1].y
      );
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "fixed", // Fixed to stay in place during scroll
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
        cursor: "none",
        zIndex: 9999, // Ensures the canvas is above other content
        pointerEvents: "none", // Prevents canvas from blocking interactions with other elements
      }}
    />
  );
};

export default App;
