/**
 * Created by YouHan on 2017/7/4.
 */
import createStore from './store'

const storeFactory = (compose, ...enhances) => {
  return (rootReducer, epicMiddleware) => {
    return createStore(compose, enhances)(rootReducer, epicMiddleware);
  }
};

export default storeFactory;

