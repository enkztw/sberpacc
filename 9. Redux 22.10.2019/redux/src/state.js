import { createStore } from 'redux'
import counterReducer from './reducers/counter'
import issuesReducer from './reducers/issues'

const initialState = {
    issues: [],
    repository: '',
    counter: 0
}

// Flux standart action
// {type: 'STR', payload: ...., error}

function reducer(state, action) {
    return {
        repository: state.repository,
        counter: counterReducer(state.counter, action),
        issues: issuesReducer(state.issues, action)
    }
}

const store = createStore(reducer, initialState)

export default store