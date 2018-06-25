const isDev = () => {
  return process.env.REACT_APP_PROJECT_ENV === 'development';
};

export {
  isDev
};