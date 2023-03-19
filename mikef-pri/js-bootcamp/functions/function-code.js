const showOnPage = function (text) {
  let newParagraph = document.createElement("p");
  newParagraph.innerHTML = text;
  let outputDiv = document.getElementById("output");
  outputDiv.append(newParagraph);
};

// Global scope (convertFahrenheitToCelcius, tempOne, tempTwo)
    // Local scope (fahrenheit, celcius)
        // Local scope (isFreezing)

let convertFahrenheitToCelcius = function (fahrenheit) {
  let celcius = (fahrenheit - 32) * (5 / 9);

  if (celcius <= 0) {
    let isFreezing = true;
  }

  return celcius;
};
let tempOne = convertFahrenheitToCelcius(32);
let tempTwo = convertFahrenheitToCelcius(68);

showOnPage(tempOne);
showOnPage(tempTwo);
