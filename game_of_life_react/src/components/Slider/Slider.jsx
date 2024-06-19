import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { MAX_SPEED, MIN_SPEED } from "../../consts/consts";

const SliderComponent = ({ speed, onSpeedChange }) => {
  const handleChange = (e) => onSpeedChange(e.target.value);

  return (
    <Box sx={{ width: 250, display: "flex", gap: "1em", flexDirection: "row" }}>
      <Typography variant="body" onClick={() => onSpeedChange(MIN_SPEED)} sx={{ cursor: "pointer" }}>
        {MIN_SPEED}
      </Typography>
      <Slider
        value={speed}
        valueLabelDisplay="auto"
        min={MIN_SPEED}
        max={MAX_SPEED}
        onChange={handleChange}
      />
      <Typography variant="body" onClick={() => onSpeedChange(MAX_SPEED)} sx={{ cursor: "pointer" }}>
        {MAX_SPEED}
      </Typography>
    </Box>
  );
};

export default SliderComponent;
