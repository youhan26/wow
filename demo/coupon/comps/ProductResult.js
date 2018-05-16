import React from 'react';
import PropTypes from 'prop-types';
import {Flex} from 'antd-mobile';
import styles from './ProductResult.css';

/**
 * Basic result
 * @constructor
 */
const BasicResult = ({title, subTitle, style}) => {
  return (
    <Flex
      direction={'column'}
      justify={'center'}
      className={styles.result}
      style={style}
    >
      <div>
        {title}
      </div>
      <div>
        {subTitle}
      </div>
    </Flex>
  );
};

BasicResult.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

BasicResult.defaultProps = {
  title: null,
  subTitle: null
};


/**
 * QueueResult
 * @constructor
 */
export const QueueResult = ({number}) => {
  return (
    <BasicResult
      title={'正在排队...'}
      subTitle={
        <span style={{color: '#0A1A1A', fontSize: '0.26rem'}}>
          您前面还有
          <span style={{fontSize: '0.42rem'}}>{number}</span>
          人正在出货
        </span>
      }
    />
  );
};

export const OutingResult = () => {
  return (
    <BasicResult
      title={'正在出货...'}
    />
  );
};

export const PayingResult = () => {
  return (
    <BasicResult title={'正在支付...'} />
  );
};

export const PayFault = () => {
  return (
    <BasicResult
      style={{backgroundColor: '#FC8C8D '}}
      title={
        <span style={{color: 'white'}}>支付失败</span>
      }
    />
  );
};

export const OutingFault = () => {
  return (
    <BasicResult
      style={{backgroundColor: '#FC8C8D '}}
      title={
        <span style={{color: 'white'}}>出货失败</span>
      }
    />
  );
};

export const OutingFaultForCash = () => {
  return (
    <BasicResult
      style={{backgroundColor: '#FC8C8D '}}
      title={
        <span style={{color: 'white'}}>出货失败</span>
      }
      subTitle={
        <span style={{color: 'white'}}>已生成提货券，可在售货机兑换使用</span>
      }
    />
  );
};

export const OutingSuccess = () => {
  return (
    <BasicResult
      style={{backgroundColor: '#25CBAA'}}
      title={
        <span style={{color: 'white'}}>出货成功</span>
      }
      subTitle={
        <span style={{color: 'white'}}>请检查售货机出货口</span>
      }
    />
  );
};

export const CancelQueue = () => {
  return (
    <BasicResult
      style={{backgroundColor: '#F7B52C'}}
      title={
        <span style={{color: 'white'}}>您已取消排队</span>
      }
    />
  );
};

export const CancelQueueForCash = () => {
  return (
    <BasicResult
      style={{backgroundColor: '#F7B52C'}}
      title={
        <span style={{color: 'white'}}>您已取消排队</span>
      }
      subTitle={
        <span style={{color: 'white'}}>已生成提货券，可在售货机兑换使用</span>
      }
    />
  );
};
