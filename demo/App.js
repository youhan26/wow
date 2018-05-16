import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import styles from './App.css';
import {connect} from "react-redux";
import {renewal, startUpdateAuthFromApp, updateAuthFromApp} from "../user/action";
import {initEnv} from "../environment/action";
import envHelper from "../helpers/envHelper";
import detectHelper from "../helpers/detectHelper";
import appHelper from "../helpers/appHelper";
import VerificationPage from "./coupon/views/CouponVerificationPage";

class AppBase extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    appHelper.init();
    
    this.props.initEnv();
    if (detectHelper.isApp()) {
      this.props.startUpdateAuthFromApp();
      setTimeout(() => {
        this.requestTokenFromApp();
      }, 300);
    } else {
      this.props.renewal();
    }
  }
  
  
  @autobind
  requestTokenFromApp() {
    appHelper.sendData('auth', {});
    appHelper.receiveData((data) => {
      const {params, module} = data;
      if (module === 'auth') {
        if (params.token && params.key) {
          this.props.updateAuthFromApp(params.token, params.key);
        }
      }
    });
  }
  
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.content}>
          <Switch>
            {/*<Route exact={true} path="/vendors" component={ProjectDetailPage} />*/}
            <Route exact={true} path="/verification/:couponKey" component={VerificationPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

AppBase.propTypes = {
  renewal: PropTypes.func.isRequired,
};

const App = connect(() => {
  return {};
}, {
  renewal,
  initEnv,
  updateAuthFromApp,
  startUpdateAuthFromApp
})(AppBase);

export default () => {
  return (
    <Router basename={envHelper.getBaseName('clerk')}>
      <Route path='/*' component={App} />
    </Router>
  );
};