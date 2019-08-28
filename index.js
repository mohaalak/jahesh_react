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
    alert(event.target[0].value);
  };
  return form;
}

root.appendChild(createForm());
