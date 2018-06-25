import {compose} from "redux";
import {Platform} from 'react-native';
import devTools from 'remote-redux-devtools';
import {isDev} from './utils';

const devtool = devTools({
  name: Platform.OS,
  hostname: 'localhost',
  port: 5678
});

const getStoreConfigure = () => {
  return {
    compose: compose,
    enhance: isDev() ? devtool : null
  }
};

export default getStoreConfigure;