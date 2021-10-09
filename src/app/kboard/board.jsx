import React, { useState, useCallback, useRef } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { createUseStyles } from 'react-jss';
const useStyles = createUseStyles({
  canvasContainer: {
    position: 'relative',
    width: (props) => props.width,
    height: (props) => props.height,
  },
});
 
// dymmy code starts
const points = [0, 0, 100, 0, 100, 100];
const fillLinearGradientStartPoint={ x: -50, y: -50 };
const fillLinearGradientEndPoint={ x: 50, y: 50 };
const fillLinearGradientColorStops=[0, 'red', 1, 'yellow'];
// dummy code ends

const Board = ({ width, height, backgroundColor, transparent, showGridLines }) => {
  const classes = useStyles({ width, height });
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
  const backgroundRef = useRef(null);

  const handleDragMove = useCallback((e) => {
    backgroundRef?.current.absolutePosition({ x: 0, y: 0 });
  }, []);
  return (
    <div ref={containerRef} className={classes.canvasContainer}>
      <Stage 
        width={canvasWidth} 
        height={canvasHeight}
        draggable 
        onDragMove={handleDragMove}>
        <Layer>
            {!transparent && <Rect
                ref={backgroundRef}
                x={0}
                y={0}
                width={canvasWidth}
                height={canvasHeight}
                fill={backgroundColor}
                listening={false}
              />
            }
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
  transparent: false
};
