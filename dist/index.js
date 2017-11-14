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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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
      days: [],
      months: [],
      years: [],
      page: (0, _moment2.default)(),
      selected: null,
      submitted: null,
      view: 'D',
      visible: false,
      valid: true
    }, _this.updatePage = function (newPage, selected, view) {
      var daysOfWeek = _moment2.default.weekdaysMin();
      daysOfWeek.push(daysOfWeek.shift()); // Monday 1st

      _this.setState({
        dow: daysOfWeek,
        days: _this.generateDays(newPage, selected),
        months: _this.generateMonths(newPage, selected),
        years: _this.generateYears(newPage, selected),
        view: view,
        page: newPage,
        selected: selected
      });
    }, _this.gen = function (mo, gridSize, rowSize, stepper, selected, formatString) {
      var result = [];
      var now = (0, _moment2.default)();
      for (var i = 0; i < gridSize; i++) {
        var nextDate = (0, _moment2.default)(mo).add(i, stepper);
        if (i % rowSize === 0) {
          result.push([]);
        }

        result[result.length - 1].push({
          m: nextDate,
          selected: selected && selected.format(formatString) === nextDate.format(formatString),
          isToday: nextDate.format(formatString) === now.format(formatString)
        });
      }
      return result;
    }, _this.generateDays = function (page, selected) {
      var startOfMonth = (0, _moment2.default)(page).startOf('month');
      var startFillCount = startOfMonth.day();
      startOfMonth.subtract(startFillCount !== 0 ? startFillCount - 1 : 6, 'days');

      var result = _this.gen(startOfMonth, 42, 7, 'days', selected, 'dWWYY');

      return result.map(function (d, i) {
        return d.map(function (inner) {
          inner.overflow = inner.m.month() !== page.month();
          return inner;
        });
      });
    }, _this.generateMonths = function (page, selected) {
      var startOfYear = (0, _moment2.default)(page).startOf('year');
      return _this.gen(startOfYear, 12, 4, 'month', selected, 'MMMYY');
    }, _this.generateYears = function (page, selected) {
      var startOfYear = (0, _moment2.default)(page).year(parseInt(page.year() / 10, 10) * 10 - 1).startOf('year');
      return _this.gen(startOfYear, 16, 4, 'year', selected, 'YYYY');
    }, _this.handleDateSelected = function (selection) {
      if (_this.state.selected) {
        _this.updatePage(_this.state.page, (0, _moment2.default)(_this.state.selected).set({ 'year': selection.m.year(), 'month': selection.m.month(), 'date': selection.m.date() }), _this.state.view);
      } else {
        _this.updatePage(_this.state.page, selection.m, _this.state.view);
      }
    }, _this.handleMonthSelected = function (selection) {
      _this.updatePage(selection.m, _this.state.selected, 'D');
    }, _this.handleYearSelected = function (selection) {
      _this.updatePage(selection.m, _this.state.selected, 'M');
    }, _this.handleSetTimeStartOfDay = function () {
      if (_this.state.selected) {
        _this.updatePage(_this.state.page, (0, _moment2.default)(_this.state.selected).startOf('day'), _this.state.view);
      }
    }, _this.handleSetTimeEndOfDay = function () {
      if (_this.state.selected) {
        _this.updatePage(_this.state.page, (0, _moment2.default)(_this.state.selected).set({ 'hour': 23, 'minute': 59, 'second': 59 }), _this.state.view);
      }
    }, _this.handleClickNow = function () {
      _this.updatePage((0, _moment2.default)(), (0, _moment2.default)(), _this.state.view);
    }, _this.handleClickClear = function () {
      _this.updatePage((0, _moment2.default)(), null, _this.state.view);
    }, _this.moveOn = function (goForward) {
      switch (_this.state.view) {
        case 'D':
          _this.updatePage((0, _moment2.default)(_this.state.page).add(goForward ? 1 : -1, 'month'), _this.state.selected, _this.state.view);
          break;
        case 'M':
          _this.updatePage((0, _moment2.default)(_this.state.page).add(goForward ? 1 : -1, 'year'), _this.state.selected, _this.state.view);
          break;
        case 'Y':
          _this.updatePage((0, _moment2.default)(_this.state.page).add(goForward ? 10 : -10, 'year'), _this.state.selected, _this.state.view);
          break;
        default:
          break;
      }
    }, _this.handleClickPrevious = function () {
      _this.moveOn(false);
    }, _this.handleClickNext = function () {
      _this.moveOn(true);
    }, _this.parseTime = function (value, max) {
      var parsed = parseInt(value || '0', 10);
      return parsed >= 0 && parsed <= max;
    }, _this.handleUpdateHour = function (e) {
      if (_this.parseTime(e.target.value, 23)) {
        _this.setState({ selected: (0, _moment2.default)(_this.state.selected).hour(e.target.value) });
      }
    }, _this.handleUpdateMinute = function (e) {
      if (_this.parseTime(e.target.value, 59)) {
        _this.setState({ selected: (0, _moment2.default)(_this.state.selected).minute(e.target.value) });
      }
    }, _this.handleUpdateSecond = function (e) {
      if (_this.parseTime(e.target.value, 59)) {
        _this.setState({ selected: (0, _moment2.default)(_this.state.selected).second(e.target.value) });
      }
    }, _this.handleToggleView = function (view) {
      _this.setState({ view: view });
    }, _this.handleToggleVisibility = function () {
      _this.setState({ visible: !_this.state.visible }, function () {
        if (_this.state.visible) {
          _this.updatePage(_this.state.selected ? _this.state.selected : _this.state.page, _this.state.selected, 'D');
        }
      });
    }, _this.handleInputChange = function (e) {
      var mo = (0, _dateTimeParser.parseDateTime)(e.target.value);

      _this.setState({
        inputText: e.target.value,
        valid: mo || !e.target.value,
        selected: mo,
        submitted: mo
      }, function () {
        if (_this.props.onSelected) {
          _this.props.onSelected(_this.state.submitted);
        }
      });
    }, _this.handleSubmit = function () {
      _this.setState({
        inputText: _this.state.selected ? _this.state.selected.format(_this.props.format) : '',
        valid: true,
        submitted: _this.state.selected,
        visible: false
      }, function () {
        if (_this.props.onSelected) {
          _this.props.onSelected(_this.state.submitted);
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateTimeSelector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        selected: this.props.default,
        submitted: this.props.default
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          inputText = _state.inputText,
          valid = _state.valid,
          visible = _state.visible,
          dow = _state.dow,
          view = _state.view,
          page = _state.page,
          selected = _state.selected,
          days = _state.days,
          months = _state.months,
          years = _state.years;

      var _props = this.props,
          format = _props.format,
          disableTime = _props.disableTime,
          inputProps = _objectWithoutProperties(_props, ['format', 'disableTime']);

      var timeDisable = !selected;
      var formattedDate = selected ? selected.format(format) : '';

      var formattedTime = {
        hour: selected ? selected.format('HH') : 'HH',
        minute: selected ? selected.format('mm') : 'MM',
        second: selected ? selected.format('ss') : 'SS'
      };

      return _react2.default.createElement(
        'div',
        { className: 'input-group' },
        _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement('input', _extends({ type: 'text', className: 'form-control ' + (valid ? '' : 'text-danger'), onChange: this.handleInputChange, value: inputText, placeholder: 'Pick a date...' }, inputProps)),
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
        visible && _react2.default.createElement(
          'div',
          { className: 'picker card position-absolute', style: { zIndex: 999, right: '0px', top: '40px', width: '18em' } },
          _react2.default.createElement(
            'div',
            { className: 'card-header py-0 px-0 d-flex justify-content-between bg-secondary' },
            _react2.default.createElement(
              ButtonGroup,
              null,
              _react2.default.createElement(HeadButton, { onClick: function onClick() {
                  return _this2.handleToggleView('M');
                }, text: page.format('MMMM') })
            ),
            _react2.default.createElement(
              ButtonGroup,
              null,
              _react2.default.createElement(HeadButton, { onClick: function onClick() {
                  return _this2.handleToggleView('Y');
                }, text: page.year() }),
              _react2.default.createElement(HeadButton, { onClick: this.handleClickPrevious, icon: 'arrow-left' }),
              _react2.default.createElement(HeadButton, { onClick: this.handleClickNext, icon: 'arrow-right' })
            )
          ),
          view === 'D' && _react2.default.createElement(DayGrid, { dow: dow, days: days, onClick: this.handleDateSelected }),
          view === 'M' && _react2.default.createElement(Grid, { data: months, format: 'MMM', width: 24, onClick: this.handleMonthSelected }),
          view === 'Y' && _react2.default.createElement(Grid, { data: years, format: 'YYYY', width: 24, onClick: this.handleYearSelected }),
          !disableTime && _react2.default.createElement(
            'div',
            { className: 'card-footer py-2 d-flex justify-content-center align-items-center bg-light' },
            _react2.default.createElement(
              'button',
              { disabled: timeDisable, onClick: this.handleSetTimeStartOfDay, type: 'button', className: 'btn btn-sm btn-light' },
              _react2.default.createElement('i', { className: 'fa fa-step-backward text-secondary' })
            ),
            _react2.default.createElement(TimeInput, { disabled: timeDisable, onChange: this.handleUpdateHour, value: formattedTime.hour, max: 23, placeholder: 'HH' }),
            '\xA0:\xA0',
            _react2.default.createElement(TimeInput, { disabled: timeDisable, onChange: this.handleUpdateMinute, value: formattedTime.minute, max: 59, placeholder: 'MM' }),
            '\xA0:\xA0',
            _react2.default.createElement(TimeInput, { disabled: timeDisable, onChange: this.handleUpdateSecond, value: formattedTime.second, max: 59, placeholder: 'SS' }),
            _react2.default.createElement(
              'button',
              { disabled: timeDisable, onClick: this.handleSetTimeEndOfDay, type: 'button', className: 'btn btn-sm btn-light' },
              _react2.default.createElement('i', { className: 'fa fa-step-forward text-secondary' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'card-footer py-0 pr-0 d-flex justify-content-between align-items-center bg-light' },
            _react2.default.createElement(
              'p',
              { className: 'mb-0' },
              _react2.default.createElement(
                'small',
                null,
                _react2.default.createElement(
                  'b',
                  null,
                  formattedDate
                )
              )
            ),
            _react2.default.createElement(
              ButtonGroup,
              null,
              _react2.default.createElement(
                'button',
                { onClick: this.handleClickClear, type: 'button', className: 'btn btn-sm btn-light', disabled: timeDisable },
                _react2.default.createElement('i', { className: 'fa fa-trash-o text-primary' })
              ),
              _react2.default.createElement(
                'button',
                { onClick: this.handleClickNow, type: 'button', className: 'btn btn-sm btn-light' },
                _react2.default.createElement('i', { className: 'fa fa-circle text-primary' })
              ),
              _react2.default.createElement(
                'button',
                { onClick: this.handleSubmit, type: 'button', className: 'btn btn-sm btn-light' },
                _react2.default.createElement('i', { className: 'fa fa-check text-success' })
              )
            )
          )
        )
      );
    }
  }]);

  return DateTimeSelector;
}(_react2.default.Component);

DateTimeSelector.propTypes = {
  default: _propTypes2.default.object,
  format: _propTypes2.default.string,
  disableTime: _propTypes2.default.boolen,
  onSelected: _propTypes2.default.func
};
DateTimeSelector.defaultProps = {
  default: null,
  disableTime: false,
  format: 'L HH:mm:ss',
  onSelected: null
};
exports.default = DateTimeSelector;


var HeadButton = function HeadButton(_ref2) {
  var onClick = _ref2.onClick,
      icon = _ref2.icon,
      text = _ref2.text;
  return _react2.default.createElement(
    'button',
    { type: 'button', className: 'btn btn-sm btn-secondary', onClick: onClick },
    _react2.default.createElement('i', { className: 'fa fa-' + icon }),
    ' ',
    text
  );
};

var TimeInput = function TimeInput(props) {
  return _react2.default.createElement('input', _extends({ type: 'text', className: 'form-control form-control-sm', style: { width: '10%' },
    onFocus: function onFocus(e) {
      return e.target.select();
    }
  }, props));
};

var DayGrid = function DayGrid(_ref3) {
  var _ref3$dow = _ref3.dow,
      dow = _ref3$dow === undefined ? [] : _ref3$dow,
      days = _ref3.days,
      onClick = _ref3.onClick;
  return _react2.default.createElement(
    Grid,
    { data: days, format: 'D', width: 13, onClick: onClick },
    _react2.default.createElement(
      Row,
      null,
      dow.map(function (d, i) {
        return _react2.default.createElement(DowCaption, { date: d });
      })
    )
  );
};

var DowCaption = function DowCaption(_ref4) {
  var date = _ref4.date;
  return _react2.default.createElement(
    'div',
    { className: 'px-0 py-0 m-0 text-center', style: { width: '13%' } },
    _react2.default.createElement(
      'strong',
      null,
      date
    )
  );
};

var Grid = function Grid(_ref5) {
  var data = _ref5.data,
      format = _ref5.format,
      onClick = _ref5.onClick,
      width = _ref5.width,
      children = _ref5.children;
  return _react2.default.createElement(
    'div',
    { className: 'card-body p-2' },
    children,
    data.map(function (d, i) {
      return _react2.default.createElement(GridRow, { dates: d, format: format, onClick: onClick, width: width });
    })
  );
};

var GridRow = function GridRow(_ref6) {
  var dates = _ref6.dates,
      format = _ref6.format,
      width = _ref6.width,
      onClick = _ref6.onClick;
  return _react2.default.createElement(
    Row,
    null,
    dates.map(function (d, i) {
      return _react2.default.createElement(GridButton, { date: d, format: format, onClick: onClick, width: width });
    })
  );
};

var GridButton = function GridButton(_ref7) {
  var date = _ref7.date,
      format = _ref7.format,
      disabled = _ref7.disabled,
      _onClick = _ref7.onClick,
      width = _ref7.width;

  var c = 'py-1 px-0 btn btn-sm text-center ';

  if (disabled) {
    c += 'btn-secondary disabled';
  } else {
    if (date.selected) {
      c += 'btn-success';
    } else {
      c += date.isToday ? 'btn-outline-info ' : 'btn-light ';

      if (date.overflow) {
        c += 'text-muted  ';
      }
    }
  }

  return _react2.default.createElement(
    'button',
    { type: 'button', onClick: function onClick() {
        return _onClick(date);
      }, className: c, style: { width: width + '%' } },
    date.m.format(format)
  );
};

var Row = function Row(_ref8) {
  var children = _ref8.children;
  return _react2.default.createElement(
    'div',
    { className: 'mb-1 d-flex flex-nowrap justify-content-between align-items-center' },
    children
  );
};

var ButtonGroup = function ButtonGroup(_ref9) {
  var children = _ref9.children;
  return _react2.default.createElement(
    'div',
    { className: 'btn-group', role: 'group' },
    children
  );
};