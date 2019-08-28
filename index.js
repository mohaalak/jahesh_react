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

root.appendChild(createForm());
root.appendChild(ul);
