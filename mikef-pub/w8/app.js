// Daily decisions program

let day = 1;
let assembly = false;
let driver = '';

// Array data
const today = [
  {},
  {
    day: 'Monday',
    child1: 'Drew',
    child2: 'Tori',
  },
  {
    day: 'Tuesday',
    child1: 'Drew',
    child2: 'Tori',
  },
  {
    day: 'Wednesday',
    child1: 'Tori',
  },
  {
    day: 'Thursday',
    child1: 'Tori',
  },
  {
    day: 'Friday',
    child1: 'Drew',
    child2: 'Tori',
  },
];

// Functions
let time1 = function (dayOfWeek) {
  if (today[dayOfWeek].child2 != 'Tori') {
    leaveTime = 35;
  } else {
    leaveTime = 20;
  }
  return [
    `7:${leaveTime} - Drive to ${today[dayOfWeek].child1}'s school`,
    `7:${leaveTime + 15} - Drop off ${today[dayOfWeek].child1}`,
  ];
};

let time2 = function (dayOfWeek) {
  if (today[dayOfWeek].child2 != 'Tori') {
    return ['', ''];
  } else {
    leaveTime = 35;
    return [
      `7:${leaveTime} - Drive to ${today[dayOfWeek].child2}'s school`,
      `7:${leaveTime + 15} - Drop off ${today[dayOfWeek].child2}`,
    ];
  }
};

// I found the "setAttribute" method online at https://stackoverflow.com/questions/1115310/how-can-i-add-a-class-to-a-dom-element-in-javascript
// because I needed to have the javascript generate the text, but sorted by class so the button could identify what to change.

let textWithAttribute = function (element, text, attr, attrName) {
  const textWC = document.createElement(element);
  textWC.setAttribute(attr, attrName);
  textWC.textContent = text;
  document.querySelector('div.display').appendChild(textWC);
};

// Main program
const renderSchedule = function (dayOfWeek, assembly, driver) {
  document.querySelector('#schedule').innerHTML = '';
  if (driver === '') {
    driver = today[dayOfWeek].day;
  }
  textWithAttribute(
    'h1',
    `${driver}'s School Drop-off Schedule:`,
    'class',
    'header'
  );
  textWithAttribute('p', 'Kids being driven today:', 'class', 'driven');
  textWithAttribute('li', today[dayOfWeek].child1, 'class', 'first');

  if (today[dayOfWeek].child2 === 'Tori') {
    textWithAttribute('li', today[dayOfWeek].child2, 'class', 'second');
  }

  textWithAttribute('p', time1(dayOfWeek)[0], 'class', 'first');
  textWithAttribute('p', time1(dayOfWeek)[1], 'class', 'first');
  textWithAttribute('p', time2(dayOfWeek)[0], 'class', 'second');
  textWithAttribute('p', time2(dayOfWeek)[1], 'class', 'second');

  if (assembly && today[dayOfWeek].child2 === 'Tori') {
    document.querySelectorAll('.first').forEach(function (first) {
      first.remove();
    });
  }
};

renderSchedule(day, assembly, driver);

document.querySelector('#day').addEventListener('change', function (e) {
  day = e.target.value;
  renderSchedule(day, assembly, driver);
});

document.querySelector('#assembly').addEventListener('change', function (e) {
  assembly = e.target.checked;
  renderSchedule(day, assembly, driver);
});

document.querySelector('#driver').addEventListener('input', function (e) {
  driver = e.target.value;
  renderSchedule(day, assembly, driver);
});
