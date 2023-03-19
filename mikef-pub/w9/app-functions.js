// Array data for days of the week
const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const child = ['Drew', 'Tori', 'Drew and Tori'];

// Functions

// Load previous schedule data
const getSavedSchedule = function () {
  const scheduleJSON = localStorage.getItem('schedule');

  if (scheduleJSON !== null) {
    return JSON.parse(scheduleJSON);
  } else {
    return [
      { ID: '', results: '' },
      { ID: '', results: '' },
      { ID: '', results: '' },
      { ID: '', results: '' },
      { ID: '', results: '' },
      { driver: '' },
      { startingDate: '' },
    ];
  }
};

// Save current schedule data
const saveSchedule = function () {
  localStorage.setItem('schedule', JSON.stringify(schedule));
};

// Convert date into a nicer format
const convertDate = (startingDate) => {
  // Example found at https://css-tricks.com/how-to-convert-a-date-string-into-a-human-readable-format/
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(startingDate).toLocaleDateString(undefined, options);
};

// Functions to create times on the schedule display
const time1 = function (dayOfWeek) {
  if (schedule[dayOfWeek].results !== '2') {
    return [`7:20 - Drive to Drew's school`, `7:35 - Drop off Drew`];
  } else {
    return [`7:35 - Drive to Tori's school`, `7:50 - Drop off Tori`];
  }
};

const time2 = function (dayOfWeek) {
  if (schedule[dayOfWeek].results === '3') {
    return [`7:35 - Drive to Tori's school`, `7:50 - Drop off Tori`];
  }
};

// Function to make it easier to create text with different attributes
const textWithAttributes = function (element, text, attr, attrName) {
  const textWA = document.createElement(element);
  textWA.setAttribute(attr, attrName);
  textWA.textContent = text;
  document.querySelector('div.display').appendChild(textWA);
};

// Create child dropdown selectors
const childSelector = function (ID) {
  const p = document.createElement('p');
  const select = document.createElement('select');
  select.setAttribute('id', ID);
  select.setAttribute('class', 'selector');
  const option = document.createElement('option');
  option.setAttribute('value', 0);
  option.innerHTML = '';
  select.appendChild(option);
  for (let i = 1; i <= 3; i++) {
    const option = document.createElement('option');
    option.setAttribute('value', i);
    option.innerHTML = child[i - 1];
    select.appendChild(option);
  }
  p.setAttribute('class', 'scheduleCreator');
  p.innerHTML = `Child being driven: `;
  p.appendChild(select);
  document.querySelector('div.display').appendChild(p);
};

// Test to see if all form elements are filled
const unfilledCheck = function () {
  for (i = 0; i <= 4; i++) {
    if (
      document.getElementById(`${schedule[i].ID}`).selectedOptions[0].value ===
      '0'
    ) {
      // Example found at https://stackoverflow.com/questions/1085801/get-selected-value-in-dropdown-list-using-javascript
      document.querySelector('#error').style.visibility = 'visible';
      return true;
    }
  }
};

// Create each day's schedule display
const dayViewer = function (dayOfWeek) {
  if (schedule[dayOfWeek].results === '1') {
    childName = 'Drew';
  }
  if (schedule[dayOfWeek].results === '2') {
    childName = 'Tori';
  }
  if (schedule[dayOfWeek].results === '3') {
    childName = 'Drew and Tori';
  }
  textWithAttributes(
    'p',
    `Kids being driven today: ${childName}`,
    'class',
    'driven'
  );
  textWithAttributes('p', time1(dayOfWeek)[0], 'class', 'first');
  textWithAttributes('p', time1(dayOfWeek)[1], 'class', 'first');
  if (schedule[dayOfWeek].results === '3') {
    textWithAttributes('p', time2(dayOfWeek)[0], 'class', 'second');
    textWithAttributes('p', time2(dayOfWeek)[1], 'class', 'second');
  }
};

// Initialize and implement the final schedule view
const viewSchedule = function () {
  document.querySelector('div.display').style.visibility = 'visible';
  document.querySelector(
    'h1.title'
  ).innerHTML = `${schedule[5].driver}'s School Drop-off Schedule for the Week of ${schedule[6].startingDate}:`;
  document.querySelector('#schedule').innerHTML = '';
  for (let dayCount = 0; dayCount <= 4; dayCount++) {
    const dayID = schedule[dayCount].ID;
    textWithAttributes('p', `${day[dayCount]}:`, 'class', 'scheduler');
    dayViewer(dayCount);
    textWithAttributes('br', '', 'class', 'scheduler');
  }
};

// Create form for the user to enter final schedule information
const dailyScheduler = function (startingDate, driver) {
  schedule.startingDate = convertDate(startingDate);
  textWithAttributes(
    'h4',
    'Please fill in daily information:',
    'class',
    'scheduler'
  );
  for (let dayCount = 0; dayCount <= 4; dayCount++) {
    const dayID = uuidv4();
    schedule[dayCount].ID = dayID;
    textWithAttributes('p', `${day[dayCount]}:`, 'class', 'scheduler');
    childSelector(dayID);
    textWithAttributes('br', '', 'class', 'scheduler');
  }

  // Create button and error message
  const p = document.createElement('p');
  const create = document.createElement('button');
  p.setAttribute('id', 'error');
  p.setAttribute('style', 'color: red; visibility: hidden');
  p.innerHTML = 'Please fill out all dropdowns!';
  create.setAttribute('id', 'create');
  create.setAttribute('type', 'submit');
  create.innerHTML = 'Create Schedule';
  document.querySelector('div.display').appendChild(p);
  document.querySelector('div.display').appendChild(create);

  // Listen for dropdown selection
  document
    .querySelector('div.display')
    .addEventListener('change', function (e) {
      const eventID = e.target.id;
      const eventResult = e.target.value;
      schedule.forEach(function (item, index) {
        if (item.ID === eventID) {
          schedule[index].results = eventResult;
        }
      });
    });

  // Listen for button click, save info, and view final schedule
  document.querySelector('#create').addEventListener('click', function (e) {
    if (unfilledCheck() !== true) {
      saveSchedule();
      viewSchedule();
    }
  });
};

// Initialize page and data and run schedule creator
const renderScheduler = function (startingDate, driver) {
  schedule[5].driver = driver;
  schedule[6].startingDate = startingDate;
  saveSchedule();
  document.querySelector('div.display').style.visibility = 'visible';
  document.querySelector('#init').remove();
  document.querySelector('#schedule').innerHTML = '';
  dailyScheduler(startingDate, driver);
};

const testInitForm = function (startingDate, driver) {
  if (
    startingDate !== '<input type="date" id="startingDate" required="">' && driver !== '') {
    return true;
  }
};
