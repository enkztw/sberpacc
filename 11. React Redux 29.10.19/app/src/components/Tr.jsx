import React from "react";

const STATUS = {
  HOVERED: "hovered",
  NORMAL: "normal"
};

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      class: STATUS.NORMAL
    };
  }

  _onMouseEnter = () => {
    this.setState({ class: STATUS.HOVERED });
  }

  _onMouseLeave = () => {
    this.setState({ class: STATUS.NORMAL });
  }

  render() {
    return (
      <tr
        className={this.state.class}
        style={{ backgroundColor: this.props.color }}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
      >
        {Object.values(this.props.data).map((item, index) => (
          <td key={index}>{item}</td>
        ))}
      </tr>
    );
  }
}
