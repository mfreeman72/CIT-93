// Daily decisions program

//showOnPage function
const showOnPage = function (text) {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById('output');
  outputDiv.append(newParagraph);
};

// Array data
const today = [
  {
    day: 'Monday',
    assemblyDay: false,
  },
  {
    day: 'Tuesday',
    assemblyDay: false,
  },
  {
    day: 'Wednesday',
    assemblyDay: false,
  },
  {
    day: 'Thursday',
    assemblyDay: false,
  },
  {
    day: 'Friday',
    assemblyDay: true,
  },
];

// Functions
let child = function (dayOfWeek, assembly) {
  if (dayOfWeek === 2 || dayOfWeek === 3 || assembly === true) {
    return 'Tori';
  } else {
    return 'Drew and Tori';
  }
};

let time1 = function (dayOfWeek, assembly) {
  if (dayOfWeek === 2 || dayOfWeek === 3 || assembly === true) {
    leaveTime = 35;
    firstChild = 'Tori';
  } else {
    leaveTime = 20;
    firstChild = 'Drew';
  }
  return `7:${leaveTime} - Drive to ${firstChild}&rsquo;s school<br>7:${leaveTime + 15} - Drop off ${firstChild}`;
};

let time2 = function (dayOfWeek, assembly) {
  if (dayOfWeek === 2 || dayOfWeek === 3 || assembly === true) {
    return ``;
  } else {
    leaveTime = 35;
    secondChild = 'Tori';
    return `7:${leaveTime} - Drive to ${secondChild}&rsquo;s school<br>7:${leaveTime + 15} - Drop off ${secondChild}`;
  };
}

// Main program
showOnPage('<h1><i>This Week&rsquo;s School Drop-off Schedule:</h1></i></h1><p>');
for (dayCount = 0; dayCount <=4; dayCount++) {
  showOnPage(`<i>Kids being driven ${today[dayCount].day}: ${child(dayCount, today[dayCount].assemblyDay)}</i>`);
showOnPage(time1(dayCount, today[dayCount].assemblyDay));
showOnPage(time2(dayCount, today[dayCount].assemblyDay));
showOnPage('<hr>')
};