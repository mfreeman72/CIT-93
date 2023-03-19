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
const day = date.getDay();

// Array data
const today = [
  {
    dayOfWeek: 'Monday',
    child1: 'Drew',
    child2: 'Tori',
    time1: 20,
    time2: 35,
    assembly: false,
  },
  {
    dayOfWeek: 'Tuesday',
    child1: 'Drew',
    child2: 'Tori',
    time1: 20,
    time2: 35,
    assembly: false,
  },
  {
    dayOfWeek: 'Wednesday',
    child1: 'Tori',
    child2: '',
    time1: 35,
    time2: null,
    assembly: false,
  },
  {
    dayOfWeek: 'Thursday',
    child1: 'Tori',
    child2: '',
    time1: 35,
    time2: null,
    assembly: false,
  },
  {
    dayOfWeek: 'Friday',
    child1: 'Drew',
    child2: 'Tori',
    time1: 20,
    time2: 35,
    assembly: true,
  },
];


// Main program
showOnPage('<h1><i>This Week&rsquo;s School Drop-off Schedule:</h1></i></h1><p>');
showOnPage(`Today is ${today[day].dayOfWeek}<hr>`);
for (dayCount = 0; dayCount <=4; dayCount++) {
if (today[dayCount].assembly) {     // Modify data for assembly days
  today[dayCount].child1 = 'Tori';  //
  today[dayCount].child2 = '';      //
  today[dayCount].time1 = 35;       //
  today[dayCount].time2 = null;     //
};                                  //
  showOnPage(
    `<i>Kids being driven on ${today[dayCount].dayOfWeek}:<br>&nbsp;&nbsp;&nbsp;&nbsp;${today[dayCount].child1}<br>&nbsp;&nbsp;&nbsp;&nbsp;${today[dayCount].child2}</i>`
  );
  showOnPage(
    `7:${today[dayCount].time1} - Drive to ${today[dayCount].child1}&rsquo;s school<br>7:${today[dayCount].time1 + 15} - Drop off ${today[dayCount].child1}`);
  if (today[dayCount].time2 != null) {
    showOnPage(`7:${today[dayCount].time2} - Drive to ${today[dayCount].child2}&rsquo;s school<br>7:${today[dayCount].time2 + 15} - Drop off ${today[dayCount].child2}`);
  };
  showOnPage('<hr>')
};