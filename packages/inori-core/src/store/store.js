/**
 * Created by YouHan on 2017/6/14.
 */
import {applyMiddleware, createStore} from "redux";

export default (compose, enhances) => {
  return (rootReducer, middleWares) => {
    return createStore(
      rootReducer,
      compose(
        applyMiddleware(...middleWares),
        ...enhances
      )
    )
  };
}
