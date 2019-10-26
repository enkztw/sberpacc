import _ from 'lodash'

export default (list) => {
    const counter = _.reduce(list, (acc, curr) => {
        if (!acc[curr.params.color]) {
            acc[curr.params.color] = 0
        }

        acc[curr.params.color]++

        return acc
    }, {})

    return _.reduce(_.keys(counter), (a, b) => counter[a] > counter[b] ? a : b)
}
