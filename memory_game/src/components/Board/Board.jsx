import shuffle from "lodash.shuffle";

export const generateBoard = (size) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const halfSize = size / 2;
  const letters = Array.from({ length: halfSize }, (_, i) => alphabet[i % alphabet.length]).flatMap((e) => [e, e]);
  return shuffle(letters).map((letter) => ({ element: letter, revealed: false, matched: false }));
};

export const Board = ({ board }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.sqrt(board.length)}, 100px)`, gap: "10px" }}>
    {board.map((cell, index) => (
      <div
        key={index}
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: cell.revealed || cell.matched ? "white" : "gray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          cursor: "pointer",
          border: "1px solid black",
          color: 'black'
        }}
      >
        {cell.revealed || cell.matched ? cell.element : ""}
      </div>
    ))}
  </div>
);
