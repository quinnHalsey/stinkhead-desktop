import React, { useRef, useEffect, useState, useDebugValue } from "react";

import { rtDatabase } from "../utils/firebase";
import { ref, onValue, update, set } from "firebase/database";

import Controls from "./Controls";
import { useSelector } from "react-redux";

const Canvas = ({ gameId }) => {
  const canvasRef = useRef();
  const user = useSelector((state) => state.user);
  const [locations, setLocations] = useState([]);
  const [color, setColor] = useState("black");
  const [size, setSize] = useState(10);
  const [drawing, setDrawing] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const xRef = useRef(x);
  const yRef = useRef(y);

  const collabRole = user.role === "host" ? "player2" : "host";

  let collabLocations = [];

  const drawLine = (ctx, location) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.beginPath();
    ctx.moveTo(location.lastX, location.lastY);
    ctx.lineTo(location.x, location.y);
    ctx.closePath();
    ctx.stroke();
  };

  const draw = (ctx, location) => {
    ctx.fillStyle = location.color;
    ctx.save();
    ctx.beginPath();
    ctx.arc(location.x, location.y, size, 0, 2 * Math.PI);
    ctx.lineCap = "round";
    ctx.fill();
    ctx.restore();
  };
  //   const userLocationsRef = ref(rtDatabase, `games/${gameId}/locations`);
  const collabLocationsRef = ref(
    rtDatabase,
    `games/${gameId}/players/${collabRole}/locations`
  );

  //   onValue(collabLocationsRef, (snapshot) => {
  //     const locationsString = snapshot.val();
  //     const locationsParsed = JSON.parse(locationsString);
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");
  //     ctx.clearRect(0, 0, canvas.height, canvas.width);

  //     // if (Array.isArray(locationsParsed)) {
  //     //   collabLocations = locationsParsed;
  //     //   locationsParsed.forEach((location) => draw(ctx, location));
  //     //   locations.forEach((location) => draw(ctx, location));
  //     // }
  //   });

  //   this.socket.on("canvas-data", function(data){

  //     var root = this;
  //     var interval = setInterval(function(){
  //         if(root.isDrawing) return;
  //         root.isDrawing = true;
  //         clearInterval(interval);
  //         var image = new Image();
  //         var canvas = document.querySelector('#board');
  //         var ctx = canvas.getContext('2d');
  //         image.onload = function() {
  //             ctx.drawImage(image, 0, 0);

  //             root.isDrawing = false;
  //         };
  //         image.src = data;
  //     }, 200)

  const drawingRef = ref(rtDatabase, `games/${gameId}/drawing`);

  onValue(drawingRef, (snapshot) => {
    console.log(drawing);
    console.log(snapshot.val(), "snapshot");
    if (drawing) return;
    const image = new Image();
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    image.src = snapshot.val();
    image.onload = function () {
      ctx.drawImage(image, 0, 0);
    };
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

    // console.log(locations, "locations");
    // locations.forEach((location) => draw(ctx, location));
    // console.log(collabLocations, "collab locations in use Effect");
    // if (Array.isArray(collabLocations)) {
    //   collabLocations.forEach((location) => draw(ctx, location));
    // }
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
        onMouseDown={(e) => {
          setDrawing(true);
          xRef.current = e.clientX;
          yRef.current = e.clientY;
        }}
        onMouseMove={(e) => {
          if (drawing) {
            const newLine = {
              lastX: xRef.current,
              lastY: yRef.current,
              x: e.clientX,
              y: e.clientY,
              color,
            };
            xRef.current = e.clientX;
            yRef.current = e.clientY;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            drawLine(ctx, newLine);
          }
        }}
        onMouseUp={() => {
          if (drawing) {
            setDrawing(false);
            const canvas = document.querySelector("canvas");
            const base64ImageData = canvas.toDataURL("image/png");
            set(ref(rtDatabase, `games/${gameId}/drawing`), base64ImageData);
            setX(0);
            setY(0);
          }
        }}
        id="canvas"
      ></canvas>
      <Controls
        handleClear={handleClear}
        handleUndo={handleUndo}
        setColor={setColor}
        setSize={setSize}
      />
    </>
  );
};

export default Canvas;
