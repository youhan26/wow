'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxObservable = require('redux-observable');

var _redux = require('redux');

var _configureStore = require('./configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _createReducer = require('./createReducer');

var _createReducer2 = _interopRequireDefault(_createReducer);

var _createAction = require('./createAction');

var _getEpicMiddleware = require('./getEpicMiddleware');

var _getEpicMiddleware2 = _interopRequireDefault(_getEpicMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _epics = [];
var _reducersObj = {};
var _store = void 0;
var _plugins = {};
var _middlewares = [];

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
  _reducersObj[namespace] = (0, _createReducer2.default)(initState, handles);
}

function _addModel(model) {
  var namespace = model.namespace,
      state = model.state,
      epics = model.epics,
      reducers = model.reducers;


  if (epics) {
    _addEpic(epics);
  }
  if (reducers) {
    _addReducer(namespace, state || {}, reducers);
  }
}

function _getStore() {
  //start to create store
  var rootEpic = _reduxObservable.combineEpics.apply(undefined, _toConsumableArray(_epics));
  var _trueReducers = (0, _redux.combineReducers)(_reducersObj);

  //TODO extra epic inject plugin
  var epicMiddleware = (0, _getEpicMiddleware2.default)(rootEpic, _plugins);

  _middlewares.push(epicMiddleware);

  return (0, _configureStore2.default)(_trueReducers, _middlewares);
}

/**
 * start react-native
 * @param Root
 * @returns {function(): *}
 * @private
 */
function _startNative(Root) {
  var _store = _getStore();

  return function () {
    return _react2.default.createElement(
      _reactRedux.Provider,
      { store: _store },
      _react2.default.createElement(Root, null)
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
  var _store = _getStore();

  var App = function App() {
    return _react2.default.createElement(
      _reactRedux.Provider,
      { store: _store },
      _react2.default.createElement(Root, null)
    );
  };
  var ReactDOM = require('react-dom').default;
  if (ReactDOM) {
    ReactDOM.render(_react2.default.createElement(App, null), document.getElementById(domId));
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

exports.default = {
  getStore: function getStore() {
    return _store;
  },
  addModel: _addModel,
  createAction: _createAction.createAction,
  addReducer: _addOriginReducer,
  addEpic: _addOriginEpic,
  addPlugin: _addPlugins,
  addMiddleware: _addMiddleware,

  start: _start,
  startNative: _startNative
};