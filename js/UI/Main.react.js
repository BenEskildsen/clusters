// @flow

const React = require('react');
const {Button, Modal} = require('bens_ui_components');
const Canvas = require('./Canvas.react');

import type {State, Action} from '../types';

type Props = {
  state: State, // Game State
  dispatch: (action: Action) => Action,
  store: Object,
};

function Main(props: Props): React.Node {
  const {state} = props;



  return (
    <div
      style={{

      }}
    >
      <Graph

      />
    </div>
  );
}

type axis = {
  min: ?number,
  max: ?number,
  majorTicks: ?number,
  minorTicks: ?number,
  label: ?string,
}

const Graph = (props) => {
  const {points, xAxis, yAxis} = props;

  return (
    <div
      style={{
        border: '1px solid black',
        width: 500,
        height: 400,
      }}
    >
      <Canvas
        useFullScreen={false}
        width={500}
        height={400}
      />

    </div>
  )
}

module.exports = Main;
