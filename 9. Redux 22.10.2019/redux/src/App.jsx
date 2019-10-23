import React from "react";
import { connect } from "react-redux";
import { loadFilms } from "./actions";
import { bindActionCreators } from "redux";

function App(props) {
  const handleClick = () => {
    props.loadFilms();
  };

  return (
    <React.Fragment>
      <button onClick={handleClick}>Load films</button>
          {props.films.map(film => (
            <article style={{border: '3px solid black'}} key={film.title}>
              <h1>{film.title}</h1>
              <p>{film.description}</p>
              <h2>{film.producer}</h2>
              <h3>{film.release_date}</h3>
            </article>
          ))}
    </React.Fragment>
  );
}

export default connect(
  state => ({ counter: state.counter, films: state.films }),
  dispatch => bindActionCreators({ loadFilms }, dispatch)
)(App);
