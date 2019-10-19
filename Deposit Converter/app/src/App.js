import React from 'react';
import './App.css';
import banks from './data';


class Bank extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }


  render() {
    const deposit = this.props.deposit;
    return (
      <article className="bank" onClick={this.props.handler}>
        <img src={this.props.image} alt={`${this.props.name} логотип`}/>
        <h1 style={{borderColor: this.props.color}}>{this.props.name}</h1>
        <div className="info">
          <h2 style={{color: this.props.color}}>{deposit.name}</h2>
          <b className="percent">{deposit.percents['360']}%</b>
          <span className="term">за 360 дней</span>
        </div>
      </article>
    )
  }
}


export default class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCalculator: false,
      bank: null
    }
  }

  toggleCalculator = (bank) => {
    this.setState({
      isCalculator: true,
      bank
    })
  }
  
  render() {
    if (this.state.isCalculator) {
      return (
        <section className="calculator">
          <div className="fields">
            <p className="field">
              <input id="summ"/>
              <label for="summ">Сумма вклада</label>
            </p>
            <p className="field">
              <input id="term" readOnly/>
              <label for="term">На срок</label>
            </p>
            <p className="field">
              <input id="currency" readOnly/>
              <label for="currency">Валюта</label>
            </p>
          </div>
        </section>
      )
    }
    return (
    <section className="board">
      {banks.map((bank) => <Bank key={bank.name} {...bank} handler={this.toggleCalculator.bind(this, bank)}/> )}
    </section>)
  }
}

