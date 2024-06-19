import { Stack, Typography } from "@mui/material";
import Ball from "./components/Ball/Ball";
import Board from "./components/Board/Board";
import { CanvasProvider } from "./context/canvasContext";
import Panel from "./components/Panel/Panel";
import "./App.css";

const App = () => {
  return (
    <Stack className="wrapper" direction="row" spacing={2}>
      <Typography variant="h3" sx={{ textOrientation: "sideways", writingMode: "vertical-lr" }}>
        Bouncing Ball
      </Typography>
      <CanvasProvider>
        <Board />
        <Ball />
        <Panel />
      </CanvasProvider>
    </Stack>
  );
};

export default App;
