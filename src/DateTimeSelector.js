import React from 'react'
import PropTypes from 'prop-types'
import Calendar from './Calendar'
import { Button, InputGroup, InputGroupButton, Input } from 'reactstrap'
import { parseDateTime } from 'date-time-parser'

export default class DateTimeSelector extends React.Component {

  state = {
    moment: null,
    isValidDate: true,
    isCalendarVisible: false
  }

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    value: '',
    onChange: null
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.update(nextProps.value)
    }
  }

  handleChange = (e) => {
    this.update(e.target.value)
  }

  update (input) {
    const mo = parseDateTime(input)

    this.setState({ isValid: mo, moment: mo })

    if (this.props.onChange) {
      this.props.onChange({value: input, moment: mo})
    }
  }

  handleToggleCalendar = () => {
    this.setState({ isCalendarVisible: !this.state.isCalendarVisible })
  }

  handleCalendarSelection = (mo) => {
    this.setState({ isCalendarVisible: false, isValid: mo }, () => {
      if (this.props.onChange) {
        this.props.onChange({value: mo ? mo.format('L HH:mm:ss') : '', moment: mo})
      }
    })
  }

  render () {
    const { isValid, isCalendarVisible, moment } = this.state
    const { value, ...rest } = this.props

    return (
      <div className='position-relative'>
        <InputGroup>
          <Input
            className={`${isValid ? '' : 'text-danger'}`}
            value={value}
            onChange={this.handleChange}
            {...rest} />
          <InputGroupButton>
            <Button onClick={this.handleToggleCalendar} >
              <i className='fa fa-calendar' />
            </Button>
          </InputGroupButton>
        </InputGroup>
        <Calendar asDropDown visible={isCalendarVisible} value={moment} onSubmit={this.handleCalendarSelection} />
      </div>
    )
  }
}
