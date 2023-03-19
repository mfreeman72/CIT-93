// Daily decisions program

//showOnPage function
const showOnPage = function (text) {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById('output');
  outputDiv.append(newParagraph);
};

// Global variables
let day = 2;
let assemblyDay = false;

// Functions
let today = function(dayOfWeek) {
  if (dayOfWeek === 1) return 'Sunday';
  if (dayOfWeek === 2) return 'Monday';
  if (dayOfWeek === 3) return 'Tuesday';
  if (dayOfWeek === 4) return 'Wednesday';
  if (dayOfWeek === 5) return 'Thursday';
  if (dayOfWeek === 6) return 'Friday';
  if (dayOfWeek === 7) return 'Saturday';
  if (dayOfWeek <1 || dayOfWeek >7) return 'some day that is outside of known time and space';
}

let child = function (dayOfWeek, assembly) {
  if (dayOfWeek === 4 || dayOfWeek === 5 || assembly === true) {
    return 'Tori';
  } else {
    return 'Drew and Tori';
  }
};

let time1 = function (dayOfWeek, assembly) {
  if (dayOfWeek === 4 || dayOfWeek === 5 || assembly === true) {
    leaveTime = '7:35';
    dropTime = '7:50';
    firstChild = 'Tori';
  } else {
    leaveTime = '7:20';
    dropTime = '7:30';
    firstChild = 'Drew';
  }
  return `${leaveTime} - Drive to ${firstChild}&rsquo;s school<br>${dropTime} - Drop off ${firstChild}`;
};

let time2 = function (dayOfWeek, assembly) {
  if (dayOfWeek === 4 || dayOfWeek === 5 || assembly === true) {
    return ``;
  } else {
    leaveTime = '7:35';
    dropTime = '7:50';
    secondChild = 'Tori';
    return `${leaveTime} - Drive to ${secondChild}&rsquo;s school<br>${dropTime} - Drop off ${secondChild}`;
  };
}

// Main program
showOnPage('<h1><i>Today&rsquo;s School Drop-off Schedule:</h1></i></h1><p>');
showOnPage(`Today is ${today(day)}`);
if (day <2 || day > 6) {
  showOnPage('It&rsquo;s the weekend! No need to drive the kids to school!');
} else {
  showOnPage(`<i>Kids being driven today: ${child(day, assemblyDay)}</i>`);
  showOnPage(time1(day, assemblyDay));
  showOnPage(time2(day, assemblyDay));
}
