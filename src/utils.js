const isNative = () => {
  const {Platform} = require('react-native').default;
  return !!Platform;
};


const isDev = () => {
  if (isNative()) {
    return __DEV__;
  }
  return process.env.REACT_APP_PROJECT_ENV === 'development';
};


export {
  isDev,
  isNative
};