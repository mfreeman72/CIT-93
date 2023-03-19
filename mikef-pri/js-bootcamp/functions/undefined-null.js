const showOnPage = function (text) {
  let newParagraph = document.createElement("p");
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById("output");
  outputDiv.append(newParagraph);
};

// Undefined for variable
let name;

name = "Jen";

if (name === undefined) {
  showOnPage("Please provide a name");
} else {
  showOnPage(name);
}

// Undefined for function arguments
// Undefined as function return default value
let square = function (num) {
  showOnPage(num);
};

let result = square();
showOnPage(result);

// Null as assigned value
let age = 27;

age = null;

showOnPage(age);
