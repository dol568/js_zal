import { Typography } from "@mui/material";
import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";

const Stopwatch = forwardRef(({ running }, ref) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [running, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  useImperativeHandle(ref, () => ({
    reset,
  }));

  const reset = () => {
    setTime(0);
  };
  return (
    <Typography variant="h4" gutterBottom>
      {hours}:{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}:
      {milliseconds.toString().padStart(2, "0")}
    </Typography>
  );
});

export default Stopwatch;
