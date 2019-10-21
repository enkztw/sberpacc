import React from 'react';
import './css/App.css';
import banks from './data/banks';
import Calculator from './components/Calculator';
import Bank from './components/Bank';

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
    const calculatorState = this.state.isCalculator

    if (calculatorState) {
      return <Calculator bank={this.state.bank} />
    }
    return (
      <section className="board">
        {banks.map((bank) => <Bank key={bank.name} {...bank} handler={this.toggleCalculator.bind(this, bank)} />)}
      </section>)
  }
}

