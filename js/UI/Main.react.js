// @flow

const React = require('react');
const {Button, Modal} = require('bens_ui_components');
const Canvas = require('./Canvas');

import type {State, Action} from '../types';

type Props = {
  state: State, // Game State
  dispatch: (action: Action) => Action,
  store: Object,
  modal: Object,
};

function Main(props: Props): React.Node {
  const {state, modal} = props;



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

const Graph = (props) => {

  return (
    <div
      style={{

      }}
    >

    </div>
  )
}

module.exports = Main;
