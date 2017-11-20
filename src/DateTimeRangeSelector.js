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
      <div className='container'>
        <div className='form-group'>
          <DateTimeSelector value={this.props.from} onChange={this.handleUpdateFrom} />
        </div>
        <div className='form-group'>
          <DateTimeSelector value={this.props.to} onChange={this.handleUpdateTo} />
        </div>
        {this.props.children}
      </div>
    )
  }
}
