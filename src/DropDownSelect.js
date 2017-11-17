import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default class DropDownSelect extends React.Component {

  state = {
    dropdownOpen: false
  }

  static propTypes = {
    block: PropTypes.bool,
    icon: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array
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
    if (this.props.onChange) {
      this.props.onChange(e.target.value)
    }
  }

  render () {
    const { options, block } = this.props
    const selected = options.find(option => option.selected)

    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle block={block} color={selected.color}><i className='fa fa-refresh' /> {selected ? selected.caption : ''}</DropdownToggle>
        <DropdownMenu>
          {options.map(o => {
            return <DropdownItem onClick={this.handleClick} key={o.value} value={o.value}>{o.caption}</DropdownItem>
          })}
        </DropdownMenu>
      </Dropdown>
    )
  }
}
