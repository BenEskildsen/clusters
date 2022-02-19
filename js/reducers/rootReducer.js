// @flow

import type {State, Action} from '../types';

const rootReducer = (state: State, action: Action): State => {
  if (state === undefined) return initState();

  switch (action.type) {
  }
  return state;
};


//////////////////////////////////////
// Initializations
const initState = () => {
  return {
  };
}

module.exports = {rootReducer};
