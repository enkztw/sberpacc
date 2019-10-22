import React from 'react';
import Menu from './Menu'

import fields from '../data/fields';
import banks from '../data/banks';

export default class Calculator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      summ: 1000000,
      term: 360,
      currency: 'RUB',
      menus: {
        term: false,
        currency: false
      },
      bank: banks.find((bank) => bank.name === this.props.match.params.name)
    }

    this.currencyMap = {
      RUB: {
        rate: 1,
        symbol: '₽'
      },
      USD: {
        rate: null,
        symbol: '$'
      },
      EUR: {
        rate: null,
        symbol: '€'
      }
    }

    this.setRates('USD', 'EUR')
  }

  setRates = (...curr) => {
    curr.forEach(async (item) => {
      const response = await fetch(`https://free.currconv.com/api/v7/convert?q=RUB_${item}&compact=ultra&apiKey=eacc4d63f1129ac90249`)
      const data = await response.json()

      this.currencyMap[item].rate = data[`RUB_${item}`]
    })
  }

  getMenu(name) {
    this.setState((state) => ({
      menus: {
        [name]: !state.menus[name]
      }
    }))
  }

  onMenuItemClick = (fieldName, value) => {
    this.setState({ [fieldName]: value })
  }

  onInputChange = (evt, field) => {
    if (evt.target.validity.valid && evt.target.value) {
      this.setState({ [field]: evt.target.value })
    } else {
      return this.state[field]
    }
  }

  calculate = (type = 'summ') => {
    const currency = this.state.currency
    const currencyRate = this.currencyMap[currency].rate
    const summ = parseInt(this.state.summ)
    const term = this.state.term
    const percents = this.state.bank.deposit.percents[term]
    const income = summ * percents / 100 / 12 * term / 30


    switch (type) {
      case 'income':
        return Math.floor(income * currencyRate)
      default:
        return Math.floor((summ + income) * currencyRate)
    }
  }

  divideByDots = (num) => num.toString().split(``).reverse().reduce((curr, val, index) => (index % 3 === 0) ? `${val}.${curr}` : `${val}${curr}`);

  render() {
    const bankName = this.state.bank.name
    const color = `rgba(${this.state.bank.color}, 1)`
    const transparentColor = `rgba(${this.state.bank.color}, 0.1)`
    const currencySymbol = this.currencyMap[this.state.currency].symbol
    const percent = this.state.bank.deposit.percents[this.state.term]
    const bankImage = this.state.bank.image
    const depositName = this.state.bank.deposit.name

    const summ = this.calculate('summ')
    const income = this.calculate('income')

    return (
      <section className="calculator">
        <div className="fields">
          {fields.map((field) => {
            const items = field.items
            const name = field.name
            const label = field.text
            const menuState = this.state.menus[name]
            const value = (items && items.find((item) => item.value === this.state[name]).text) || this.state[name]

            return (
              <div
                className={`field${menuState ? ` field--opened` : ``}`}
                style={{ backgroundColor: color }}
                key={name}
                onClick={items && this.getMenu.bind(this, name)}>
                <input
                  id={name}
                  style={{ borderColor: color }}
                  readOnly={items}
                  value={value}
                  onChange={(evt) => this.onInputChange(evt, name)}
                  maxLength="9"
                  minLength="1"
                  pattern="[0-9]*"
                />
                <span>{label}</span>
                {menuState && <Menu items={items} color={color} name={name} onMenuItemClick={this.onMenuItemClick} />}
              </div>
            )
          })}
        </div>
        <div className="calculator-wrapper">
          <section style={{ borderColor: color }} className="calculator__info">
            <p className="calculator__summ">
              <span>{this.divideByDots(summ)}</span>
              <b>{currencySymbol}</b>
            </p>
            <p className="calculator__perc">
              <span>{this.divideByDots(income)}</span>
              <b>{currencySymbol}</b>
            </p>
          </section>
          <section className="calculator__item">
            <div style={{ borderColor: color, backgroundColor: transparentColor, clipPath: `polygon(50% 0%, 50% 50%, 100% ${percent * 10}%, 100% 0%)` }} className="calculator__income"></div>
            <div className="calculator__deposit"></div>
            <div className="calculator__percent">
              {percent}
              <b style={{ color }}>%</b>
            </div>
          </section>
        </div>
        <section className="calculator__bank">
          <h2 className="bank-name" style={{ borderColor: color }}>
            {bankName}
            <img src={bankImage} alt={`${bankName} логотип`} />
          </h2>
          <h3 className="bank-deposit" style={{ color }}>{depositName}</h3>
        </section>
      </section>
    )
  }
}