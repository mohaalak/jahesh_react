import mohaalak from './mohaalak';
//@jsx mohaalak.createElement

import { TestApp } from './test.jsx';

const root = document.getElementById('root');

function Form({ onsubmit }) {
  return (
    <form
      onsubmit={event => {
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
  return <ul>{todos.map(todo => ListItem({ todo, toggleTodo }))}</ul>;
}

function ListItem({ todo, toggleTodo }) {
  return (
    <li
      className={todo.completed ? 'completed' : ''}
      onclick={() => toggleTodo(todo)}
    >
      {todo.text}
    </li>
  );
}

function FooterItem({ name, value, active, changeFilter }) {
  return (
    <button
      onclick={() => changeFilter(value)}
      className={active === value && 'active'}
    >
      {name}
    </button>
  );
}

function Footer(props) {
  return (
    <div>
      {FooterItem({ ...props, name: 'All', value: 'all' })}
      {FooterItem({ ...props, name: 'Todo', value: 'todo' })}
      {FooterItem({
        ...props,
        name: 'Completed',
        value: 'completed'
      })}
    </div>
  );
}

class TodoApp {
  constructor() {
    this.state = {
      todos: [{ text: 'Get Milk', completed: false }],
      visibilityFilter: 'all'
    };
    this.addTodo = this.addTodo.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    render();
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
        {Form({ onsubmit: this.addTodo })}
        {List({ todos: this.filterList(), toggleTodo: this.toggleTodo })}
        {Footer({
          active: this.state.visibilityFilter,
          changeFilter: this.changeFilter
        })}
      </div>
    );
  }
}

const app = new TodoApp();
const test = new TestApp();
function render() {
  for (let i = 0; i < root.children.length; i++) {
    root.removeChild(root.children[i]);
  }

  // root.appendChild(app.render());

  mohaalak.render(app.render(), root);
}

render();
