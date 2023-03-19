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

// Save modified account data to localStorage
const saveAccounts = () => {
  localStorage.setItem('account', JSON.stringify(account));
};

const setAccountSelector = () => {
  account.forEach((item, index) => {
    for (let i = 0; i < item.bills.length; i++) {
      if (accountId === item.bills[i].id) {
        console.log(`${index}`);
        document.querySelector('select#selector').value = index;
      }
    }
  });
};

// Add a new bill to the account
const addBill = (accountIndex, name, due, totalAmount, dueEveryMonths) => {
  account[accountIndex].bills.push({
    id: uuidv4(),
    name: name,
    due: moment(due).format('L'),
    totalAmount: totalAmount,
    dueEveryMonths: dueEveryMonths,
    start: moment().format('L'),
  });
  generateTable();
  saveAccounts();
};

// Delete a bill from the account
const deleteBill = (tableID, index) => {
  account[tableID].bills.splice(index, 1);
  saveAccounts();
};

const createCell = (content, width, bgcolor) => {
  const tableCell = document.createElement('td');
  tableCell.setAttribute('width', width);
  tableCell.setAttribute('bgcolor', bgcolor);
  tableCell.appendChild(content);
  return tableCell;
};

// Create each row of data in the table
const createRow = (tableID, content, row) => {
  const tableRow = document.createElement('tr');
  tableRow.setAttribute('id', content[9]);
  for (let count = 0; count < 9; count++) {
    let bgcolor;
    if (row === -1) {
      bgcolor = 'white';
    } else {
      row & 1 ? (bgcolor = 'beige') : (bgcolor = 'lightcyan'); // Use of "bitwise &" to test for even vs odd found here: https://stackoverflow.com/questions/6211613/testing-whether-a-value-is-odd-or-even
    }
    if (content[count] === '+') {
      const editButton = document.createElement('button');
      editButton.setAttribute('id', content[9]);
      editButton.setAttribute('class', 'material-icons');
      editButton.innerHTML = '&#xE254;';
      editButton.addEventListener('click', () => {
        location.assign(`edit.html#${content[9]}`);
      });
      tableRow.appendChild(createCell(editButton, '6%', 'white'));
    } else if (content[count] === '-') {
      const deleteButton = document.createElement('button');
      deleteButton.setAttribute('id', content[9]);
      deleteButton.setAttribute('class', 'material-icons');
      deleteButton.innerHTML = '&#xE872;';
      deleteButton.addEventListener('click', (e) => {
        for (let i = 0; i < account[tableID].bills.length; i++) {
          if (account[tableID].bills[i].id === e.target.id) {
            deleteBill(tableID, i);
          }
        }
        generateTable();
      });
      tableRow.appendChild(createCell(deleteButton, '6%', 'white'));
    } else if (content[count] === '') {
      const cellContent = document.createTextNode(content[count]);
      tableRow.appendChild(createCell(cellContent, '14%', 'white'));
    } else {
      const cellContent = document.createTextNode(content[count]);
      tableRow.appendChild(createCell(cellContent, '14%', bgcolor));
    }
  }
  return tableRow;
};

// Create the table headings
const tableHeader = (tableID) => {
  const tableRow = createRow(
    tableID,
    [
      'Payments to:',
      'Date total is due:',
      'Total Amount:',
      'Paychecks until due:',
      'Save per paycheck:',
      'Total left to be saved:',
      'Should be in account now:',
      '',
      '',
    ],
    -1
  );
  return tableRow;
};

// If due date is on or before today's date, automatically advance the bill's date to the next payment cycle, or delete if one-time payment
const checkBillDate = (tableID, item, index) => {
  if (!moment(item.due).isAfter()) {
    if (item.dueEveryMonths === 0) {
      deleteBill(tableID, index);
    } else {
      item.due = moment(item.due)
        .add(item.dueEveryMonths, 'months')
        .format('L');
      saveAccounts();
    }
  }
};

// Calculate bill payment information and return that information to be displayed on the table
const paymentCalc = (tableID, item, index) => {
  let perPaycheck;
  checkBillDate(tableID, item, index);
  if (item.dueEveryMonths !== 0) {
    perPaycheck =
      Math.ceil(
        100 * item.totalAmount * (12 / item.dueEveryMonths) * (1 / 26)
      ) / 100;
  } else {
    perPaycheck =
      Math.ceil(
        (100 * item.totalAmount) /
          (moment(item.due).diff(moment(item.start), 'days') / 14)
      ) / 100;
  }
  const paychecks = moment(item.due).diff(moment(), 'days') / 14;
  const toBeSaved = paychecks.toFixed() * perPaycheck.toFixed(2);
  const needed = item.totalAmount.toFixed(2) - toBeSaved.toFixed(2);
  totalBills = totalBills + needed;
  return [
    item.name,
    item.due,
    item.totalAmount.toFixed(2),
    paychecks.toFixed(),
    perPaycheck.toFixed(2),
    toBeSaved.toFixed(2),
    needed.toFixed(2),
    '+',
    '-',
    item.id,
  ];
};

// Check if any form elements are empty, and return true
const unfilledEditContents = () => {
  if (
    document.querySelector('#name').value === '' ||
    document.querySelector('#date').value === '' ||
    document.querySelector('#amount').value === null ||
    document.querySelector('#dueEveryMonths').value === '' ||
    moment(document.querySelector('#date').value).isBefore() ||
    document.querySelector('#amount').value <= 0 ||
    (moment(document.querySelector('#date').value).diff(moment(), 'months') >
      document.querySelector('#dueEveryMonths').value &&
      document.querySelector('#dueEveryMonths').value !== '0')
  ) {
    return true;
  } else {
    return false;
  }
};

// Create a new row for entering new bill data
const newRow = (content) => {
  const getTable = document.querySelector('table#display');
  const newRow = getTable.insertRow(-1);
  const submitButton = document.createElement('button');
  const cancelButton = document.createElement('button');
  submitButton.setAttribute('class', 'submit');
  cancelButton.setAttribute('class', 'cancel');
  for (let i = 0; i <= 3; i++) {
    const newCell = newRow.insertCell(0);
    newCell.appendChild(content[i]);
    newRow.appendChild(newCell);
  }
  for (let i = 4; i <= 6; i++) {
    let newCell = newRow.insertCell(0);
    newCell.innerHTML = '--';
    newRow.appendChild(newCell);
  }
  let newCell = newRow.insertCell(0);
  submitButton.setAttribute('class', 'material-icons');
  submitButton.innerHTML = '&#xE876;';
  submitButton.addEventListener('click', () => {
    if (!unfilledEditContents()) {
      addBill(
        document.querySelector('select#selector').value,
        document.querySelector('#name').value,
        document.querySelector('#date').value,
        Number(document.querySelector('#amount').value),
        Number(document.querySelector('#dueEveryMonths').value)
      );
    } else {
      document
        .querySelector('#error')
        .setAttribute(
          'style',
          'visibility: visible; color: red; text-align: center; font-style: italic'
        );
    }
  });
  newCell.appendChild(submitButton);
  newRow.appendChild(newCell);
  newCell = newRow.insertCell(0);
  cancelButton.setAttribute('class', 'material-icons');
  cancelButton.innerHTML = '&#xE5CD;';
  cancelButton.addEventListener('click', () => {
    generateTable();
  });
  newCell.appendChild(cancelButton);
  newRow.appendChild(newCell);
};

// Create input forms for new bill data
const addBillForm = () => {
  const newName = document.createElement('input');
  const newDue = document.createElement('input');
  const newAmount = document.createElement('input');
  const newDueEveryMonths = document.createElement('select');
  const monthInit = document.createElement('option');
  const oneTime = document.createElement('option');
  newName.setAttribute('type', 'text');
  newName.setAttribute('id', 'name');
  newName.setAttribute('placeholder', 'Name of Bill');
  newDue.setAttribute('type', 'date');
  newDue.setAttribute('id', 'date');
  newAmount.setAttribute('type', 'number');
  newAmount.setAttribute('id', 'amount');
  newDueEveryMonths.setAttribute('id', 'dueEveryMonths');
  monthInit.setAttribute('value', '');
  monthInit.setAttribute('disabled', '');
  monthInit.setAttribute('selected', '');
  monthInit.innerHTML = 'Frequency of Payments';
  newDueEveryMonths.appendChild(monthInit);
  oneTime.setAttribute('value', '0');
  oneTime.innerHTML = 'One-time payment';
  newDueEveryMonths.appendChild(oneTime);
  for (let i = 1; i <= 12; i++) {
    const monthOptions = document.createElement('option');
    monthOptions.setAttribute('value', `${i}`);
    if (i === 1) {
      monthOptions.innerHTML = `Every month`;
    } else {
      monthOptions.innerHTML = `Every ${i} months`;
    }
    newDueEveryMonths.appendChild(monthOptions);
  }
  newRow([newName, newDue, newAmount, newDueEveryMonths]);
};

// Generate the main bill calculation display table
const generateTable = (accountName) => {
  totalBills = 0;
  const tableID = document.querySelector('select#selector').value;
  document.querySelector('#display').innerHTML = '';
  const tableDisplay = document.createElement('table');
  const tableRow = tableHeader(tableID);
  const addButton = document.createElement('button');
  tableDisplay.setAttribute('id', 'display');
  tableDisplay.setAttribute('border', '0');
  tableDisplay.setAttribute('cellpadding', '1');
  tableDisplay.setAttribute('cellspacing', '5');
  tableDisplay.setAttribute('width', '100%');
  tableDisplay.appendChild(tableRow);
  for (let i = 0; i < account[tableID].bills.length; i++) {
    const tableRow = createRow(
      tableID,
      paymentCalc(tableID, account[tableID].bills[i], i),
      i
    );
    tableDisplay.appendChild(tableRow);
  }
  document.querySelector('div.display').appendChild(tableDisplay);
  addButton.setAttribute('id', 'addBill');
  addButton.textContent = 'Add New Bill';
  addButton.addEventListener('click', () => {
    addBillForm();
  });
  document.querySelector('div.display').appendChild(addButton);
  const errorMessage = document.createElement('p');
  errorMessage.setAttribute('id', 'error');
  errorMessage.setAttribute('style', 'visibility: hidden');
  errorMessage.innerHTML = 'Please fill in all fields with sensible values!';
  document.querySelector('div.display').appendChild(errorMessage);

  const totalMessage = document.createElement('p');
  totalMessage.innerHTML = `Total that should be in this account to cover all of the above: $${totalBills.toFixed(
    2
  )}`;
  document.querySelector('div.display').appendChild(totalMessage);
};

// Display the account selector
const renderAccountSelector = () => {
  const accountSelector = document.createElement('select');
  accountSelector.setAttribute('id', 'selector');
  accountSelector.addEventListener('change', () => {
    generateTable();
  });
  document.querySelector('#accountSelect').appendChild(accountSelector);

  account.forEach((item, index) => {
    const optionTag = document.createElement('option');
    const accountOption = document.createTextNode(item.accountName);
    optionTag.appendChild(accountOption);
    optionTag.setAttribute('value', index);
    accountSelector.appendChild(optionTag);
    document.querySelector('#accountSelect').appendChild(accountSelector);
  });

  const manageAccountsButton = document.createElement('button');
  manageAccountsButton.setAttribute('id', 'addAccount');
  manageAccountsButton.textContent = 'Manage Accounts';
  manageAccountsButton.addEventListener('click', () => {
    location.assign('manage-accounts.html');
  });
  const space = document.createElement('span');
  space.innerHTML = ' ';
  document.querySelector('#accountSelect').appendChild(space);
  document.querySelector('#accountSelect').appendChild(manageAccountsButton);
};
