import React from 'react'
import PropTypes from 'prop-types'
import DropDownSelect from './DropDownSelect'

export default class CommonRangesDropDown extends React.Component {

  state = {
    options: [
       { value: 'today|now', caption: 'Today so far', selected: true, color: 'secondary' },
       { value: 'today|today+1d', caption: 'Today', selected: true, color: 'secondary' },
       { value: 'today-1d|today', caption: 'Yesterday', selected: true, color: 'secondary' }
    ]
  }

  static propTypes = {
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: null
  }

  handleChange = (value) => {
    this.setState({
      options: this.state.options.map(d => {
        d.selected = d.value === value
        return d
      })
    }, () => {
      if (this.props.onChange) {
        const split = value.split('|')
        return this.props.onChange(split[0], split[1])
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
