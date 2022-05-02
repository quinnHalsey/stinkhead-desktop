import React, { useRef, useEffect, useState } from "react";
import Controls from "./Controls";

const Canvas = () => {
  const canvasRef = useRef();
  const [locations, setLocations] = useState([]);
  const [color, setColor] = useState("black");

  const draw = (ctx, location) => {
    ctx.fillStyle = location.color;
    ctx.save();
    ctx.beginPath();
    ctx.arc(location.x, location.y, 30, 0, 2 * Math.PI);
    ctx.lineCap = "round";
    ctx.fill();
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    console.log(locations, "locations");
    locations.forEach((location) => draw(ctx, location));
  }, [locations]);

  const handleClear = () => {
    setLocations([]);
  };

  const handleUndo = () => {
    setLocations(locations.slice(0, -1));
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={(event) => {
          const newLocation = {
            x: event.clientX,
            y: event.clientY,
            color: color,
          };
          setLocations((state) => [...state, newLocation]);
        }}
        id="canvas"
      ></canvas>
      <Controls
        handleClear={handleClear}
        handleUndo={handleUndo}
        setColor={setColor}
      />
    </>
  );
};

export default Canvas;
