'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _dateTimeParser = require('date-time-parser');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      showCalendar: false,
      isValidDate: true,
      inputValue: '',
      calendarValue: null
    }, _this.handleToggleVisibility = function () {
      _this.setState({ showCalendar: !_this.state.showCalendar });
    }, _this.handleTextboxChange = function (e) {
      var mo = (0, _dateTimeParser.parseDateTime)(e.target.value);
      _this.setState({
        inputValue: e.target.value,
        isValidDate: mo !== null,
        calendarValue: mo
      }, function () {
        if (_this.props.onValidDateEntered) {
          _this.props.onValidDateEntered(mo);
        }
      });
    }, _this.handleCalendarSelection = function (mo) {
      _this.setState({
        showCalendar: false,
        isValidDate: mo !== null,
        inputValue: mo ? mo.format(_this.props.format) : ''
      }, function () {
        if (_this.props.onValidDateEntered) {
          _this.props.onValidDateEntered(mo);
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateTimeSelector, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var mo = (0, _dateTimeParser.parseDateTime)(this.props.value);
      this.setState({
        inputValue: this.props.value,
        isValidDate: mo !== null,
        calendarValue: mo
      }, function () {
        if (_this2.props.onValidDateEntered) {
          _this2.props.onValidDateEntered(mo);
        }
      });
    }

    // componentWillReceiveProps (nextProps) {
    //   if (nextProps.value !== this.state.inputValue) {
    //     const mo = parseDateTime(nextProps.value)
    //     this.setState({
    //       inputValue: nextProps.value,
    //       isValidDate: mo !== null,
    //       calendarValue: mo
    //     }, () => {
    //       if (this.props.onValidDateEntered) {
    //         this.props.onValidDateEntered(mo)
    //       }
    //     })
    //   }
    // }

  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          isValidDate = _state.isValidDate,
          showCalendar = _state.showCalendar,
          calendarValue = _state.calendarValue,
          inputValue = _state.inputValue;


      return _react2.default.createElement(
        'div',
        { className: 'input-group' },
        _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement('input', { type: 'text', className: 'form-control ' + (isValidDate ? '' : 'text-danger'), onChange: this.handleTextboxChange, value: inputValue, placeholder: 'Date/time...' }),
          _react2.default.createElement(
            'div',
            { className: 'input-group-btn' },
            _react2.default.createElement(
              'button',
              { onClick: this.handleToggleVisibility, type: 'button', className: 'btn btn-secondary visible' },
              _react2.default.createElement('i', { className: 'fa fa-calendar' })
            )
          )
        ),
        _react2.default.createElement(_Calendar2.default, { visible: showCalendar, value: calendarValue, onSubmit: this.handleCalendarSelection })
      );
    }
  }]);

  return DateTimeSelector;
}(_react2.default.Component);

DateTimeSelector.propTypes = {
  value: _propTypes2.default.string,
  format: _propTypes2.default.string,
  onValidDateEntered: _propTypes2.default.func
};
DateTimeSelector.defaultProps = {
  value: '',
  format: 'L HH:mm:ss',
  onValidDateEntered: null
};
exports.default = DateTimeSelector;