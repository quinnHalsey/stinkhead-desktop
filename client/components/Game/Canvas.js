import React, { useRef, useEffect, useState } from "react";

import { rtDatabase } from "../utils/firebase";
import { ref, onValue, update, set } from "firebase/database";

import Controls from "./Controls";
import { useSelector } from "react-redux";

const Canvas = ({ gameId }) => {
  const canvasRef = useRef();
  const user = useSelector((state) => state.user);
  const [locations, setLocations] = useState([]);
  const [color, setColor] = useState("black");

  const collabRole = user.role === "host" ? "player2" : "host";

  let collabLocations = [];

  const draw = (ctx, location) => {
    ctx.fillStyle = location.color;
    ctx.save();
    ctx.beginPath();
    ctx.arc(location.x, location.y, 30, 0, 2 * Math.PI);
    ctx.lineCap = "round";
    ctx.fill();
    ctx.restore();
  };
  //   const userLocationsRef = ref(rtDatabase, `games/${gameId}/locations`);
  const collabLocationsRef = ref(
    rtDatabase,
    `games/${gameId}/players/${collabRole}/locations`
  );

  onValue(collabLocationsRef, (snapshot) => {
    const locationsString = snapshot.val();
    const locationsParsed = JSON.parse(locationsString);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    console.log(locationsParsed, "parsed locations for other user");
    if (Array.isArray(locationsParsed)) {
      collabLocations = locationsParsed;
      locationsParsed.forEach((location) => draw(ctx, location));
      locations.forEach((location) => draw(ctx, location));
    }
  });

  useEffect(() => {
    if (locations.length) {
      set(
        ref(rtDatabase, `games/${gameId}/players/${user.role}/locations`),
        JSON.stringify(locations)
      );
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    console.log(locations, "locations");
    locations.forEach((location) => draw(ctx, location));
    console.log(collabLocations, "collab locations in use Effect");
    if (Array.isArray(collabLocations)) {
      collabLocations.forEach((location) => draw(ctx, location));
    }
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
          if (!locations.includes(JSON.stringify(newLocation))) {
            setLocations((state) => [...state, newLocation]);
          }
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
