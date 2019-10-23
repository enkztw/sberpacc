import { createStore, combineReducers} from 'redux'
import counterReducer from './reducers/counter'
import issuesReducer from './reducers/issues'

const initialState = {
    issues: [],
    repository: '',
    counter: 0
}

// Flux standart action
// {type: 'STR', payload: ...., error}

const reducer = combineReducers({
    counter: counterReducer,
    issues: issuesReducer
})

const store = createStore(reducer, initialState)

export default store