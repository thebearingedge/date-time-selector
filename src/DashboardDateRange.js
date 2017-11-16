import React from 'react'
import PropTypes from 'prop-types'
import DateTimeRangeSelector from './DateTimeRangeSelector'
import DropDownSelect from './DropDownSelect'

export default class DashboardDateRange extends React.Component {

  state = {
    range: null,
    options: [
      { value: 0, caption: 'off', selected: !false, color: 'danger' },
      { value: 5000, caption: '5s', selected: false, color: 'success' },
      { value: 10000, caption: '10s', selected: false, color: 'success' },
      { value: 30000, caption: '30s', selected: false, color: 'success' },
      { value: 60000, caption: '1m', selected: false, color: 'success' },
      { value: 300000, caption: '5m', selected: false, color: 'success' },
      { value: 900000, caption: '15m', selected: false, color: 'success' },
      { value: 1800000, caption: '30m', selected: false, color: 'success' },
      { value: 3600000, caption: '1h', selected: false, color: 'success' }
    ]
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
    this.setState({
      options: this.state.options.map(d => {
        d.selected = d.value === rate
        return d
      })
    }, () => {
      clearInterval(this.timer)
      if (this.props.onChange && rate > 0) {
        // Set up the timer
        this.timer = setInterval(
          () => this.props.onChange(this.state.range),
          rate
        )
      }
    })
  }

  render () {
    const { options } = this.state

    return (
      <div className='row'>
        <div className='col-sm-10'>
          <DateTimeRangeSelector onChange={this.handleRangeChange} />
        </div>
        <div className='col-sm-2'>
          <DropDownSelect options={options} onChange={this.handleRefreshRateChange} />
        </div>
      </div>
    )
  }
}
