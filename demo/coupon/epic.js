/**
 * Created by YouHan on 2017/11/20.
 */
import {combineEpics} from "redux-observable";
import actionType from "./actionType";
import {createAxiosHelper} from "../../helpers/requestHelper";
import {urlTypes} from "../../constants/urlConstant";

const loadCouponEpic = (action$) => {
  return action$.ofType(actionType.load_coupon)
    .mergeMap((action) => {
      const {couponKey} = action;
      return createAxiosHelper({
        urlType: urlTypes.clerk_coupon_detail,
        params: {
          couponKey,
        }
      }, action);
    });
};

const verificationEpic = (action$) => {
  return action$.ofType(actionType.coupon_verification)
    .mergeMap((action) => {
      const {couponKey} = action;
      return createAxiosHelper({
        urlType: urlTypes.clerk_coupon_verification,
        data: {
          couponsInstanceId: couponKey,
        }
      }, action);
    });
};


const verificationListEpic = (action$) => {
  return action$.ofType(actionType.coupon_verification_list)
    .mergeMap((action) => {
      return createAxiosHelper({
        urlType: urlTypes.clerk_coupon_verification_list,
      }, action);
    });
};

export default combineEpics(
  loadCouponEpic,
  verificationListEpic,
  verificationEpic,
);
