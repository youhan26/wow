/**
 * Created by YouHan on 2017/6/14.
 */
import {applyMiddleware, createStore, compose} from "redux";

export default (rootReducer, epicMiddleware) => {
  return createStore(rootReducer,
    compose(
      applyMiddleware(epicMiddleware),
    )
  );
};
