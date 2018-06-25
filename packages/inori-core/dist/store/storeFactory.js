'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storeFactory = function storeFactory(compose) {
  for (var _len = arguments.length, enhances = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    enhances[_key - 1] = arguments[_key];
  }

  return function (rootReducer, epicMiddleware) {
    return (0, _store2.default)(compose, enhances)(rootReducer, epicMiddleware);
  };
}; /**
    * Created by YouHan on 2017/7/4.
    */
exports.default = storeFactory;