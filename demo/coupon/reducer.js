/**
 * Created by YouHan on 2017/11/20.
 */

import actionType from "./actionType";
import {combineReducers} from "redux";
import {REQUEST_PREFIX, SUCCESS} from "../../constants/constant";

const initInfo = {};

const details = (state = initInfo, action) => {
  switch (action.type) {
    case REQUEST_PREFIX+ actionType.load_coupon + SUCCESS:{
      const {couponKey} = action.action || {};
      return {
        ...state,
        [couponKey]: action.data
      };
    }
    default: {
      return state;
    }
  }
};

const initRecords = [];

const records = (state = initRecords, action) => {
  switch (action.type){
    case REQUEST_PREFIX + actionType.coupon_verification_list + SUCCESS:{
      return (action.data && action.data.rows) || []
    }
    default: {
      return state;
    }
  }
};


export default combineReducers({
  details,
  records,
});
