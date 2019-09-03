import React from 'react';

export function Form({ onsubmit }) {
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
