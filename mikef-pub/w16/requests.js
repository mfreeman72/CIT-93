// Function to download todo list
const getTodos = async () => {
  const requestTodos = await fetch(
    'https://jsonplaceholder.typicode.com/todos'
  );

  if (requestTodos.status === 200) {
    const todoList = await requestTodos.json();
    return todoList;
  } else {
    throw new Error(`${requestTodos.status}`);
  }
};
