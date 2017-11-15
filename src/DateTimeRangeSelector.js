import React from 'react'
import PropTypes from 'prop-types'
import DateTimeSelector from './DateTimeSelector'

export default class DateTimeRangeSelector extends React.Component {

  state = {
    from: null,
    to: null
  }

  static propTypes = {
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: null
  }

  handleFromDateSelected = (moment) => {
    this.setState({ from: moment },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state)
        }
      })
  }

  handleToDateSelected = (moment) => {
    this.setState({ to: moment },
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state)
        }
      })
  }

  render () {
    const {fromValue, toValue} = this.state

    return (
      <div>
        <div className='form-group'>
          <DateTimeSelector value={fromValue} placeholder='From...' onValidDateEntered={this.handleFromDateSelected} />
        </div>
        <div className='form-group'>
          <DateTimeSelector value={toValue} placeholder='To...' onValidDateEntered={this.handleToDateSelected} />
        </div>
      </div>
    )
  }
}
