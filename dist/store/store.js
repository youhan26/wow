"use strict";

var _redux = require("redux");

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _reactNative = require("react-native");

var _remoteReduxDevtools = require("remote-redux-devtools");

var _remoteReduxDevtools2 = _interopRequireDefault(_remoteReduxDevtools);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Created by YouHan on 2017/6/14.
                                                                                                                                                                                                     */


if ((0, _utils.isNative)()) {
  var devtool = (0, _remoteReduxDevtools2.default)({
    name: _reactNative.Platform.OS,
    hostname: 'localhost',
    port: 5678
  });

  module.exports = function (rootReducer, middleWares) {
    return (0, _redux.createStore)(rootReducer, (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, _toConsumableArray(middleWares)), devtool));
  };
} else {
  module.exports = function (rootReducer, middleWares) {
    return (0, _redux.createStore)(rootReducer, (0, _reduxDevtoolsExtension.composeWithDevTools)(_redux.applyMiddleware.apply(undefined, _toConsumableArray(middleWares))));
  };
}