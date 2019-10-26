import axios from 'axios'

import { ExactProduct } from './product-item'
import totalWeight from './total-weight'
import totalCount from './total-count'
import totalColor from './total-color'
import getCost from './get-cost'
import getWeight from './get-weight'
import getCounts from './get-counts'
import style from './style.css'

axios({
    method: 'get',
    url: '/api/list'
})
    .then((response) => {
        ExactProduct.rofl()
        const list = response.data.map((item) => new ExactProduct(item))
        // const list = response.data.map((item) => new ProductItem(item))
        return Promise.resolve(list)
    })
    .then((list) => {
        // Работа со списком параметров корзины
        const statisticsNode = document.createElement('dl')
        statisticsNode.classList.add(style.statistics)
        statisticsNode.innerHTML = `<dt>Количество наименований</dt>` +
            `<dd class=${style.term}>${getCounts(list)} шт</dd>` +
            `<dt>Суммарное количество продуктов</dt>` +
            `<dd class=${style.term}>${totalCount(list)} шт</dd>` +
            `<dt>Суммарный вес корзины</dt>` +
            `<dd class=${style.term}>${totalWeight(list)} кг</dd>` +
            `<dt>Цвет корзины</dt>` +
            `<dd class=${style.term}>${totalColor(list)}</dd>` +
            `<dt>Стоимость каждой единицы наименования</dt>` +
            `<dd class=${style.term}>${getCost(list)}</dd>` +
            `<dt>Вес каждой единицы наименования</dt>` +
            `<dd class=${style.term}>${getWeight(list)}</dd>`
        document.body.appendChild(statisticsNode)
    })
    .catch(() => {
        document.body.innerHTML = 'Сервис недоступен!'
    })
