import React from 'react';

export default class Bank extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const deposit = this.props.deposit;
    const color = `rgba(${this.props.color}, 1)`;
    return (
      <article className="bank" onClick={this.props.handler}>
        <img src={this.props.image} alt={`${this.props.name} логотип`} />
        <h1 style={{ borderColor: color }}>{this.props.name}</h1>
        <div className="info">
          <h2 style={{ color }}>{deposit.name}</h2>
          <b className="percent">{deposit.percents['360']}%</b>
          <span className="term">for 360 days</span>
        </div>
      </article>
    )
  }
}
