import React, { useState, useCallback, useRef, useMemo } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  canvasContainer: {
    position: 'relative',
    width: (props) => props.width,
    height: (props) => props.height,
  },
});

const WIDTH = 50;
const HEIGHT = 50;

// dymmy code starts
const points = [0, 0, 100, 0, 100, 100];
const fillLinearGradientStartPoint = { x: -50, y: -50 };
const fillLinearGradientEndPoint = { x: 50, y: 50 };
const fillLinearGradientColorStops = [0, 'red', 1, 'yellow'];
// dummy code ends

const renderGridLines = ({ startX, endX, startY, endY }) => {
  const gridComponents = [];
  for (var x = startX; x < endX; x += WIDTH) {
    for (var y = startY; y < endY; y += HEIGHT) {
      gridComponents.push(
        <Rect
          x={x}
          y={y}
          width={WIDTH}
          height={HEIGHT}
          fill="#ffffff"
          stroke="#f7f9fa"
        />
      );
    }
  }
  return gridComponents;
};

const Board = ({
  width,
  height,
  backgroundColor,
  transparent,
  showGridLines,
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
    () => Math.floor((-stagePos.x - window.innerWidth) / WIDTH) * WIDTH,
    [stagePos]
  );
  const endX = useMemo(
    () => Math.floor((-stagePos.x + window.innerWidth * 2) / WIDTH) * WIDTH,
    [stagePos]
  );

  const startY = useMemo(
    () => Math.floor((-stagePos.y - window.innerHeight) / HEIGHT) * HEIGHT,
    [stagePos]
  );
  const endY = useMemo(
    () => Math.floor((-stagePos.y + window.innerHeight * 2) / HEIGHT) * HEIGHT,
    [stagePos]
  );
  const handleDragEndCb = useCallback(
    (e) => {
      setStagePos(e.currentTarget.position());
    },
    [setStagePos]
  );

  return (
    <div ref={containerRef} className={classes.canvasContainer}>
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        draggable
        onDragEnd={handleDragEndCb}
      >
        <Layer>
          {!transparent && renderGridLines({ startX, startY, endX, endY })}
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
  width: '100vw',
  height: '100vh',
  backgroundColor: '#f7f9fa',
  showGridLines: true,
  transparent: false,
};
