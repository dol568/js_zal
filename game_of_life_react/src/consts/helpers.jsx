import { NUM_COLS, NUM_ROWS } from "./consts";

export const createEmptyOrRandom = (random = true) => {
  const board = [];

  for (let i = 0; i < NUM_ROWS; i++) {
    board.push(Array.from(Array(NUM_COLS), () => (random && Math.random() > 0.7 ? 1 : 0)));
  }
  return board;
};

export const isEmptyBoard = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== 0) {
        return false;
      }
    }
  }
  return true;
};

export const cellDisplay = (cell) => {
  const ranColorNum1 = Math.floor(Math.random() * Math.floor(255));
  const ranColorNum2 = Math.floor(Math.random() * Math.floor(255));
  const ranColorNum3 = Math.floor(Math.random() * Math.floor(255));

  if (cell) {
    return `rgb(${ranColorNum1}, ${ranColorNum2}, ${ranColorNum3})`;
  } else {
    return "black";
  }
};
