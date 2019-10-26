import _ from 'lodash'

export default (list) => {
    return _.map(list, ({ title, cost }) => `${title} - ${cost}`).join(', ')
}
