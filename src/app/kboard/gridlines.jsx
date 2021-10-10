import React, { useState, useCallback, useRef } from 'react';
import { Group, Line } from 'react-konva';

const gridlinesPoints = [[5, 5, 500, 5]];

const Gridlines = ({ startX, startY, width, height, stroke, strokeWidth }) => {

  return (<Group>
    <Line
        points= {gridlinesPoints[0]}
        stroke={stroke}
        strokeWidth={strokeWidth}
        listening={false}
        strokeScaleEnabled={false}
      />
  </Group>)
}
export default Gridlines;

Gridlines.defaultProps = {
  startX: 0,
  startY: 0,
  stroke: '#eee',
  strokeWidth: '0.5'
};

