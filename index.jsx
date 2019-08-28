import React from 'react';
import ReactDOM from 'react-dom';

import { TestApp } from './test.jsx';

const root = document.getElementById('root');

function Form({ onsubmit }) {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onsubmit(event.target[0].value);
      }}
    >
      <input />
      <button>submit</button>
    </form>
  );
}

function List({ todos, toggleTodo }) {
  return (
    <ul>
      {todos.map(todo => (
        <ListItem todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
}

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
    this.click = this.click.bind(this);
    setInterval(() => this.setState({ counter: this.state.counter + 1 }), 1000);
  }
  click() {
    this.props.toggleTodo(this.props.todo);
  }
  render() {
    const { todo, toggleTodo } = this.props;
    return (
      <li className={todo.completed ? 'completed' : ''} onClick={this.click}>
        {todo.text}
        {this.state.counter}
      </li>
    );
  }
}

function FooterItem({ name, value, active, changeFilter }) {
  return (
    <button
      onClick={() => changeFilter(value)}
      className={active === value && 'active'}
    >
      {name}
    </button>
  );
}

function Footer(props) {
  return (
    <div>
      <FooterItem {...props} name="All" value="all" />
      <FooterItem {...props} name="Todo" value="todo" />
      <FooterItem {...props} name="Completed" value="completed" />
    </div>
  );
}

class TodoApp extends React.Component {
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

function render() {
  ReactDOM.render(<TodoApp></TodoApp>, root);
}

render();
