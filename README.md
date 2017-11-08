# date-time-selector

A(nother) date time selector.

This one...

- Is a React Component.
- Makes use of out-of-the-box Bootstrap 4 css classes for styling.
- Uses icons from [fontawesome](http://fontawesome.io/icons/ "Font Awesome Homepage")

All internal date manipulation is achieved using [Moment.js](https://momentjs.com/docs/#/parsing/ "Moment.js Homepage")

The component renders an [input-group](https://getbootstrap.com/docs/4.0/components/input-group/)

## Getting Started
### Install

#### npm
`npm add date-time-selector`

#### yarn
`yarn add date-time-selector`

## Usage


### Import

`import DateTimeSelector from 'date-time-selector'`

### JSX

`<DateTimeSelector> `

`<DateTimeSelector onSelected={this.handleSelected} disableTime={true} format='L' default={moment()} />`

## Props

| Prop | Type | Required | Description | Default |
| :--- | :--- | :---: | :--- | :--- |
| [`default`](#defaultProp) | Object | | A moment.js object.  This will be the default value selected in the selector |  |
| [`onSelected`](#onSelectedProp) | Function | | Will be when a date is submitted | |
| [`format`](#formatProp) | String | | [moment.js format string](https://momentjs.com/docs/#/displaying/format/). | 'L LTS' |
| [`disableTime`](#disableTimeProp) | Boolean | | Set it to `true` if you'd like to hide the time inputs. | false |
