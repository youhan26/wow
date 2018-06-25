import {Provider} from "react-redux";
import React from 'react';
import ReactDOM from 'react-dom';
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

function _start(Root, domId) {
  //start to create store
  const rootEpic = combineEpics(..._epics);
  const _trueReducers = combineReducers(_reducersObj);
  
  //TODO extra epic inject plugin
  const epicMiddleware = getEpicMiddleware(rootEpic, _plugins);
  
  _middlewares.push(epicMiddleware);
  
  _store = configureStore(_trueReducers, _middlewares);
  
  const App = () => {
    return (
      <Provider store={_store}>
        <Root />
      </Provider>
    );
  };
  
  ReactDOM.render(<App />, document.getElementById(domId));
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
  start: _start,
  createAction,
  addReducer: _addOriginReducer,
  addEpic: _addOriginEpic,
  addPlugin: _addPlugins,
  addMiddleware: _addMiddleware,
}

