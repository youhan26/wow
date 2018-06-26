import React from 'react';
import core from 'inori-core';
import {Provider} from 'react-redux';
import getStoreConfigure from "./getStoreConfigure";

let _store;

function _getStore() {
  return _store;
}

function _start(Root) {
  const {compose, enhance} = getStoreConfigure();
  core.createConfigureStore(compose, enhance);

    _store = core.createStore();


  return () => {
    return (
      <Provider store={_store}>
        <Root />
      </Provider>
    );
  };
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
