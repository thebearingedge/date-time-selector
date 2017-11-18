'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CommonRangesDropDown = function (_React$Component) {
  _inherits(CommonRangesDropDown, _React$Component);

  function CommonRangesDropDown() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, CommonRangesDropDown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = CommonRangesDropDown.__proto__ || Object.getPrototypeOf(CommonRangesDropDown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dropdownOpen: false,
      options: [{ value: 'today-2d|today', caption: 'Last 2 days', selected: true, color: 'secondary' }, { value: 'today-7d|today', caption: 'Last 7 days', selected: true, color: 'secondary' }, { value: 'today-90d|today', caption: 'Last 90 days', selected: true, color: 'secondary' }, { value: 'today-30d|today', caption: 'Last 30 days', selected: true, color: 'secondary' }, { value: 'today-6M|today', caption: 'Last 6 months', selected: true, color: 'secondary' }, { value: 'today-1y|today', caption: 'Last 1 year', selected: true, color: 'secondary' }, { value: 'today-2y|today', caption: 'Last 2 years', selected: true, color: 'secondary' }, { value: 'today-5y|today', caption: 'Last 5 years', selected: true, color: 'secondary' }, { value: 'today-1d|today', caption: 'Yesterday', selected: true, color: 'secondary' }, { value: 'today-2d|today-1d', caption: 'Day before yesterday', selected: true, color: 'secondary' }, { value: 'today-8d|today-7d', caption: 'This day last week', selected: true, color: 'secondary' }]
    }, _this.toggle = function () {
      _this.setState({
        dropdownOpen: !_this.state.dropdownOpen
      });
    }, _this.handleClick = function (e) {
      var value = e.target.value;

      _this.setState({
        options: _this.state.options.map(function (d) {
          d.selected = d.value === value;
          return d;
        })
      }, function () {
        if (_this.props.onChange) {
          var split = value.split('|');
          return _this.props.onChange(split[0], split[1]);
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CommonRangesDropDown, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = this.state.options;


      return _react2.default.createElement(
        _reactstrap.ButtonDropdown,
        { isOpen: this.state.dropdownOpen, toggle: this.toggle },
        _react2.default.createElement(
          _reactstrap.DropdownToggle,
          { caret: true },
          _react2.default.createElement('i', { className: 'fa fa-list' })
        ),
        _react2.default.createElement(
          _reactstrap.DropdownMenu,
          { right: true },
          options.map(function (o) {
            return _react2.default.createElement(
              _reactstrap.DropdownItem,
              { onClick: _this2.handleClick, key: o.value, value: o.value },
              o.caption
            );
          })
        )
      );
    }
  }]);

  return CommonRangesDropDown;
}(_react2.default.Component);

CommonRangesDropDown.propTypes = {
  onChange: _propTypes2.default.func
};
CommonRangesDropDown.defaultProps = {
  onChange: null,
  options: []
};
exports.default = CommonRangesDropDown;