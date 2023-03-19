'use strict';

// Define account storage array
let account = [];
iterateOverAccounts(getSavedAccounts());

// Save account information to localStorage in case of new account
saveAccounts();

// Render account selector -- This is currently not functional until I get accounts working. It's only to show what I intend for future versions
renderAccountSelector();

// Set correct account when returning from edit page
setAccountSelector();

// Render main table, where bill management occurs
generateTable();

// Monitor button to load backup file, import data, and refresh display
document.querySelector('#files').addEventListener('change', (e) => { // Put together from info found on multiple websites (MDN, CodeGrepper, StackOverflow, and HTML5Rocks) mixed with my own code
  const file = new Blob(e.target.files);
  const reader = new FileReader();
  reader.addEventListener('load', (evt) => {
    const temp = JSON.parse(evt.target.result);
    account = [];
    iterateOverAccounts(temp);
    saveAccounts();
    renderAccountSelector();
    generateTable();
  });
  reader.readAsText(file);
});
