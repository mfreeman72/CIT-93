// showOnPage function
const showOnPage = function (text) {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById('output');
  outputDiv.append(newParagraph);
};

//Global variables
let totalBills = 0;

// Arrays Objects and Methods
const account = {
  accountName: ['Main Checking'],
  bills: [
    {
      name: 'Solar True-up',
      due: '12/18/22',
      totalAmount: 90.07,
      dueEveryMonths: 12,
    },
    {
      name: 'Phone/Internet',
      due: '03/09/22',
      totalAmount: 132.40,
      dueEveryMonths: 1,
    },
    {
      name: 'Car Insurance',
      due: '06/01/22',
      totalAmount: 352.85,
      dueEveryMonths: 6,
    },
  ],
  addEntry: function (name, due, totalAmount, dueEveryMonths) { // Borrowed from expense-tracker exercise
    this.bills.push({
      name: name,
      due: due,
      totalAmount: totalAmount,
      dueEveryMonths: dueEveryMonths,
    });
  },
  deleteEntry: function (index) {
    this.bills.splice(index, 1);
  },
};

// At least 2 functions

const diffDate = function (item) {
  const dateDue = new Date(item.due);
  const dateToday = new Date();
  const diffTime = dateDue - dateToday;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Date/Time manipulation modified from a post found here: https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
};

const paymentCalc = function (item,index) {
  const perPaycheck = Math.ceil(100 * item.totalAmount * (12 / item.dueEveryMonths) * (1 / 26)) / 100;
  const paychecks = diffDate(item) / 14;
  const toBeSaved = paychecks.toFixed() * perPaycheck.toFixed(2);
  const needed = item.totalAmount.toFixed(2) - toBeSaved.toFixed(2);
  totalBills = totalBills + needed;
  return `${index + 1}. Payments to: ${item.name}<br>&nbsp;&nbsp;&nbsp;&nbsp; Date total is due: ${item.due}<br>&nbsp;&nbsp;&nbsp;&nbsp; Total Amount: $${item.totalAmount.toFixed(2)}<br>&nbsp;&nbsp;&nbsp;&nbsp; Number of paychecks until due: ${paychecks.toFixed()}<br>&nbsp;&nbsp;&nbsp;&nbsp; Amount to save per paycheck: $${perPaycheck.toFixed(2)}<br>&nbsp;&nbsp;&nbsp;&nbsp; Total left to be saved: $${toBeSaved.toFixed(2)}<br>&nbsp;&nbsp;&nbsp;&nbsp; Amount that should be in account now: $${needed.toFixed(2)}`
};

// Add a bill
account.addEntry('Netflix', '03/15/22', 9.99, 1); // Adds Netflix bill to account

// Delete a bill
account.deleteEntry(2); // Removes 3rd bill (Car Insurance) from account

// Loop through objects for calculation and display
showOnPage(`<u>Bills for account: ${account.accountName}:</u>`);

account.bills.forEach(function (item, index) {
  showOnPage(paymentCalc(item,index));
});

showOnPage(`<b><i>Total that should be in ${account.accountName} to cover all of the above: $${totalBills.toFixed(2)}</i></b>`);