'use strict'

// Fetch existing todos from localStorage
const getSavedTodos = () => {
  const todosJSON = localStorage.getItem('todos');

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch {
    return [];
  }
};

// Save todos to localStorage
const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Render application todos based on filters
const renderTodos = (todos, filter) => {
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.task
      .toLowerCase()
      .includes(filters.searchText.toLowerCase());
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  document.querySelector('#todos').innerHTML = '';
  document
    .querySelector('#todos')
    .appendChild(generateSummaryDOM(incompleteTodos));

  filteredTodos.forEach((item) => {
    document.querySelector('#todos').appendChild(generateTodoDOM(item));
  });
};

const removeTask = (id) => {
  const taskIndex = todos.findIndex((item) => item.id === id);

  if (taskIndex > -1) {
    todos.splice(taskIndex, 1);
  }
};

const toggleTask = (id) => {
  const todo = todos.find((item) => item.id === id);

  if (todo) {
    todo.completed = !todo.completed;
  }
};

// Get the DOM elements for an individual note
const generateTodoDOM = (item) => {
  // Setup a root div
  const todoEl = document.createElement('div');
  const checkboxEl = document.createElement('input');
  const textEl = document.createElement('span');
  const buttonEl = document.createElement('button');

  // Setup and append a checkbox (set type attribute)
  checkboxEl.setAttribute('type', 'checkbox');
  checkboxEl.checked = item.completed;
  todoEl.appendChild(checkboxEl);
  checkboxEl.addEventListener('change', () => {
    toggleTask(item.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setup and append a span (set text)
  textEl.textContent = item.task;
  todoEl.appendChild(textEl);

  // Setup and append a button (set text)
  buttonEl.textContent = 'x';
  todoEl.appendChild(buttonEl);
  buttonEl.addEventListener('click', () => {
    removeTask(item.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h2');
  summary.textContent = `You have ${incompleteTodos.length} todos left:`;
  return summary;
};
