import totalWeight from '../total-weight'

describe('totalWeight', () => {
    it('No items - weight zero', () => {
        expect(totalWeight([])).toBe(0)
    })
})
