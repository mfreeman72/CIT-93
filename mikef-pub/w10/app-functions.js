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
    return [];
  }
};

// Save current schedule data
const saveSchedule = function () {
  localStorage.setItem('schedule', JSON.stringify(schedule));
};

// Function to make it easier to create text with different attributes
const textWithAttributes = function (element, text, attr, attrName) {
  const textWA = document.createElement(element);
  textWA.setAttribute(attr, attrName);
  textWA.textContent = text;
  document.querySelector('div.display').appendChild(textWA);
};

// Function to create a list of links to previous schedules
const showViewLink = function (item) {
  const p = document.createElement('p');
  const link = document.createElement('a');
  link.setAttribute('href', `scheduler.html#PREV${schedule[item][7].id}`);
  link.textContent = `${schedule[item][6].startingDate}`;
  document.querySelector('div.view').appendChild(link);
  document.querySelector('div.view').appendChild(p);
};

const testInitForm = function (startingDate, driver) {
  if (
    startingDate !== '<input type="date" id="startingDate" required="">' &&
    driver !== ''
  ) {
    return true;
  }
};
