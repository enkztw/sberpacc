import { createStore, combineReducers, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import promisesMiddleware from './middlewares/promises'
import * as reducers from './reducers'

const initialState = {
    issues: [],
    counter: 0
}
const createStoreWithMiddleware = applyMiddleware(
    promisesMiddleware,
    logger
    )(createStore)

// Flux standart action
// {type: 'STR', payload: ...., error}

const reducer = combineReducers(reducers)

const store = createStoreWithMiddleware(reducer, initialState)




export default store