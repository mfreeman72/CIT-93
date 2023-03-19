// Daily decisions program
const schedule = getSavedSchedule();

let driver = '';
let testForm = false;

// Main program
document.querySelector('#initError').style.visibility = 'hidden';

document
  .querySelector('#startingDate')
  .addEventListener('change', (e) => {
    startingDate = moment(e.target.value).format('MMMM Do, YYYY');
  });

document.querySelector('#driver').addEventListener('input', (e) => {
  driver = e.target.value;
});

document.querySelector('#submit').addEventListener('click', () => {
  if (testInitForm(startingDate, driver)) {
    const scheduleId = uuidv4();
    schedule.push([
      { day: '0', results: '' },
      { day: '1', results: '' },
      { day: '2', results: '' },
      { day: '3', results: '' },
      { day: '4', results: '' },
      { driver: driver },
      { startingDate: startingDate },
      { id: scheduleId },
    ]);
    saveSchedule();
    location.assign(`scheduler.html#${scheduleId}`);
  } else {
    document.querySelector('#initError').style.visibility = 'visible';
  }
});

showViewLinks();
