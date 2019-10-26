import _ from 'lodash'

export default (list) => _.reduce(list, (acc, curr) => {
    return acc + curr.params.count
}, 0)
