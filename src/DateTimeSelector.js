import React from 'react'
import PropTypes from 'prop-types'
import Calendar from './Calendar'
import { parseDateTime } from 'date-time-parser'

export default class DateTimeSelector extends React.Component {

  state = {
    showCalendar: false,
    isValidDate: true,
    inputValue: '',
    calendarValue: null
  }

  static propTypes = {
    value: PropTypes.string,
    format: PropTypes.string,
    onValidDateEntered: PropTypes.func
  }

  static defaultProps = {
    value: '',
    format: 'L HH:mm:ss',
    onValidDateEntered: null
  }

  componentDidMount () {
    const mo = parseDateTime(this.props.value)
    this.setState({
      inputValue: this.props.value,
      isValidDate: mo !== null,
      calendarValue: mo
    }, () => {
      if (this.props.onValidDateEntered) {
        this.props.onValidDateEntered(mo)
      }
    })
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

  handleToggleVisibility = () => {
    this.setState({ showCalendar: !this.state.showCalendar })
  }

  handleTextboxChange = (e) => {
    const mo = parseDateTime(e.target.value)
    this.setState({
      inputValue: e.target.value,
      isValidDate: mo !== null,
      calendarValue: mo
    }, () => {
      if (this.props.onValidDateEntered) {
        this.props.onValidDateEntered(mo)
      }
    })
  }

  handleCalendarSelection = (mo) => {
    this.setState({
      showCalendar: false,
      isValidDate: mo !== null,
      inputValue: mo ? mo.format(this.props.format) : ''
    }, () => {
      if (this.props.onValidDateEntered) {
        this.props.onValidDateEntered(mo)
      }
    })
  }

  render () {
    const {isValidDate, showCalendar, calendarValue, inputValue} = this.state

    return (
      <div className='input-group'>
        <div className='input-group'>
          <input type='text' className={`form-control ${isValidDate ? '' : 'text-danger'}`} onChange={this.handleTextboxChange} value={inputValue} placeholder='Date/time...' />
          <div className='input-group-btn'>
            <button onClick={this.handleToggleVisibility} type='button' className={`btn btn-secondary visible`}>
              <i className='fa fa-calendar' />
            </button>
          </div>
        </div>
        <Calendar visible={showCalendar} value={calendarValue} onSubmit={this.handleCalendarSelection} />
      </div>
    )
  }
}
