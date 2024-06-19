import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { SPEED } from "../../helpers/consts";

const SliderComponent = ({ speed, onSpeedChange }) => {
  const handleChange = (_, newSpeed) => onSpeedChange(newSpeed);

  return (
    <Box sx={{ width: 250, display: "flex", gap: "1em", flexDirection: "row" }}>
      <Slider
        step={0.1}
        value={speed}
        valueLabelDisplay="on"
        min={-SPEED * 2}
        max={SPEED * 2}
        onChange={handleChange}
      />
    </Box>
  );
};

export default SliderComponent;
