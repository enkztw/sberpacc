import React from 'react';
import './css/App.css';
import banks from './data/banks';
import fields from './data/fields';


class FieldItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  onFieldItemClick = (evt) => {
    this.props.valueHandler(evt)
    this.props.toggleHandler(evt)
  }

  render() {
    return (
      <li style={{borderColor: this.props.color}} onClick={this.onFieldItemClick}>{this.props.text}</li>
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


class Menu extends React.Component {
  render() {
    const items = this.props.items
    const color = this.props.color
    const name = this.props.name
    const handler = this.props.onMenuItemClick

    return (
    <ul style={{borderColor: color}}>
      {items.map((item) => 
        <li style={{borderColor: color}} key={item.value} onClick={handler.bind(this, name, item.value)}>{item.text}</li>
      )}
    </ul>
    )
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      summ: 100000,
      term: 360,
      currency: 'rubles',
      menus: {
        term: false,
        currency: false
      }
    }
  }

  getMenu(name) {
    this.setState((state) => ({
      menus: {
        [name]: !state.menus[name]
      }
    }))
  }

  onMenuItemClick = (fieldName, value) => {
    this.setState({[fieldName]: value})
  }

  render() {
    const color = this.props.bank.color

    return (
      <section className="calculator">
        <div className="fields">
          {fields.map((field) => 
            <div className={`field${this.state.menus[field.name] ? ` field--opened` : ``}`}style={{backgroundColor: color}} key={field.name} onClick={field.items && this.getMenu.bind(this, field.name)}>
              <input 
                id={field.name} 
                style={{borderColor: color}} 
                readOnly={field.items}
                value={(field.items && field.items.find((item) => item.value === this.state[field.name]).text) || this.state[field.name]}
                onChange={(evt) => this.setState({[field.name]: evt.target.value})}
                maxLength="9"
              />
              <label htmlFor={field.name}>{field.text}</label>
              {this.state.menus[field.name] && <Menu items={field.items} color={color} name={field.name} onMenuItemClick={this.onMenuItemClick}/>}
            </div>
          )}
        </div>
        <section className="calculator__item">
          <div style={{borderColor: this.props.color}} className="calculator__income"></div>
          <div className="calculator__deposit"></div>
          <div className="calculator__summ">
              <span>За 12 месяцев я накоплю</span>
              <b style={{color}}>{this.state.summ}</b>
            </div>
        </section>
      </section>
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
      return <Calculator color={this.state.bank.color} bank={this.state.bank}/>
    }
    return (
    <section className="board">
      {banks.map((bank) => <Bank key={bank.name} {...bank} handler={this.toggleCalculator.bind(this, bank)}/> )}
    </section>)
  }
}

