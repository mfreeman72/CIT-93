// None of these functions make sense for a shorthand function
// because they are not single-line return functions.

// Function to load previous schedule data
const getSavedSchedule = () => {
  const scheduleJSON = localStorage.getItem('schedule');

  if (scheduleJSON !== null) {
    return JSON.parse(scheduleJSON);
  } else {
    return [];
  }
};

// Function to save current schedule data
const saveSchedule = () => {
  localStorage.setItem('schedule', JSON.stringify(schedule));
};

// Function to make it easier to create text with different attributes
const textWithAttributes = (element, text, attr, attrName) => {
  const textWA = document.createElement(element);
  textWA.setAttribute(attr, attrName);
  textWA.textContent = text;
  document.querySelector('div.display').appendChild(textWA);
};

// Function to remove a saved schedule
const removeSchedule = (id) => {
  for (let i = 0; i < schedule.length; i++) {
    if (schedule[i][7].id === id) {
      schedule.splice(i, 1);
      saveSchedule();
    }
  }
};

// Function to create a list of links to previous schedules
const showViewLinks = () => {
  if (!schedule[0]) {
    document.querySelector('.view').remove();
    document.querySelector('div.view').remove();
  } else {
    document.querySelector('#viewContent').innerHTML = '';
    for (i = 0; i < schedule.length; i++) {
      const p = document.createElement('p');
      const link = document.createElement('a');
      const button = document.createElement('button');
      link.setAttribute('href', `scheduler.html#PREV${schedule[i][7].id}`);
      link.textContent = `${schedule[i][6].startingDate}`;
      button.setAttribute('id', schedule[i][7].id);
      button.setAttribute('class', 'material-icons');
      button.innerHTML = '&#xE872;';
      document.querySelector('div#viewContent').appendChild(link);
      document.querySelector('div#viewContent').appendChild(button);
      button.addEventListener('click', (e) => {
        removeSchedule(e.target.id);
        showViewLinks();
      });
      document.querySelector('div.view').appendChild(p);
    }
  }
};

// Function to test if the start page form is filled in
const testInitForm = (startingDate, driver) => {
  if (startingDate !== '<input type="date" id="startingDate" required="">' && driver !== '') {
    return true;
  }
};
