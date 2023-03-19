// Daily decisions program
const schedule = getSavedSchedule();

let driver = '';
let testForm = false;

// Main program
document.querySelector('#initError').style.visibility = 'hidden';

document
  .querySelector('#startingDate')
  .addEventListener('change', function (e) {
    startingDate = moment(e.target.value).format('MMMM Do, YYYY');
  });

document.querySelector('#driver').addEventListener('input', function (e) {
  driver = e.target.value;
});

document.querySelector('#submit').addEventListener('click', function () {
  if (testInitForm(startingDate, driver)) {
    const scheduleId = uuidv4();
    schedule.push([
      {'day': '0', 'results': ''},
      {'day': '1', 'results': ''},
      {'day': '2', 'results': ''},
      {'day': '3', 'results': ''},
      {'day': '4', 'results': ''},
      {'driver': driver},
      {'startingDate': startingDate},
      {'id': scheduleId}
    ]);
    saveSchedule();
    location.assign(`scheduler.html#${scheduleId}`);
  } else {
    document.querySelector('#initError').style.visibility = 'visible';
  }
});

if (schedule[0] === undefined) {
  document.querySelector('#view').remove();
} else {
  for (i = 0; i <= schedule.length - 1; i++) {
    showViewLink(i);
  }
};
