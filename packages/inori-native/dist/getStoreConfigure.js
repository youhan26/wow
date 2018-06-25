'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reactNative = require('react-native');

var _remoteReduxDevtools = require('remote-redux-devtools');

var _remoteReduxDevtools2 = _interopRequireDefault(_remoteReduxDevtools);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var devtool = (0, _remoteReduxDevtools2.default)({
  name: _reactNative.Platform.OS,
  hostname: 'localhost',
  port: 5678
});

var getStoreConfigure = function getStoreConfigure() {
  return {
    compose: _redux.compose,
    enhance: (0, _utils.isDev)() ? devtool : null
  };
};

exports.default = getStoreConfigure;