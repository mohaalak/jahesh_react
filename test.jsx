import mohaalak from './mohaalak';

function List({ todos, toggleTodo }) {
  return mohaalak.createElement(
    'ul',
    {},
    todos.map(todo => ListItem({ todo, toggleTodo }))
  );
}

function ListItem({ todo, toggleTodo }) {
  return mohaalak.createElement(
    'li',
    {
      className: todo.completed ? 'completed' : '',
      onclick: () => toggleTodo(todo)
    },
    todo.text
  );
}

export class TestApp {
  constructor() {
    this.state = {
      todos: [{ text: 'Get Dard', completed: false }]
    };
  }

  toggleTodo(todo) {
    alert(todo.text);
  }
  render() {
    const kooft = List({
      todos: this.state.todos,
      toggleTodo: this.toggleTodo
    });

    console.log(kooft);
    return kooft;
  }
}
