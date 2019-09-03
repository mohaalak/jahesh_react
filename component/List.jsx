import React from 'react';
import { ListItem } from './ListItem';

export function List({ todos, toggleTodo }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <ListItem key={index} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </ul>
  );
}
