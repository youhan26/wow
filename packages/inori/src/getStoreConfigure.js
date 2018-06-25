import {compose} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {isDev} from './utils';


const getStoreConfigure = () => {
  return {
    compose: isDev() ? composeWithDevTools : compose,
    enhance: null
  }
};


export default getStoreConfigure;