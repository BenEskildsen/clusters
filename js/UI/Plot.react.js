// @flow

const React = require('react');
const {Button, Canvas} = require('bens_ui_components');
const {useState, useMemo, useEffect, useReducer} = React;

import type {State, Action} from '../types';

type Point = {
  x: number,
  y: number,
  color: ?string, // css color
};

type Axis = {
  dimension: 'x' | 'y',
  label: string,
  min: ?number,
  max: ?number,
};

/**
 * NOTE: 0, 0 is the bottom left corner
 *
 * props:
 *   points: Array<Point>,
 *   xAxis: Axis,
 *   yAxis: Axis,
 *   isLinear: boolean,
 *
 * canvas props:
 *   useFullScreen: boolean,
 *   width: number,
 *   height: number,
 */

const Plot = (props) => {

  // screen resizing
  const [resizeCount, setResize] = useState(0);

  useEffect(() => {
    function handleResize() {
      setResize(resizeCount + 1);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [resizeCount]);

  // rendering
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const {points, xAxis, yAxis, isLinear} = props;
    const {width, height} = canvas.getBoundingClientRect();

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    const xTrans = width / (xAxis.max - xAxis.min);
    const yTrans = height / (yAxis.max - yAxis.min);

    const sortedPoints = [...points].sort((a, b) => a.x - b.x);

    let prevPoint = null;
    for (const point of sortedPoints) {
      ctx.fillStyle = point.color ? point.color : 'black';
      const x = point.x * xTrans - xAxis.min * xTrans;
      const y = yAxis.max * yTrans - yAxis.min * yTrans - point.y * yTrans;
      const size = 2;
      ctx.fillRect(x - size, y - size, size * 2, size * 2);

      if (isLinear && prevPoint != null) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(prevPoint.x, prevPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.closePath();
      }
      prevPoint = {x, y};
    }
  }, [props, resizeCount]);

  return (
    <div
      style={{
      }}
    >
      <Canvas
        useFullScreen={props.useFullScreen}
        width={props.width}
        height={props.height}
      />

    </div>
  )
}

module.exports = Plot;
