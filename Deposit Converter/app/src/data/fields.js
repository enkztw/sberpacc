const feilds = [{
  name: 'summ',
  text: 'Deposit amount (₽)'
}, {
  name: 'term',
  text: 'For a term',
  items: [{
    value: 90,
    text: '3 months'
  },
  {
    value: 180,
    text: '6 months'
  },
  {
    value: 270,
    text: '9 months'
  },
  {
    value: 360,
    text: '12 months',
    isDefault: true
  }
  ]
}, {
  name: 'currency',
  text: 'Currency',
  items: [{
    value: 'RUB',
    text: 'RUB',
    isDefault: true
  },
  {
    value: 'USD',
    text: 'USD'
  },
  {
    value: 'EUR',
    text: 'EUR'
  }
  ]
}]

export default feilds