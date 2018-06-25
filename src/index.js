import {Provider} from "react-redux";
import React from 'react';
import {combineEpics} from 'redux-observable';
import {combineReducers} from "redux";
import configureStore from "./configureStore";
import createReducer from "./createReducer";
import {createAction} from './createAction';
import getEpicMiddleware from "./getEpicMiddleware";


let _epics = [];
let _reducersObj = {};
let _store;
let _plugins = {};
let _middlewares = [];

function _addPlugins(key, plugin) {
  _plugins[key] = plugin;
}

function _addMiddleware(middlewares) {
  if (Array.isArray(middlewares)) {
    _middlewares = _middlewares.concat(middlewares);
  } else {
    _middlewares.push(middlewares);
  }
}

function _addEpic(epics) {
  if (epics) {
    _epics = _epics.concat(Object.values(epics));
  }
}

function _addReducer(namespace, initState, handles) {
  _reducersObj[namespace] = createReducer(initState, handles);
}

function _addModel(model) {
  const {namespace, state, epics, reducers} = model;
  
  if (epics) {
    _addEpic(epics);
  }
  if (reducers) {
    _addReducer(namespace, state || {}, reducers);
  }
}


function _getStore() {
  //start to create store
  const rootEpic = combineEpics(..._epics);
  const _trueReducers = combineReducers(_reducersObj);
  
  //TODO extra epic inject plugin
  const epicMiddleware = getEpicMiddleware(rootEpic, _plugins);
  
  _middlewares.push(epicMiddleware);
  
  return configureStore(_trueReducers, _middlewares);
}

/**
 * start react-native
 * @param Root
 * @returns {function(): *}
 * @private
 */
function _startNative(Root) {
  const _store = _getStore();
  
  return () => {
    return (
      <Provider store={_store}>
        <Root />
      </Provider>
    );
  };
}

/**
 * start web react
 * @param Root
 * @param domId
 * @private
 */
function _start(Root, domId) {
  const _store = _getStore();
  
  const App = () => {
    return (
      <Provider store={_store}>
        <Root />
      </Provider>
    );
  };
  const ReactDOM = require('react-dom').default;
  if(ReactDOM){
    ReactDOM.render(<App />, document.getElementById(domId));
  }
}


function _addOriginReducer(key, reducer) {
  _reducersObj[key] = reducer;
}

function _addOriginEpic(epics) {
  if (Array.isArray(epics)) {
    _epics = _epics.concat(epics);
  } else {
    _epics.push(epics);
  }
}

export default {
  getStore: function () {
    return _store;
  },
  addModel: _addModel,
  createAction,
  addReducer: _addOriginReducer,
  addEpic: _addOriginEpic,
  addPlugin: _addPlugins,
  addMiddleware: _addMiddleware,
  
  start: _start,
  startNative: _startNative
}

