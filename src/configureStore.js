/**
 * Created by YouHan on 2017/7/4.
 */

const isDev = () => {
  return process.env.REACT_APP_PROJECT_ENV === 'development';
};

const configureStore = (rootReducer, epicMiddleware) => {
  let store;
  if (isDev()) {
    store = require('./store').default(rootReducer, epicMiddleware);
  } else {
    store = require('./store.prod').default(rootReducer, epicMiddleware);
  }
  return store;
};

export default configureStore;

