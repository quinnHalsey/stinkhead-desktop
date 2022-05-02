import React from "react";

const Controls = ({ handleClear, handleUndo, setColor }) => {
  return (
    <>
      <div id="colors">
        <div className="color red" onClick={() => setColor("red")} />
        <div className="color blue" onClick={() => setColor("#001c9b")} />
        <div className="color green" onClick={() => setColor("green")} />
        <div className="color yellow" onClick={() => setColor("yellow")} />
        <div className="color eraser" onClick={() => setColor("white")} />
      </div>
      <div id="controls-container">
        <button type="button" onClick={handleClear}>
          Clear
        </button>
        <button type="button" onClick={handleUndo}>
          Undo
        </button>
        <button type="button">Save</button>
      </div>
    </>
  );
};

export default Controls;
