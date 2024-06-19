import { createContext, useCallback, useContext, useRef, useState } from "react";
import { createEmptyOrRandom, isEmptyBoard } from "../consts/helpers";
import { NUM_COLS, NUM_ROWS } from "../consts/consts";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [grid, setGrid] = useState(() => createEmptyOrRandom());
  const [isEmpty, setIsEmpty] = useState(false);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [generation, setGeneration] = useState(0);

  const runningRef = useRef(running);
  runningRef.current = running;

  const handleStartStop = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
    }
  };

  const handleRandomBoard = () => {
    setGrid(createEmptyOrRandom());
    setIsEmpty(false);
  };

  const handleClearBoard = () => {
    setGrid(createEmptyOrRandom(false));
    setGeneration(0);
    setIsEmpty(true);
  };

  const handleSpeedChange = (newSpeed) => setSpeed(newSpeed);

  const handleStep = () => runSimulation(grid);

  const handleCellClick = (rowIndex, colIndex) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    newGrid[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1;
    setGrid(newGrid);
    if (!isEmptyBoard(newGrid)) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  };

  const runSimulation = useCallback((grid) => {
    let copyGrid = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < NUM_ROWS; i++) {
      for (let j = 0; j < NUM_COLS; j++) {
        let neighbors = 0;

        const positions = [
          [0, 1],
          [0, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
          [-1, -1],
          [1, 0],
          [-1, 0],
        ];

        positions.forEach(([x, y]) => {
          const newI = i + x;
          const newJ = j + y;

          if (newI >= 0 && newI < NUM_ROWS && newJ >= 0 && newJ < NUM_COLS) {
            neighbors += grid[newI][newJ];
          }
        });

        if (neighbors < 2 || neighbors > 3) {
          copyGrid[i][j] = 0;
        } else if (grid[i][j] === 0 && neighbors === 3) {
          copyGrid[i][j] = 1;
        }
      }
    }
    setGrid(copyGrid);
    setGeneration((prevGeneration) => prevGeneration + 1);
    if (isEmptyBoard(copyGrid)) {
      setGeneration(0);
      setIsEmpty(true);
      setRunning(false);
    }
  }, []);

  return (
    <GameContext.Provider
      value={{
        grid,
        runningRef,
        runSimulation,
        speed,
        handleCellClick,
        running,
        handleStartStop,
        handleClearBoard,
        handleRandomBoard,
        handleSpeedChange,
        handleStep,
        generation,
        isEmpty,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};
