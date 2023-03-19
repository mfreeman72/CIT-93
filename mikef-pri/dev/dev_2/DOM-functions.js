'use strict';

// Link to backup account data to file - modified from https://www.codegrepper.com/code-examples/javascript/save+array+file
const showBackupLink = () => {
  document.querySelector('#backup').innerHTML = 'Backup accounts to file:';
  const br = document.createElement('br');
  const a = document
    .querySelector('#backup')
    .appendChild(document.createElement('a'));
  const button = document.createElement('button');
  button.innerHTML = 'Download';
  a.download = 'backup.act';
  a.href = 'data:text/plain;base64,' + btoa(JSON.stringify(account));
  a.appendChild(br);
  a.appendChild(button);
};

// Create Table Cell
const createCell = (content, width, bgcolor) => {
  const tableCell = document.createElement('td');
  tableCell.setAttribute('width', width);
  tableCell.setAttribute('bgcolor', bgcolor);
  tableCell.appendChild(content);
  return tableCell;
};

// Create Button
const createButton = (buttonId, buttonClass, buttonText) => {
  const newButton = document.createElement('button');
  newButton.setAttribute('id', buttonId);
  newButton.setAttribute('class', buttonClass);
  newButton.innerHTML = buttonText;
  return newButton;
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
      const editButton = createButton(content[9], 'material-icons', '&#xE254;');
      editButton.addEventListener('click', () => {
        location.assign(`edit.html#${content[9]}`);
      });
      tableRow.appendChild(createCell(editButton, '6%', 'white'));
    } else if (content[count] === '-') {
      const deleteButton = createButton(
        content[9],
        'material-icons',
        '&#xE872;'
      );
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

// Create a new row for entering new bill data
const newRow = (content) => {
  const getTable = document.querySelector('table#display');
  const newRow = getTable.insertRow(-1);
  const submitButton = createButton(content[9], 'material-icons', '&#xE876;');
  const cancelButton = createButton(content[9], 'material-icons', '&#xE5CD;');
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
  submitButton.addEventListener('click', () => {
    if (!unfilledEditContents()) {
      account[document.querySelector('select#selector').value].bills.push(
        new Bill(
          uuidv4(),
          document.querySelector('#name').value,
          document.querySelector('#date').value,
          Number(document.querySelector('#amount').value),
          Number(document.querySelector('#dueEveryMonths').value),
          moment().format('L')
        )
      );
      generateTable();
      saveAccounts();
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
  cancelButton.addEventListener('click', () => {
    generateTable();
  });
  newCell.appendChild(cancelButton);
  newRow.appendChild(newCell);
};

// Create form input field
const newField = (fieldType, fieldId, fieldPlaceholder) => {
  const field = document.createElement('input');
  field.setAttribute('type', fieldType);
  field.setAttribute('id', fieldId);
  field.setAttribute('placeholder', fieldPlaceholder);
  return field;
};

// Create input forms for new bill data
const addBillForm = () => {
  const newName = newField('text', 'name', 'Name of Bill');
  const newDue = newField('date', 'date', '');
  const newAmount = newField('number', 'amount', '');
  const newDueEveryMonths = document.createElement('select');
  const monthInit = document.createElement('option');
  const oneTime = document.createElement('option');
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
  const addButton = createButton('addBill', 'addBill', 'Add New Bill');
  tableDisplay.setAttribute('id', 'display');
  tableDisplay.setAttribute('border', '0');
  tableDisplay.setAttribute('cellpadding', '1');
  tableDisplay.setAttribute('cellspacing', '5');
  tableDisplay.setAttribute('width', '100%');
  tableDisplay.appendChild(tableRow);
  for (let i = 0; i < account[tableID].bills.length; i++) {
    account[tableID].bills[i].checkDate();
    const tableRow = createRow(
      tableID,
      account[tableID].bills[i].paymentCalc(),
      i
    );
    tableDisplay.appendChild(tableRow);
  }
  document.querySelector('div.display').appendChild(tableDisplay);
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
  document.querySelector('#accountSelect').innerHTML = 'Bills for account: ';
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

  const manageAccountsButton = createButton(
    'addAccount',
    'addAccount',
    'Manage Accounts'
  );
  manageAccountsButton.addEventListener('click', () => {
    location.assign('manage-accounts.html');
  });
  const space = document.createElement('span');
  space.innerHTML = ' ';
  document.querySelector('#accountSelect').appendChild(space);
  document.querySelector('#accountSelect').appendChild(manageAccountsButton);
};

// Create an account name editor box
const nameEditor = (acntName, index) => {
  document.querySelector(
    `p#${acntName.replace(/([^a-z0-9]+)/gi, '-')}`
  ).innerHTML = ''; // Remove invalid characters, found at https://stackoverflow.com/questions/3780696/javascript-string-replace-with-regex-to-strip-off-illegal-characters
  const editBox = document.createElement('input');
  if (acntName !== 'new') {
    editBox.value = acntName;
  } else {
    editBox.setAttribute('placeholder', 'Account Name');
  }
  const submitButton = createButton('submit', 'material-icons', '&#xE876;');
  const cancelButton = createButton('cancel', 'material-icons', '&#xE5CD;');
  submitButton.addEventListener('click', () => {
    if (editBox.value !== '') {
      if (acntName !== 'new') {
        account[index].accountName = editBox.value;
        saveAccounts();
        listAccounts();
        bottomButtons();
      } else {
        account.push({ accountName: editBox.value, bills: [] });
        saveAccounts();
        listAccounts();
        bottomButtons();
      }
    }
  });
  cancelButton.addEventListener('click', () => {
    listAccounts();
    bottomButtons();
  });
  document
    .querySelector(`p#${acntName.replace(/([^a-z0-9]+)/gi, '-')}`)
    .appendChild(editBox);
  document
    .querySelector(`p#${acntName.replace(/([^a-z0-9]+)/gi, '-')}`)
    .appendChild(submitButton);
  document
    .querySelector(`p#${acntName.replace(/([^a-z0-9]+)/gi, '-')}`)
    .appendChild(cancelButton);
};

// List all account names with edit and delete buttons
const listAccounts = () => {
  document.querySelector('div.display').innerHTML = '';
  account.forEach((acnt, index) => {
    const accountDisplay = document.createElement('p');
    const editButton = createButton(
      acnt.accountName.replace(/([^a-z0-9]+)/gi, '-'),
      'material-icons',
      '&#xE254;'
    );
    const nameText = document.createTextNode(acnt.accountName);
    const newLine = document.createElement('p');
    accountDisplay.setAttribute(
      'id',
      acnt.accountName.replace(/([^a-z0-9]+)/gi, '-')
    );
    editButton.setAttribute('align', 'center');
    editButton.addEventListener('click', () => {
      nameEditor(acnt.accountName, index);
    });
    newLine.setAttribute('id', 'new');
    newLine.innerHTML = '';
    accountDisplay.appendChild(editButton);
    // Only display delete button if there are more than one account
    if (account.length > 1) {
      const deleteButton = createButton(
        acnt.accountName.replace(/([^a-z0-9]+)/gi, '-'),
        'material-icons',
        '&#xE872;'
      );
      deleteButton.addEventListener('click', () => {
        account.splice(index, 1);
        saveAccounts();
        listAccounts();
        bottomButtons();
      });
      accountDisplay.appendChild(deleteButton);
    }
    accountDisplay.appendChild(nameText);
    accountDisplay.appendChild(newLine);
    document.querySelector('div.display').appendChild(accountDisplay);
  });
};

// Display add and back buttons at the bottom of the list
const bottomButtons = () => {
  const newAccount = createButton('new', 'new', 'Add New Account');
  const cancel = createButton('cancel', 'cancel', 'Back');
  const space = document.createElement('span');
  newAccount.addEventListener('click', () => {
    nameEditor('new', account.length);
  });
  cancel.addEventListener('click', () => {
    location.assign('index.html');
  });
  space.innerHTML = ' ';
  document.querySelector('div.display').appendChild(newAccount);
  document.querySelector('div.display').appendChild(space);
  document.querySelector('div.display').appendChild(cancel);
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
