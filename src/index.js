import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { parseDateTime } from 'date-time-parser'

export default class DateTimeSelector extends React.Component {

  state = {
    days: [],
    months: [],
    years: [],
    page: moment(),
    selected: null,
    submitted: null,
    view: 'D',
    visible: false,
    valid: true
  }

  static propTypes = {
    default: PropTypes.object,
    format: PropTypes.string,
    disableTime: PropTypes.boolen,
    onSelected: PropTypes.func
  }

  static defaultProps = {
    default: null,
    disableTime: false,
    format: 'L HH:mm:ss',
    onSelected: null
  }

  componentWillMount () {
    this.setState(
      {
        selected: this.props.default,
        submitted: this.props.default
      }
    )
  }

  updatePage = (newPage, selected, view) => {
    const daysOfWeek = moment.weekdaysMin()
    daysOfWeek.push(daysOfWeek.shift()) // Monday 1st

    this.setState({
      dow: daysOfWeek,
      days: this.generateDays(newPage, selected),
      months: this.generateMonths(newPage, selected),
      years: this.generateYears(newPage, selected),
      view: view,
      page: newPage,
      selected: selected
    })
  }

  gen = (mo, gridSize, rowSize, stepper, selected, formatString) => {
    const result = []
    const now = moment()
    for (let i = 0; i < gridSize; i++) {
      const nextDate = moment(mo).add(i, stepper)
      if (i % rowSize === 0) {
        result.push([])
      }

      result[result.length - 1].push({
        m: nextDate,
        selected: selected && (selected.format(formatString) === nextDate.format(formatString)),
        isToday: nextDate.format(formatString) === now.format(formatString)
      })
    }
    return result
  }

  generateDays = (page, selected) => {
    const startOfMonth = moment(page).startOf('month')
    const startFillCount = startOfMonth.day()
    startOfMonth.subtract(startFillCount !== 0 ? startFillCount - 1 : 6, 'days')

    const result = this.gen(startOfMonth, 42, 7, 'days', selected, 'dWWYY')

    return result.map((d, i) => {
      return d.map(inner => {
        inner.overflow = inner.m.month() !== page.month()
        return inner
      })
    })
  }

  generateMonths = (page, selected) => {
    const startOfYear = moment(page).startOf('year')
    return this.gen(startOfYear, 12, 4, 'month', selected, 'MMMYY')
  }

  generateYears = (page, selected) => {
    const startOfYear = moment(page).year((parseInt(page.year() / 10, 10) * 10) - 1).startOf('year')
    return this.gen(startOfYear, 16, 4, 'year', selected, 'YYYY')
  }

  handleDateSelected = (selection) => {
    if (this.state.selected) {
      this.updatePage(this.state.page, moment(this.state.selected).set({ 'year': selection.m.year(), 'month': selection.m.month(), 'date': selection.m.date() }), this.state.view)
    } else {
      this.updatePage(this.state.page, selection.m, this.state.view)
    }
  }

  handleMonthSelected = (selection) => {
    this.updatePage(selection.m, this.state.selected, 'D')
  }

  handleYearSelected = (selection) => {
    this.updatePage(selection.m, this.state.selected, 'M')
  }

  handleSetTimeStartOfDay = () => {
    if (this.state.selected) {
      this.updatePage(this.state.page, moment(this.state.selected).startOf('day'), this.state.view)
    }
  }

  handleSetTimeEndOfDay = () => {
    if (this.state.selected) {
      this.updatePage(this.state.page, moment(this.state.selected).set({ 'hour': 23, 'minute': 59, 'second': 59 }), this.state.view)
    }
  }

  handleClickNow = () => {
    this.updatePage(moment(), moment(), this.state.view)
  }

  handleClickClear = () => {
    this.updatePage(moment(), null, this.state.view)
  }

  moveOn = (goForward) => {
    switch (this.state.view) {
      case 'D':
        this.updatePage(moment(this.state.page).add(goForward ? 1 : -1, 'month'), this.state.selected, this.state.view)
        break
      case 'M':
        this.updatePage(moment(this.state.page).add(goForward ? 1 : -1, 'year'), this.state.selected, this.state.view)
        break
      case 'Y':
        this.updatePage(moment(this.state.page).add(goForward ? 10 : -10, 'year'), this.state.selected, this.state.view)
        break
      default:
        break
    }
  }

  handleClickPrevious = () => {
    this.moveOn(false)
  }

  handleClickNext = () => {
    this.moveOn(true)
  }

  parseTime = (value, max) => {
    const parsed = parseInt(value || '0', 10)
    return (parsed >= 0 && parsed <= max)
  }

  handleUpdateHour = (e) => {
    if (this.parseTime(e.target.value, 23)) {
      this.setState({ selected: moment(this.state.selected).hour(e.target.value) })
    }
  }

  handleUpdateMinute = (e) => {
    if (this.parseTime(e.target.value, 59)) {
      this.setState({ selected: moment(this.state.selected).minute(e.target.value) })
    }
  }

  handleUpdateSecond = (e) => {
    if (this.parseTime(e.target.value, 59)) {
      this.setState({ selected: moment(this.state.selected).second(e.target.value) })
    }
  }

  handleToggleView = (view) => {
    this.setState({ view: view })
  }

  handleToggleVisibility = () => {
    this.setState({ visible: !this.state.visible },
     () => {
       if (this.state.visible) {
         this.updatePage(this.state.selected ? this.state.selected : this.state.page, this.state.selected, 'D')
       }
     })
  }

  handleInputChange= (e) => {
    const mo = parseDateTime(e.target.value)

    this.setState({
      inputText: e.target.value,
      valid: mo || !e.target.value,
      selected: mo,
      submitted: mo
    },
    () => {
      if (this.props.onSelected) {
        this.props.onSelected(this.state.submitted)
      }
    })
  }

  handleSubmit = () => {
    this.setState({
      inputText: this.state.selected ? this.state.selected.format(this.props.format) : '',
      valid: true,
      submitted: this.state.selected,
      visible: false
    },
      () => {
        if (this.props.onSelected) {
          this.props.onSelected(this.state.submitted)
        }
      })
  }

  render () {
    const { inputText, valid, visible, dow, view, page, selected, days, months, years } = this.state
    const { format, disableTime, ...inputProps } = this.props

    const timeDisable = !selected
    const formattedDate = selected ? selected.format(format) : ''

    const formattedTime = {
      hour: selected ? selected.format('HH') : 'HH',
      minute: selected ? selected.format('mm') : 'MM',
      second: selected ? selected.format('ss') : 'SS'
    }

    return (
      <div className='input-group'>
        <div className='input-group'>
          <input type='text' className={`form-control ${valid ? '' : 'text-danger'}`} onChange={this.handleInputChange} value={inputText} placeholder='Pick a date...' {...inputProps} />
          <div className='input-group-btn'>
            <button onClick={this.handleToggleVisibility} type='button' className={`btn btn-secondary visible`}>
              <i className='fa fa-calendar' />
            </button>
          </div>
        </div>

        {visible && <div className='picker card position-absolute' style={{ zIndex: 999, right: '0px', top: '40px', width: '18em' }}>
          <div className='card-header py-0 px-0 d-flex justify-content-between bg-secondary'>
            <ButtonGroup>
              <HeadButton onClick={() => this.handleToggleView('M')} text={page.format('MMMM')} />
            </ButtonGroup>

            <ButtonGroup>
              <HeadButton onClick={() => this.handleToggleView('Y')} text={page.year()} />
              <HeadButton onClick={this.handleClickPrevious} icon='arrow-left' />
              <HeadButton onClick={this.handleClickNext} icon='arrow-right' />
            </ButtonGroup>
          </div>

          {view === 'D' && <DayGrid dow={dow} days={days} onClick={this.handleDateSelected} />}
          {view === 'M' && <Grid data={months} format='MMM' width={24} onClick={this.handleMonthSelected} />}
          {view === 'Y' && <Grid data={years} format='YYYY' width={24} onClick={this.handleYearSelected} />}

          {!disableTime &&
            <div className='card-footer py-2 d-flex justify-content-center align-items-center bg-light'>
              <button disabled={timeDisable} onClick={this.handleSetTimeStartOfDay} type='button' className='btn btn-sm btn-light'><i className='fa fa-step-backward text-secondary' /></button>
              <TimeInput disabled={timeDisable} onChange={this.handleUpdateHour} value={formattedTime.hour} max={23} placeholder='HH' />&nbsp;:&nbsp;
              <TimeInput disabled={timeDisable} onChange={this.handleUpdateMinute} value={formattedTime.minute} max={59} placeholder='MM' />&nbsp;:&nbsp;
              <TimeInput disabled={timeDisable} onChange={this.handleUpdateSecond} value={formattedTime.second} max={59} placeholder='SS' />
              <button disabled={timeDisable} onClick={this.handleSetTimeEndOfDay} type='button' className='btn btn-sm btn-light'><i className='fa fa-step-forward text-secondary' /></button>
            </div>
          }

          <div className='card-footer py-0 pr-0 d-flex justify-content-between align-items-center bg-light'>
            <p className='mb-0'><small><b>{formattedDate}</b></small></p>
            <ButtonGroup>
              <button onClick={this.handleClickClear} type='button' className='btn btn-sm btn-light' disabled={timeDisable}><i className='fa fa-trash-o text-primary' /></button>
              <button onClick={this.handleClickNow} type='button' className='btn btn-sm btn-light'><i className='fa fa-circle text-primary' /></button>
              <button onClick={this.handleSubmit} type='button' className='btn btn-sm btn-light'><i className='fa fa-check text-success' /></button>
            </ButtonGroup>
          </div>
        </div>
        }
      </div>
    )
  }
}

const HeadButton = ({ onClick, icon, text }) =>
  <button type='button' className='btn btn-sm btn-secondary' onClick={onClick}><i className={`fa fa-${icon}`} /> {text}</button>

const TimeInput = (props) => {
  return (
    <input type='text' className='form-control form-control-sm' style={{ width: '10%' }}
      onFocus={(e) => e.target.select()}
      {...props} />
  )
}

const DayGrid = ({ dow = [], days, onClick }) => (
  <Grid data={days} format='D' width={13} onClick={onClick}>
    <Row>
      {dow.map((d, i) => {
        return <DowCaption date={d} />
      })}
    </Row>
  </Grid>
)

const DowCaption = ({ date }) =>
  <div className='px-0 py-0 m-0 text-center' style={{ width: '13%' }}><strong>{date}</strong></div>

const Grid = ({ data, format, onClick, width, children }) => (
  <div className='card-body p-2'>
    {children}
    {data.map((d, i) => {
      return <GridRow dates={d} format={format} onClick={onClick} width={width} />
    })}
  </div>
)

const GridRow = ({ dates, format, width, onClick }) => (
  <Row>
    {dates.map(function (d, i) {
      return <GridButton date={d} format={format} onClick={onClick} width={width} />
    })}
  </Row>
)

const GridButton = ({ date, format, disabled, onClick, width }) => {
  let c = 'py-1 px-0 btn btn-sm text-center '

  if (disabled) {
    c += 'btn-secondary disabled'
  } else {
    if (date.selected) {
      c += 'btn-success'
    } else {
      c += (date.isToday) ? 'btn-outline-info ' : 'btn-light '

      if (date.overflow) {
        c += 'text-muted  '
      }
    }
  }

  return (
    <button type='button' onClick={() => onClick(date)} className={c} style={{ width: width + '%' }}>{date.m.format(format)}</button>
  )
}

const Row = ({ children }) =>
  <div className='mb-1 d-flex flex-nowrap justify-content-between align-items-center'>{children}</div>

const ButtonGroup = ({ children }) =>
  <div className='btn-group' role='group'>{children}</div>
