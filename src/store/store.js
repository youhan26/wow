/**
 * Created by YouHan on 2017/6/14.
 */
import {applyMiddleware, createStore, compose} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";

import {Platform} from 'react-native';
import devTools from 'remote-redux-devtools';
import {isNative} from "../utils";


if(isNative()){
  const devtool = devTools({
    name: Platform.OS,
    hostname: 'localhost',
    port: 5678
  });
  
  module.exports = (rootReducer, middleWares) => {
    return createStore(rootReducer,
      compose(
        applyMiddleware(...middleWares),
        devtool
      )
    );
  };
}else {
  module.exports = (rootReducer, middleWares) => {
    return createStore(rootReducer,
      composeWithDevTools(
        applyMiddleware(...middleWares),
      )
    );
  };
}
