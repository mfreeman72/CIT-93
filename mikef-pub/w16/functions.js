// Initialize local array
let todos = [];

// Create List ID selector based on "userID" tag
const selectorOptions = (array) => {
    let list = [];
    array.forEach((item) => {
      if (!list.includes(`${item.userId}`)) {
        list.push(`${item.userId}`);
      }
    });
    list.forEach((item) => {
      const userOption = document.createElement('option');
      userOption.value = item;
      userOption.innerHTML = item;
      document.querySelector('#user-select').appendChild(userOption);
    });
  };
  
  // Display a todo line
  const displayTodo = (index, todo, completed) => {
    const todoItem = document.createElement('p');
    const checkBox = document.createElement('input');
    const text = document.createElement('span');
    text.textContent = ` ${todo}`;
    checkBox.setAttribute('type', 'checkbox');
    if (completed) {
        checkBox.setAttribute('checked', 'checked');
    };
    checkBox.addEventListener('change', (e) => {
        todos[index].completed = e.target.checked;
        renderTodos(todos);
    })
    todoItem.appendChild(checkBox);
    todoItem.appendChild(text);
    document.querySelector('#display').appendChild(todoItem);
  };
  
  // Render the todo list that matches the "List ID" selector and filter out completed todos unless checkbox is checked
  const renderTodos = (array) => {
    document.querySelector('#display').innerHTML = '';
    array.forEach((item) => {
      if (
        `${item.userId}` === document.querySelector('#user-select').value &&
        (!item.completed || document.querySelector('#show-completed').checked)
      ) {
        displayTodo(array.indexOf(item), item.title, item.completed);
      }
    });
  };
  