import React from 'react';
import './App.css';
import banks from './data';


const fields = [{
  name: 'summ',
  text: 'Сумма вклада'
}, {
  name: 'term',
  text: 'На срок',
  items: [{
      value: 90,
      text: '3 месяца'
    },
    {
      value: 180,
      text: '6 месяцев'
    },
    {
      value: 270,
      text: '9 месяцев'
    },
    {
      value: 360,
      text: '12 месяцев'
    }
  ]
}, {
  name: 'currency',
  text: 'Валюта',
  items: [{
      value: 'rubles',
      text: 'Рубли РФ'
    },
    {
      value: 'dollars',
      text: 'Доллары США'
    },
    {
      value: 'euro',
      text: 'Евро'
    }
  ]
}];


class FieldItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }


  render() {
    return (
      <li onClick={this.props.handler.bind(this, this.props.text)}>{this.props.text}</li>
    )
  }
}

class Field extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isMenu: false,
      value: ''
    };
  }

  toggleMenu = (value) => {
    this.setState((state) => ({
      isMenu: !state.isMenu,
      value
    }));
  }

  render() {
    if (this.state.isMenu) {
      return (
      <div className="field">
        <input id={this.props.name} style={{borderColor: this.props.color}} readOnly={this.props.items}/>
        <label htmlFor={this.props.name}>{this.props.text}</label>
        <ul style={{borderColor: this.props.color}}>
          {this.props.items.map((item) => <FieldItem {...item} key={item.value} handler={this.toggleMenu}/>)}
        </ul>
      </div>
      )
    }

    return (
    <div className="field">
      <input id={this.props.name} style={{borderColor: this.props.color}} readOnly={this.props.items} onClick={this.props.items && this.toggleMenu}/>
      <label htmlFor={this.props.name}>{this.props.text}</label>
    </div>
    )
  }
}

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
            {fields.map((field) => <Field {...field} color={this.state.bank.color} key={field.name}/>)}
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

