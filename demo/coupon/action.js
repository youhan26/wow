/**
 * Created by YouHan on 2017/11/20.
 */
import actionType from "./actionType";

export const loadDetail = (couponKey) => {
  return {
    type: actionType.load_coupon,
    couponKey
  };
};

export const verificationCoupon = (couponKey, after) => {
  return {
    type: actionType.coupon_verification,
    couponKey,
    after
  };
};

export const verificationCouponList = () => {
  return {
    type: actionType.coupon_verification_list
  };
};