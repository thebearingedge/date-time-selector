import React from 'react'
import PropTypes from 'prop-types'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default class CommonRangesDropDown extends React.Component {

  state = {
    dropdownOpen: false,
    options: [
      { value: 'today-2d|today', caption: 'Last 2 days', selected: true, color: 'secondary' },
      { value: 'today-7d|today', caption: 'Last 7 days', selected: true, color: 'secondary' },
      { value: 'today-90d|today', caption: 'Last 90 days', selected: true, color: 'secondary' },
      { value: 'today-30d|today', caption: 'Last 30 days', selected: true, color: 'secondary' },
      { value: 'today-6M|today', caption: 'Last 6 months', selected: true, color: 'secondary' },
      { value: 'today-1y|today', caption: 'Last 1 year', selected: true, color: 'secondary' },
      { value: 'today-2y|today', caption: 'Last 2 years', selected: true, color: 'secondary' },
      { value: 'today-5y|today', caption: 'Last 5 years', selected: true, color: 'secondary' },
      { value: 'today-1d|today', caption: 'Yesterday', selected: true, color: 'secondary' },
      { value: 'today-2d|today-1d', caption: 'Day before yesterday', selected: true, color: 'secondary' },
      { value: 'today-8d|today-7d', caption: 'This day last week', selected: true, color: 'secondary' },
      { value: 'week-1w|week', caption: 'Previous week', selected: true, color: 'secondary' },
      { value: 'month-1M|month', caption: 'Previous month', selected: true, color: 'secondary' },
      { value: 'year-1y|year', caption: 'Previous year', selected: true, color: 'secondary' },
      { value: 'today|today+1d', caption: 'Today', selected: true, color: 'secondary' },
      { value: 'today|now', caption: 'Today so far', selected: true, color: 'secondary' },
      { value: 'week|week+1w', caption: 'This week', selected: true, color: 'secondary' },
      { value: 'week|now', caption: 'This week so far', selected: true, color: 'secondary' },
      { value: 'month|month+1M', caption: 'This month', selected: true, color: 'secondary' },
      { value: 'month|now', caption: 'This month so far', selected: true, color: 'secondary' },
      { value: 'year|year+1y', caption: 'This year', selected: true, color: 'secondary' },
      { value: 'year|now', caption: 'This year so far', selected: true, color: 'secondary' },
      { value: 'now-5m|now', caption: 'Last 5 minutes', selected: true, color: 'secondary' },
      { value: 'now-15m|now', caption: 'Last 15 minutes', selected: true, color: 'secondary' },
      { value: 'now-30m|now', caption: 'Last 30 minutes', selected: true, color: 'secondary' },
      { value: 'now-1h|now', caption: 'Last 1 hour', selected: true, color: 'secondary' },
      { value: 'now-3h|now', caption: 'Last 3 hours', selected: true, color: 'secondary' },
      { value: 'now-6h|now', caption: 'Last 6 hours', selected: true, color: 'secondary' },
      { value: 'now-12h|now', caption: 'Last 12 hours', selected: true, color: 'secondary' },
      { value: 'now-24h|now', caption: 'Last 24 hours', selected: true, color: 'secondary' }
    ]
  }

  static propTypes = {
    onChange: PropTypes.func
  }

  static defaultProps = {
    onChange: null,
    options: []
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  handleClick = (e) => {
    const value = e.target.value

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
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret><i className='fa fa-list' /></DropdownToggle>
        <DropdownMenu right>
          {options.map(o => {
            return <DropdownItem onClick={this.handleClick} key={o.value} value={o.value}>{o.caption}</DropdownItem>
          })}
        </DropdownMenu>
      </ButtonDropdown>
    )
  }
}
