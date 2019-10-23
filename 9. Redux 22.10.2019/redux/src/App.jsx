import React from "react";
import { connect } from "react-redux"
import { loadIssues } from './actions'
import { bindActionCreators } from "redux"

function App(props) {
  const handleClick = () => {
    props.loadIssues()
  }

  return (
    <React.Fragment>
      <button onClick={handleClick}>Load Issues</button>
      <ul>
      { props.issues.map((issue) => <li key={issue.title}>{issue.title}</li>)}
      </ul>
    </React.Fragment>
  );
}

export default connect(
  (state) => ({ counter: state.counter, issues: state.issues }),
  (dispatch) => bindActionCreators({loadIssues}, dispatch)
  )(App);
