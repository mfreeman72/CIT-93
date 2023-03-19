// Daily decisions program

// Global variables
const date = new Date();
const day = date.getDay(); // Comment out this line for manual testing
// day = 4; // Uncomment this line for manual testing

// Array data
const today = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// Functions
let child = function (dayOfWeek) {
  if (dayOfWeek === 3 || dayOfWeek === 4 || assembly === true) {
    return ['Tori', 'test'];
  } else {
    return ['Drew', 'Tori'];
  }
};

let time1 = function (dayOfWeek) {
  if (dayOfWeek === 3 || dayOfWeek === 4) {
    leaveTime = 35;
    firstChild = 'Tori';
  } else {
    leaveTime = 20;
    firstChild = 'Drew';
  }
  return [
    `7:${leaveTime} - Drive to ${firstChild}'s school`,
    `7:${leaveTime + 15} - Drop off ${firstChild}`,
  ];
};

let time2 = function (dayOfWeek) {
  if (dayOfWeek === 3 || dayOfWeek === 4) {
    return ['', ''];
  } else {
    leaveTime = 35;
    secondChild = 'Tori';
    return [
      `7:${leaveTime} - Drive to ${secondChild}'s school`,
      `7:${leaveTime + 15} - Drop off ${secondChild}`,
    ];
  }
};

// I found the "setAttribute" method online at https://stackoverflow.com/questions/1115310/how-can-i-add-a-class-to-a-dom-element-in-javascript
// because I needed to have the javascript generate the text, but sorted by class so the button could identify what to change.

let textWithAttribute = function (element, text, attr, attrName) {
  const textWC = document.createElement(element);
  textWC.setAttribute(attr, attrName);
  textWC.textContent = text;
  document.querySelector('body').appendChild(textWC);
};

// Main program
const header = document.createElement('h1');
header.textContent = `${today[day]}'s School Drop-off Schedule:`;
document.querySelector('body').appendChild(header);

if (day < 1 || day > 5) {
  document.querySelectorAll('#assembly').forEach(function (assembly) {
    assembly.remove();
  });
  const drivenText = document.createElement('p');
  drivenText.textContent = 'Enjoy the weekend! No kids to drop off today!';
  document.querySelector('body').appendChild(drivenText);
} else {
  const drivenText = document.createElement('p');
  drivenText.textContent = 'Kids being driven today:';
  document.querySelector('body').appendChild(drivenText);

  textWithAttribute('li', child(day)[0], 'class', 'first');

  if (day === 1 || day === 2 || day === 5) {
    textWithAttribute('li', child(day)[1], 'class', 'second');
  }

  textWithAttribute('p', time1(day)[0], 'class', 'first');
  textWithAttribute('p', time1(day)[1], 'class', 'first');
  textWithAttribute('p', time2(day)[0], 'class', 'second');
  textWithAttribute('p', time2(day)[1], 'class', 'second');

  document.querySelector('#assembly').addEventListener('click', function (e) {
    e.target.textContent = 'Today is an assembly day';
      document.querySelectorAll('.first').forEach(function (first) {
        first.remove();
      });
  if (day === 3 || day === 4) {
    const noDropOff = document.createElement('p');
    drivenText.textContent = 'No kids to drop off today!';
    document.querySelector('body').appendChild(noDropOff);
  }
  });
}
