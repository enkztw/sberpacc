import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Bank extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    const deposit = this.props.info.deposit;
    const color = `rgba(${this.props.info.color}, 1)`;
    return (
      <NavLink
        to={{
          pathname: `/calculator/${this.props.info.name}`
        }}
        style={{ textDecoration: 'none' }}
        className="bank"
        onClick={this.props.handler}>
        <img src={this.props.info.image} alt={`${this.props.info.name} логотип`} />
        <h1 style={{ borderColor: color }}>{this.props.info.name}</h1>
        <div className="info">
          <h2 style={{ color }}>{deposit.name}</h2>
          <b className="percent">{deposit.percents['360']}%</b>
          <span className="term">for 360 days</span>
        </div>
      </NavLink>
    )
  }
}
