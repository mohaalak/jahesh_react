import React from 'react';

export class ListItem extends React.Component {
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
    const { todo } = this.props;
    return (
      <li className={todo.completed ? 'completed' : ''} onClick={this.click}>
        {todo.text}
        {this.state.counter}
      </li>
    );
  }
}
