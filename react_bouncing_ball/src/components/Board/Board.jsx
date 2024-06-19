import { useCanvas } from "../../context/canvasContext";
import { BRICK_TYPE, RESOLUTION } from "../../helpers/consts";
import { getBrickCoordinates } from "../../helpers/helper";

const Board = () => {
  const { grid, context } = useCanvas();

  if (context) {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const { x, y } = getBrickCoordinates(row, col, RESOLUTION);

        context.beginPath();
        context.rect(x, y, RESOLUTION, RESOLUTION);
        context.strokeStyle = "black";
        context.stroke();
        switch (grid[row][col]) {
          case BRICK_TYPE.WALL:
            context.fillStyle = "#0095DD";
            break;
          case BRICK_TYPE.SPECIAL:
            context.fillStyle = "#ff1744";
            break;
          default:
            context.fillStyle = "#ccc";
        }
        context.fill();
        context.closePath();
      }
    }
  }
  return null;
};

export default Board;
