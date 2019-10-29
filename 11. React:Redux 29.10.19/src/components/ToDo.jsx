import React from "react";
import store from "../index";
export default class ToDoComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoText: ""
    };
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <label>{this.props.title || "Без названия"}</label>
        <div>
          <input
            value={this.state.todoText}
            placeholder="Название задачи"
            onChange={this.updateText}
          />
          <button onClick={this.addTodo}>Добавить</button>
          <ul>
            {this.props.todos.map((todo, idx) => (
              <li>{todo}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  updateText = (e) => {
    const value = e.target.value;

    this.setState({
      todoText: value
    });
  };

  addTodo = () => {
    this.props.todos.push(this.state.todoText);

    this.setState({
      todoText: ""
    });

    console.log(store.getState());
  };
}
