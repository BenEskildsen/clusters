// @flow

const React = require('react');
const {Button, Canvas} = require('bens_ui_components');
const Graph = require('./Graph.react');

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
        points={[
          {x: 10, y: 10, cluster: 'red'}, {x: 15, y: 25},
          {x: 50, y: 10}, {x: 25, y: 25, cluster: 'blue'},
        ]}
        xAxis={{
          max: 100,
        }}
        yAxis={{
          max: 100,
        }}
      />
    </div>
  );
}

module.exports = Main;
