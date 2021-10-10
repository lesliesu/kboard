import React, { useState, useCallback, useRef } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { createUseStyles } from 'react-jss';
// import Gridlines from './gridlines';

const useStyles = createUseStyles({
  canvasContainer: {
    position: 'relative',
    width: (props) => props.width,
    height: (props) => props.height,
    background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAABa5JREFUeF7t18Ftg1AURUGgFcI+JaSklOKFy4iUFpIOsgda+YqQ3IOP5HEFD8ZH156P4/ie5/l38im8gbfHEUfhGDdM03ye5+e6rjcv4/lvYN/3j+uKbdt+nn+NC643IJDQ90AgIYzHKQIJmQgkhCGQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnYkFCJgIJYViQHoZAeiYWJGQikBCGBelhCKRnci3IfYzx1Tvt9S5aluX9euoxxt/rPX3ziQUSchFICMNPrB6Gn1g9E3/SQyYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHomFiRkIpAQhgXpYQikZ2JBQiYCCWFYkB6GQHom/wUwQ8zbho4HAAAAAElFTkSuQmCC) top left',
    backgroundColor: (props) => props.backgroundColor,
  },
});
 
// dymmy code starts
const points = [0, 0, 100, 0, 100, 100];
const fillLinearGradientStartPoint={ x: -50, y: -50 };
const fillLinearGradientEndPoint={ x: 50, y: 50 };
const fillLinearGradientColorStops=[0, 'red', 1, 'yellow'];
// dummy code ends

const Board = ({ width, height, backgroundColor, transparent, showGridLines }) => {
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
  const backgroundRef = useRef(null);

  const handleDragMove = useCallback((e) => {
    !transparent && backgroundRef.current.absolutePosition({ x: 0, y: 0 });
  }, [transparent]);

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
  transparent: true
};
