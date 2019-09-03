import React from 'react';
import { Form } from './component/Form';
import { List } from './component/List';
import { Footer } from './component/Footer';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ text: 'Get Milk', completed: false }],
      visibilityFilter: 'all'
    };
    this.addTodo = this.addTodo.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  addTodo(text) {
    this.setState({
      todos: [...this.state.todos, { text, completed: false }]
    });
  }

  toggleTodo(inputTodo) {
    const newTodos = [];

    for (const todo of this.state.todos) {
      if (todo === inputTodo) {
        newTodos.push({ text: todo.text, completed: !todo.completed });
      } else {
        newTodos.push(todo);
      }
    }
    this.setState({ todos: newTodos });
    // this.setState({
    //   todos: this.state.todos.map(x =>
    //     x === todo ? { ...x, completed: !x.completed } : x
    //   )
    // });
  }

  changeFilter(visible) {
    this.setState({ visibilityFilter: visible });
  }

  filterList() {
    switch (this.state.visibilityFilter) {
      case 'all':
        return this.state.todos;
      case 'todo':
        return this.state.todos.filter(x => !x.completed);
      case 'completed':
        return this.state.todos.filter(x => x.completed);
    }
  }
  render() {
    return (
      <div>
        <Form onsubmit={this.addTodo}></Form>
        <List todos={this.filterList()} toggleTodo={this.toggleTodo}></List>
        <Footer
          active={this.state.visibilityFilter}
          changeFilter={this.changeFilter}
        ></Footer>
      </div>
    );
  }
}
