"use strict";

var _redux = require("redux");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Created by YouHan on 2017/6/14.
                                                                                                                                                                                                     */


module.exports = function (rootReducer, middleWares) {
  return (0, _redux.createStore)(rootReducer, (0, _redux.compose)(_redux.applyMiddleware.apply(undefined, _toConsumableArray(middleWares))));
};