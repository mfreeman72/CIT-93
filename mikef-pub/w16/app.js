// Download todos and put info into local array
getTodos()
  .then((tempTodos) => {
    selectorOptions(tempTodos);
    renderTodos(tempTodos);
    todos = tempTodos;
  })
  .catch((error) => {
    console.log(`${error}`);
  });

// Check for list ID selector change and re-render
document.querySelector('#user-select').addEventListener('change', () => {
  renderTodos(todos);
});

// Check for checkbox change and re-render
document.querySelector('#show-completed').addEventListener('change', () => {
  renderTodos(todos);
});
