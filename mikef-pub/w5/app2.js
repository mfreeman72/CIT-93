// Daily decisions program

//showOnPage function
const showOnPage = function (text) {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById('output');
  outputDiv.append(newParagraph);
};

// Global variables
const date = new Date();
const day = date.getDay();  // Comment out this line for manual testing
// const day = 2; // Uncomment this line for manual testing
const assembly = false;

// Array
const today = [
  {
    dayOfWeek: 'Sunday',
  },
  {
    dayOfWeek: 'Monday',
    child1: 'Drew',
    child2: 'Tori',
    time1: 20,
    time2: 35,
  },
  {
    dayOfWeek: 'Tuesday',
    child1: 'Drew',
    child2: 'Tori',
    time1: 20,
    time2: 35,
  },
  {
    dayOfWeek: 'Wednesday',
    child1: 'Tori',
    child2: '',
    time1: 35,
    time2: null,
  },
  {
    dayOfWeek: 'Thursday',
    child1: 'Tori',
    child2: '',
    time1: 35,
    time2: null,
  },
  {
    dayOfWeek: 'Friday',
    child1: 'Drew',
    child2: 'Tori',
    time1: 20,
    time2: 35,
  },
  {
    dayOfWeek: 'Saturday',
  },
];

// Modify data for assembly days
if (assembly) {
  today[day].child1 = 'Tori';
  today[day].child2 = '';
  today[day].time1 = 35;
  today[day].time2 = null;
};

// Main program
showOnPage('<h1><i>Today&rsquo;s School Drop-off Schedule:</h1></i></h1><p>');
showOnPage(`Today is ${today[day].dayOfWeek}`);
if (day < 1 || day > 5) {
  showOnPage('It&rsquo;s the weekend! No need to drive the kids to school!');
} else {
  showOnPage(
    `<i>Kids being driven today:<br>&nbsp;&nbsp;&nbsp;&nbsp;${today[day].child1}<br>&nbsp;&nbsp;&nbsp;&nbsp;${today[day].child2}</i>`
  );
  showOnPage(
    `7:${today[day].time1} - Drive to ${today[day].child1}&rsquo;s school<br>7:${today[day].time1 + 15} - Drop off ${today[day].child1}`);
  if (today[day].time2 != null) {
    showOnPage(`7:${today[day].time2} - Drive to ${today[day].child2}&rsquo;s school<br>7:${today[day].time2 + 15} - Drop off ${today[day].child2}`);
  };
};