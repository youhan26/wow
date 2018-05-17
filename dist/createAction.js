"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAction = createAction;
function createAction(type) {
  return function (payload, after) {
    return {
      type: type,
      payload: payload,
      after: after
    };
  };
}