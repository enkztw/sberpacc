export default function getFilms() {
    return fetch('https://ghibliapi.herokuapp.com/films?limit=3')
        .then((r) => r.json())
}