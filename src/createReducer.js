
function createReducer(initialState, handles) {
  return (state = initialState, action) => {
    if (handles.hasOwnProperty(action.type)) {
      return handles[action.type](state, action);
    } else if (handles.hasOwnProperty('default')) {
      return handles['default'](state, action);
    } else {
      return state;
    }
  };
}

export default createReducer;