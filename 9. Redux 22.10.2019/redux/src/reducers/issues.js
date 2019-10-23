export default function reducer(state = [], action) {
    switch (action.type) {
        case 'ISSUES_LOADED':
            return action.data
        default:
            return state
    }
}