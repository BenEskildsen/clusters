// @flow

import type {State, Action} from '../types';

type Point = {
  x: number,
  y: number,
  cluster: ?string, // color
};

type Axis = {
  dimension: 'x' | 'y',
  label: string,
  min: ?number,
  max: ?number,
};


const graphReducer = (state: State, action: Action): State=> {
  switch (action.type) {
    case 'SET_AXIS':
      const {axis} = action;
      const whichAxis = axis.dimension == 'x' ? 'xAxis' : 'yAxis';
      return {
        ...state,
        [whichAxis]: {label: axis.dimension, min: 0, max: 100, ...axis},
      };
    case 'SET_POINTS':
      const {points} = action;
      return {
        ...state,
        points,
      };
    case 'ADD_POINTS': {
      const {points} = action;
      return {
        ...state,
        points: state.points ? [...state.points, ...points] : points,
      };
    }
    case 'CLEAR_POINTS': {
      return {
        ...state,
        points: [],
      };
    }
  }
}

module.exports = {graphReducer};
