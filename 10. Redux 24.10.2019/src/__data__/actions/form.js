import axios from 'axios'
import _ from 'lodash'

import * as types from '../action-types'

export const init = () => (dispatch) => {
    axios({
        method: 'post',
        url: '/init',
        data: {}
    }).then((response) => {
        dispatch({
            type: types.INIT_FETCH,
            payload: response.data
        })
    })
}

export const change = (name, value) => (dispatch) => {
    dispatch({
        type: types.CHANGE,
        payload: {
            [name]: value
        }
    })
}

const omit = (payload) => _.omit(payload, [
    "lastNameWife",
    "firstNameWife",
    "middleNameWife"
])

export const send = () => (dispatch, getState) => {
    const data = getState().form.switched ? getState().form.payload : omit(getState().form.payload)

    axios({
        method: 'post',
        url: '/send',
        data
    })
}

export const switchForm = (payload) => (dispatch) => {
    dispatch({
        type: types.SWITCH_FORM,
        switched: payload
    })
}