//showOnPage function
const showOnPage = function (text) {
  let newParagraph = document.createElement('p');
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById('output');
  outputDiv.append(newParagraph);
};

let num = 415.329;

showOnPage(num.toFixed(10));

showOnPage(Math.round(num));
showOnPage(Math.floor(num));
showOnPage(Math.ceil(num));

// let min = 0
// let max = 1
// let randomNum = Math.floor(Math.random() * (max - min + 1)) + min
// showOnPage(randomNum)

// Challenge area
// Create a function that takes a person's guess, generates random number in given range, and determine if guess was correct
// 1 - 5 - true if correct, false if not correct

let makeGuess = function (guess) {
  let min = 1;
  let max = 10;
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return guess === randomNum;
};

showOnPage(makeGuess(5));

// Additional Challenge

let randomInRange = function (minimum, maximum) {
  let randomNum = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  return randomNum
}

showOnPage(randomInRange(50, 100));