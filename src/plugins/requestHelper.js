/**
 * Created by youhan on 2017/8/31.
 */
import axios from "axios";
import {Observable} from "rxjs";
import {
  APP_ISLOGOUTED,
  BUSINESS_ERROR,
  FAILURE,
  NETWORK_ERROR,
  REQUEST,
  REQUEST_PREFIX,
  SERVER_ERROR,
  SUCCESS
} from "../constants/constant";
import AUTH from "./authHelper";
import {requestConfig} from "../constants/urlConstant";
import urlHelper from "./urlHelper";
// import envConstant from "../constants/envConstant";

/**
 * 生成axios option
 * @param urlType
 * @param params
 * @param data
 * @param headers
 */
const configOption = ({urlType, params, data, headers}) => {
  const config = requestConfig[urlType];
  return {
    method: config.method || 'GET',
    url: config.getUrl(params),
    data,
    params: urlHelper.cleanParams(params),
    headers: {
      needToken: config.needToken || true,
      'Content-Type': 'application/json',
      ...(config.headers || {}),
      ...(headers || {})
    }
  };
};

const customAxios = axios.create({
  // baseURL: envConstant.requestPrefix,
  responseType: 'json',
  timeout: 10000,
  validateStatus: () => {
    return true;
  }
});

customAxios.interceptors.request.use((config) => {
  const newConfig = config;
  const needToken = newConfig.headers.needToken;
  delete newConfig.headers.needToken;
  if (!needToken) {
    return newConfig;
  }
  newConfig.headers.token = AUTH.getToken();
  return newConfig;
}, (error) => {
  return Promise.reject(error);
});

export const createAxiosHelper = (option = {}, action) => {
  if (!action) {
    console.error('....no action ....', option);
  }
  return Observable.fromPromise(
    customAxios(
      configOption(option)
    ))
    .map((response) => {
      const {status} = response;
      const responseData = response.data;
      let data = null;
      if (responseData) {
        data = responseData.data;
      }
      
      if (status === 666) {
        AUTH.clear();
        return {
          type: REQUEST_PREFIX + action.type + FAILURE,
          reason: APP_ISLOGOUTED,
          success: false,
          action
        };
      }
      if (status >= 200 && status <= 300) {
        const isBusErr = !responseData.success;
        
        if (isBusErr && !action.noError) {
          console.log(responseData.message);
        }
        
        if (action.after && typeof action.after === 'function') {
          action.after(!isBusErr, data, responseData, action);
        }
        return {
          type: REQUEST_PREFIX + action.type + (isBusErr ? FAILURE : SUCCESS),
          response,
          data,
          action,
          success: !isBusErr,
          reason: isBusErr ? BUSINESS_ERROR : null,
          error: isBusErr ? (responseData.message || '发生未知错误') : null
        };
      }
      return {
        type: REQUEST_PREFIX + action.type + FAILURE,
        reason: SERVER_ERROR,
        success: false,
        action
      };
    })
    .catch((error) => {
      return Observable.of({
        type: REQUEST_PREFIX + action.type + FAILURE,
        reason: NETWORK_ERROR,
        success: false,
        error
      });
    })
    .mergeMap((data) => {
      if (data.reason) {
        /**
         * type: NO_AUTH, BUSINESS_ERROR, SERVER_ERROR, NETWORK_ERROR
         */
        return Observable.of(data, {type: data.reason});
      }
      return Observable.of(data);
    })
    .startWith({...action, type: '[REQUEST]' + action.type + REQUEST});
};