/**
 * Created by YouHan on 2017/6/14.
 */
import {applyMiddleware, createStore, compose} from "redux";

export default (rootReducer, middleWares) => {
  return createStore(rootReducer,
    compose(
      applyMiddleware(...middleWares),
    )
  );
};
