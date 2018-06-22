'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var configureStore = function configureStore(rootReducer, epicMiddleware) {
  var store = void 0;
  if ((0, _utils.isDev)()) {
    store = require('./store/store').default(rootReducer, epicMiddleware);
  } else {
    store = require('./store/store.prod').default(rootReducer, epicMiddleware);
  }
  return store;
}; /**
    * Created by YouHan on 2017/7/4.
    */
exports.default = configureStore;