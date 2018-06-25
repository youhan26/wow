'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isNative = function isNative() {
  var Platform = require('react-native').default.Platform;

  return !!Platform;
};

var isDev = function isDev() {
  if (isNative()) {
    return __DEV__;
  }
  return process.env.REACT_APP_PROJECT_ENV === 'development';
};

exports.isDev = isDev;
exports.isNative = isNative;