import { BRICK_TYPE } from "./consts";

export const getTargetCount = (board) => {
  let count = 0;

  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell === BRICK_TYPE.SPECIAL) {
        count++;
      }
    });
  });

  return count;
};

export const findRandomTile = (board, symbol) => {
  let emptyTiles = [];

  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === symbol) {
        emptyTiles.push({ row: rowIndex, col: cellIndex });
      }
    });
  });

  const randomIndex = Math.floor(Math.random() * emptyTiles.length);
  return emptyTiles[randomIndex];
};

export const getBallAndTargetsPosition = (board, resolution, reset = false) => {
  if (!reset) {
    const { row, col } = findRandomTile(board, BRICK_TYPE.BALL);
    return getBallCoordinates(row, col, resolution);
  } else {
    const boardAfterReset = cleanBoardAfterReset(board);

    const randomPositions = getPositionsOnBoard(boardAfterReset);

    boardAfterReset[randomPositions[0].row][randomPositions[0].col] = BRICK_TYPE.BALL;
    boardAfterReset[randomPositions[1].row][randomPositions[1].col] = BRICK_TYPE.SPECIAL;
    boardAfterReset[randomPositions[2].row][randomPositions[2].col] = BRICK_TYPE.SPECIAL;

    const { x, y } = getBallCoordinates(randomPositions[0].row, randomPositions[0].col, resolution);

    return { x, y, boardAfterReset };
  }
};

export const getBrickCoordinates = (row, col, resolution) => {
  return {
    x: col * resolution,
    y: row * resolution,
  };
};

const getBallCoordinates = (row, col, resolution) => {
  return {
    x: col * resolution + resolution / 2,
    y: row * resolution + resolution / 2,
  };
};

const cleanBoardAfterReset = (board) => {
  return board.map((row) => row.map((cell) => (cell !== BRICK_TYPE.WALL ? BRICK_TYPE.EMPTY : cell)));
};

const getPositionsOnBoard = (board, numberOfPositions = 3) => {
  const randomPositions = [];
  while (randomPositions.length < numberOfPositions) {
    const { row, col } = findRandomTile(board, BRICK_TYPE.EMPTY);
    if (!randomPositions.some((p) => p.row === row && p.col === col)) {
      randomPositions.push({ row, col });
    }
  }
  return randomPositions;
};

export const calculateNewVelocityForSpecialBrick = (speed) => {
  const angle = Math.random() * 2 * Math.PI;

  let newVx = Math.cos(angle);
  let newVy = Math.sin(angle);

  const speedMagnitude = Math.sqrt(newVx ** 2 + newVy ** 2);

  if (speedMagnitude !== 0) {
    newVx = (newVx / speedMagnitude) * speed;
    newVy = (newVy / speedMagnitude) * speed;
  }

  return { newVx, newVy };
};

export const getClosestDistances = (ball, brick, resolution) => {
  const closestX = Math.max(brick.x, Math.min(ball.x, brick.x + resolution));
  const closestY = Math.max(brick.y, Math.min(ball.y, brick.y + resolution));
  const distanceX = ball.x - closestX;
  const distanceY = ball.y - closestY;
  return { distanceX, distanceY };
};

export const isBallCollidingWithBrick = (ball, brick, resolution) => {
  const { distanceX, distanceY } = getClosestDistances(ball, brick, resolution);
  const distanceSquared = distanceX ** 2 + distanceY ** 2;
  return distanceSquared <= ball.radius ** 2;
};
