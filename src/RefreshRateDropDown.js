import React from 'react'
import PropTypes from 'prop-types'
import DropDownSelect from './DropDownSelect'

export default class RefreshRateDropDown extends React.Component {

  state = {
    options: [
      { value: 0, caption: 'Off', selected: !false, color: 'warning' },
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

  handleChange = (value) => {
    const rate = parseInt(value)
    this.setState({
      options: this.state.options.map(d => {
        d.selected = d.value === rate
        return d
      })
    }, () => {
      if (this.props.onChange) {
        return this.props.onChange(rate)
      }
    })
  }

  render () {
    const { options } = this.state

    return (
      <DropDownSelect options={options} onChange={this.handleChange} />
    )
  }
}
