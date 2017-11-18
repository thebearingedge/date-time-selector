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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      days: [],
      months: [],
      years: [],
      page: (0, _moment2.default)(),
      view: 'D',
      selection: null
    }, _this.updatePage = function (newPage, value, view) {
      var daysOfWeek = _moment2.default.weekdaysMin();
      daysOfWeek.push(daysOfWeek.shift()); // Monday 1st

      _this.setState({
        dow: daysOfWeek,
        days: _this.generateDays(newPage, value),
        months: _this.generateMonths(newPage, value),
        years: _this.generateYears(newPage, value),
        view: view,
        page: newPage,
        selection: value
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
      if (_this.state.selection) {
        _this.updatePage(_this.state.page, (0, _moment2.default)(_this.state.selection).set({ 'year': selection.m.year(), 'month': selection.m.month(), 'date': selection.m.date() }), _this.state.view);
      } else {
        _this.updatePage(_this.state.page, selection.m, _this.state.view);
      }
    }, _this.handleMonthSelected = function (selection) {
      _this.updatePage(selection.m, _this.state.selection, 'D');
    }, _this.handleYearSelected = function (selection) {
      _this.updatePage(selection.m, _this.state.selection, 'M');
    }, _this.handleSetTimeStartOfDay = function () {
      if (_this.state.selection) {
        _this.updatePage(_this.state.page, (0, _moment2.default)(_this.state.selection).startOf('day'), _this.state.view);
      }
    }, _this.handleSetTimeEndOfDay = function () {
      if (_this.state.selection) {
        _this.updatePage(_this.state.page, (0, _moment2.default)(_this.state.selection).set({ 'hour': 23, 'minute': 59, 'second': 59 }), _this.state.view);
      }
    }, _this.handleClickNow = function () {
      _this.updatePage((0, _moment2.default)(), (0, _moment2.default)(), _this.state.view);
    }, _this.handleClickClear = function () {
      _this.updatePage((0, _moment2.default)(), null, _this.state.view);
    }, _this.moveOn = function (goForward) {
      switch (_this.state.view) {
        case 'D':
          _this.updatePage((0, _moment2.default)(_this.state.page).add(goForward ? 1 : -1, 'month'), _this.state.selection, _this.state.view);
          break;
        case 'M':
          _this.updatePage((0, _moment2.default)(_this.state.page).add(goForward ? 1 : -1, 'year'), _this.state.selection, _this.state.view);
          break;
        case 'Y':
          _this.updatePage((0, _moment2.default)(_this.state.page).add(goForward ? 10 : -10, 'year'), _this.state.selection, _this.state.view);
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
        _this.setState({ selected: (0, _moment2.default)(_this.state.selection).hour(e.target.value) });
      }
    }, _this.handleUpdateMinute = function (e) {
      if (_this.parseTime(e.target.value, 59)) {
        _this.setState({ selected: (0, _moment2.default)(_this.state.selection).minute(e.target.value) });
      }
    }, _this.handleUpdateSecond = function (e) {
      if (_this.parseTime(e.target.value, 59)) {
        _this.setState({ selected: (0, _moment2.default)(_this.state.selection).second(e.target.value) });
      }
    }, _this.handleToggleView = function (view) {
      _this.setState({ view: view });
    }, _this.handleSubmit = function () {
      if (_this.props.onSubmit) {
        _this.props.onSubmit(_this.state.selection);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Calendar, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      this.setState({ selection: this.props.value }, function () {
        if (_this2.props.visible) {
          _this2.updatePage(_this2.state.selection ? _this2.state.selection : _this2.state.page, _this2.state.selection, 'D');
        }
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.state.selection) {
        this.setState({ selection: nextProps.value });
      }

      if (nextProps.visible !== this.props.visible) {
        if (nextProps.visible) {
          this.updatePage(this.state.selection ? this.state.selection : this.state.page, this.state.selection, 'D');
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          dow = _state.dow,
          view = _state.view,
          page = _state.page,
          days = _state.days,
          months = _state.months,
          years = _state.years,
          selection = _state.selection;
      var _props = this.props,
          asDropDown = _props.asDropDown,
          visible = _props.visible,
          format = _props.format,
          disableTime = _props.disableTime;


      var timeDisable = !selection;
      var formattedDate = selection ? selection.format(format) : '';

      var formattedTime = {
        hour: selection ? selection.format('HH') : 'HH',
        minute: selection ? selection.format('mm') : 'MM',
        second: selection ? selection.format('ss') : 'SS'
      };

      var css = !visible ? 'd-none ' : asDropDown ? ' position-absolute' : ' ';
      var styles = !asDropDown ? { width: '300px' } : { zIndex: 999, right: '0px', top: '40px', width: '300px' };

      return _react2.default.createElement(
        'div',
        { className: 'picker card ' + css, style: styles },
        _react2.default.createElement(
          'div',
          { className: 'card-header py-0 px-0 d-flex justify-content-between bg-secondary' },
          _react2.default.createElement(
            ButtonGroup,
            null,
            _react2.default.createElement(HeadButton, { onClick: function onClick() {
                return _this3.handleToggleView('M');
              }, text: page.format('MMMM') })
          ),
          _react2.default.createElement(
            ButtonGroup,
            null,
            _react2.default.createElement(HeadButton, { onClick: function onClick() {
                return _this3.handleToggleView('Y');
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
      );
    }
  }]);

  return Calendar;
}(_react2.default.Component);

Calendar.propTypes = {
  visible: _propTypes2.default.bool,
  value: _propTypes2.default.object, // a moment
  disableTime: _propTypes2.default.bool,
  format: _propTypes2.default.string,
  onSubmit: _propTypes2.default.func,
  asDropDown: _propTypes2.default.bool
};
Calendar.defaultProps = {
  visible: false,
  value: null,
  disableTime: false,
  format: 'L HH:mm:s',
  onSubmit: null,
  asDropDown: false
};
exports.default = Calendar;


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
  return _react2.default.createElement('input', _extends({ type: 'text', className: 'form-control form-control-sm w-25',
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
        return _react2.default.createElement(
          'div',
          { key: d, className: 'px-0 py-0 m-0 text-center', style: { width: '13%' } },
          _react2.default.createElement(
            'small',
            null,
            _react2.default.createElement(
              'strong',
              null,
              d
            )
          )
        );
      })
    )
  );
};

var Grid = function Grid(_ref4) {
  var data = _ref4.data,
      format = _ref4.format,
      onClick = _ref4.onClick,
      width = _ref4.width,
      children = _ref4.children;
  return _react2.default.createElement(
    'div',
    { className: 'card-body p-2' },
    children,
    data.map(function (d, i) {
      return _react2.default.createElement(GridRow, { key: i, dates: d, format: format, onClick: onClick, width: width });
    })
  );
};

var GridRow = function GridRow(_ref5) {
  var dates = _ref5.dates,
      format = _ref5.format,
      width = _ref5.width,
      onClick = _ref5.onClick;
  return _react2.default.createElement(
    Row,
    null,
    dates.map(function (d, i) {
      return _react2.default.createElement(GridButton, { key: d.m.unix(), date: d, format: format, onClick: onClick, width: width });
    })
  );
};

var GridButton = function GridButton(_ref6) {
  var date = _ref6.date,
      format = _ref6.format,
      disabled = _ref6.disabled,
      _onClick = _ref6.onClick,
      width = _ref6.width;

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

var Row = function Row(_ref7) {
  var children = _ref7.children;
  return _react2.default.createElement(
    'div',
    { className: 'mb-1 d-flex flex-nowrap justify-content-between align-items-center' },
    children
  );
};

var ButtonGroup = function ButtonGroup(_ref8) {
  var children = _ref8.children;
  return _react2.default.createElement(
    'div',
    { className: 'btn-group', role: 'group' },
    children
  );
};