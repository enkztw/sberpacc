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

class Field extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isMenu: false,
      value: this.props.value || ((this.props.items && this.props.items.find((item) => item.isDefault).text) || ''),
    };    
  }

  toggleMenu = () => {
    this.setState((state) => ({
      isMenu: !state.isMenu
    }));
  }

  onValueChange = (evt) => {
    this.setState({
      value: evt.target.value || evt.target.textContent
    })
  }

  render() {
    if (this.state.isMenu) {
      return (
      <div className="field field--opened" style={{backgroundColor: this.props.color, zIndex: 10 - this.props.zIndex}}>
        <input 
          id={this.props.name} 
          style={{borderColor: this.props.color}} 
          readOnly={this.props.items}
          value={this.state.value}
          onChange={this.onValueChange}
        />
        <label htmlFor={this.props.name}>{this.props.text}</label>
        <ul style={{borderColor: this.props.color}}>
          {this.props.items.map((item) => 
          <FieldItem 
            key={item.value}
            {...item} 
            color={this.props.color} 
            toggleHandler={this.toggleMenu} 
            valueHandler={this.onValueChange}/>)}
        </ul>
      </div>
      )
    }

    return (
    <div className="field" style={{backgroundColor: this.props.color, zIndex: 10 - this.props.zIndex}}>
      <input 
        id={this.props.name} 
        style={{borderColor: this.props.color}} 
        readOnly={this.props.items} 
        value={this.state.value}
        onChange={this.onValueChange}
        onClick={this.props.items && this.toggleMenu}
      />
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
            {fields.map((field, index) => <Field {...field} zIndex={index} color={this.state.bank.color} key={field.name}/>)}
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

