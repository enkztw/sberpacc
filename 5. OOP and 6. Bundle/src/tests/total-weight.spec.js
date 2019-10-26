import totalWeight from '../total-weight'
import totalCount from '../total-count'

const mockList = [{
    'id': '1',
    'title': 'Мясо',
    'costs': 1000.00,
    'params': {
        'weight': 100,
        'count': 2,
        'color': 'red'
    }
},
{
    'id': '2',
    'title': 'Яйца',
    'costs': 100.00,
    'params': {
        'weight': 10,
        'count': 10,
        'color': 'white'
    }
},
{
    'id': '3',
    'title': 'Молоко',
    'costs': 100.00,
    'params': {
        'weight': 200,
        'count': 1,
        'color': 'white'
    }
},
{
    'id': '4',
    'title': 'Пиво',
    'costs': 300.00,
    'params': {
        'weight': 50,
        'count': 6,
        'color': 'yellow'
    }
},
{
    'id': '5',
    'title': 'Хлеб',
    'costs': 50.00,
    'params': {
        'weight': 50,
        'count': 1,
        'color': 'white'
    }
}
]

describe('totalWeight', () => {
    it('No items - weight zero', () => {
        expect(totalWeight([])).toBe(0)
    })

    it('850 kg', () => {
        expect(totalWeight(mockList)).toBe(850)
    })
})

describe('totalCount', () => {
    it('No items - count zero', () => {
        expect(totalCount([])).toBe(0)
    })

    it('20 items', () => {
        expect(totalCount(mockList)).toBe(20)
    })
})
