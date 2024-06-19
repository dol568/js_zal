import { useGameContext } from "../../context/gameContext";
import { cellDisplay } from "../../consts/helpers";
import { RESOLUTION } from "../../consts/consts";

const Cell = ({ value, row, col }) => {
  const { handleCellClick } = useGameContext();

  return (
    <div
      onClick={() => handleCellClick(row, col)}
      style={{
        width: RESOLUTION,
        height: RESOLUTION,
        backgroundColor: cellDisplay(value),
      }}
    ></div>
  );
};

export default Cell;
