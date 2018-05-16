"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxObservable = require("redux-observable");

/**
 * @param epics
 * @param plugins
 * @returns {EpicMiddleware<Action, any, any, Action>}
 */
var getEpicMiddleware = function getEpicMiddleware(epics, plugins) {
  return (0, _reduxObservable.createEpicMiddleware)(epics, {
    dependencies: plugins || {}
  });
};

exports.default = getEpicMiddleware;