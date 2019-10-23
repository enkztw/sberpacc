export default function reducer(state = [], action) {
    switch (action.type) {
        case 'FILMS_LOADED':
            return action.data
        default:
            return state
    }
}