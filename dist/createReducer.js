'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function createReducer(initialState, handles) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (handles.hasOwnProperty(action.type)) {
      return handles[action.type](state, action);
    } else if (handles.hasOwnProperty('default')) {
      return handles['default'](state, action);
    } else {
      return state;
    }
  };
}

exports.default = createReducer;