import React from 'react';

export default class Menu extends React.Component {
  render() {
    const items = this.props.items
    const color = this.props.color
    const name = this.props.name
    const handler = this.props.onMenuItemClick

    return (
      <ul style={{ borderColor: color }}>
        {items.map((item) =>
          <li style={{ borderColor: color }} key={item.value} onClick={handler.bind(this, name, item.value)}>{item.text}</li>
        )}
      </ul>
    )
  }
}