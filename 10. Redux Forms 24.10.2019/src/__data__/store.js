import { createStore as createReduxStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly'

import * as appReducers from './reducers'

export const createStore = () => {
    const composedEnhancer = compose(
        applyMiddleware(thunkMiddleware),
        devToolsEnhancer({
            name: 'Работа с формой'
        })
    )

    return createReduxStore(combineReducers(appReducers), composedEnhancer)
}
