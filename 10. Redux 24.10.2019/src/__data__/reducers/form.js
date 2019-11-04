import * as types from '../action-types'

const defaultState = {
    payload: {},
    switched: false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.INIT_FETCH: {
            return {
                ...state,
                payload: action.payload
            }
        }
        case types.CHANGE: {
            return {
                ...state,
                payload: {
                    ...state.payload,
                    ...action.payload
                }
            }
        }
        case types.SWITCH_FORM: {
            return {
                ...state,
                switched: action.switched
            }
        }
        default: {
            return state
        }
    }
}
