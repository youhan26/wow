/**
 * Created by YouHan on 2017/11/20.
 */
import {combineReducers} from 'redux';

import {couponReducer} from './coupon';
import {userReducer} from '../user';
import {envReducer} from '../environment';

export default combineReducers({
  coupon: couponReducer,
  user: userReducer,
  env: envReducer
});
