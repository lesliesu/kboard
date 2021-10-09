import React, { useState, useCallback } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles({
  canvasContainer: {
    position: 'relative',
    width: (props) => props.width,
    height: (props) => props.height,
  },
});

const Board = ({ width, height, backgroundColor, showGridLines }) => {
  const classes = useStyles({ width, height });
  const [containerRect, setContainerRect] = useState({});
  const { width: canvasWidth, height: canvasHeight } = containerRect;

  const containerRef = useCallback((node) => {
    if (node !== null) {
      setContainerRect(node.getBoundingClientRect());
    }
  }, []);

  return (
    <div ref={containerRef} className={classes.canvasContainer}>
      <Stage width={canvasWidth} height={canvasHeight} draggable>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={canvasWidth}
            height={canvasHeight}
            fill={backgroundColor}
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
};
