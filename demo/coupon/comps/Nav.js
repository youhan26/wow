import React from 'react';
import PropTypes from 'prop-types';
import styles from './Nav.css';
import {withRouter} from "react-router-dom";
import ResponseImg from "../../../common/comps/ResponseImg";


const Nav = ({children, right, left, onLeftClick, history}) => {
  return (
      <div className={styles.root} >
        <div className={styles.left} onClick={() => {
          if (onLeftClick) {
            onLeftClick();
          } else {
            history.goBack();
          }
        }}>
          <ResponseImg src={require('../../../images/login/back.png')} />
          {left}
        </div>
        <div style={{flex: 1, textAlign: 'center'}}>
          {children}
        </div>
        <div className={styles.right}>
          {right}
        </div>
      </div>
  );
};

Nav.propTypes = {
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onLeftClick: PropTypes.func,
};

Nav.defaultProps = {
  onLeftClick: null
};

export default withRouter(Nav);
