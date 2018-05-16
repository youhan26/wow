'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by YouHan on 2017/7/4.
 */

var isDev = function isDev() {
  return process.env.REACT_APP_PROJECT_ENV === 'development';
};

var configureStore = function configureStore(rootReducer, epicMiddleware) {
  var store = void 0;
  if (isDev()) {
    store = require('./store/store').default(rootReducer, epicMiddleware);
  } else {
    store = require('./store/store.prod').default(rootReducer, epicMiddleware);
  }
  return store;
};

exports.default = configureStore;