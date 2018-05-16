"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

exports.default = function (rootReducer, epicMiddleware) {
  return (0, _redux.createStore)(rootReducer, (0, _redux.compose)((0, _redux.applyMiddleware)(epicMiddleware)));
}; /**
    * Created by YouHan on 2017/6/14.
    */