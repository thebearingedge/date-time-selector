'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DateTimeRangeSelector = require('./DateTimeRangeSelector');

var _DateTimeRangeSelector2 = _interopRequireDefault(_DateTimeRangeSelector);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MyDropDown = function (_React$Component) {
  _inherits(MyDropDown, _React$Component);

  function MyDropDown() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MyDropDown);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MyDropDown.__proto__ || Object.getPrototypeOf(MyDropDown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dropdownOpen: false
    }, _this.toggle = function () {
      _this.setState({
        dropdownOpen: !_this.state.dropdownOpen
      });
    }, _this.handleClick = function (e) {
      if (_this.props.onChange) {
        _this.props.onChange(parseInt(e.target.value));
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MyDropDown, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = this.props.options;

      var selected = options.find(function (option) {
        return option.selected;
      });

      return _react2.default.createElement(
        _reactstrap.Dropdown,
        { isOpen: this.state.dropdownOpen, toggle: this.toggle },
        _react2.default.createElement(
          _reactstrap.DropdownToggle,
          { color: selected.color },
          _react2.default.createElement('i', { className: 'fa fa-refresh' }),
          ' ',
          selected ? selected.caption : ''
        ),
        _react2.default.createElement(
          _reactstrap.DropdownMenu,
          null,
          options.map(function (o, i) {
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

  return MyDropDown;
}(_react2.default.Component);

MyDropDown.propTypes = {
  onChange: _propTypes2.default.func,
  options: _propTypes2.default.array
};
MyDropDown.defaultProps = {
  onChange: null,
  options: []
};

var Thing = function (_React$Component2) {
  _inherits(Thing, _React$Component2);

  function Thing() {
    var _ref2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, Thing);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = Thing.__proto__ || Object.getPrototypeOf(Thing)).call.apply(_ref2, [this].concat(args))), _this3), _this3.state = {
      range: null,
      options: [{ value: 0, caption: 'Off', selected: !false, color: 'warning' }, { value: 5000, caption: '5s', selected: false, color: 'success' }, { value: 10000, caption: '10s', selected: false, color: 'success' }, { value: 30000, caption: '30s', selected: false, color: 'success' }, { value: 60000, caption: '1m', selected: false, color: 'success' }, { value: 300000, caption: '5m', selected: false, color: 'success' }, { value: 900000, caption: '15m', selected: false, color: 'success' }, { value: 1800000, caption: '30m', selected: false, color: 'success' }, { value: 3600000, caption: '1h', selected: false, color: 'success' }]
    }, _this3.handleRangeChange = function (range) {
      _this3.setState({ range: range });
    }, _this3.handleRefreshRateChange = function (rate) {
      _this3.setState({
        options: _this3.state.options.map(function (d) {
          d.selected = d.value === rate;
          return d;
        })
      }, function () {
        clearInterval(_this3.timer);
        if (_this3.props.onChange && rate > 0) {
          // Set up the timer
          _this3.timer = setInterval(function () {
            return _this3.props.onChange(_this3.state.range);
          }, rate);
        }
      });
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(Thing, [{
    key: 'render',
    value: function render() {
      var options = this.state.options;


      return _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-sm-10' },
          _react2.default.createElement(_DateTimeRangeSelector2.default, { onChange: this.handleRangeChange })
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-sm-2' },
          _react2.default.createElement(MyDropDown, { options: options, onChange: this.handleRefreshRateChange })
        )
      );
    }
  }]);

  return Thing;
}(_react2.default.Component);

Thing.propTypes = {
  onChange: _propTypes2.default.func
};
Thing.defaultProps = {
  onChange: null
};
exports.default = Thing;