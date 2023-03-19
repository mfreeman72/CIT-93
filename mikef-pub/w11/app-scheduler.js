// Almost none of the functions here (with the exception of time2)
// make sense as shorthand functions, because they are not
// single-line return functions.

const schedule = getSavedSchedule();

// Array data for days of the week and child names
const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const child = ['Drew', 'Tori', 'Drew and Tori'];

// Functions to create times on the schedule display
const time1 = (dayOfWeek) => {
  if (schedule[scheduleIndex][dayOfWeek].results !== '2') {
    return [`7:20 - Drive to Drew's school`, `7:35 - Drop off Drew`];
  } else {
    return [`7:35 - Drive to Tori's school`, `7:50 - Drop off Tori`];
  }
};

const time2 = (dayOfWeek) => [`7:35 - Drive to Tori's school`, `7:50 - Drop off Tori`];
// ^^^^^ This function is the only shorthand function,
// because it is the only single-line function with just a return

// Create child dropdown selectors
const childSelector = (scheduleIndex, dayCount) => {
  const p = document.createElement('p');
  const select = document.createElement('select');
  select.setAttribute('id', dayCount);
  select.setAttribute('class', 'selector');
  const option = document.createElement('option');
  option.setAttribute('value', 0);
  option.innerHTML = '';
  select.appendChild(option);
  for (let i = 1; i <= 3; i++) {
    const option = document.createElement('option');
    option.setAttribute('value', i);
    if (edit && i === parseInt(schedule[scheduleIndex][dayCount].results)) {
      option.setAttribute('selected', 'selected');
    }
    option.innerHTML = child[i - 1];
    select.appendChild(option);
  }
  p.setAttribute('class', 'scheduleCreator');
  p.innerHTML = `Child being driven: `;
  p.appendChild(select);
  document.querySelector('div.display').appendChild(p);
};

// Test to see if any form selector elements are not filled in.
// If so, return "true"
const unfilledCheck = () => {
  for (i = 0; i <= 4; i++) {
    if (document.getElementById(i).selectedOptions[0].value === '0') {
      // Example found at https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript
      document.querySelector('#error').style.visibility = 'visible';
      return true;
    }
  }
};

// Create each day's schedule display
const dayViewer = (scheduleIndex, dayOfWeek) => {
  textWithAttributes('p', `Kids being driven today: ${child[schedule[scheduleIndex][dayOfWeek].results - 1]}`, 'class', 'driven');
  textWithAttributes('p', time1(dayOfWeek)[0], 'class', 'first');
  textWithAttributes('p', time1(dayOfWeek)[1], 'class', 'first');
  if (schedule[scheduleIndex][dayOfWeek].results === '3') {
    textWithAttributes('p', time2(dayOfWeek)[0], 'class', 'second');
    textWithAttributes('p', time2(dayOfWeek)[1], 'class', 'second');
  }
};

// Initialize and implement the final schedule view
const viewSchedule = (scheduleIndex) => {
  document.querySelector('h1.title').innerHTML = `${schedule[scheduleIndex][5].driver}'s School Drop-off Schedule for the Week of ${schedule[scheduleIndex][6].startingDate}:`;
  document.querySelector('div.display').innerHTML = '';
  for (let dayCount = 0; dayCount <= 4; dayCount++) {
    textWithAttributes('p', `${day[dayCount]}:`, 'class', 'scheduler');
    dayViewer(scheduleIndex, dayCount);
    textWithAttributes('br', '', 'class', 'scheduler');
  }
  textWithAttributes('button', 'Edit This Schedule', 'id', 'edit');
  textWithAttributes('button', 'Start Over', 'id', 'cancel');
  document.querySelector('#edit').addEventListener('click', () => {
    edit = true;
    document.querySelector('div.display').innerHTML = '';
    dailyScheduler(edit, scheduleIndex);
  });
  document.querySelector('#cancel').addEventListener('click', (e) => {
    location.assign(`index.html`);
  });
};

// Create form for the user to enter child name information
const dailyScheduler = (edit, scheduleIndex) => {
  textWithAttributes('h4', 'Please fill in daily information:', 'class', 'scheduler');
  for (let dayCount = 0; dayCount <= 4; dayCount++) {
    textWithAttributes('p', `${day[dayCount]}:`, 'class', 'scheduler');
    childSelector(scheduleIndex, dayCount);
    textWithAttributes('br', '', 'class', 'scheduler');
  }

  // Create buttons and error message
  const p = document.createElement('p');
  const create = document.createElement('button');
  const cancel = document.createElement('button');
  p.setAttribute('id', 'error');
  p.setAttribute('style', 'color: red; visibility: hidden');
  p.innerHTML = 'Please fill out all dropdowns!';
  create.setAttribute('id', 'create');
  create.setAttribute('type', 'submit');
  if (edit) {
    create.innerHTML = 'Update Schedule';
  } else {
    create.innerHTML = 'Create Schedule';
  }
  cancel.setAttribute('id', 'cancel');
  cancel.setAttribute('type', 'cancel');
  if (edit) {
    cancel.innerHTML = 'Start Over';
  } else {
    cancel.innerHTML = 'Cancel';
  }
  document.querySelector('div.display').appendChild(p);
  document.querySelector('div.display').appendChild(create);
  document.querySelector('div.display').appendChild(cancel);

  // Listen for dropdown selection
  document.querySelector('div.display').addEventListener('change', (e) => {
    const eventID = e.target.id;
    const eventResult = e.target.value;
    schedule[scheduleIndex][eventID].results = eventResult;
  });

  // Listen for "create"/"update" button click, save info, and view final schedule
  document.querySelector('#create').addEventListener('click', (e) => {
    if (!unfilledCheck()) {
      saveSchedule();
      viewSchedule(scheduleIndex);
    }
  });

  // Listen for "cancel"/"start over" button click, remove any saved info, and reload index.html
  document.querySelector('#cancel').addEventListener('click', (e) => {
    if (!edit) {
      removeSchedule(schedule[scheduleIndex][7].id);
    }
    location.assign(`index.html`);
  });
};

// Determine which index an ID belongs to
const checkId = (Id) => {
  for (i = 0; i <= schedule.length - 1; i++) {
    if (schedule[i][7].id === Id) {
      return i;
    }
  }
};

// Check if currently displayed schedule is new or previously created and redirect to appropriate functions
const checkPrevious = () => {
  if (location.hash.substring(1).includes('PREV')) {
    const scheduleId = location.hash.substring(5);
    scheduleIndex = checkId(scheduleId);
    viewSchedule(scheduleIndex);
  } else {
    const scheduleId = location.hash.substring(1);
    scheduleIndex = checkId(scheduleId);
    dailyScheduler(edit, scheduleIndex);
  }
};

// Scheduler initialization
let edit = false;
let scheduleIndex = 0;
checkPrevious();
