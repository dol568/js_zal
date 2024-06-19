export const BRICK_TYPE = { EMPTY: "0", BALL: "1", WALL: "X", SPECIAL: "Y" };
export const BALL_RADIUS = 15;
export const RESOLUTION = 40;
export const VAL_SPEED = 5;
export const SPEED = (VAL_SPEED * Math.sqrt(2)) / 2;
export const canvasWidth = (board) => board[0].length * RESOLUTION;
export const canvasHeight = (board) => board.length * RESOLUTION;
export const deepCopyBoard = (board) => JSON.parse(JSON.stringify(board));
