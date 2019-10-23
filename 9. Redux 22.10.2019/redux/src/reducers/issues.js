export default function reducer(state, action) {
    switch (action.type) {
        case 'LOAD_ISSUES':
            return Object.assign([], state, action.payload)
        default:
            return state
    }
}