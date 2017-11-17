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

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.updateDate(nextProps.value)
    }
  }

  updateDate (input) {
    const mo = parseDateTime(input)

    this.setState({
      inputValue: input,
      isValidDate: mo !== null,
      calendarValue: mo
    }, () => {
      if (this.props.onValidDateEntered) {
        this.props.onValidDateEntered({ moment: mo, text: this.state.inputValue })
      }
    })
  }

  handleToggleVisibility = () => {
    this.setState({ showCalendar: !this.state.showCalendar })
  }

  handleTextboxChange = (e) => {
    this.updateDate(e.target.value)
  }

  handleCalendarSelection = (mo) => {
    this.setState({
      showCalendar: false,
      isValidDate: mo !== null,
      inputValue: mo ? mo.format(this.props.format) : ''
    }, () => {
      if (this.props.onValidDateEntered) {
        this.props.onValidDateEntered({ moment: mo, text: this.state.inputValue })
      }
    })
  }

  render () {
    const {isValidDate, showCalendar, calendarValue, inputValue} = this.state
    const {value, format, onValidDateEntered, ...inputProps} = this.props

    return (
      <div className='input-group'>
        <div className='input-group'>
          <input type='text' className={`form-control ${isValidDate ? '' : 'text-danger'}`} onChange={this.handleTextboxChange} value={inputValue} placeholder='Date/time...' {...inputProps} />
          <div className='input-group-btn'>
            <button onClick={this.handleToggleVisibility} type='button' className={`btn btn-secondary visible`}>
              <i className='fa fa-calendar' />
            </button>
          </div>
        </div>
        <Calendar asDropDown visible={showCalendar} value={calendarValue} onSubmit={this.handleCalendarSelection} />
      </div>
    )
  }
}
