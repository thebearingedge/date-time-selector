import React from 'react'
import PropTypes from 'prop-types'
import DateTimeRangeSelector from './DateTimeRangeSelector'
import RefreshRateDropDown from './RefreshRateDropDown'
import CommonRangesDropDown from './CommonRangesDropDown'
import { parseDateTime } from 'date-time-parser'

export default class DashboardDateRange extends React.Component {

  state = {
    from: '',
    to: ''
  }

  static propTypes = {
    onRangeChange: PropTypes.func,
    from: PropTypes.string,
    to: PropTypes.string,
    rate: PropTypes.number
  }

  static defaultProps = {
    onChange: null,
    from: '',
    to: '',
    rate: 0
  }

  componentDidMount () {
    this.setState({
      from: this.props.from,
      to: this.props.to,
      rate: this.props.rate
    })
  }

  componentWillReceiveProps (nextProps) {
    // if (this.props.value !== nextProps.value) {
    //   this.updateDate(nextProps.value, 'componentWillReceiveProps')
    // }
  }

  handleRangeChange = (range) => {
    this.setState({range})
  }

  handleRefreshRateChange = (rate) => {
    clearInterval(this.timer)

    this.setState({rate: rate}, () => {
      if (this.props.onRangeChange && this.state.rate > 0) {
        this.timer = setInterval(
          () => {
            const { range: arg } = this.state
            if (arg) {
              if (arg.from && arg.from.mo) {
                arg.from.live = parseDateTime(arg.from.text)
              }

              if (arg.to && arg.to.mo) {
                arg.to.live = parseDateTime(arg.to.text)
              }
            }
            this.props.onRangeChange(arg)
          },
          this.state.rate
        )
      }
    })
  }

  handleCommonRangeSelected = (from, to) => {
    this.setState({
      from: from,
      to: to
    })
  }

  render () {
    const {from, to} = this.state

    return (
      <div className='row'>
        <div className='col-sm-10'>
          <DateTimeRangeSelector from={from} to={to} onChange={this.handleRangeChange} />
        </div>
        <div className='col-sm-2'>
          <RefreshRateDropDown onChange={this.handleRefreshRateChange} />
          <CommonRangesDropDown onChange={this.handleCommonRangeSelected} />
        </div>
      </div>
    )
  }
}
