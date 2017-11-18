import React from 'react'
import PropTypes from 'prop-types'
import Calendar from './Calendar'
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupButton, Input } from 'reactstrap'
import { parseDateTime } from 'date-time-parser'

export default class DateTimeSelector extends React.Component {

  state = {
    showCalendar: false,
    isValidDate: true,
    inputValue: '',
    calendarValue: null
  }

  static propTypes = {
    children: PropTypes.node,
    value: PropTypes.string,
    format: PropTypes.string,
    onDateChanged: PropTypes.func
  }

  static defaultProps = {
    children: [],
    value: '',
    format: 'L HH:mm:ss',
    onDateChanged: null
  }

  componentDidMount () {
    this.update(this.props.value, parseDateTime(this.props.value))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.update(nextProps.value, parseDateTime(nextProps.value))
    }
  }

  update (input, mo) {
    this.setState({
      inputValue: input,
      moment: mo,
      isValidDate: mo !== null,
      calendarValue: mo
    }, () => {
      if (this.props.onDateChanged) {
        this.props.onDateChanged({ moment: this.state.moment, text: this.state.inputValue })
      }
    })
  }

  handleToggleCalendar = () => {
    this.setState({ showCalendar: !this.state.showCalendar })
  }

  handleTextboxChange = (e) => {
    this.update(e.target.value, parseDateTime(e.target.value))
  }

  handleCalendarSelection = (mo) => {
    this.update(mo ? mo.format(this.props.format) : '', mo)
  }

  render () {
    const {isValidDate, showCalendar, calendarValue, inputValue} = this.state
    const {children, value, format, onValidDateEntered, ...inputProps} = this.props

    return (
      <div>
        <InputGroup>
          <Input
            className={`${isValidDate ? '' : 'text-danger'}`}
            value={inputValue}
            onChange={this.handleTextboxChange}
          />
          <InputGroupButton>
            <Button onClick={this.handleToggleCalendar} >
              <i className='fa fa-calendar' />
            </Button>
            <Calendar asDropDown visible={showCalendar} value={calendarValue} onSubmit={this.handleCalendarSelection} />
          </InputGroupButton>
        </InputGroup>
      </div>
    )
  }
}
