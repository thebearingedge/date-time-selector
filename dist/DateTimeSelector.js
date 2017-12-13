'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _reactstrap = require('reactstrap');

var _dateTimeParser = require('date-time-parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimeSelector = function (_React$Component) {
  _inherits(DateTimeSelector, _React$Component);

  function DateTimeSelector() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateTimeSelector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateTimeSelector.__proto__ || Object.getPrototypeOf(DateTimeSelector)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      moment: null,
      isValidDate: true,
      isCalendarVisible: false
    }, _this.hideCalendar = function () {
      if (_this.state.isCalendarVisible) {
        _this.setState({ isCalendarVisible: false });
      }
    }, _this.handleChange = function (e) {
      _this.update(e.target.value);
    }, _this.handleToggleCalendar = function () {
      _this.setState({ isCalendarVisible: !_this.state.isCalendarVisible });
    }, _this.handleCalendarSelection = function (mo) {
      _this.setState({ isCalendarVisible: false, isValid: mo }, function () {
        if (_this.props.onChange) {
          _this.props.onChange({ value: mo ? mo.format('L HH:mm:ss') : '', moment: mo });
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // componentDidMount () {
  //   document.body.addEventListener('click', this.hideCalendar)
  // }
  //
  // componentWillUnmount () {
  //   document.body.removeEventListener('click', this.hideCalendar)
  // }

  _createClass(DateTimeSelector, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.update(nextProps.value);
      }
    }
  }, {
    key: 'update',
    value: function update(input) {
      var mo = (0, _dateTimeParser.parseDateTime)(input);

      this.setState({ isValid: mo, moment: mo });

      if (this.props.onChange) {
        this.props.onChange({ value: input, moment: mo });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          isValid = _state.isValid,
          isCalendarVisible = _state.isCalendarVisible,
          moment = _state.moment;

      var _props = this.props,
          buttonClasses = _props.buttonClasses,
          inputClasses = _props.inputClasses,
          value = _props.value,
          rest = _objectWithoutProperties(_props, ['buttonClasses', 'inputClasses', 'value']);

      return _react2.default.createElement(
        'div',
        { className: 'position-relative' },
        _react2.default.createElement(
          _reactstrap.InputGroup,
          null,
          _react2.default.createElement(_reactstrap.Input, _extends({
            className: 'form-control ' + (isValid ? '' : 'text-danger') + ' ' + inputClasses,
            value: value,
            onChange: this.handleChange
          }, rest)),
          _react2.default.createElement(
            _reactstrap.InputGroupButton,
            null,
            _react2.default.createElement(
              _reactstrap.Button,
              {
                className: buttonClasses,
                onClick: this.handleToggleCalendar },
              _react2.default.createElement('i', { className: 'fa fa-calendar' })
            )
          )
        ),
        _react2.default.createElement(_Calendar2.default, { asDropDown: true, visible: isCalendarVisible, value: moment, onSubmit: this.handleCalendarSelection })
      );
    }
  }]);

  return DateTimeSelector;
}(_react2.default.Component);

DateTimeSelector.propTypes = {
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  buttonClasses: _propTypes2.default.string,
  inputClasses: _propTypes2.default.string
};
DateTimeSelector.defaultProps = {
  value: '',
  onChange: null,
  buttonClasses: '',
  inputClasses: '' };
exports.default = DateTimeSelector;