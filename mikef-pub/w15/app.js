// Download todos and trigger callback when done and put info into local array
getTodos((error, tempTodos) => {
  if (error) {
    console.log(`Error: ${error}`);
  } else {
    selectorOptions(tempTodos);
    renderTodos(tempTodos);
    todos = tempTodos;
  }
});

// Check for list ID selector change and re-render
document.querySelector('#user-select').addEventListener('change', () => {
  renderTodos(todos);
});

// Check for checkbox change and re-render
document.querySelector('#show-completed').addEventListener('change', () => {
  renderTodos(todos);
});
