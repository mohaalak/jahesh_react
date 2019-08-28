import mohaalak from './mohaalak';

const root = document.getElementById('root');

function Form({ onsubmit }) {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const submit = document.createElement('button');
  submit.textContent = 'Submit';
  form.appendChild(input);
  form.appendChild(submit);

  form.onsubmit = function(event) {
    event.preventDefault();
    onsubmit(event.target[0].value);
  };
  return form;
}

function List({ todos, toggleTodo }) {
  mohaalak.render({
    type: 'ul',
    props: {
      children: todos.map(todo => ListItem({ todo, toggleTodo }))
    }
  });
  // const ul = document.createElement('ul');
  // for (const todo of todos) {
  //   const li = ListItem({ todo, toggleTodo });
  //   ul.appendChild(li);
  // }
  // return ul;
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
  return {
    type: 'li',
    props: {
      className: 'completed',
      onclick: () => toggleTodo(todo),
      children: [{ type: 'TEXT ELEMENT', nodeValue: todo.text }]
    }
  };
}

function FooterItem({ name, value, active, changeFilter }) {
  const button = document.createElement('button');
  button.textContent = name;
  button.onclick = () => changeFilter(value);
  if (value === active) {
    button.className = 'active';
  }
  return button;
}

function Footer(props) {
  const div = document.createElement('div');

  const all = FooterItem({ ...props, name: 'All', value: 'all' });
  const todo = FooterItem({ ...props, name: 'Todo', value: 'todo' });
  const completed = FooterItem({
    ...props,
    name: 'Completed',
    value: 'completed'
  });

  div.appendChild(all);
  div.appendChild(todo);
  div.appendChild(completed);

  return div;
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
    const div = document.createElement('div');
    div.appendChild(Form({ onsubmit: this.addTodo }));
    div.appendChild(
      List({ todos: this.filterList(), toggleTodo: this.toggleTodo })
    );
    div.appendChild(
      Footer({
        active: this.state.visibilityFilter,
        changeFilter: this.changeFilter
      })
    );
    return div;
  }
}

const app = new TodoApp();
function render() {
  for (let i = 0; i < root.children.length; i++) {
    root.removeChild(root.children[i]);
  }

  root.appendChild(app.render());
}

render();
