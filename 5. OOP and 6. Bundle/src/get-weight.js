import _ from 'lodash'

export default (list) => {
    return _.map(list, ({ title, weight }) => `${title} - ${weight}`).join(', ')
}
