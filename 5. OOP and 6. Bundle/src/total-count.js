import _ from 'lodash'

export default (list) => _.reduce(list, (acc, curr) => acc + curr.params.count, 0)
