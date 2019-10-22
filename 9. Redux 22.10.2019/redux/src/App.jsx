import React from "react";
import { Provider, connect } from "react-redux";

import store, { actions } from "./store";

console.log({ store });

// Button
const Button = props => <button onClick={() => props.increment(props.value)}>{props.children}</button>;

const InputWithDispatch = connect(
  null,
  { increment: actions.increment }
)(Button);

// Input
const Input = props => <input value={props.increment} />;

const mapStateToProps = state => {
  return {
    increment: state.increment
  };
};
const InputWithStore = connect(mapStateToProps)(Input);

export default () => {
  return (
    <Provider store={store}>
      <InputWithDispatch value={1}>+1</InputWithDispatch>
      <InputWithStore />
      <InputWithDispatch value={-1}>-1</InputWithDispatch>
    </Provider>
  );
};
