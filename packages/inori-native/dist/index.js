'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _inoriCore = require('inori-core');

var _inoriCore2 = _interopRequireDefault(_inoriCore);

var _getStoreConfigure2 = require('./getStoreConfigure');

var _getStoreConfigure3 = _interopRequireDefault(_getStoreConfigure2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _store = void 0;

function _getStore() {
  return _store;
}

function _start(Root) {
  var _getStoreConfigure = (0, _getStoreConfigure3.default)(),
      compose = _getStoreConfigure.compose,
      enhance = _getStoreConfigure.enhance;

  _inoriCore2.default.createConfigureStore(compose, enhance);

  _store = _inoriCore2.default.createStore();

  return function () {
    return _react2.default.createElement(
      Provider,
      { store: _store },
      _react2.default.createElement(Root, null)
    );
  };
}

exports.default = {
  addModel: _inoriCore2.default.addModel,
  createAction: _inoriCore2.default.createAction,
  addReducer: _inoriCore2.default.addReducer,
  addEpic: _inoriCore2.default.addEpic,
  addPlugin: _inoriCore2.default.addPlugin,
  addMiddleware: _inoriCore2.default.addMiddleware,

  start: _start,
  getStore: _getStore
};