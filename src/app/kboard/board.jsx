import React, { useState, useCallback, useRef, useMemo } from "react";
import { Stage, Layer, Rect, Line } from "react-konva";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  canvasContainer: {
    position: "relative",
    width: (props) => props.width,
    height: (props) => props.height,
  },
});

const gridWidth = 30;
const gridHeight = 30;

// dymmy code starts
const points = [0, 0, 100, 0, 100, 100];
const fillLinearGradientStartPoint = { x: -50, y: -50 };
const fillLinearGradientEndPoint = { x: 50, y: 50 };
const fillLinearGradientColorStops = [0, "red", 1, "yellow"];
// dummy code ends

const renderGridLines = ({ startX, endX, startY, endY }) => {
  const gridLines = [];
  for (let x = startX; x < endX; x += gridWidth) {
    for (let y = startY; y < endY; y += gridHeight) {
      gridLines.push(
        <Rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={gridWidth}
          height={gridHeight}
          fill="#F4F4F4"
          stroke="#DDD"
          strokeWidth={0.3}
        />
      );
    }
  }
  // TODO: why can't lines draw properly on dragging
  // for (let x = startX; x < endX; x += gridWidth) {
  //   gridLines.push(
  //     <Line
  //       x={x}
  //       y={startY}
  //       // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
  //       points={[x, startY, x, endY]}
  //       width={gridWidth}
  //       height={gridHeight}
  //       stroke="#f7f9fa"
  //     />
  //   );
  // }
  // for (let y = startY; y < endY; y += gridHeight) {
  //   gridLines.push(
  //     <Line
  //       x={startX}
  //       y={y}
  //       // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
  //       points={[startX, y, endX, y]}
  //       width={gridWidth}
  //       height={gridHeight}
  //       stroke="#f7f9fa"
  //     />
  //   );
  // }
  return gridLines;
};

const Board = ({
  width,
  height,
  backgroundColor,
  transparent,
  showGridLines,
  draggable,
}) => {
  const classes = useStyles({ width, height, backgroundColor });
  const [containerRect, setContainerRect] = useState({});
  const { width: canvasWidth, height: canvasHeight } = containerRect;

  const resizeObserver = useRef(null);
  const containerRef = useCallback((node) => {
    if (node !== null) {
      setContainerRect(node.getBoundingClientRect());
      resizeObserver.current = new ResizeObserver(() => {
        setContainerRect(node.getBoundingClientRect());
      });
      resizeObserver.current.observe(node);
    }
  }, []);

  const [stagePos, setStagePos] = React.useState({ x: 0, y: 0 });
  const startX = useMemo(
    () => Math.floor((-stagePos.x - canvasWidth) / gridWidth) * gridWidth,
    [stagePos, canvasWidth]
  );
  const endX = useMemo(
    () => Math.floor((-stagePos.x + canvasWidth * 2) / gridWidth) * gridWidth,
    [stagePos, canvasWidth]
  );

  const startY = useMemo(
    () => Math.floor((-stagePos.y - canvasHeight) / gridHeight) * gridHeight,
    [stagePos, canvasHeight]
  );
  const endY = useMemo(
    () =>
      Math.floor((-stagePos.y + canvasHeight * 2) / gridHeight) * gridHeight,
    [stagePos, canvasHeight]
  );
  const handleDragEndCb = useCallback(
    (e) => {
      setStagePos(e.currentTarget.position());
    },
    [setStagePos]
  );
  const backgroundRef = useRef(null);
  const renderGridLinesCb = useCallback(
    () => renderGridLines({ startX, startY, endX, endY }),
    [startX, startY, endX, endY]
  );
  const handleDragMove = useCallback(
    (e) => {
      !transparent && backgroundRef.current.absolutePosition({ x: 0, y: 0 });
    },
    [transparent]
  );
  const stageDynamicProps = useMemo(() => {
    if (transparent) return null;
    if (showGridLines) return { onDragEnd: handleDragEndCb };
    return { onDragMove: handleDragMove };
  }, [transparent, showGridLines, handleDragEndCb, handleDragMove]);

  return (
    <div ref={containerRef} className={classes.canvasContainer}>
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        draggable={draggable}
        {...stageDynamicProps}
      >
        <Layer>
          {!transparent &&
            (showGridLines ? (
              renderGridLinesCb()
            ) : (
              <Rect
                ref={backgroundRef}
                x={0}
                y={0}
                width={canvasWidth}
                height={canvasHeight}
                fill={backgroundColor}
                listening={false}
              />
            ))}
          <Line
            x={20}
            y={200}
            points={points}
            tension={0.5}
            closed
            stroke="black"
            fillLinearGradientStartPoint={fillLinearGradientStartPoint}
            fillLinearGradientEndPoint={fillLinearGradientEndPoint}
            fillLinearGradientColorStops={fillLinearGradientColorStops}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Board;

Board.defaultProps = {
  width: "100vw",
  height: "100vh",
  backgroundColor: "#f7f9fa",
  showGridLines: true,
  transparent: false,
  draggable: true,
};
