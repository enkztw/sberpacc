import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ToDo from './components/ToDo'


const connect = (mapStateToProps, mapDispatchToProps) =>
    Component => {
        return class extends React.Component {
            render() {
                return (
                    <Component
                        {...mapStateToProps(store.getState(), this.props)}
                        {...mapDispatchToProps(store.dispatch, this.props)}
                    />
                )
            }

            componentDidMount() {
                store.subscribe(this.handleChange)
            }

            handleChange = () => {
                this.forceUpdate()
            }
        }
    }

class Provider extends React.Component {
    componentWillMount() {
        window.store = this.props.store
    }

    render() {
        return this.props.children
    }
}

const createStore = (reducer, initialState) => {
    let currentState = initialState
    const listeners = []

    const getState = () => currentState
    const dispatch = action => {
        currentState = reducer(currentState, action)
        listeners.forEach(listener => listener())
    }

    const subscribe = listener => listeners.push(listener)

    return { getState, dispatch, subscribe }
}

// actions
const ADD_TODO = 'ADD_TODO'

// action creators
const addTodo = todo => ({
    type: ADD_TODO,
    payload: todo,
})

// reducers
const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            state.push(action.payload)
            return state
        default:
            return state
    }
}

const store = createStore(reducer, {todos: []})

const ToDoConnected = connect(
    (state) => ({
        todos: state.todos,
    }),
    (dispatch) => ({
        addTodo: text => dispatch(addTodo(text)),
    }))(ToDo)

ReactDOM.render(
    <Provider store={store}>
        <ToDoConnected title="Список задач" />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Slomux - реализация Flux, в которой, как следует из нвазвания, что-то сломано.
// Нужно выяснить что здесь сломано



// APP


export default store