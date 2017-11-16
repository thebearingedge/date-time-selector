'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DropDownSelect = require('./DropDownSelect');

var _DropDownSelect2 = _interopRequireDefault(_DropDownSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DashboardDateRange = function (_React$Component) {
  _inherits(DashboardDateRange, _React$Component);

  function DashboardDateRange() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DashboardDateRange);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DashboardDateRange.__proto__ || Object.getPrototypeOf(DashboardDateRange)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      range: null,
      options: [{ value: 'today|now', caption: 'Today so far', selected: true, color: 'secondary' }, { value: 'today|today+1d', caption: 'Today', selected: true, color: 'secondary' }, { value: 'today-1d|today', caption: 'Yesterday', selected: true, color: 'secondary' }]
    }, _this.handleChange = function (range) {
      _this.setState({ range: range });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DashboardDateRange, [{
    key: 'render',
    value: function render() {
      var options = this.state.options;


      return _react2.default.createElement(_DropDownSelect2.default, { options: options, onChange: this.handleChange });
    }
  }]);

  return DashboardDateRange;
}(_react2.default.Component);

DashboardDateRange.propTypes = {
  onChange: _propTypes2.default.func
};
DashboardDateRange.defaultProps = {
  onChange: null
};
exports.default = DashboardDateRange;