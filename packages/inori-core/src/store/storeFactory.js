/**
 * Created by YouHan on 2017/7/4.
 */
import {isDev} from "../utils";

const storeFactory = (compose, ...) => {
  return (rootReducer, epicMleware) => {
    let store;
    if (isDev()) {
      store = require('./store').default(rootReducer, epicMiddleware);
    } else {
      store = require('./store.prod').default(rootReducer, epicMiddleware);
    }
    return store;
  }
};




export default storeFactory;

