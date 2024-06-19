import { useEffect } from "react";
import { useCanvas } from "../../context/canvasContext";
import { BALL_RADIUS } from "../../helpers/consts";

const Ball = () => {
  const { context, ball, collisionDetection, running } = useCanvas();

  if (running) {
    ball.x += ball.vx;
    ball.y += ball.vy;
  }
  useEffect(() => {
    collisionDetection();
  }, [ball.x, ball.y]);
  
  if (context) {
    context.beginPath();
    context.arc(ball.x, ball.y, BALL_RADIUS, 0, 2 * Math.PI);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
  }
  return null;
};

export default Ball;
