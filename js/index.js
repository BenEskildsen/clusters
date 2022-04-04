// @flow

const Main = require('./ui/Main.react');
const React = require('react');
const ReactDOM = require('react-dom');

import type {Store} from './types';

function renderUI() {
  ReactDOM.render(
    <Main />,
    document.getElementById('container'),
  );
}

renderUI();

