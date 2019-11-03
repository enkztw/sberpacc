import axios from 'axios'
import _ from 'lodash'

const omit = (payload) => _.omit(payload, [
    'partnerFirstName',
    'partnerLastName'
])

export const send = () => (dispatch, getState) => {
    const data = getState().form.credit.values.isPartner ? getState().form.credit.values : omit(getState().form.credit.values)

    axios({
        method: 'post',
        url: '/send',
        data
    })
}
