export const initializeGrid = (board) => {
  return board.map((row) => row.map((val) => ({ val, visited: false })));
};

export const setCellVisited = (grid, row, col) => {
    const newGrid = createDeepCopy(grid);
    newGrid[row][col] = { ...newGrid[row][col], visited: true };
    return newGrid;
};

export const getNextCell = (value) => {
    const nextRow = Math.floor(value / 10) - 1;
    const nextCol = (value % 10) - 1;
    return { nextRow, nextCol };
};

const createDeepCopy = (grid) => {
  return JSON.parse(JSON.stringify(grid));
};
