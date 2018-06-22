/**
 * Created by YouHan on 2017/6/14.
 */
import {applyMiddleware, compose, createStore} from "redux";

module.exports = (rootReducer, middleWares) => {
  return createStore(rootReducer,
    compose(
      applyMiddleware(...middleWares),
    )
  );
};