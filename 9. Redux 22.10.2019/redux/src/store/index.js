import { createStore, combineReducers, applyMiddleware } from "redux";

import * as reducers from './reducers'
import * as actions from './actions'

const middleware = store => dispatch => action => {
    dispatch(action)    
    localStorage.setItem('App_store', JSON.stringify(store.getState()))
}

export { actions }
export default createStore(combineReducers(reducers), JSON.parse(localStorage.getItem('App_store') || ''), applyMiddleware(middleware))