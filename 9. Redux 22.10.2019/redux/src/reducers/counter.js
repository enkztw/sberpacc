export default function reducer(state, action) {
    switch (action.type) {
        case 'INCREASE':
            return state + 1
        case 'RESET':
            return 0
        default:
            return state
    }
}