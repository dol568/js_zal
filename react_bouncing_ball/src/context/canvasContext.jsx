import { createContext, useContext, useEffect, useRef, useState } from "react";
import board from "../helpers/exampleInput";
import {
  calculateNewVelocityForSpecialBrick,
  getBallAndTargetsPosition,
  getBrickCoordinates,
  getClosestDistances,
  getTargetCount,
  isBallCollidingWithBrick,
} from "../helpers/helper";
import { BALL_RADIUS, BRICK_TYPE, RESOLUTION, SPEED, VAL_SPEED, canvasHeight, canvasWidth, deepCopyBoard } from "../helpers/consts";

const CanvasContext = createContext(null);
const FrameContext = createContext(0);

export const CanvasProvider = ({ height, width, children }) => {
  const [grid, setGrid] = useState(deepCopyBoard(board));
  const [count, setCount] = useState(getTargetCount(board));
  const [running, setRunning] = useState(false);
  const { x, y } = getBallAndTargetsPosition(grid, RESOLUTION);
  const [ball, setBall] = useState({ x, y, vx: SPEED, vy: SPEED });
  const [context, setContext] = useState(null);
  const [frameCount, setFrameCount] = useState(0);

  const canvasRef = useRef(null);
  let stopwatchRef = useRef(null);

  const handleRegularBrickCollision = ({ ball, distanceX, distanceY }) => {
    Math.abs(distanceX) < Math.abs(distanceY) ? handleSpeedChangeY(-ball.vy) : handleSpeedChangeX(-ball.vx);
  };

  const handleSpecialBrickCollision = ({ board, brick, speed }) => {
    const { newVx, newVy } = calculateNewVelocityForSpecialBrick(speed);
    handleSpeedChangeX(newVx);
    handleSpeedChangeY(newVy);
    updateBoardAndCount({ board, brick });
  };

  const updateBoardAndCount = ({ board, brick }) => {
    board[brick.row][brick.col] = BRICK_TYPE.EMPTY;
    setGrid(deepCopyBoard(board));
    setCount((prev) => prev - 1);
  };

  const handleBrickCollision = (params) => {
    const { ball, brick, board, speed, resolution } = params;
    const { distanceX, distanceY } = getClosestDistances(ball, brick, resolution);

    const movingTowardsBrickX = ball.vx * distanceX < 0;
    const movingTowardsBrickY = ball.vy * distanceY < 0;

    if (movingTowardsBrickX || movingTowardsBrickY) {
      if (brick.type === BRICK_TYPE.SPECIAL) {
        handleSpecialBrickCollision({ board, brick, speed });
      } else {
        handleRegularBrickCollision({ ball, distanceX, distanceY });
      }
    }
  };

  const collisionDetection = () => {
    const _ball = { x: ball.x, y: ball.y, vx: ball.vx, vy: ball.vy, radius: BALL_RADIUS };

    const updatedBoard = deepCopyBoard(grid);

    for (let row = 0; row < updatedBoard.length; row++) {
      for (let col = 0; col < updatedBoard[row].length; col++) {
        let brickType = updatedBoard[row][col];
        
        if (brickType === BRICK_TYPE.WALL || brickType === BRICK_TYPE.SPECIAL) {
          const brickCoordinatees = getBrickCoordinates(row, col, RESOLUTION);
          const brick = { ...brickCoordinatees, row, col, type: brickType };

          if (isBallCollidingWithBrick(_ball, brick, RESOLUTION)) {
            handleBrickCollision({ ball: _ball, brick, board: updatedBoard, speed: VAL_SPEED, resolution: RESOLUTION });
          }
        }
      }
    }
  };

  const handleStart = () => {
    setRunning(true);
  };
  const handleStop = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setRunning(false);
    const { boardAfterReset, x, y } = getBallAndTargetsPosition(deepCopyBoard(board), RESOLUTION, true);
    setGrid(boardAfterReset);
    setBall({ x, y, vx: SPEED, vy: SPEED });
    setCount(getTargetCount(boardAfterReset));
    if (stopwatchRef.current) {
      stopwatchRef.current.reset();
    }
  };

  const handleSpeedChangeX = (newSpeed) => {
    setBall((prevBall) => ({ ...prevBall, vx: newSpeed }));
  };

  const handleSpeedChangeY = (newSpeed) => {
    setBall((prevBall) => ({ ...prevBall, vy: newSpeed }));
  };

  useEffect(() => {
    if (canvasRef.current !== null) {
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext !== null) {
        setContext(canvasContext);
      }
    }
  }, []);

  useEffect(() => {
    let frameId;
    if (running) {
      frameId = requestAnimationFrame(() => {
        setFrameCount(frameCount + 1);
      });
    }
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [running, frameCount, setFrameCount]);

  if (context !== null) {
    context.clearRect(0, 0, width, height);
  }

  return (
    <CanvasContext.Provider
      value={{
        context,
        ball,
        grid,
        running,
        handleStart,
        handleStop,
        stopwatchRef,
        count,
        handleReset,
        handleSpeedChangeX,
        handleSpeedChangeY,
        collisionDetection,
      }}
    >
      <FrameContext.Provider value={frameCount}>
        <canvas ref={canvasRef} height={canvasHeight(board)} width={canvasWidth(board)} />
        {children}
      </FrameContext.Provider>
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  useContext(FrameContext);
  const renderingContext = useContext(CanvasContext);
  return renderingContext;
};
