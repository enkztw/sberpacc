import { createStore, combineReducers } from "redux";

import * as reducers from './reducers'
import * as actions from './actions'


export { actions }
export default createStore(combineReducers(reducers), {})