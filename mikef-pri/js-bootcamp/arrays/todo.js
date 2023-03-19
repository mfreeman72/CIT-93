//showOnPage function
const showOnPage = function (text) {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById('output');
  outputDiv.append(newParagraph);
};

const todo = [
  {
    task: 'Wash dishes',
    completed: false,
  },
  {
    task: 'Mow the lawn',
    completed: true,
  },
  {
    task: 'Clean out the garage',
    completed: false,
  },
  {
    task: 'Pay bills',
    completed: true,
  },
  {
    task: 'Clean bedroom',
    completed: false,
  },
];

// 1. Convert array to array of objects -> text, completed
// 2. Create function to remove a todo by text values

function deleteTodo(todo, todoTask) {
  const index = todo.findIndex(function(item){
    return item.task.toLowerCase() === todoTask.toLowerCase()
  })
  if (index > -1) {
    todo.splice(index,1);
  }
}
// const findNote = function (notes, noteTitle) {
//   const index = notes.findIndex(function (note,index) {
//     return note.title.toLowerCase() === noteTitle.toLowerCase()
//   })
//   return notes[index]
// }

// deleteTodo(todo, 'mow the lawn');
// todo.forEach(function (item, index) {
//   showOnPage(`${index+1}. ${item.task} - Completed: ${item.completed}`);
// })

// Show todos yet to be completed.

const getThingsToDo = function (todo) {
  return todo.filter(function (task, index) {
    return !task.completed
  })
}

// Sort by uncompleted items first

const sortTodos = function (todo) {
  todo.sort(function (a, b) {
    if (a.completed < b.completed) {
      return -1
    } else if (b.completed < a.completed) {
      return 1
    } else {
      return 0
    }
  })
}

// Andrews Code:
// const sortTodos = function (todo) {
//   todo.sort(function (a, b) {
//     if (!a.completed && b.completed) {
//       return -1
//     } else if (!b.completed && a.completed) {
//       return 1
//     } else {
//       return 0
//     }
//   })
// }

sortTodos(todo)
todo.forEach(function (item, index) {
  showOnPage(`${index+1}. ${item.task} - Completed: ${item.completed}`);
})

// console.log(getThingsToDo(todo)) // How do I show this kind of function in showOnPage?