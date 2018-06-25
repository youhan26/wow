'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isDev = function isDev() {
  return process.env.REACT_APP_PROJECT_ENV === 'development';
};

exports.isDev = isDev;