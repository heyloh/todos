const todoInput = document.querySelector('.new-todo-input');
const todoButton = document.querySelector('.add-todo-btn');
const todos = document.querySelector('.todos');

todoInput.addEventListener('keypress', function(event) {
  if(event.keyCode === 13) {
    if(!todoInput.value) return;

    handleCreateTodo(todoInput.value);
  }
});

function handleCreateTodo(text) {
  const li = handleCreateListItem();
  li.innerText = text;
  todos.appendChild(li);
  handleClearInput();
  handleCreateDeleteButton(li);
  handleStoreTodos();
}

function handleCreateListItem() {
  const li = document.createElement('li');
  return li;
}

function handleClearInput() {
  todoInput.value = '';
  todoInput.focus();
}

function handleCreateDeleteButton(li) {
  li.innerText += ' ';
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'delete-button');
  deleteButton.innerText = '-';
  li.appendChild(deleteButton);
}

function handleStoreTodos() {
  const todosLi = todos.querySelectorAll('li');
  const todosList = [];

  for(let todo of todosLi) {
    let todoText = todo.innerText;
    todoText = todoText.replace('-', '').trim();
    todosList.push(todoText);
  }
  const todosJSON = JSON.stringify(todosList);
  localStorage.setItem('todos', todosJSON);
}

function handleShowStoredTodos() {
  const todos = localStorage.getItem('todos');
  const todosList = JSON.parse(todos);
  for(let todo of todosList) {
    handleCreateTodo(todo);
  }
}

todoButton.addEventListener('click', function() {
  if(!todoInput.value) return;

  handleCreateTodo(todoInput.value);
});

document.addEventListener('click', function(event) {
  const element = event.target;
  
  if(element.classList.contains('delete-button')) {
    element.parentElement.remove();
    handleStoreTodos();
  }
});

handleShowStoredTodos();