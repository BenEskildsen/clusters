// @flow

const React = require('react');
const {Button, Canvas} = require('bens_ui_components');
const {useState, useMemo, useEffect, useReducer} = React;
const {graphReducer} = require('../reducers/graphReducer');

import type {State, Action} from '../types';

const Graph = (props) => {
  const {points, xAxis, yAxis} = props;

  // state
  const [state, dispatch] = useReducer(
    graphReducer,
    {
      points: points != null ? points : [],
      xAxis: {dimension: 'x', label: 'x', min: 0, max: 100},
      yAxis: {dimension: 'y', label: 'y', min: 0, max: 100},
    },
  );

  // rendering
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const {width, height} = canvas.getBoundingClientRect();
    const xTrans = width / (state.xAxis.max - state.xAxis.min);
    const yTrans = width / (state.yAxis.max - state.yAxis.min);

    for (const point of state.points) {
      ctx.fillStyle = point.cluster ? point.cluster : 'black';
      const x = point.x * xTrans - state.xAxis.min * xTrans;
      const y = point.y * yTrans - state.yAxis.min * yTrans;
      const size = 2;
      ctx.fillRect(x - size, y - size, size * 2, size * 2);
    }
  }, [state]);

  return (
    <div
      style={{
        // border: '1px solid black',
        // width: 500,
        // height: 400,
      }}
    >
      <Canvas
        useFullScreen={true}
      />

    </div>
  )
}

module.exports = Graph;
