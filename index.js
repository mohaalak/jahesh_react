const root = document.getElementById('root');

function createForm() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const submit = document.createElement('button');
  submit.textContent = 'Submit';
  form.appendChild(input);
  form.appendChild(submit);

  form.onsubmit = function(event) {
    event.preventDefault();
    addTodo(event.target[0].value);
  };
  return form;
}

const ul = document.createElement('ul');

function addTodo(text) {
  const li = document.createElement('li');
  li.textContent = text;

  li.onclick = function() {
    if (li.className === 'completed') {
      li.className = '';
    } else {
      li.className = 'completed';
    }
  };
  ul.appendChild(li);
}

function createFooter() {
  const div = document.createElement('div');

  const all = document.createElement('button');
  all.textContent = 'All';

  const todo = document.createElement('button');
  todo.textContent = 'Todo';

  const completed = document.createElement('button');
  completed.textContent = 'Completed';

  div.appendChild(all);
  div.appendChild(todo);
  div.appendChild(completed);

  return div;
}

root.appendChild(createForm());
root.appendChild(ul);
root.appendChild(createFooter());
