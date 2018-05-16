"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require("redux");

var _reduxDevtoolsExtension = require("redux-devtools-extension");

/**
 * https://github.com/zalmoxisus/remote-redux-devtools
 *
 * support react-native and react web
 *
 * react web: http://remotedev.io/local/
 * react native: debugger.ui......
 */
/**
 * react native config
 * add below to package.json
 * "postinstall": "remotedev-debugger --hostname localhost --port 5678 --injectserver",
 */
// const composeEnhancers = composeWithDevTools({
//   name: Platform.OS,
//   hostname: 'localhost',
//   port: 5678
// });
/**
 * react web config
 */
// const composeEnhancers = composeWithDevTools({
//   realtime: true,
// });
//
// export default createStore(rootReducer,
//   composeEnhancers(
//     applyMiddleware()
//   ));

/**
 * use web extension:
 * https://github.com/zalmoxisus/redux-devtools-extension#usage
 *
 */

/* eslint-disable no-underscore-dangle */

// export default createStore(rootReducer, /* preloadedState, */
//   composeWithDevTools(
//     applyMiddleware(epicMiddleware)
//   ));

/**
 * Created by YouHan on 2017/6/14.
 */
exports.default = function (rootReducer, epicMiddleware) {
  return (0, _redux.createStore)(rootReducer, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(epicMiddleware)));
};
/* eslint-enable */