import React from 'react';
import {Flex} from "antd-mobile";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './SelectItem.css';
import ResponseImg from "../../../common/comps/ResponseImg";

const SelectItem = ({children, right, onClick, selected, disabled}) => {
  return (
    <Flex
      onClick={disabled ? null : onClick}
      direction={'row'}
      justify={'between'}
      className={styles.item}
    >
      <div>
        {children}
      </div>
      <Flex>
        <span className={classNames({[styles.disabled]: disabled})}>{right}</span>
        <ResponseImg
          className={styles.img}
          src={require(`../../../images/product/${disabled ? 'circle-disabled.png' : selected ? 'circle-select.png' : 'circle-large.png'}`)}
        />
      </Flex>
    </Flex>
  );
};

SelectItem.propTypes = {
  right: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
};

SelectItem.defaultProps = {
  right: null,
  onClick: () => {
  
  },
  selected: false,
  disabled: false,
};

export default SelectItem;


/**
 * Pay select
 * @param payType
 * @param onClick
 * @param selected
 * @returns {XML}
 * @constructor
 */
export const PaySelect = ({payType, onClick, selected}) => {
  const payText = payType === 'alipay' ? '支付宝' : '微信';
  
  return (
    <Flex
      onClick={onClick}
      direction={'row'}
      justify={'between'}
      className={styles.item}
    >
      <div>
        <ResponseImg src={require(`../../../images/product/${payType}.png`)} />
      </div>
      <Flex.Item direction={'column'} style={{marginLeft: '0.18rem'}} aling={'start'}>
        <div>
          {payText}
        </div>
        <div className={styles.subTitle}>
          推荐{payText}用户使用
        </div>
      </Flex.Item>
      <div>
        <ResponseImg
          src={require(`../../../images/product/${selected ? 'circle-select-normal.png' : 'circle-normal.png'}`)}
        />
      </div>
    </Flex>
  );
};

PaySelect.propTypes = {
  payType: PropTypes.oneOf(['alipay', 'wechat'])
};
