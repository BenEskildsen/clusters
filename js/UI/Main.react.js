// @flow

const React = require('react');
const {Button, Canvas} = require('bens_ui_components');
const Plot = require('./Plot.react');
const {useState, useMemo, useEffect, useReducer} = React;
const {plotReducer} = require('../reducers/plotReducer');
// const {mouseControlsSystem, mouseReducer} = require('bens_reducers');

import type {State, Action} from '../types';

type Props = {
};

function Main(props: Props): React.Node {

  // plot state
  const [state, dispatch] = useReducer(
    plotReducer,
    {
      points: [
        {x: 10, y: 10, color: 'red'}, {x: 15, y: 25},
        {x: 50, y: 10}, {x: 25, y: 25, color: 'blue'},
        {x: 0, y: 0}, {x: 100, y: 100},
      ],
      xAxis: {dimension: 'x', label: 'x', min: 0, max: 100},
      yAxis: {dimension: 'y', label: 'y', min: 0, max: 100},
    },
  );

  // mouse state
  useEffect(() => {

  }, []);

  return (
    <div
      style={{

      }}
    >
      <Plot
        points={state.points}
        xAxis={state.xAxis}
        yAxis={state.yAxis}
        width={600}
        height={500}
      />
      <Button
        label="Clear Points"
        onClick={() => dispatch({type: 'CLEAR_POINTS'})}
      />
      <Button
        label="Print Points"
        onClick={() => dispatch({type: 'PRINT_POINTS'})}
      />
    </div>
  );
}

module.exports = Main;
