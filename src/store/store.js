/**
 * Created by YouHan on 2017/6/14.
 */
import {applyMiddleware, createStore} from "redux";
import {createEpicMiddleware} from "redux-observable";
import {composeWithDevTools} from "redux-devtools-extension";

import rootReducer from "../reducer";
import rootEpic from '../epic';

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

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: {}
});

/* eslint-disable no-underscore-dangle */

// export default createStore(rootReducer, /* preloadedState, */
//   composeWithDevTools(
//     applyMiddleware(epicMiddleware)
//   ));

export default createStore(rootReducer,
  composeWithDevTools(
    applyMiddleware(epicMiddleware),
  )
);
/* eslint-enable */