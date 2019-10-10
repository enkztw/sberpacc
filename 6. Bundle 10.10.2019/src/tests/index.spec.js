import myFunc from '../index';

describe('myFunc', () => {
    it('get first', () => {
        expect(myFunc([1, 2, 3])).toBe(1)
        expect(myFunc([3, 2, 1])).toBe(3)
    })

    it('get first (wrong)', () => {
        expect(myFunc([1, 2, 3])).toBe(1)
    })
})