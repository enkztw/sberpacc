import { createStore, combineReducers} from 'redux'
import * as reducers from './reducers'

const initialState = {
    issues: [],
    repository: '',
    counter: 0
}

// Flux standart action
// {type: 'STR', payload: ...., error}

const reducer = combineReducers(reducers)

const store = createStore(reducer, initialState)

export default store