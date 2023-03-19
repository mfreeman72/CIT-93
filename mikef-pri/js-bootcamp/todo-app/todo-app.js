'use strict'

const todos = getSavedTodos();

const filters = {
  searchText: '',
  hideCompleted: false,
};

renderTodos(todos, filters);

document.querySelector('#search-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector('#new-task').addEventListener('submit', (e) => {
  e.preventDefault();
  todos.push({
    id: uuidv4(),
    task: e.target.elements.newTask.value,
    completed: false,
  });
  saveTodos(todos);
  renderTodos(todos, filters);
  e.target.elements.newTask.value = '';
});

document.querySelector('#hide').addEventListener('change', (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});
