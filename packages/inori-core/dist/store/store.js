"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Created by YouHan on 2017/6/14.
                                                                                                                                                                                                     */


exports.default = function (compose, enhances) {
  return function (rootReducer, middleWares) {
    return (0, _redux.createStore)(rootReducer, compose.apply(undefined, [_redux.applyMiddleware.apply(undefined, _toConsumableArray(middleWares))].concat(_toConsumableArray(enhances))));
  };
};