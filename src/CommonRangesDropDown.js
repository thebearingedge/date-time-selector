import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default class CommonRangesDropDown extends React.Component {

  state = {
    dropdownOpen: false,
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
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle><i className='fa fa-list' /></DropdownToggle>
        <DropdownMenu>
          {options.map(o => {
            return <DropdownItem onClick={this.handleClick} key={o.value} value={o.value}>{o.caption}</DropdownItem>
          })}
        </DropdownMenu>
      </Dropdown>
    )
  }
}
