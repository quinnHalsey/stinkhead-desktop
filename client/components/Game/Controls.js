import React from "react";

const Controls = ({ handleClear, handleSave, setColor, color }) => {
  return (
    <>
      <div id="colors">
        <div
          className={`black ${color === "black" ? "selected color" : "color"}`}
          onClick={() => setColor("black")}
        />
        <div
          className={`red ${color === "red" ? "selected color" : "color"}`}
          onClick={() => setColor("red")}
        />
        <div
          className={`blue ${color === "#001c9b" ? "selected color" : "color"}`}
          onClick={() => setColor("#001c9b")}
        />
        <div
          className={`green ${color === "green" ? "selected color" : "color"}`}
          onClick={() => setColor("green")}
        />
        <div
          className={`yellow ${
            color === "yellow" ? "selected color" : "color"
          }`}
          onClick={() => setColor("yellow")}
        />
        <div
          className={`eraser ${color === "white" ? "selected color" : "color"}`}
          onClick={() => setColor("white")}
        />
      </div>
      <div id="controls-container">
        <button type="button" onClick={handleClear}>
          Clear
        </button>
        {/* <button type="button" onClick={handleSave}>
          Save
        </button> */}
      </div>
    </>
  );
};

export default Controls;
