/**
 * Created by YouHan on 2017/7/4.
 */
import {isDev} from "./utils";

const configureStore = (rootReducer, epicMiddleware) => {
  let store;
  if (isDev()) {
    store = require('./store/store').default(rootReducer, epicMiddleware);
  } else {
    store = require('./store/store.prod').default(rootReducer, epicMiddleware);
  }
  return store;
};

export default configureStore;

