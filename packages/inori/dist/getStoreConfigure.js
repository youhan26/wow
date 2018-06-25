"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _utils = require("./utils");

var getStoreConfigure = function getStoreConfigure() {
  return {
    compose: (0, _utils.isDev)() ? _reduxDevtoolsExtension.composeWithDevTools : _redux.compose,
    enhance: null
  };
};

exports.default = getStoreConfigure;