import useInterval from "../../hooks/useInterval";
import { useGameContext } from "../../context/gameContext";
import Cell from "../Cell/Cell";
import { MAX_SPEED, NUM_COLS, NUM_ROWS, RESOLUTION } from "../../consts/consts";

const Grid = () => {
  const { grid, runningRef, runSimulation, speed } = useGameContext();

  useInterval(() => {
    if (!runningRef.current) {
      return;
    }
    runSimulation(grid);
  }, MAX_SPEED - speed);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${NUM_COLS}, ${RESOLUTION}px)`,
          gridTemplateRows: `repeat(${NUM_ROWS}, ${RESOLUTION}px)`,
        }}
      >
        {grid.map((row, r) => row.map((cell, c) => <Cell key={`${r}-${c}`} row={r} col={c} value={cell}></Cell>))}
      </div>
    </div>
  );
};

export default Grid;
