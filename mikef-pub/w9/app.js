// Daily decisions program
const schedule = getSavedSchedule();

console.log(schedule);
let driver = '';
let testForm = false;
let childName = '';

// Main program
document.querySelector('div.display').style.visibility = 'hidden';
document.querySelector('#separator').style.visibility = 'hidden';
document.querySelector('#initError').style.visibility = 'hidden';

document
  .querySelector('#startingDate')
  .addEventListener('change', function (e) {
    startingDate = e.target.value;
  });

document.querySelector('#driver').addEventListener('input', function (e) {
  driver = e.target.value;
});

document.querySelector('#submit').addEventListener('click', function () {
  if (testInitForm(startingDate, driver)) {
    document.querySelector('div.header').remove();
    renderScheduler(startingDate, driver);
  } else {
    document.querySelector('#initError').style.visibility = 'visible';
  }
});

if (schedule[0].ID === '') {
  document.querySelector('#view').remove();
} else {
  document.querySelector('#view').addEventListener('click', function () {
    document.querySelector('div.header').remove();
    viewSchedule();
  })
};
