// Callback function to download todo list
const getTodos = (callback) => {
  const requestTodos = new XMLHttpRequest();
  requestTodos.addEventListener('readystatechange', (e) => {
    if (e.target.readyState === 4 && e.target.status === 200) {
      const todoList = JSON.parse(e.target.responseText);
      callback(undefined, todoList);
    } else if (e.target.readyState === 4) {
      callback(`${e.target.status}`);
    }
  });
  requestTodos.open('GET', 'https://jsonplaceholder.typicode.com/todos');
  requestTodos.send();
};
