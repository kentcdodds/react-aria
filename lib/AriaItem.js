'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _specialAssign = require('./special-assign');

var _specialAssign2 = _interopRequireDefault(_specialAssign);

var checkedProps = {
  tag: _react.PropTypes.string,
  children: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.node]).isRequired
};

var AriaItem = (function (_Component) {
  _inherits(AriaItem, _Component);

  function AriaItem() {
    var _this = this;

    _classCallCheck(this, AriaItem);

    _get(Object.getPrototypeOf(AriaItem.prototype), 'constructor', this).apply(this, arguments);

    this._handleKeyDown = function (e) {
      var onKeyDown = _this.props.onKeyDown;

      if ([' ', 'Enter'].indexOf(e.key) > -1) {
        _this.context.ariaManager.onItemSelection(_this._member, e);
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };
  }

  _createClass(AriaItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._member = {
        type: 'item',
        node: (0, _reactDom.findDOMNode)(this),
        text: this.props.text
      };
      this.context.ariaManager.addMember(this._member);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.ariaManager.removeMember(this._member);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var tag = _props.tag;
      var children = _props.children;

      var props = (0, _specialAssign2['default'])({
        role: 'menuitem',
        tabIndex: -1,
        onKeyDown: this._handleKeyDown
      }, this.props, checkedProps);

      if (typeof children === 'function') {
        return children(props);
      }

      return (0, _react.createElement)(tag, props, children);
    }
  }], [{
    key: 'contextTypes',
    value: {
      ariaManager: _react.PropTypes.object.isRequired
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: checkedProps,
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      tag: 'div'
    },
    enumerable: true
  }]);

  return AriaItem;
})(_react.Component);

exports['default'] = AriaItem;
module.exports = exports['default'];