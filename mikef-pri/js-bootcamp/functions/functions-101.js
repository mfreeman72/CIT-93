const showOnPage = function (text) {
  let newParagraph = document.createElement("p");
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById("output");
  outputDiv.append(newParagraph);
};

// function - input (argument), code, output

let greetUser = function () {
  showOnPage("Welcome user!");
};

greetUser();
greetUser();
greetUser();

let square = function (num) {
  let result = num * num;
  return result;
};

let value = square(3);
let otherValue = square(10);

showOnPage(value);
showOnPage(otherValue);

// Challenge area

// convertFahrenheitToCelcius
let convertFahrenheitToCelcius = function (num) {
  let result = (num - 32) * (5 / 9);
  return result;
};

// Call a couple of times (32 -> 0) (68 -> 20)
let temp1 = convertFahrenheitToCelcius(32);
let temp2 = convertFahrenheitToCelcius(68);

// Print the converted values
showOnPage(temp1);
showOnPage(temp2);
