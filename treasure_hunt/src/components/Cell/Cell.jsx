const Cell = ({ value, visited }) => {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        backgroundColor: visited ? "green" : "red",
      }}
    >
      {value}
    </div>
  );
};

export default Cell;
