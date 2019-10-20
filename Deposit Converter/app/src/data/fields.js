const feilds = [{
    name: 'summ',
    text: 'Сумма вклада',
    value: 1000000
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
        text: '12 месяцев',
        isDefault: true
      }
    ]
  }, {
    name: 'currency',
    text: 'Валюта',
    items: [{
        value: 'rubles',
        text: 'Рубли РФ',
        isDefault: true
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
  }]

  export default feilds