import getFilms from "../api"

const loadFilms = () =>
    ({
        type: 'PROMISE',
        actions: ['FILMS_LOADING', 'FILMS_LOADED', 'FILMS_LOAD_FAILURE'],
        promise: getFilms()
    })

export default loadFilms