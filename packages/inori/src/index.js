import React from 'react';
import ReactDOM from 'react-dom';
import core from 'inori-core';
import getStoreConfigure from "./getStoreConfigure";

let _store;

function _getStore() {
  return _store;
}

function _start(Root, domId) {
  const {compose, enhance} = getStoreConfigure();
  core.createConfigureStore(compose, enhance);

  _store = core.createStore();

  const App = () => {
    return (
      <Provider store={_store}>
        <Root />
      </Provider>
    );
  };
  ReactDOM.render(<App />, document.getElementById(domId));
}


export default {
  addModel: core.addModel,
  createAction: core.createAction,
  addReducer: core.addReducer,
  addEpic: core.addEpic,
  addPlugin: core.addPlugin,
  addMiddleware: core.addMiddleware,
  start: _start,
  getStore: _getStore,
}
