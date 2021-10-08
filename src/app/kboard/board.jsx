import React from 'react';
import { makeStyles } from '@mui/styles';
import { Stage, Layer, Rect  } from 'react-konva';
import PlusSVG from 'images/kboard/plus.svg';

const useStyles = makeStyles({
  stage: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // background: `url(${PlusSVG}) top left`,
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 0,
    width: (props) => `${props.width}px`,
    height: (props) => `${props.height}px`,
  }
});


const Board = ({width, height}) => {
  const classes = useStyles({width, height});

  return  <Stage width={width} height={height} className={classes.stage}>
    <Layer>
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="#ddd"
      />
    </Layer>
  </Stage>
}

export default Board;