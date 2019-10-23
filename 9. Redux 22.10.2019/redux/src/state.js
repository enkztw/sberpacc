

// const state = {
//     issues: [],
//     repository: '',
//     counter: 0
// }

// Flux standart action
// {type: 'STR', payload: ...., error}

function reducer(state, action) {
    switch (action.type) {
        case 'INCREASE':
            return Object.assign({}, state, { counter: state.counter + 1 })
        case 'RESET':
            return Object.assign({}, state, { counter: 0 })
        default:
            return state
    }
}