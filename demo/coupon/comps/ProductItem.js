import React from 'react';
import PropTypes from 'prop-types';
import {Button, Flex} from "antd-mobile";
import styles from './ProductItem.css';


/**
 * ProductImage
 * @param props
 * @returns {XML}
 * @constructor
 */
export const ProductImage = (props) => {
  return (
    <img alt={'商品图片'} {...props} style={{width: '1.8rem', height: '1.8rem', objectFit: 'cover'}} />
  );
};

ProductImage.propTypes = {
  src: PropTypes.string.isRequired
};

/**
 *
 * @param children
 * @param style
 * @param props
 * @returns {XML}
 * @constructor
 */
export const ProductTitle = ({children, style, ...props}) => {
  return (
    <div style={{fontSize: '0.28rem', color: '#1A1A1A', ...style}} {...props}>
      {children}
    </div>
  );
};


/**
 * Product detail
 * @param name
 * @param point
 * @param price
 * @returns {XML}
 * @constructor
 */
export const ProductDetail = ({name, point, price}) => {
  return (
    <Flex direction={'column'} align={'start'} justify={'start'} style={{paddingTop: '0.2rem'}}>
      <Flex.Item>
        <span className={styles.name}>{name}</span>
      </Flex.Item>
      <Flex.Item style={{marginLeft: 0, marginTop: '0.05rem'}}>
        <span className={styles.name}>{point}</span>
        <span className={styles.fill}>&nbsp;&nbsp;积分&nbsp;&nbsp;/&nbsp;</span>
        <span className={styles.name}>￥{price}</span>
      </Flex.Item>
    </Flex>
  );
};

ProductDetail.propTypes = {
  name: PropTypes.string,
  point: PropTypes.number,
  price: PropTypes.string
};

ProductDetail.defaultProps = {
  name: '',
  point: 0,
  price: ''
};

/**
 * ProductAmount
 * @param amount
 * @param props
 * @returns {XML}
 * @constructor
 */
export const ProductAmount = ({amount, ...props}) => {
  return (
    <div className={styles.fill} {...props}>
      数量：{amount}
    </div>
  );
};

ProductAmount.propTypes = {
  amount: PropTypes.number,
};

PropTypes.defaultProps = {
  amount: 0
};

/**
 * ProductItem
 * @param data
 * @param onClick
 * @constructor
 */
const ProductItem = ({data, onClick}) => {
  if (!data) {
    return null;
  }
  const {cover, title, amount, point, price, name} = data || {};
  return (
    <Flex direction={'row'} align={'start'} className={styles.root}>
      <div>
        <ProductImage src={cover} />
      </div>
      <Flex.Item style={{marginLeft: '0.22rem'}}>
        <Flex direction={'column'} align={'start'}>
          <ProductTitle style={{height: '0.6rem'}}>
            {title}
          </ProductTitle>
          <Flex diection={'row'} justify={'between'} align={'start'} style={{width: '100%'}}>
            <ProductDetail name={name} point={point} price={price} />
            <div>
              <Button className={styles.button} onClick={onClick}>
                <span className={styles.buttonText}>兑换</span>
              </Button>
            </div>
          </Flex>
          <ProductAmount amount={amount} style={{marginTop: '0.05rem'}} />
        </Flex>
      </Flex.Item>
    </Flex>
  );
};

ProductItem.propTypes = {
  data: PropTypes.shape({}),
  onClick: PropTypes.func,
};

ProductItem.defaultProps = {
  data: null,
  onClick: () => {
  
  }
};

export default ProductItem;

/**
 *
 * @param data
 * @returns {*}
 * @constructor
 */
export const ProductItemSale = ({data}) => {
  if (!data) {
    return null;
  }
  const {cover, title, amount} = data || {};
  return (
    <Flex direction={'row'} align={'start'} className={styles.saleRoot}>
      <div>
        <ProductImage src={cover} />
      </div>
      <Flex.Item style={{marginLeft: '0.22rem'}}>
        <Flex direction={'column'} align={'start'}>
          <ProductTitle style={{height: '0.6rem', marginTop: '0.3rem'}}>
            {title}
          </ProductTitle>
          <div style={{width: '100%', textAlign: 'right'}}>
            <ProductAmount amount={amount} style={{marginTop: '0.3rem'}} />
          </div>
        </Flex>
      </Flex.Item>
    </Flex>
  );
};

ProductItemSale.propTypes = {
  data: PropTypes.shape({}),
};

ProductItemSale.defaultProps = {
  data: null,
};


/**
 * ProductOderItem
 * @param data
 * @returns {*}
 * @constructor
 */
export const ProductOderItem = ({data}) => {
  if (!data) {
    return null;
  }
  const {cover, title, name, point, price} = data || {};
  return (
    <Flex direction={'row'} align={'start'} className={styles.root}>
      <div>
        <ProductImage src={cover} />
      </div>
      <Flex.Item style={{marginLeft: '0.22rem'}}>
        <Flex direction={'column'} align={'start'}>
          <ProductTitle style={{height: '0.6rem'}}>
            {title}
          </ProductTitle>
          <Flex diection={'row'} justify={'between'} align={'end'} style={{width: '100%', marginTop: '0.3rem'}}>
            <ProductDetail name={name} point={point} price={price} />
            <div style={{color: '#ACACAC', fontSize: '0.32rem'}}>
              x1
            </div>
          </Flex>
        </Flex>
      </Flex.Item>
    </Flex>
  );
};

ProductOderItem.propTypes = {
  data: PropTypes.shape({}),
};

ProductOderItem.defaultProps = {
  data: null,
};