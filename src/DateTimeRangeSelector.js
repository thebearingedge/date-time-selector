import React from 'react'
import PropTypes from 'prop-types'
import DateTimeSelector from './DateTimeSelector'

export default class DateTimeRangeSelector extends React.Component {

  state = {
    isValidDate: true,
    isCalendarVisible: false
  }

  static propTypes = {
    children: PropTypes.node,
    from: PropTypes.string,
    to: PropTypes.string,
    onUpdated: PropTypes.func
  }

  static defaultProps = {
    children: [],
    from: '',
    to: '',
    onUpdated: null
  }

  handleUpdateFrom = (e) => {
    this.props.onUpdated({
      to: this.props.to,
      from: e.value
    })
  }

  handleUpdateTo = (e) => {
    this.props.onUpdated({
      from: this.props.from,
      to: e.value
    })
  }

  render () {
    return (
      <div className='form-row align-items-center'>
        <div className='col p-0'>
          <DateTimeSelector buttonClasses='rounded-0 border-right-0' value={this.props.from} onChange={this.handleUpdateFrom} />
        </div>
        <div className='col p-0'>
          <DateTimeSelector inputClasses='rounded-0' value={this.props.to} onChange={this.handleUpdateTo} />
        </div>
      </div>
    )
  }
}
