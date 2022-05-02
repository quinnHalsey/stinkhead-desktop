import React from "react";

const Controls = ({ handleClear, handleUndo }) => {
  return (
    <div id="controls-container">
      <button type="button" onClick={handleClear}>
        Clear
      </button>
      <button type="button" onClick={handleUndo}>
        Undo
      </button>
      <button type="button">Save</button>
    </div>
  );
};

export default Controls;
