import React from 'react'
import PropTypes from 'prop-types'
import Calendar from './Calendar'
import { Button, InputGroup, InputGroupAddon, FormFeedback, Input } from 'reactstrap'
import { parseDateTime } from 'date-time-parser'

export default class DateTimeSelector extends React.Component {
  state = {
    moment: null,
    isValidDate: true,
    isCalendarVisible: false
  }

  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    buttonClasses: PropTypes.string,
    inputClasses: PropTypes.string
  }

  static defaultProps = {
    value: '',
    onChange: null,
    buttonClasses: '',
    inputClasses: ''
  }

  hideCalendar = () => {
    if (this.state.isCalendarVisible) {
      this.setState({ isCalendarVisible: false })
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps (nextProps) {
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
    const { isCalendarVisible, moment } = this.state
    const { buttonClasses, inputClasses, disableTime, error, value, ...props } = this.props

    return (
      <div className='position-relative'>
        <InputGroup>
          <Input
            value={value}
            invalid={!!error}
            onChange={this.handleChange}
            {...props} />
          {error && <FormFeedback tooltip>{error}</FormFeedback>}
          <InputGroupAddon addonType="append">
            <Button
              className={buttonClasses}
              onClick={this.handleToggleCalendar} >
              <i className='fa fa-calendar' />
            </Button>
          </InputGroupAddon>
        </InputGroup>
        <Calendar
          asDropDown
          value={moment}
          visible={isCalendarVisible}
          disableTime={disableTime}
          onSubmit={this.handleCalendarSelection} />
      </div>
    )
  }
}
