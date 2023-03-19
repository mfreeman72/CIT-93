'use strict';

// Define account storage array
const account = getSavedAccounts();

// Create an account name editor box
const nameEditor = (acntName, index) => {
  document.querySelector(`p#${acntName.replace(/([^a-z0-9]+)/gi, '-')}`).innerHTML = ''; // Remove invalid characters, found at https://stackoverflow.com/questions/3780696/javascript-string-replace-with-regex-to-strip-off-illegal-characters
  const editBox = document.createElement('input');
  if (acntName !== 'new') {
    editBox.value = acntName;
  } else {
    editBox.setAttribute('placeholder', 'Account Name');
  }
  const submitButton = document.createElement('button');
  const cancelButton = document.createElement('button');
  submitButton.setAttribute('class', 'submit');
  cancelButton.setAttribute('class', 'cancel');
  submitButton.setAttribute('class', 'material-icons');
  submitButton.innerHTML = '&#xE876;';
  submitButton.addEventListener('click', () => {
    if (editBox.value !== '') {
      if (acntName !== 'new') {
        account[index].accountName = editBox.value;
        saveAccounts();
        listAccounts();
        bottomButtons();
      } else {
        account.push({accountName: editBox.value, bills: []});
        saveAccounts();
        listAccounts();
        bottomButtons();
      }
    }
  });
  cancelButton.setAttribute('class', 'material-icons');
  cancelButton.innerHTML = '&#xE5CD;';
  cancelButton.addEventListener('click', () => {
    listAccounts();
    bottomButtons();
  });
  document.querySelector(`p#${acntName.replace(/([^a-z0-9]+)/gi, '-')}`).appendChild(editBox);
  document.querySelector(`p#${acntName.replace(/([^a-z0-9]+)/gi, '-')}`).appendChild(submitButton);
  document.querySelector(`p#${acntName.replace(/([^a-z0-9]+)/gi, '-')}`).appendChild(cancelButton);
};

// List all account names with edit and delete buttons
const listAccounts = () => {
  document.querySelector('div.display').innerHTML = '';
  account.forEach((acnt, index) => {
    const accountDisplay = document.createElement('p');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const nameText = document.createTextNode(acnt.accountName);
    const newLine = document.createElement('p');
    accountDisplay.setAttribute('id', acnt.accountName.replace(/([^a-z0-9]+)/gi, '-'));
    editButton.setAttribute('id', acnt.accountName.replace(/([^a-z0-9]+)/gi, '-'));
    editButton.setAttribute('class', 'material-icons');
    editButton.setAttribute('align', 'center');
    editButton.innerHTML = '&#xE254;';
    editButton.addEventListener('click', () => {
      nameEditor(acnt.accountName, index);
    });
    newLine.setAttribute('id', 'new');
    newLine.innerHTML = '';
    accountDisplay.appendChild(editButton);
    // Only display delete button if there are more than one account
    if (account.length > 1) {
      deleteButton.setAttribute('id', acnt.accountName.replace(/([^a-z0-9]+)/gi, '-'));
      deleteButton.setAttribute('class', 'material-icons');
      deleteButton.innerHTML = '&#xE872;';
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
  const newAccount = document.createElement('button');
  const cancel = document.createElement('button');
  const space = document.createElement('span');
  newAccount.innerHTML = 'Add New Account';
  newAccount.addEventListener('click', () => {
    nameEditor('new', account.length);
  });
  cancel.innerHTML = 'Back';
  cancel.addEventListener('click', () => {
    location.assign('index.html');
  });
  space.innerHTML = ' ';
  document.querySelector('div.display').appendChild(newAccount);
  document.querySelector('div.display').appendChild(space);
  document.querySelector('div.display').appendChild(cancel);
};

// Run account Manager
listAccounts();
bottomButtons();
