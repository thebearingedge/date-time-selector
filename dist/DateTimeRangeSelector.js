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
      from: { mo: null, text: '' },
      to: { mo: null, text: '' }
    }, _this.handleFromDateSelected = function (selected) {
      _this.setState({ from: selected }, function () {
        if (_this.props.onChange) {
          _this.props.onChange({ from: _this.state.from, to: _this.state.to });
        }
      });
    }, _this.handleToDateSelected = function (selected) {
      _this.setState({ to: selected }, function () {
        if (_this.props.onChange) {
          _this.props.onChange({ from: _this.state.from, to: _this.state.to });
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateTimeRangeSelector, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        from: { mo: null, text: this.props.from },
        to: { mo: null, text: this.props.to }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.from !== this.props.from || nextProps.to !== this.props.to) {
        this.setState({
          from: { mo: null, text: nextProps.from },
          to: { mo: null, text: nextProps.to }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          from = _state.from,
          to = _state.to;


      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(_DateTimeSelector2.default, {
            value: from ? from.text : '',
            placeholder: 'From...',
            onValidDateEntered: this.handleFromDateSelected })
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(_DateTimeSelector2.default, {
            value: to ? to.text : '',
            placeholder: 'To...',
            onValidDateEntered: this.handleToDateSelected })
        ),
        this.props.children
      );
    }
  }]);

  return DateTimeRangeSelector;
}(_react2.default.Component);

DateTimeRangeSelector.propTypes = {
  children: _propTypes2.default.node,
  onChange: _propTypes2.default.func,
  from: _propTypes2.default.string,
  to: _propTypes2.default.string
};
DateTimeRangeSelector.defaultProps = {
  children: [],
  onChange: null,
  from: '',
  to: ''
};
exports.default = DateTimeRangeSelector;