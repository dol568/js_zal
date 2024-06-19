import React, { useState, useEffect } from "react";
import Cell from "../Cell/Cell";
import { getNextCell, initializeGrid, setCellVisited } from "../../helpers/helpers";
import { exampleInput } from "../../helpers/exampleInput";
import { GRID_SIZE, CELL_SIZE } from "../../helpers/consts";

const TreasureHunt = () => {
  const [grid, setGrid] = useState(initializeGrid(exampleInput));
  const [message, setMessage] = useState("");
  const [isHunting, setIsHunting] = useState(false);
  
  useEffect(() => {
    let timeout;
    setGrid((prev) => setCellVisited(prev, 0, 0));

    const search = () => {
      if (!isHunting) return;

      let row = 0;
      let col = 0;
      const rows = grid.length;
      const cols = grid[0].length;

      const step = () => {
        const cell = grid[row][col];
        const val = cell.val;

        const { nextRow, nextCol } = getNextCell(val);

        if (row === nextRow && col === nextCol) {
          setMessage(`Treasure found at (${row + 1}, ${col + 1})!`);
          setIsHunting(false);
          setGrid((prev) => setCellVisited(prev, row, col));
          return;
        }

        if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
          setMessage("No valid path found");
          setIsHunting(false);
          return;
        }

        row = nextRow;
        col = nextCol;

        setGrid((prev) => setCellVisited(prev, row, col));

        timeout = setTimeout(step, 1000);
      };

      step();
    };

    if (isHunting) {
      search();
    }

    return () => clearTimeout(timeout);
  }, [isHunting]);

  const startHunt = () => {
    setGrid(initializeGrid(exampleInput));
    setMessage("");
    setIsHunting(true);
  };

  return (
    <div>
      <button onClick={startHunt} disabled={isHunting}>
        Start Treasure Hunt
      </button>
      <div>
        <h3>Visited Cells:</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <Cell key={`${r}-${c}`} row={r} col={c} value={cell.val} visited={cell.visited}></Cell>
            ))
          )}
        </div>
      </div>
      {message && <h3>{message}</h3>}
    </div>
  );
};

export default TreasureHunt;
