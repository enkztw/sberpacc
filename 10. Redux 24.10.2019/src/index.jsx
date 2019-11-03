import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Form from './components/form'
import { createStore } from './__data__'

ReactDOM.render(
    <Provider store={createStore()}>
        <Form formTitle="Клевая форма" />
    </Provider>,
    document.getElementById('app')
)
