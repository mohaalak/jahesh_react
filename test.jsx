import mohaalak from './mohaalak';
//@jsx mohaalak.createElement

function List({ todos, toggleTodo }) {
  return <ul>{todos.map(todo => ListItem({ todo, toggleTodo }))}</ul>;
}

function ListItem({ todo, toggleTodo }) {
  return (
    <li
      className={todo.completed ? 'completed' : ''}
      onclick={() => toggleTodo()}
    >
      {todo.text}
    </li>
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
