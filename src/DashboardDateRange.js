import React from 'react'
import PropTypes from 'prop-types'
import DateTimeRangeSelector from './DateTimeRangeSelector'
import RefreshRateDropDown from './RefreshRateDropDown'

export default class DashboardDateRange extends React.Component {

  state = {
    range: null
  }

  static propTypes = {
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: null
  }

  handleRangeChange = (range) => {
    this.setState({range: range})
  }

  handleRefreshRateChange = (rate) => {
    clearInterval(this.timer)
    if (this.props.onChange && rate > 0) {
      // Set up the timer
      this.timer = setInterval(
        () => this.props.onChange(this.state.range),
        rate
      )
    }
  }

  render () {
    return (
      <div className='row'>
        <div className='col-sm-10'>
          <DateTimeRangeSelector onChange={this.handleRangeChange} />
        </div>
        <div className='col-sm-2'>
          <RefreshRateDropDown onChange={this.handleRefreshRateChange} />
        </div>
      </div>
    )
  }
}
