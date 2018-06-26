import {Provider} from "react-redux";
import React from 'react';
import {combineEpics} from 'redux-observable';
import UTILS from 'mi-js-utils';
import {combineReducers} from "redux";
import storeFactory from "./store/storeFactory";
import createReducer from "./createReducer";
import {createAction} from './createAction';
import getEpicMiddleware from "./getEpicMiddleware";


let _epics = [];
let _reducersObj = {};
let _plugins = {};
let _middlewares = [];

let _configureStore = UTILS.common.noop;

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

/**
 * create configure store method
 * @private
 */
function _createConfigureStore(...args){
  _configureStore = storeFactory(...args);
}

/**
 * create store
 * @private
 */
function _createStore() {
  //start to create store
  const rootEpic = combineEpics(..._epics);
  const _trueReducers = combineReducers(_reducersObj);

  //TODO extra epic inject plugin
  const epicMiddleware = getEpicMiddleware(rootEpic, _plugins);

  _middlewares.push(epicMiddleware);

  return _configureStore(_trueReducers, _middlewares);
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
  addModel: _addModel,
  createAction,
  addReducer: _addOriginReducer,
  addEpic: _addOriginEpic,
  addPlugin: _addPlugins,
  addMiddleware: _addMiddleware,

  createConfigureStore: _createConfigureStore,
  createStore: _createStore,
}

