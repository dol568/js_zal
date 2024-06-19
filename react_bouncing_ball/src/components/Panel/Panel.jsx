import { Box, Card, CardActions, CardContent, Typography, Button, ButtonGroup } from "@mui/material";
import { useCanvas } from "../../context/canvasContext";
import Stopwatch from "../Stopwatch/Stopwatch";
import SliderComponent from "../Slider/Slider";

const Panel = () => {
  const {
    handleStop,
    handleStart,
    running,
    stopwatchRef,
    count,
    handleReset,
    handleSpeedChangeX,
    handleSpeedChangeY,
    ball,
  } = useCanvas();

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" style={{ border: "1px solid" }}>
        <CardContent>
          <Typography gutterBottom>Stopwatch</Typography>
          <Stopwatch running={running} ref={stopwatchRef} />
          <Typography gutterBottom>Targets left</Typography>
          <Typography variant="h3" color={count > 0 ? "error" : "#4caf50"}>
            {count}
          </Typography>
        </CardContent>
        <CardActions>
          <ButtonGroup variant="contained" size="large" color="success">
            <Button disabled={running} onClick={handleStart}>
              Start
            </Button>
            <Button color="error" disabled={!running} onClick={handleStop}>
              Stop
            </Button>
            <Button color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </ButtonGroup>
        </CardActions>
        <CardContent>
          <Typography variant="h6" style={{ marginBottom: "2em" }} gutterBottom>
            Speed: {Math.sqrt(ball.vx ** 2 + ball.vy ** 2)}
          </Typography>
            <SliderComponent speed={ball.vx} onSpeedChange={handleSpeedChangeX} />
          <Typography style={{ marginBottom: "2em" }} gutterBottom>
            {" "}
            Horizontal Speed
          </Typography>
            <SliderComponent speed={ball.vy} onSpeedChange={handleSpeedChangeY} />
          <Typography  gutterBottom>
            Vertical Speed
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Panel;
