'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactNative = require('react-native');

var _redux = require('redux');

var _remoteReduxDevtools = require('remote-redux-devtools');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var composeEnhancers = (0, _remoteReduxDevtools.composeWithDevTools)({
  name: _reactNative.Platform.OS,
  hostname: 'localhost',
  port: 5678
});

exports.default = function (rootReducer, middleWares) {
  return (0, _redux.createStore)(rootReducer, composeEnhancers(_redux.applyMiddleware.apply(undefined, _toConsumableArray(middleWares))));
};