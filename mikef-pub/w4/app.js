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
// const day = 5            // Uncomment this line for manual testing
const assemblyDay = false;

// Objects and Methods
const dropoff = {
  today: function (dayOfWeek) {
    if (dayOfWeek === 0) return 'Sunday';
    if (dayOfWeek === 1) return 'Monday';
    if (dayOfWeek === 2) return 'Tuesday';
    if (dayOfWeek === 3) return 'Wednesday';
    if (dayOfWeek === 4) return 'Thursday';
    if (dayOfWeek === 5) return 'Friday';
    if (dayOfWeek === 6) return 'Saturday';
    if (dayOfWeek < 0 || dayOfWeek > 6)
      return 'some day that is outside of known time and space';
  },
  child: function (dayOfWeek, assembly) {
    if (dayOfWeek === 3 || dayOfWeek === 4 || assembly === true) {
      return 'Tori';
    } else {
      return 'Drew and Tori';
    }
  },
  time1: function (dayOfWeek, assembly) {
    if (dayOfWeek === 3 || dayOfWeek === 4 || assembly === true) {
      leaveTime = '7:35';
      dropTime = '7:50';
      firstChild = 'Tori';
    } else {
      leaveTime = '7:20';
      dropTime = '7:30';
      firstChild = 'Drew';
    }
    return `${leaveTime} - Drive to ${firstChild}&rsquo;s school<br>${dropTime} - Drop off ${firstChild}`;
  },
  time2: function (dayOfWeek, assembly) {
    if (dayOfWeek === 3 || dayOfWeek === 4 || assembly === true) {
      return ``;
    } else {
      leaveTime = '7:35';
      dropTime = '7:50';
      secondChild = 'Tori';
      return `${leaveTime} - Drive to ${secondChild}&rsquo;s school<br>${dropTime} - Drop off ${secondChild}`;
    }
  },
};

// Main program
showOnPage('<h1><i>Today&rsquo;s School Drop-off Schedule:</h1></i></h1><p>');
showOnPage(`Today is ${dropoff.today(day)}`);
if (day < 1 || day > 5) {
  showOnPage('It&rsquo;s the weekend! No need to drive the kids to school!');
} else {
  showOnPage(
    `<i>Kids being driven today: ${dropoff.child(day, assemblyDay)}</i>`
  );
  showOnPage(dropoff.time1(day, assemblyDay));
  showOnPage(dropoff.time2(day, assemblyDay));
}
