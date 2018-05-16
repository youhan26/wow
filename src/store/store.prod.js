/**
 * Created by YouHan on 2017/6/14.
 */
import {applyMiddleware, createStore, compose} from "redux";
import {createEpicMiddleware} from "redux-observable";

import rootReducer from "../reducer";
import rootEpic from '../epic';

const epicMiddleware = createEpicMiddleware(rootEpic, {
  dependencies: {}
});

export default createStore(rootReducer,
  compose(
    applyMiddleware(epicMiddleware),
  )
);