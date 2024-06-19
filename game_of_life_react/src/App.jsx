import Grid from "./components/Grid/Grid";
import Panel from "./components/Panel/Panel";
import { GameProvider } from "./context/gameContext";
import { Box, Typography } from "@mui/material";
import "./App.css";

const App = () => {
  return (
    <Box className="container">
      <Typography variant="h3">Game Of Life</Typography>
      <GameProvider>
        <Grid />
        <Panel />
      </GameProvider>
    </Box>
  );
};

export default App;
