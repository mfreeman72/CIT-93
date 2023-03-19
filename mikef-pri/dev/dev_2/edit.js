'use strict';

// Define account storage array
let account = [];
iterateOverAccounts(getSavedAccounts());

// Place current values in the input boxes
account.forEach((item, index) => {
  for (let i = 0; i < item.bills.length; i++) {
    if (accountId === item.bills[i].id) {
      document.querySelector('#name').value = item.bills[i].name;
      document.querySelector('#date').value = moment(
        item.bills[i].due,
        'MM-DD-YYYY'
      ).format('YYYY-MM-DD');
      document.querySelector('#amount').value =
        item.bills[i].totalAmount.toFixed(2);
      document.querySelector('#dueEveryMonths').value =
        item.bills[i].dueEveryMonths;
      document.querySelector('#submit').addEventListener('click', () => {
        if (!unfilledEditContents()) {
          item.bills[i].name = document.querySelector('#name').value;
          item.bills[i].due = moment(
            document.querySelector('#date').value,
            'YYYY-MM-DD'
          ).format('L');
          item.bills[i].totalAmount = Number(
            document.querySelector('#amount').value
          );
          item.bills[i].dueEveryMonths = Number(
            document.querySelector('#dueEveryMonths').value
          );
          saveAccounts();
          location.assign(`index.html#${accountId}`);
        } else {
          document
            .querySelector('div#error')
            .setAttribute('style', 'visibility: visible');
        }
      });
    }
  }
});

// Listen for Cancel button click, ignore any changes, and return to the main page
document.querySelector('#cancel').addEventListener('click', () => {
  location.assign(`index.html#${accountId}`);
});
