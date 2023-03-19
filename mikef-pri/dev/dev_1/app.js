'use strict'

// Define account storage array
const account = getSavedAccounts();

// Save account information to localStorage in case of new account
saveAccounts();

// Render account selector -- This is currently not functional until I get accounts working. It's only to show what I intend for future versions
renderAccountSelector();

// Set correct account when returning from edit page
setAccountSelector();

// Render main table, where bill management occurs
generateTable();
