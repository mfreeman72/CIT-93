//showOnPage function
const showOnPage = function (text) {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById('output');
  outputDiv.append(newParagraph);
};

let name = '   Mike Freeman  ';

// length property
showOnPage(name.length);

//Convert to upper case
showOnPage(name.toUpperCase());

// Convert to lower case
showOnPage(name.toLowerCase());

// Includes method
let password = 'abc123hjsl098';
showOnPage(password.includes('password'));

// Trim method
showOnPage(name.trim());

// Challenge area

// isValidPassword - take password string, return true if valid, false otherwise
// Return true if length is more than 8 - and it doesn't contain the word password

let isValidPassword = function (password) {
  if (password.length <= 8 || password.includes('password')) {
    return false;
  } else return true;
};

// Andrew's second code possibility took out the if-else:
// let isValidPassword = function (password) {
//     return password.length >8 && !password.includes('password');
// }

showOnPage(isValidPassword('asdfp'));
showOnPage(isValidPassword('abc123!@#$%^&'));
showOnPage(isValidPassword('asdfpasdfpoijpassword'));
