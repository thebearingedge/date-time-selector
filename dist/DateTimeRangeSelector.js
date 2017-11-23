'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DateTimeSelector = require('./DateTimeSelector');

var _DateTimeSelector2 = _interopRequireDefault(_DateTimeSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimeRangeSelector = function (_React$Component) {
  _inherits(DateTimeRangeSelector, _React$Component);

  function DateTimeRangeSelector() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateTimeRangeSelector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateTimeRangeSelector.__proto__ || Object.getPrototypeOf(DateTimeRangeSelector)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isValidDate: true,
      isCalendarVisible: false
    }, _this.handleUpdateFrom = function (e) {
      _this.props.onUpdated({
        to: _this.props.to,
        from: e.value
      });
    }, _this.handleUpdateTo = function (e) {
      _this.props.onUpdated({
        from: _this.props.from,
        to: e.value
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateTimeRangeSelector, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'form-row align-items-center' },
        _react2.default.createElement(
          'div',
          { className: 'col p-0' },
          _react2.default.createElement(_DateTimeSelector2.default, { buttonClasses: 'rounded-0 border-right-0', value: this.props.from, onChange: this.handleUpdateFrom })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col p-0' },
          _react2.default.createElement(_DateTimeSelector2.default, { inputClasses: 'rounded-0', value: this.props.to, onChange: this.handleUpdateTo })
        )
      );
    }
  }]);

  return DateTimeRangeSelector;
}(_react2.default.Component);

DateTimeRangeSelector.propTypes = {
  children: _propTypes2.default.node,
  from: _propTypes2.default.string,
  to: _propTypes2.default.string,
  onUpdated: _propTypes2.default.func
};
DateTimeRangeSelector.defaultProps = {
  children: [],
  from: '',
  to: '',
  onUpdated: null
};
exports.default = DateTimeRangeSelector;