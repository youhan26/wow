import React, {PureComponent} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import UTILS from 'mi-js-utils';
import DocumentTitle from 'react-document-title';
import autobind from 'autobind-decorator';
import styles from './CouponVerificationPage.css';
import {loadDetail, verificationCoupon, verificationCouponList} from "../action";
import {Button, Toast} from "antd-mobile";

/**
 * CouponDetail
 * @param data
 * @param onPress
 * @returns {*}
 * @constructor
 */
const CouponDetail = ({data, onPress}) => {
  if (!data) {
    return null;
  }
  return (
    <div className={styles.coupon}>
      <img alt="商品图片" src={data.sampleUrl || data.sourceUrl} className={styles.cover} />
      <div className={styles.couponDetail}>
        <div className={styles.couponTitle}>
          {data.title}
        </div>
        <div className={styles.couponPrice}>
          <span className={styles.couponDate}>
            有效期：
            {UTILS.time.formatDate(data.startTime)}
            ～ {UTILS.time.formatDate(data.endTime)}
          </span>
        </div>
        <div className={styles.couponHr} />
      </div>
      <div className={styles.merchant}>
        <div className={styles.merchantName}>
          发行店铺：{data.merchantName}
        </div>
        <div className={styles.couponTips}>
          {data.tips}
        </div>
        <div className={styles.couponIntroduction}>
          {data.content}
        </div>
      </div>
      <div className={styles.bottom}>
        <Button
          type="warning"
          onClick={onPress}
        >
          确定核销
        </Button>
      </div>
    </div>
  );
};

CouponDetail.defaultProps = {
  onPress: () => {
  
  }
};

/**
 * CouponVerificationRecord
 * @param data
 * @returns {*}
 * @constructor
 */
const CouponVerificationRecord = ({data}) => {
  if (!data || data.length <= 0) {
    return null;
  }
  return (
    <table className={styles.recordTable} cellSpacing="0">
      <tr>
        <th>优惠券</th>
        <th>用户昵称</th>
        <th>兑换时间</th>
      </tr>
      {data.map((record) => {
        return (
          <tr>
            <td className={styles.recordTitle}>
              {record.couponsTitle}
            </td>
            <td className={styles.recordNickname}>
              {record.nickname}
            </td>
            <td className={styles.recordDate}>
              {UTILS.time.formatDateTime(record.consumeTime)}
            </td>
          </tr>
        );
      })}
    </table>
  );
};


class CouponVerificationPage extends PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      showCoupon: true
    };
  }
  
  componentDidMount() {
    const {couponKey} = this.props;
    if (couponKey) {
      this.props.loadDetail(couponKey);
    }
  }
  
  @autobind
  showRecord() {
    this.props.verificationCouponList();
    this.setState({showCoupon: false});
  }
  
  @autobind
  verifyCoupon() {
    const {couponKey, isLogin} = this.props;
    if (!isLogin) {
      Toast.fail('授权失败，请稍后重试');
      return;
    }
    this.props.verificationCoupon(couponKey, (isSucc, data) => {
      if (isSucc) {
        Toast.info('核销成功', 1);
        this.showRecord();
      } else {
        Toast.fail((data && data.message) || '核销失败');
      }
    });
  }
  
  render() {
    const {couponKey, coupon, records,} = this.props;
    if (!couponKey || !coupon) {
      return null;
    }
    
    return (
      <DocumentTitle title={'优惠券详情'}>
        <div className={styles.root}>
          {this.state.showCoupon ?
            <CouponDetail
              onPress={this.verifyCoupon}
              data={coupon}
            /> :
            <CouponVerificationRecord
              data={records}
            />
          }
        </div>
      </DocumentTitle>
    );
  }
}

CouponVerificationPage.propTypes = {
  env: PropTypes.shape({}).isRequired,
  isLoadingToken: PropTypes.bool.isRequired,
  isLogin: PropTypes.bool,
  couponKey: PropTypes.string,
  loadDetail: PropTypes.func.isRequired,
  verificationCoupon: PropTypes.func.isRequired,
  verificationCouponList: PropTypes.func.isRequired,
  coupon: PropTypes.shape({}),
  records: PropTypes.arrayOf(PropTypes.shape({})),
};

CouponVerificationPage.defaultProps = {
  isLogin: false,
  couponKey: null,
  coupon: null,
  records: [],
};


export default connect((state, props) => {
  const {match} = props;
  
  const {couponKey} = match.params;
  return {
    isLogin: !!state.user.info,
    isLoadingToken: state.user.retrieveToken.loadAuth,
    env: state.env,
    couponKey,
    coupon: state.coupon.details[couponKey],
    records: state.coupon.records,
  };
}, {
  loadDetail,
  verificationCoupon,
  verificationCouponList
})(CouponVerificationPage);


