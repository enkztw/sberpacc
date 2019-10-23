import React from "react";
import store from "./state";
import getIssues from "./api"

store.subscribe(() => console.log('New state:', store.getState()))

store.dispatch({
  type: 'INCREASE'
})

store.dispatch({
  type: 'INCREASE'
})

store.dispatch({
  type: 'RESET'
})

store.dispatch({
  type: 'UKNOWN'
})

store.dispatch({
  type: 'LOAD_ISSUES',
  payload: [{id: 1, name: 'First issue'}, {id: 2, name: 'Second issue'}]
})

store.dispatch({
  type: 'PROMISE',
  actions: ['ISSUES_LOADING', 'ISSUES_LOADED', 'ISSUES_LOAD_FAILED'],
  promise: getIssues()
})

// import { Provider, connect } from "react-redux";

// import store, { actions } from "./store";

// console.log({ store });

// // Button
// const Button = props => <button onClick={() => props.increment(props.value)}>{props.children}</button>;

// const InputWithDispatch = connect(
//   null,
//   { increment: actions.increment }
// )(Button);

// // Input
// const Input = props => <input value={props.increment} />;

// const mapStateToProps = state => {
//   return {
//     increment: state.increment
//   };
// };
// const InputWithStore = connect(mapStateToProps)(Input);

// export default () => {
//   return (
//     <Provider store={store}>
//       <InputWithDispatch value={1}>+1</InputWithDispatch>
//       <InputWithStore />
//       <InputWithDispatch value={-1}>-1</InputWithDispatch>
//     </Provider>
//   );
// };

export default () => <div>Hello</div>;
