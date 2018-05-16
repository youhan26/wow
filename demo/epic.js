/**
 * Created by YouHan on 2017/6/26.
 */
import {combineEpics} from "redux-observable";

import {couponEpic} from "./coupon";
import {userEpic} from "../user";


const rootEpic = combineEpics(
  couponEpic,
  userEpic,
);

export default rootEpic;
