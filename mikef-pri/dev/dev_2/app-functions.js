'use strict';

let totalBills = 0;

// Get the account ID from the URL hash
const accountId = location.hash.substring(1);

// Load in existing account data from localStorage
const getSavedAccounts = () => {
  const accountJSON = localStorage.getItem('account');
  try {
    return accountJSON
      ? JSON.parse(accountJSON)
      : [
          {
            accountName: 'Main',
            bills: [],
          },
        ];
  } catch {
    return [
      {
        accountName: 'Main',
        bills: [],
      },
    ];
  }
};

// Iterate over the localStorage account data to import into OOP
const iterateOverAccounts = (temp) => {
  temp.forEach((acct, index) => {
    account.push({ accountName: acct.accountName, bills: [] });
    acct.bills.forEach((bill) => {
      account[index].bills.push(
        new Bill(
          bill.id,
          bill.name,
          bill.due,
          bill.totalAmount,
          bill.dueEveryMonths,
          bill.start
        )
      );
    });
  });
};

// Save modified account data to localStorage
const saveAccounts = () => {
  localStorage.setItem('account', JSON.stringify(account));
  // Update backup and restore links
  showBackupLink();
};

// Set the account selector to the current account between page changes
const setAccountSelector = () => {
  account.forEach((item, index) => {
    for (let i = 0; i < item.bills.length; i++) {
      if (accountId === item.bills[i].id) {
        document.querySelector('select#selector').value = index;
      }
    }
  });
};

// Delete a bill from the account
const deleteBill = (tableID, index) => {
  account[tableID].bills.splice(index, 1);
  saveAccounts();
};

class Bill {
  constructor(id, name, due, totalAmount, dueEveryMonths, start) {
    this.id = id;
    this.name = name;
    this.due = moment(due).format('L');
    this.totalAmount = totalAmount;
    this.dueEveryMonths = dueEveryMonths;
    this.start = start;
  }
  // If due date is on or before today's date, automatically advance the bill's date to the next payment cycle, or delete if one-time payment
  checkDate(tableID, index) {
    if (!moment(this.due).isAfter()) {
      if (this.dueEveryMonths === 0) {
        deleteBill(tableID, index);
      } else {
        this.due = moment(this.due)
          .add(this.dueEveryMonths, 'months')
          .format('L');
        saveAccounts();
      }
    }
  }
  // Calculate bill payment information and return that information to be displayed on the table
  paymentCalc() {
    let perPaycheck;
    if (this.dueEveryMonths !== 0) {
      perPaycheck =
        Math.ceil(
          100 * this.totalAmount * (12 / this.dueEveryMonths) * (1 / 26)
        ) / 100;
    } else {
      perPaycheck =
        Math.ceil(
          (100 * this.totalAmount) /
            Math.ceil(moment(this.due).diff(moment(this.start), 'days') / 14)
        ) / 100;
    }
    const paychecks = Math.floor(moment(this.due).diff(moment(), 'days') / 14);
    const toBeSaved = paychecks * perPaycheck.toFixed(2);
    const needed = this.totalAmount.toFixed(2) - toBeSaved.toFixed(2);
    totalBills = totalBills + needed;
    return [
      this.name,
      this.due,
      this.totalAmount.toFixed(2),
      paychecks.toFixed(),
      perPaycheck.toFixed(2),
      toBeSaved.toFixed(2),
      needed.toFixed(2),
      '+',
      '-',
      this.id,
    ];
  }
}
