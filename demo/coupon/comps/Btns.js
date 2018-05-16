import React from 'react';
import {Button} from "antd-mobile";

const BasicBtn = ({style, children, ...props}) => {
  return (
    <Button
      style={{height: '0.48rem', width: '1.4rem', lineHeight: '0.48rem', fontSize: '0.26rem', ...style}}
      {...props}
    >
      <span>{children}</span>
    </Button>
  );
};

export const CancelBtn = (props) => {
  return (
    <BasicBtn
      style={{backgroundColor: 'white', border: '#666 1px solid'}}
      {...props}
    >
      取消
    </BasicBtn>
  );
};


export const ContinuePayBtn = (props) => {
  return (
    <BasicBtn
      style={{backgroundColor: '#25CBAA', color: 'white'}}
      {...props}
    >
      继续支付
    </BasicBtn>
  );
};

export const RetryBtn = (props) => {
  return (
    <BasicBtn
      style={{backgroundColor: '#25CBAA', color: 'white'}}
      {...props}
    >
      再试一次
    </BasicBtn>
  );
};