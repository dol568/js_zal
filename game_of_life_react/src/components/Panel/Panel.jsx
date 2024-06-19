import {  useGameContext } from "../../context/gameContext";
import { Button, ButtonGroup } from "@mui/material";
import SliderComponent from "../Slider/Slider";

const Panel = () => {
  const {
    running,
    handleStartStop,
    handleClearBoard,
    handleRandomBoard,
    handleSpeedChange,
    handleStep,
    generation,
    speed,
    isEmpty,
  } = useGameContext();

  return (
    <ButtonGroup variant="contained" size="large" style={{ padding: "10px" }}>
      <Button disabled={isEmpty} color={running ? "error" : "success"} onClick={handleStartStop}>
        {running ? "Stop" : "Start"}
      </Button>
      <Button color="error" disabled={running} onClick={handleClearBoard}>
        Clear
      </Button>
      <Button color="secondary" disabled={running} onClick={handleRandomBoard}>
        Random
      </Button>
      <Button style={{ marginLeft: "15px" }}>Speed</Button>
      <Button variant="outlined" style={{ marginRight: "15px" }}>
        <SliderComponent speed={speed} onSpeedChange={handleSpeedChange} />
      </Button>
      <Button style={{ backgroundColor: "#f57c00" }} disabled={running || isEmpty} onClick={handleStep}>
        STEP
      </Button>
      <Button style={{ backgroundColor: "#009688" }}>Generations: {generation}</Button>
    </ButtonGroup>
  );
};

export default Panel;
